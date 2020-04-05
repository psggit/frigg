import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import ListDeliveryAgent from "../components/manage-delivery-agent/list-delivery-agent"

class ManageDeliveryagent extends React.Component {
  constructor () {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingDeliveryagent: false,
      deliveryAgent: [],
      deliveryAgentCount: 0,
      shouldMountFilterDialog: false
    }

    this.filter = {
      cityId: ""
    }

    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchDeliveryAgentList = this.fetchDeliveryAgentList.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
  }

  componentDidMount () {
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
    this.fetchDeliveryAgentList({
      pagination: {
        offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
        limit: this.pageLimit,
      }
    })
  }

  setPage (pageObj) {
    this.setState({ loadingDeliveryagent: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchDeliveryAgentList({
      pagination: {
        offset: pageObj.offset,
        limit: this.pageLimit,
      }
    })
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

  fetchDeliveryAgentList (payload) {
    this.setState({ loadingDeliveryagent: true })
    Api.fetchDeliveryAgentList(payload)
      .then((response) => {
        console.log("response", response, response.data, response.count)
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
                title="Filter Deliveryagent"
                unmountFilterModal={this.unmountFilterModal}
              // filter="cartCouponFilter"
              ></FilterModal>
            )
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageDeliveryagent