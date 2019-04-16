import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewSkuPromo from '../components/manage-sku-promo/view-sku-promo'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageSkuPromo extends React.Component {
  constructor(props) {
    super(props)
    this.pageLimit = 5
    this.state = {
      activePage: 1
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchSkuPromoList()
    }
  }

  fetchSkuPromoList() {
    this.props.actions.fetchSkuPromoList({
      offset: 0,
      limit: this.pageLimit
    })
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.props.actions.fetchSkuPromoList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
    })
  }

  setPage(pageObj) {
    this.props.actions.setLoadingState('loadingSkuPromoList')
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.props.actions.fetchSkuPromoList({
      offset: pageObj.offset,
      limit: this.pageLimit,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "sku promo listing", `/home/manage-sku-promo?${getQueryUri(queryObj)}`)
  }

  render() {
    const {
      loadingSkuPromoList,
      skuPromoList,
      skuPromoCount
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-sku-promo/create`}>
            <RaisedButton
              label="Create new promo"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all sku promo</h3>
        <ViewSkuPromo
          skuPromoList={skuPromoList}
          loadingSkuPromoList={loadingSkuPromoList}
          history={this.props.history}
        />
        {
          !loadingSkuPromoList && skuPromoList && skuPromoList.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={skuPromoCount}
            setPage={this.setPage}
          />
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSkuPromo)
