import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import ListDeliveryServiceProviderCityMapping from "../components/manage-deliveryserviceprovider-city-mapping/list-deliveryserviceprovider-city-mapping"
import getIcon from '../components/icon-utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import Notify from "@components/Notification"

class DeliveryServiceProviderCityMapping extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingMappedDeliveryserviceProviderCityList: false,
      mappedDeliveryServiceProviderCityList: [],
      mappedDeliveryServiceProviderCityCount: 0,
      shouldMountFilterDialog: false,
      mountConfirmDialog: false
    }

    this.filter = {
      field: "",
      value: ""
    }

    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.mountConfirmDialogBox = this.mountConfirmDialogBox.bind(this)
    this.unmountConfirmDialogBox = this.unmountConfirmDialogBox.bind(this)
    this.clearAllMappings = this.clearAllMappings.bind(this)
    this.fetchMappedDeliveryServiceProviderCityList = this.fetchMappedDeliveryServiceProviderCityList.bind(this)
  }
  
  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchMappedDeliveryServiceProviderCityList({
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
      this.fetchMappedDeliveryServiceProviderCityList({
        offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
        limit: this.pageLimit,
        
        filter: {
          field: queryObj.selectedField,
          value: queryObj.selectedValue
        }
      })
    } else {
      console.log("active page", queryObj)
      this.fetchMappedDeliveryServiceProviderCityList({
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit,
      })
    }
  }

  setPage(pageObj) {
    this.setState({ loadingMappedDeliveryserviceProviderCityList: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (queryObj.selectedField) {
      this.fetchMappedDeliveryServiceProviderCityList({
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit
        ,
        filter: {
          field: queryObj.selectedField,
          value: queryObj.selectedValue
        }
      })
    } else {
      this.fetchMappedDeliveryServiceProviderCityList({
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit,
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    history.pushState(queryObj, "delivery service provider city listing", `/home/delivery-service-provider-city-mapping?${getQueryUri(queryObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  clearAllMappings() {
    this.unmountConfirmDialogBox()
    Api.clearAllDaLocalityMappings()
      .then((response) => {
        Notify('Deleted Succesfully', 'success')
        location.reload()
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        console.log("Error in deleting all the mappings", error)
      })
  }

  mountConfirmDialogBox() {
    this.setState({
      mountConfirmDialog: true
    })
  }

  unmountConfirmDialogBox() {
    this.setState({
      mountConfirmDialog: false
    })
  }

  fetchMappedDeliveryServiceProviderCityList(payload) {
    this.setState({ loadingMappedDeliveryserviceProviderCityList: true })
    Api.fetchMappedDeliveryServiceProviderCityList(payload)
      .then((response) => {
        this.setState({
          mappedDeliveryServiceProviderCityList: response.message,
          loadingMappedDeliveryserviceProviderCityList: false,
          mappedDeliveryServiceProviderCityCount: response.count
        })
        console.log("[fetchMappedDSPToCity]",response)
      })
      .catch((err) => {
        console.log("Error in fetching mapped delivery service provider city list", err)
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
      })
  }

  applyFilter(selectedField, selectedValue) {
    console.log("fiels", selectedField, "value", selectedValue)
    const queryObj = {
      activePage: 1,
      selectedField: selectedField.includes("Locality") ? "locality_id" : "da_id",
      selectedValue
    }

    this.setState({
      activePage: 1,
      mappedDeliveryServiceProviderCityList: []
    })

    history.pushState(queryObj, "Delivery Agents Mapped to Locality Listing", "/home/delivery-agent-locality-mapping")

    this.fetchMappedDeliveryServiceProviderCityList({
        offset: 0,
        limit: this.pageLimit
      ,
      filter: {
        field: selectedField.includes("Locality") ? "locality_id" : "da_id",
        value: selectedValue
      }
    })
  }

  render() {
    const { loadingMappedDeliveryserviceProviderCityList, mappedDeliveryServiceProviderCityList, mappedDeliveryServiceProviderCityCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/map-deliveryserviceprovider-to-city`}>
              <RaisedButton
                label="Map Delivery Service Provider To City"
                primary
              />
            </NavLink>
          </div>
          <div>
            <RaisedButton
              style={{ marginRight: "10px" }}
              onClick={this.mountConfirmDialogBox}
              label="Clear All"
            />
            <RaisedButton
              style={{ marginRight: "10px" }}
              onClick={this.mountFilterDialog}
              label="Filter"
              icon={getIcon('filter')}
            />
          </div>
        </div>
        <h3>Delivery Service Provider Mapped To City</h3>
        <ListDeliveryServiceProviderCityMapping
          deliveryServiceProviderCityMapped={mappedDeliveryServiceProviderCityList}
          loadingDeliveryserviceproviderCityMapped={loadingMappedDeliveryserviceProviderCityList}
          history={this.props.history}
        />
        {
          !loadingMappedDeliveryserviceProviderCityList && mappedDeliveryServiceProviderCityList && mappedDeliveryServiceProviderCityList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={mappedDeliveryServiceProviderCityCount}
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
                filter="filterDeliveryServiceProviderCityMapped"
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
                filterDeliveryAgentLocalityMapped={true}
              />
            )
            : ''
        }
        {
          this.state.mountConfirmDialog &&
          <ModalBox>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalBody>Are you sure do you want to clear all the mappings?</ModalBody>
            <ModalFooter>
              <button className="btn btn-secondary" onClick={() => this.unmountConfirmDialogBox()}> Cancel </button>
              <button className="btn btn-secondary" onClick={() => this.clearAllMappings()}> Confirm </button>
            </ModalFooter>
          </ModalBox>
        }
      </React.Fragment>
    )
  }
}

export default DeliveryServiceProviderCityMapping