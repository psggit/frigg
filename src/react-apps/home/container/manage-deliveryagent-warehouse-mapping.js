import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import ListDeliveryAgentWarehouseMapping from "../components/manage-deliveryagent-warehouse-mapping/list-deliveryagent-warehouse-mapping"
import getIcon from '../components/icon-utils'

class DeliveryagentWarehouseMapping extends React.Component {
  constructor () {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingMappedDeliveryagentWarehouseList: false,
      mappedDeliveryAgentWarehouseList: [],
      mappedDeliveryAgentWarehouseCount: 0,
      shouldMountFilterDialog: false
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
    this.fetchMappedDeliveryAgentWarehouseList = this.fetchMappedDeliveryAgentWarehouseList.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchMappedDeliveryAgentWarehouseList({
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
    if (queryObj.warehouseId) {
      this.fetchMappedDeliveryAgentWarehouseList({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: "warehouse_id",
          value: queryObj.warehouseId
        }
      })
    } else {
      console.log("active page", queryObj)
      this.fetchMappedDeliveryAgentWarehouseList({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }
  }

  setPage (pageObj) {
    this.setState({ loadingMappedDeliveryagentWarehouseList: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (queryObj.warehouseId) {
      this.fetchMappedDeliveryAgentWarehouseList({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: "warehouse_id",
          value: queryObj.warehouseId
        }
      })
    } else {
      this.fetchMappedDeliveryAgentWarehouseList({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    history.pushState(queryObj, "delivery agent warehouse listing", `/home/delivery-agent-warehouse-mapping?${getQueryUri(queryObj)}`)
  }

  mountFilterDialog () {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal () {
    this.setState({ shouldMountFilterDialog: false })
  }

  fetchMappedDeliveryAgentWarehouseList (payload) {
    this.setState({ loadingMappedDeliveryagentWarehouseList: true })
    Api.fetchMappedDeliveryAgentWarehouseList(payload)
      .then((response) => {
        this.setState({
          mappedDeliveryAgentWarehouseList: response.data,
          loadingMappedDeliveryagentWarehouseList: false,
          mappedDeliveryAgentWarehouseCount: response.count
        })
      })
      .catch((err) => {
        console.log("Error in fetching mapped delivery agent warehouse list", err)
      })
  }

  applyFilter (warehouseId) {
    const queryObj = {
      activePage: 1,
      field: "warehouse_id",
      warehouseId :warehouseId
    }

    this.setState({
      activePage: 1,
      mappedDeliveryAgentWarehouseList: []
    })

    history.pushState(queryObj, "Delivery Agents Mapped to Warehouse Listing", "/home/delivery-agent-warehouse-mapping")

    this.fetchMappedDeliveryAgentWarehouseList({
      pagination: {
        offset: 0,
        limit: this.pageLimit,
      },
      filter: {
        field: "warehouse_id",
        value: warehouseId
      }
    })
  }

  render () {
    const { loadingMappedDeliveryagentWarehouseList, mappedDeliveryAgentWarehouseList, mappedDeliveryAgentWarehouseCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/map-deliveryagent-to-warehouse`}>
              <RaisedButton
                label="Map Delivery Agent To Warehouse"
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
        <h3>Delivery Agents Mapped To Warehouse</h3>
        <ListDeliveryAgentWarehouseMapping
          deliveryAgentWarehouseMapped={[]}
          loadingDeliveryagentWarehouseMapped={false}
          history={this.props.history}
        />
        {
          !loadingMappedDeliveryagentWarehouseList && mappedDeliveryAgentWarehouseList && mappedDeliveryAgentWarehouseList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={mappedDeliveryAgentWarehouseCount}
              setPage={this.setPage}
            />
            : ''
        }
        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter Delivery Agents"
                unmountFilterModal={this.unmountFilterModal}
                filter="filterDeliveryAgentWarehouseMapped"
                filterDeliveryAgentWarehouseMapped={true}
              />
            )
            : ''
        }
      </React.Fragment>
    )
  }
}

export default DeliveryagentWarehouseMapping