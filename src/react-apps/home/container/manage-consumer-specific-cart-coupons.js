import React from "react"
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ListConsumerSpecificCartCoupons from "../components/manage-consumer-specific-cart-coupons"

class ManageConsumerSpecificCartCoupons extends React.Component {
  constructor () {
    super()
    this.pageLimit = 10
    this.state = {
      activePage: 1,
      loadingConsumerSpecificCartCoupon: false,
      consumerSpecificCartCoupons: [],
      consumerSpecificCartCouponCount: 0
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchConsumerSpecificCartCoupons = this.fetchConsumerSpecificCartCoupons.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchConsumerSpecificCartCoupons({
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

    this.fetchConsumerSpecificCartCoupons({
      pagination: {
        offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
        limit: this.pageLimit,
      }
    })
  }

  setPage (pageObj) {
    this.setState({ loadingConsumerSpecificCartCoupon: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchConsumerSpecificCartCoupons({
      pagination: {
        offset: pageObj.offset,
        limit: this.pageLimit,
      }
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

    history.pushState(queryObj, "consumer specific cart coupon listing", `/home/manage-consumer-specific-cart-coupons?${getQueryUri(queryObj)}`)
  }

  fetchConsumerSpecificCartCoupons (payload) {
    this.setState({ loadingConsumerSpecificCartCoupon: true })
    Api.fetchConsumerSpecificCartCoupons(payload)
      .then((response) => {
        this.setState({
          consumerSpecificCartCoupons: response.message.coupons,
          loadingConsumerSpecificCartCoupon: false,
          consumerSpecificCartCouponCount: response.message.count
        })
      })
      .catch((err) => {
        this.setState({ loadingConsumerSpecificCartCoupon: false})
        console.log("Error in fetching consumer specific cart coupons", err)
      })
  }

  render () {
    const { loadingConsumerSpecificCartCoupon, consumerSpecificCartCoupons, consumerSpecificCartCouponCount } = this.state
    return (
      <React.Fragment>
        <h3>Showing Consumer Specific Coupon List</h3>
        <ListConsumerSpecificCartCoupons
          consumerSpecificCartCoupons={consumerSpecificCartCoupons}
          loadingConsumerSpecificCartCoupon={this.state.loadingConsumerSpecificCartCoupon}
          history={this.props.history}
        />
        {
          !loadingConsumerSpecificCartCoupon && consumerSpecificCartCoupons && consumerSpecificCartCoupons.length > 0
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={consumerSpecificCartCouponCount}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageConsumerSpecificCartCoupons