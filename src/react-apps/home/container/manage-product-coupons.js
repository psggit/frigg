import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import getIcon from '../components/icon-utils'
import ListProductCoupons from "./../components/manage-coupons/list-coupons"

class ManageProductCoupons extends React.Component {
  constructor () {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingProductCoupons: false,
      productCouponList: [],
      productCouponCount: 0,
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
        constraint_type: "product"
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

    if (queryObj && (queryObj.hasOwnProperty ('couponName') || queryObj.hasOwnProperty ('activityStatus'))) {
      this.fetchListCoupons({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: queryObj.couponName ? "name" : "is_active",
          value: queryObj.couponName ? queryObj.couponName : queryObj.activityStatus.toString()
        },
        constraint_type: "product"
      })
    } else {
      this.fetchListCoupons({
        pagination: {
          offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        constraint_type: "product"
      })
    }
  }

  setPage (pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    if (queryObj && (queryObj.hasOwnProperty('couponName') || queryObj.hasOwnProperty('activityStatus'))) {
      this.fetchListCoupons({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        filter: {
          field: queryObj.couponName ? "name" : "is_active",
          value: queryObj.couponName ? queryObj.couponName : queryObj.activityStatus.toString()
        },
        constraint_type: "product"
      })
    } else {
      this.fetchListCoupons({
        pagination: {
          offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
          limit: this.pageLimit
        },
        constraint_type: "product"
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

    history.pushState(queryObj, "product coupons listing", `/home/manage-product-coupons?${getQueryUri(queryObj)}`)
  }

  fetchListCoupons (payload) {
    this.setState({ loadingProductCoupons: true })
    Api.fetchListCoupons(payload)
      .then((response) => {
        console.log("response", response.message.coupons, response.message.count)
        this.setState({
          productCouponList: response.message.coupons,
          loadingProductCoupons: false,
          productCouponCount: response.message.count
        })
      })
      .catch((err) => {
        this.setState({
          loadingProductCoupons: false
        })
        console.log("Error in fetching product coupons", err)
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
      productCouponList: []
    })

    history.pushState(queryObj, "product coupon listing", `/home/manage-product-coupons?${getQueryUri(queryObj)}`)

    this.fetchListCoupons({
      pagination: {
        offset: 0,
        limit: this.pageLimit
      },
      filter: {
        field: couponName ? "name" : "is_active",
        value: couponName ? couponName : activityStatus.toString()
      },
      constraint_type: "product"
    })

  }

  render () {
    const { loadingProductCoupons, productCouponList, productCouponCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-product-coupons/create`}>
              <RaisedButton
                label="Create Product coupon"
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

        <h3>Showing Product Coupons</h3>
        <ListProductCoupons
          couponList={this.state.productCouponList}
          loadingListCoupons={this.state.loadingProductCoupons}
          history={this.props.history}
        />
        {
          !loadingProductCoupons && productCouponList && productCouponList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={productCouponCount}
              setPage={this.setPage}
            />
            : ""
        }
        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter product coupon list"
                unmountFilterModal={this.unmountFilterModal}
                filter="productCouponFilter"
              ></FilterModal>
            )
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageProductCoupons