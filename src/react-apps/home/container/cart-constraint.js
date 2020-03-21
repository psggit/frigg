import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
//import * as Api from "./../middleware/api"
import * as Api from "../../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
//import ViewRewardCoupons from "./../components/manage-reward-coupons/view-coupons"
import ViewRewardCoupons from "../../components/manage-reward-coupons/view-coupons"
class ManageCartCoupons extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingRewardCoupons: false,
      rewardCoupons: [],
      rewardCouponsCount: 0
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchRewardCoupons = this.fetchRewardCoupons.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchRewardCoupons({
        limit: this.pageLimit,
        offset: 0
      })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.fetchRewardCoupons({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
    })
  }

  setPage(pageObj) {
    this.setState({ loadingRewardCoupons: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchRewardCoupons({
      offset: pageObj.offset,
      limit: this.pageLimit,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "sku promo listing", `/home/manage-reward-coupons?${getQueryUri(queryObj)}`)
  }

  fetchRewardCoupons(payload) {
    this.setState({ loadingRewardCoupons: true })
    Api.fetchRewardCoupons(payload)
      .then((response) => {
        this.setState({
          rewardCoupons: response.data,
          loadingRewardCoupons: false,
          rewardCouponsCount: response.count
        })
      })
      .catch((err) => {
        console.log("Error in fetching reward coupons", err)
      })
  }

  render() {
    const { loadingRewardCoupons, rewardCoupons, rewardCouponsCount } = this.state
    return (
      <React.Fragment>
        <div>
          <NavLink to={`/home/manage-reward-coupons/create`}>
            <RaisedButton
              label="Create new coupon"
              primary
            />
          </NavLink>
        </div>
        <h3>Showing all reward coupons</h3>
        <ViewRewardCoupons
          rewardCoupons={this.state.rewardCoupons}
          loadingRewardCoupons={this.state.loadingRewardCoupons}
          history={this.props.history}
        />
        {
          !loadingRewardCoupons && rewardCoupons && rewardCoupons.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={rewardCouponsCount}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageCartCoupons