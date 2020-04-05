import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import getIcon from '../components/icon-utils'
import ListWareHouse from "./../components/manage-warehouse/list-warehouse"

class ManageWareHouse extends React.Component {
  constructor () {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingWarehouse: false,
      wareHouseList: [],
      citiesData: [],
      loadingCities: true,
      wareHouseCount: 0,
      shouldMountFilterDialog: false
    }

    this.filter = {
      cityId: ""
    }
    
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchWarehouse = this.fetchWarehouse.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  componentDidMount () {
    this.fetchCityList()
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchWarehouse({
       pagination : {
          limit: this.pageLimit,
          offset: 0
       }
      })
    }
  }

  setQueryParamas () {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    if(queryObj.cityId){
      this.fetchWarehouse({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: "city_id",
          value: queryObj.cityId
        }
      })
    } else {
      console.log("active page", queryObj)
      this.fetchWarehouse({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }
  }

  setPage (pageObj) {
    this.setState({ loadingWarehouse: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (queryObj.cityId) {
      this.fetchWarehouse({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: queryObj.cityId ? "city_id" : "city_id",
          value: queryObj.cityId
        }
      })
    } else {
      this.fetchWarehouse({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "warehouse listing", `/home/manage-warehouse?${getQueryUri(queryObj)}`)
  }

  mountFilterDialog () {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal () {
    this.setState({ shouldMountFilterDialog: false })
  }

  fetchCityList () {
    Api.fetchCities({
      data: {
        state_short_name: null,
        is_available: false,
        offset: 0,
        limit: 1000,
        deliverable_city: true,
        no_filter: true
      }
    })
    .then((response) => {
      let cityList = []
      if (response.cities.length > 0) {
        cityList = response.cities.map((item, i) => {
          return {
            text: item.name,
            value: item.id
          }
        })
      }

      this.setState({ citiesData: cityList, loadingCities: false })
    })
    .catch((error) => {
      console.log("Error in fetching city list", error)
    })
  }

  fetchWarehouse (payload) {
    this.setState({ loadingWarehouse: true })
    Api.fetchWarehouse(payload)
      .then((response) => {
        this.setState({
          wareHouseList: response.message,
          loadingWarehouse: false,
          wareHouseCount: response.count
        })
      })
      .catch((err) => {
        this.setState({ loadingWarehouse: false })
        console.log("Error in fetching warehouse list", err)
      })
  }

  applyFilter (cityId) {
    console.log("city", cityId)
    const queryObj = {
      activePage: 1,
      cityId
    }

    this.setState({
      activePage: 1,
      cityId,
      wareHouseList: []
    })

    history.pushState(queryObj, "warehouse listing", `/home/manage-warehouse?${getQueryUri(queryObj)}`)
    
    this.fetchWarehouse({
      pagination: {
        offset: 0,
        limit: this.pageLimit,
      },
      filter: {
        field: "city_id",
        value: cityId
      }
    })
  } 

  render () {
    const { loadingWarehouse, wareHouseList, wareHouseCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-warehouse/create`}>
              <RaisedButton
                label="Create warehouse"
                primary
              />
            </NavLink>
          </div>
          <RaisedButton
            style={{ marginRight: "10px" }}
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          />
        </div>
        <h3>Showing list of warehouses</h3>
        <ListWareHouse
          wareHouseList={wareHouseList}
          loadingWarehouse={loadingWarehouse}
          history={this.props.history}
        />
        {
          !loadingWarehouse && wareHouseList && wareHouseList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={wareHouseCount}
              setPage={this.setPage}
            />
            : ''
        }
        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter warehouse filter"
                unmountFilterModal={this.unmountFilterModal}
                citiesData={this.state.citiesData}
                filter="warehouseFilter"
                filterCity={true}
              />
            )
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageWareHouse