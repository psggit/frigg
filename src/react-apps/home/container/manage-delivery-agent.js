import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import ListDeliveryAgent from "../components/manage-delivery-agent/list-delivery-agent"
import getIcon from '../components/icon-utils'

class ManageDeliveryagent extends React.Component {
  constructor () {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingDeliveryagent: false,
      deliveryAgent: [],
      warehouseData:[],
      loadingWarehouse:true,
      deliveryAgentCount: 0,
      shouldMountFilterDialog: false,
      citiesData: [],
      loadingCities: true,
      cityId: 0
    }

    this.filter = {
      cityId : ""
    }

    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchDeliveryAgentList = this.fetchDeliveryAgentList.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  componentDidMount () {
    //this.fetchWarehouseList()
    this.fetchCityList()
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchDeliveryAgentList({
        pagination: {
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
    if (queryObj.cityId) {
      this.fetchDeliveryAgentList({
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
      this.fetchDeliveryAgentList({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }
  }

  setPage (pageObj) {
    this.setState({ loadingDeliveryagent: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (queryObj.cityId) {
      this.fetchDeliveryAgentList({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: "city_id",
          value: queryObj.cityId
        }
      })
    } else {
      this.fetchDeliveryAgentList({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

    history.pushState(queryObj, "delivery agent listing", `/home/delivery-agent?${getQueryUri(queryObj)}`)
  }

  mountFilterDialog () {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal () {
    this.setState({ shouldMountFilterDialog: false })
  }

  // fetchWarehouseList () {
  //   Api.fetchWarehouseList({
  //     pagination: {
  //       limit: 1000,
  //       offset: 0
  //     }
  //   })
  //     .then((response) => {
  //       let warehouseList = []
  //       if (response.message.length > 0) {
  //         warehouseList = response.message.map((item, i) => {
  //           return {
  //             text: item.name,
  //             value: item.id
  //           }
  //         })
  //       }

  //       this.setState({ warehouseData: warehouseList, loadingWarehouse: false })
  //     })
  //     .catch((error) => {
  //       console.log("Error in fetching Warehouse List", error)
  //     })
  // }

  fetchCityList() {
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


  fetchDeliveryAgentList (payload) {
    this.setState({ loadingDeliveryagent: true })
    Api.fetchDeliveryAgentList(payload)
      .then((response) => {
        this.setState({
          deliveryAgent: response.data,
          loadingDeliveryagent: false,
          deliveryAgentCount: response.count
        })
      })
      .catch((err) => {
        console.log("Error in fetching delivery agent list", err)
      })
  }

  applyFilter(cityId) {
    const queryObj = {
      activePage: 1,
      cityId: this.state.citiesData[cityId - 1].value.toString()
    }

    this.setState({
      activePage: 1,
      cityId: this.state.citiesData[cityId - 1].value,
      deliveryAgent: []
    })

    history.pushState(queryObj, "delivery agent listing", `/home/delivery-agent?${getQueryUri(queryObj)}`)

    this.fetchDeliveryAgentList({
      pagination: {
        offset: 0,
        limit: this.pageLimit,
      },
      filter: {
        field: "city_id",
        value: this.state.citiesData[cityId - 1].value.toString()
      }
    })
  } 

  render () {
    const { loadingDeliveryagent, deliveryAgent, deliveryAgentCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/delivery-agent/create`}>
              <RaisedButton
                label="Create Delivery Agent"
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
        <h3>Showing all delivery agents</h3>
        <ListDeliveryAgent
          deliveryAgent={this.state.deliveryAgent}
          loadingDeliveryagent={this.state.loadingDeliveryagent}
          history={this.props.history}
        />
        {
          !loadingDeliveryagent && deliveryAgent && deliveryAgent.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={deliveryAgentCount}
              setPage={this.setPage}
            />
            : ''
        }
        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter delivery agent"
                unmountFilterModal={this.unmountFilterModal}
                //warehouseData={this.state.warehouseData}
                citiesData={this.state.citiesData}
                loadingCities={this.state.loadingCities}
                filter="cityFilter"
                filterCity={true}
              />
            )
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageDeliveryagent