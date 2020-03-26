import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import getIcon from '../components/icon-utils'
import ListCartCoupons from "./../components/manage-coupons/list-cart-coupons"

class ManageCartCoupons extends React.Component {
  constructor () {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingListCoupons: false,
      listCoupons: [],
      listCouponsCount: 0,
      shouldMountFilterDialog: false
    }

    this.filter = {
      couponName: "",
      activityStatus: false
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.fetchListCoupons = this.fetchListCoupons.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchListCoupons({
        pagination: {
          limit: this.pageLimit,
          offset: 0
        },
        constraint_type:"cart"
      })
    }
  }

  setQueryParamas () {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      this.filter[item[0]] = item[1]
    })

    if (queryObj && (queryObj.hasOwnProperty('couponName') || queryObj.hasOwnProperty('activityStatus'))) {
      this.fetchListCoupons({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: queryObj.couponName ? "name" : "is_active",
          value: queryObj.couponName ? queryObj.couponName : queryObj.activityStatus.toString()
        },
        constraint_type: "cart"
      })
    } else {
      this.fetchListCoupons({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        constraint_type: "cart"
      })
    }
  }

  setPage (pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (queryObj && (queryObj.hasOwnProperty('couponName') || queryObj.hasOwnProperty('activityStatus'))) {
      this.fetchListCoupons({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: queryObj.couponName ? "name" : "is_active",
          value: queryObj.couponName ? queryObj.couponName : queryObj.activityStatus.toString()
        },
        constraint_type: "cart"
      })
    } else {
      this.fetchListCoupons({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        constraint_type: "cart"
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
 
    history.pushState(queryObj, "cart coupons listing", `/home/manage-cart-coupons?${getQueryUri(queryObj)}`)
  }

  fetchListCoupons (payload) {
    this.setState({ loadingListCoupons: true })
    Api.fetchListCoupons(payload)
      .then((response) => {
        console.log("response", response.message.coupons, response.message.count)
        this.setState({
          listCoupons: response.message.coupons,
          loadingListCoupons: false,
          listCouponsCount: response.message.count
        })
      })
      .catch((err) => {
        this.setState({
          loadingListCoupons: false
        })
        console.log("Error in fetching cart coupons", err)
      })
  }

  mountFilterDialog () {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal () {
    this.setState({ shouldMountFilterDialog: false })
  }

  applyFilter (couponName, activityStatus) {

    const queryObj = {
      couponName,
      activityStatus: !couponName ? activityStatus : "",
      activePage: 1
    }

    this.setState({
      activePage: 1,
      couponName,
      activityStatus,
      listCoupons: []
    })

    history.pushState(queryObj, "cart coupon listing", `/home/manage-cart-coupons?${getQueryUri(queryObj)}`)

    this.fetchListCoupons({
      pagination: {
        offset: 0,
        limit: this.pageLimit
      },
      filter: {
        field: couponName ? "name" : "is_active",
        value: couponName ? couponName : activityStatus.toString()
      },
      constraint_type: "cart"
    })

  }

  render () {
    const { loadingListCoupons, listCoupons, listCouponsCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-cart-coupons/create`}>
              <RaisedButton
                label="Create cart coupon"
                primary
              />
            </NavLink>
          </div>
          <div>
            {/* {
              this.state.isFilterApplied &&
              <RaisedButton
                onClick={this.resetFilter}
                label="Reset filter"
                icon={getIcon('filter')}
                style={{ marginRight: "10px" }}
              />
            } */}
            <RaisedButton
              onClick={this.mountFilterDialog}
              label="Filter"
              icon={getIcon('filter')}
            />
          </div>
        </div>

        <h3>Showing Cart Coupons</h3>
        <ListCartCoupons
          listCoupons={this.state.listCoupons}
          loadingListCoupons={this.state.loadingListCoupons}
          history={this.props.history}
        />
        {
          !loadingListCoupons && listCoupons && listCoupons.length 
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={listCouponsCount}
              setPage={this.setPage}
            />
            : ""
        }
        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter cart coupon list"
                unmountFilterModal={this.unmountFilterModal}
                filter="cartCouponFilter"
              ></FilterModal>
            )
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageCartCoupons