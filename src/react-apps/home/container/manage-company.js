import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewCompany from '../components/manage-company/view-company-list'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageCompany extends React.Component {
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
      this.fetchCompanyList()
    }
  }

  fetchCompanyList() {
    this.props.actions.fetchCompanyList({
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

    this.props.actions.fetchCompanyList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
    })
  }

  setPage(pageObj) {
    this.props.actions.setLoadingState('loadingCompanyList')
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.props.actions.fetchCompanyList({
      offset: pageObj.offset,
      limit: this.pageLimit,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "company listing", `/home/manage-company?${getQueryUri(queryObj)}`)
  }

  render() {
    const {
      loadingCompanyList,
      companyList,
      companyCount
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-company/create`}>
            <RaisedButton
              label="Map company to brand"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all comapnies mapped to brands</h3>
        <ViewCompany
          companyList={companyList}
          loadingCompanyList={loadingCompanyList}
          history={this.props.history}
        />
        {
          !loadingCompanyList && companyList && companyList.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={this.props.companyCount}
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
)(ManageCompany)
