import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
// import ViewPromos from '../components/manage-user-specific-promos/view-promos'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageCampaign extends React.Component {
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
      this.fetchCampaignList()
    }
  }

  fetchCampaignList() {
    this.props.actions.fetchCampaignList({
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

    this.props.actions.fetchCampaignList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.props.actions.fetchCampaignList({
      offset: pageObj.offset,
      limit: this.pageLimit,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "campaign listing", `/home/manage-campaign?${getQueryUri(queryObj)}`)
  }

  render() {
    const {
      loadingCampaignList,
      campaignList,
      campaignCount
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-campaign/create`}>
            <RaisedButton
              label="Create new campaign"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all campaign</h3>
        <ViewCampaign
          campaignList={campaignList}
          loadingCampaignList={loadingCampaignList}
          history={this.props.history}
        />
        {
          !loadingUserSpecificPromos && userSpecificPromos.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={campaignCount}
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
)(ManageCampaign)
