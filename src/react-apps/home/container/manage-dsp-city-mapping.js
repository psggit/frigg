import React from 'react'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from '../middleware/api'
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import ListDSPCityMapping from '../components/manage-dsp-city-mapping/list-dsp-city-mapping'
import getIcon from '../components/icon-utils'
import Notify from '@components/Notification'

class DSPCityMapping extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingMappedDSPCityList: false,
      mappedDSPCityList: [],
      mappedDSPCityCount: 0,
      shouldMountFilterDialog: false,
      mountConfirmDialog: false
    }

    this.filter = {
      filter_by: "",
      filter_value: ""
    }

    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.fetchMappedDSPCityList = this.fetchMappedDSPCityList.bind(this)
  }
  
  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchMappedDSPCityList({
        limit:this.pageLimit,
        offset:0
      })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
    if (queryObj.selectedField) {
      this.fetchMappedDSPCityList({
        offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
        limit: this.pageLimit,
        filter: {
          filter_by: queryObj.selectedField,
          filter_value: queryObj.selectedValue
        }
      })
    } else {
      this.fetchMappedDSPCityList({
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit,
      })
    }
  }

  setPage(pageObj) {
    this.setState({ loadingMappedDSPCityList: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (queryObj.selectedField) {
      this.fetchMappedDSPCityList({
        offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
        limit: this.pageLimit,
        filter: {
          filter_by: queryObj.selectedField,
          filter_value: queryObj.selectedValue
        }
      })
    } else {
      this.fetchMappedDSPCityList({
        offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
        limit: this.pageLimit
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    history.pushState(queryObj, "dsp city listing", `/home/dsp-city-mapping?${getQueryUri(queryObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  fetchMappedDSPCityList(payload) {
    this.setState({ loadingMappedDSPCityList: true })
    Api.fetchMappedDSPCityList(payload)
      .then((response) => {
        this.setState({
          mappedDSPCityList: response.message,
          loadingMappedDSPCityList: false,
          mappedDSPCityCount: response.count
        })
      })
      .catch((err) => {
        console.log("Error in fetching mapped dsp city list", err)
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
      })
  }

  applyFilter(selectedField, selectedValue) {
    const queryObj = {
      activePage: 1,
      selectedField: selectedField.includes("City") ? "city_id" : selectedField.includes("Delivery") ? "delivery_service_provider_id": "is_active",
      selectedValue
    }

    this.setState({
      activePage: 1,
      mappedDSPCityList: []
    })

    history.pushState(queryObj, "DSP Mapped To City ", `/home/dsp-city-mapping?${getQueryUri(queryObj)}`)

    this.fetchMappedDSPCityList({
      offset: 0,
      limit: this.pageLimit,
      filter: {
        filter_by: selectedField.includes("City") ? "city_id" : selectedField.includes("Delivery") ? "delivery_service_provider_id" : "is_active",
        filter_value: selectedValue
      }
    })
  }

  render() {
    const { loadingMappedDSPCityList, 
      mappedDSPCityList, 
      mappedDSPCityCount } = this.state

    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <NavLink to={`/home/map-dsp-to-city`}>
            <RaisedButton
              label="Map Delivery Service Provider To City"
              primary
            />
          </NavLink>
          <RaisedButton
            style={{ marginRight: "10px" }}
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          />
        </div>
        <h3>Delivery Service Provider Mapped To City</h3>
        <ListDSPCityMapping
          deliveryServiceProviderCityMapped={mappedDSPCityList}
          loadingDeliveryserviceproviderCityMapped={loadingMappedDSPCityList}
          history={this.props.history}
        />
        {
          !loadingMappedDSPCityList && mappedDSPCityList && mappedDSPCityList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={mappedDSPCityCount}
              setPage={this.setPage}
            />
            : ''
        }
        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter Delivery Service Provider"
                unmountFilterModal={this.unmountFilterModal}
                filter="filterDSPCityMapped"
                floatingLabelText="Select Option"
                dropdownOptions={[
                  {
                    id: 1,
                    name: "City Id"
                  },
                  {
                    id: 2,
                    name: "Delivery Service Provider Id"
                  },
                  {
                    id: 3,
                    name: "Is Active"
                  }
                ]}
              />
            )
            : ''
        }
      </React.Fragment>
    )
  }
}

export default DSPCityMapping;