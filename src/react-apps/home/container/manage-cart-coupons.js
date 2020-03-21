import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ListCartCoupons from "./../components/manage-coupons/list-cart-coupons"

class ManageCartCoupons extends React.Component {
  constructor () {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingListCoupons: false,
      listCoupons: [],
      listCouponsCount: 0
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchListCoupons = this.fetchListCoupons.bind(this)
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
    })

    this.fetchListCoupons({
      pagination: {
        offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
        limit: this.pageLimit
      },
      constraint_type:"cart"
    })
  }

  setPage (pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchListCoupons({
      pagination: {
        offset: pageObj.offset,
        limit: this.pageLimit
      },
      constraint_type: "cart"
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "cart coupons listing", `/home/manage-cart-coupons?${getQueryUri(queryObj)}`)
  }

  fetchListCoupons (payload) {
    this.setState({ loadingListCoupons: true })
    Api.fetchListCoupons(payload)
      .then((response) => {
        this.setState({
          listCoupons: response.message.coupons,
          loadingListCoupons: false,
          listCouponsCount: response.count
        })
      })
      .catch((err) => {
        console.log("Error in fetching cart coupons", err)
      })
  }

  render () {
    const { loadingListCoupons, listCoupons, listCouponsCount } = this.state
    return (
      <React.Fragment>
        <div>
          <NavLink to={`/home/manage-cart-coupons/create`}>
            <RaisedButton
              label="Create cart coupon"
              primary
            />
          </NavLink>
        </div>
        <h3>Showing Cart Coupons</h3>
        <ListCartCoupons
          listCoupons={this.state.listCoupons}
          loadingListCoupons={this.state.loadingListCoupons}
          history={this.props.history}
        />
        {
          !loadingListCoupons && listCoupons && listCoupons.length > 0
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={listCouponsCount}
              setPage={this.setPage}
            />
            : ""
        }
      </React.Fragment>
    )
  }
}

export default ManageCartCoupons