import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewBrandManager from '../components/manage-brand-manager'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageBrandManager extends React.Component {
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
      this.fetchBrandManagerList()
    }
  }

  fetchBrandManagerList() {
    this.props.actions.fetchBrandManagerList({
      offset: 0,
      limit: this.pageLimit
    }, () => {})
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.props.actions.fetchBrandManagerList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
    }, () => {})
  }

  setPage(pageObj) {
    this.props.actions.setLoadingState('loadingBrandManagerList')
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.props.actions.fetchBrandManagerList({
      offset: pageObj.offset,
      limit: this.pageLimit,
    }, () => {})
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "brand manager listing", `/home/manage-brand-manager?${getQueryUri(queryObj)}`)
  }

  render() {
    const {
      loadingBrandManagerList,
      brandManagerList,
      brandManagerCount
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-brand-manager/create`}>
            <RaisedButton
              label="Create new brand manager"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all brand manager</h3>
        <ViewBrandManager
          brandManagerList={brandManagerList}
          loadingBrandManagerList={loadingBrandManagerList}
          history={this.props.history}
        />
        {
          !loadingBrandManagerList && brandManagerList && brandManagerList.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={brandManagerCount}
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
)(ManageBrandManager)
