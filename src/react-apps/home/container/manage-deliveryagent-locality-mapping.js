import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import ListDeliveryAgentLocalityMapping from "../components/manage-deliveryagent-locality-mapping/list-deliveryagent-locality-mapping"
import getIcon from '../components/icon-utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import Notify from "@components/Notification"

class DeliveryagentLocalityMapping extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingMappedDeliveryagentLocalityList: false,
      mappedDeliveryAgentLocalityList: [],
      mappedDeliveryAgentLocalityCount: 0,
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
    this.fetchMappedDeliveryAgentLocalityList = this.fetchMappedDeliveryAgentLocalityList.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchMappedDeliveryAgentLocalityList({
        pagination: {
          limit: this.pageLimit,
          offset: 0
        }
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
      this.fetchMappedDeliveryAgentLocalityList({
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
      this.fetchMappedDeliveryAgentLocalityList({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }
  }

  setPage(pageObj) {
    this.setState({ loadingMappedDeliveryagentLocalityList: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (queryObj.selectedField) {
      this.fetchMappedDeliveryAgentLocalityList({
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
      this.fetchMappedDeliveryAgentLocalityList({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit,
        }
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    history.pushState(queryObj, "delivery agent locality listing", `/home/delivery-agent-locality-mapping?${getQueryUri(queryObj)}`)
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

  fetchMappedDeliveryAgentLocalityList(payload) {
    this.setState({ loadingMappedDeliveryagentLocalityList: true })
    Api.fetchMappedDeliveryAgentLocalityList(payload)
      .then((response) => {
        this.setState({
          mappedDeliveryAgentLocalityList: response.message,
          loadingMappedDeliveryagentLocalityList: false,
          mappedDeliveryAgentLocalityCount: response.count
        })
      })
      .catch((err) => {
        console.log("Error in fetching mapped delivery agent locality list", err)
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
      mappedDeliveryAgentLocalityList: []
    })

    history.pushState(queryObj, "Delivery Agents Mapped to Locality Listing", "/home/delivery-agent-locality-mapping")

    this.fetchMappedDeliveryAgentLocalityList({
      pagination: {
        offset: 0,
        limit: this.pageLimit,
      },
      filter: {
        field: selectedField.includes("Locality") ? "locality_id" : "da_id",
        value: selectedValue
      }
    })
  }

  render() {
    const { loadingMappedDeliveryagentLocalityList, mappedDeliveryAgentLocalityList, mappedDeliveryAgentLocalityCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/map-deliveryagent-to-locality`}>
              <RaisedButton
                label="Map Delivery Agent To Locality"
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
        <h3>Delivery Agents Mapped To Locality</h3>
        <ListDeliveryAgentLocalityMapping
          deliveryAgentLocalityMapped={mappedDeliveryAgentLocalityList}
          loadingDeliveryagentLocalityMapped={loadingMappedDeliveryagentLocalityList}
          history={this.props.history}
        />
        {
          !loadingMappedDeliveryagentLocalityList && mappedDeliveryAgentLocalityList && mappedDeliveryAgentLocalityList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={mappedDeliveryAgentLocalityCount}
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
                filter="filterDeliveryAgentLocalityMapped"
                floatingLabelText="Select Option"
                dropdownOptions={[
                  {
                    id: 1,
                    name: "Locality Id"
                  },
                  {
                    id: 2,
                    name: "Delivery Agent Id"
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

export default DeliveryagentLocalityMapping