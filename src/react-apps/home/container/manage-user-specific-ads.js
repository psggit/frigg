import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewAds from '../components/manage-user-specific-ads/index'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'

class ManageAds extends React.Component {
  constructor(props) {
    super(props)
    this.pageLimit = 10
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
      this.fetchUserSpecificAdsData()
    }
  }

  fetchUserSpecificAdsData() {
    this.props.actions.fetchUserSpecificAds({
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

    this.props.actions.fetchUserSpecificAds({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.props.actions.fetchUserSpecificAds({
      offset: pageObj.offset,
      limit: this.pageLimit,
    })
    this.setState({activePage: pageObj.activePage})
    
    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "ads listing", `/home/user-specific-ads?${getQueryUri(queryObj)}`)
  }

  render() {
    const {
      loadingUserSpecificAds,
      userSpecificAds,
      userSpecificAdsCount
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <h3>Showing all ads</h3>
        <ViewAds
          userSpecificAds={userSpecificAds}
          loadingUserSpecificAds={loadingUserSpecificAds}
          history={this.props.history}
        />
        {
          !loadingUserSpecificAds && userSpecificAds.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={userSpecificAdsCount}
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
)(ManageAds)
