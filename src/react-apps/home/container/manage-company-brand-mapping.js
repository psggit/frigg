import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import MappedCompanyList from '../components/manage-company-brand-mapping/mapped-company-list'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageCompany extends React.Component {
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
      this.fetchMappedCompanyList()
    }
  }

  fetchMappedCompanyList() {
    this.props.actions.fetchMappedCompanyList({
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

    this.props.actions.fetchMappedCompanyList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
    })
  }

  setPage(pageObj) {
    this.props.actions.setLoadingState('loadingMappedCompanyList')
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.props.actions.fetchMappedCompanyList({
      offset: pageObj.offset,
      limit: this.pageLimit,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "mapped company listing", `/home/manage-company-brand-mapping?${getQueryUri(queryObj)}`)
  }

  render() {
    const {
      loadingMappedCompanyList,
      mappedCompanyList
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-company-brand-mapping/create`}>
            <RaisedButton
              label="Map company to brand"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all companies mapped to brands</h3>
        <MappedCompanyList
          companyList={mappedCompanyList}
          loadingCompanyList={loadingMappedCompanyList}
          history={this.props.history}
        />
        {
          !loadingMappedCompanyList && mappedCompanyList && mappedCompanyList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={this.props.mappedCompanyCount}
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
