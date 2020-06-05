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
      loadingDeliveryagentWarehouseMapped: false,
      deliveryAgentWarehouseMapped: [],
      loadingWarehouse: true,
      deliveryAgentWarehouseMappedCount: 0,
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
    this.fetchDeliveryAgentWarehouseMapping = this.fetchDeliveryAgentWarehouseMapping.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchDeliveryAgentWarehouseMapping({
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
      this.fetchDeliveryAgentWarehouseMapping({
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
      this.fetchDeliveryAgentWarehouseMapping({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }
  }

  setPage (pageObj) {
    this.setState({ loadingDeliveryagentWarehouseMapped: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (queryObj.warehouseId) {
      this.fetchDeliveryAgentWarehouseMapping({
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
      this.fetchDeliveryAgentWarehouseMapping({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

  }

  mountFilterDialog () {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal () {
    this.setState({ shouldMountFilterDialog: false })
  }

  fetchDeliveryAgentWarehouseMapping (payload) {
    this.setState({ loadingDeliveryagentWarehouseMapped: true })
    Api.fetchDeliveryAgentWarehouseMapping(payload)
      .then((response) => {
        console.log("response", response, response.data, response.count)
        this.setState({
          deliveryAgentWarehouseMapped: response.data,
          loadingDeliveryagentWarehouseMapped: false,
          deliveryAgentWarehouseMappedCount: response.count
        })
      })
      .catch((err) => {
        console.log("Error in fetching delivery agent list", err)
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
      deliveryAgentWarehouseMapped: []
    })

    history.pushState(queryObj, "Delivery Agents Mapped to Warehouse Listing", "/home/deliveryagent-warehouse-mapping")

    this.fetchDeliveryAgentWarehouseMapping({
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
    const { loadingDeliveryagentWarehouseMapped, deliveryAgentWarehouseMapped, deliveryAgentWarehouseMappedCount } = this.state
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
                label="Map DeliveryAgent To Warehouse"
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
          deliveryAgentWarehouseMapped={this.state.deliveryAgentWarehouseMapped}
          loadingDeliveryagentWarehouseMapped={this.state.loadingDeliveryagentWarehouseMapped}
          history={this.props.history}
        />
        {
          !loadingDeliveryagentWarehouseMapped && deliveryAgentWarehouseMapped && deliveryAgentWarehouseMapped.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={deliveryAgentWarehouseMappedCount}
              setPage={this.setPage}
            />
            : ''
        }
        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter DeliveryAgent Warehouse Mapping"
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