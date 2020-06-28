import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import ListDeliveryAgentWarehouseMapping from "../components/manage-deliveryagent-warehouse-mapping/list-deliveryagent-warehouse-mapping"
import getIcon from '../components/icon-utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import Notify from "@components/Notification"

class DeliveryagentWarehouseMapping extends React.Component {
  constructor () {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingMappedDeliveryagentWarehouseList: false,
      mappedDeliveryAgentWarehouseList: [],
      mappedDeliveryAgentWarehouseCount: 0,
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
    if (queryObj.selectedField) {
      this.fetchMappedDeliveryAgentWarehouseList({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: queryObj.selectedField,
          value: queryObj.selectedValue
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

    if (queryObj.selectedField) {
      this.fetchMappedDeliveryAgentWarehouseList({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: queryObj.selectedField,
          value: queryObj.selectedValue
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

  clearAllMappings() {
    unmountConfirmDialogBox()
    Api.clearAllMappings()
      .then((response) => {
        Notify('Deleted Succesfully', 'success')
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        console.log("Error in deleting all the mappings", error)
      })
  }

  mountConfirmDialogBox () {
    this.setState({
      mountConfirmDialog: true
    })
  }

  unmountConfirmDialogBox () {
    this.setState({
      mountConfirmDialog: false
    })
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

  applyFilter (selectedField, selectedValue) {
    console.log("fiels", selectedField, "value", selectedValue)
    const queryObj = {
      activePage: 1,
      selectedField,
      selectedValue
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
        field: selectedField,
        value: selectedValue
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
        <h3>Delivery Agents Mapped To Warehouse</h3>
        <ListDeliveryAgentWarehouseMapping
          deliveryAgentWarehouseMapped={this.state.mappedDeliveryAgentWarehouseList}
          loadingDeliveryagentWarehouseMapped={this.state.loadingMappedDeliveryagentWarehouseList}
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
                floatingLabelText="Select Option"
                dropdownOptions={[
                  {
                    id: 1,
                    name: "warehouse_id"
                  },
                  {
                    id: 2,
                    name: "da_id"
                  }
                ]}
                filterDeliveryAgentWarehouseMapped={true}
              />
            )
            : ''
        }
        {
          this.state.mountConfirmDialog &&
          <ModalBox>
            <ModalHeader>ClearAll Mappings</ModalHeader>
            <ModalBody>Are you sure do you want to clearall the mappings?</ModalBody>
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

export default DeliveryagentWarehouseMapping