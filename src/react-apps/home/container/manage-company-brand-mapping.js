import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import MappedCompanyList from '../components/manage-company-brand-mapping/mapped-company-list'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import FilterModal from '@components/filter-modal'
import getIcon from '../components/icon-utils'
import RaisedButton from 'material-ui/RaisedButton'

class ManageCompany extends React.Component {
  constructor(props) {
    super(props)
    this.pageLimit = 10
    this.state = {
      activePage: 1,
      shouldMountFilterDialog: false,
      appliedFilter: false
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchMappedCompanyList({
        limit: 10,
        offset: 0
      })
    }
  }

  applyFilter(brandName) {
    this.props.actions.fetchMappedCompanyList({
      offset: 0,
      limit: this.pageLimit,
      brand_name: brandName
    })
    this.setState({ appliedFilter: true })
    let queryObj = {
      brand_name: brandName
    }
    history.pushState(queryObj, "mapped company listing", `/home/manage-company-brand-mapping?${getQueryUri(queryObj)}`)
  }

  resetFilter() {
    this.setState({ appliedFilter: false })
    this.props.history.push("/home/manage-company-brand-mapping")
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  fetchMappedCompanyList(payload) {
    this.props.actions.fetchMappedCompanyList(payload)
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.setState({
      appliedFilter: queryObj.brand_id ? true : false
    })

    this.fetchMappedCompanyList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
      brand_id: queryObj.brand_id ? parseInt(queryObj.brand_id) : 0
    })
  }

  setPage(pageObj) {
    this.props.actions.setLoadingState('loadingMappedCompanyList')
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (this.state.appliedFilter) {
      this.props.actions.fetchMappedCompanyList({
        offset: pageObj.offset,
        limit: this.pageLimit,
        brand_name: queryObj.brand_name
      })
    } else {
      this.props.actions.fetchMappedCompanyList({
        offset: pageObj.offset,
        limit: this.pageLimit,
      })
    }
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "mapped company listing", `/home/manage-company-brand-mapping?${getQueryUri(queryObj)}`)
  }

  render() {
    const {
      loadingMappedCompanyList,
      mappedCompanyList,
    } = this.props
    const { appliedFilter } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div>
            <NavLink to={`/home/manage-company-brand-mapping/create`}>
              <RaisedButton
                label="Map company to brand"
                primary
              />
            </NavLink>

          </div>
          <div>
            {
              this.state.appliedFilter &&
              <RaisedButton
                onClick={this.resetFilter}
                label="Reset Filter"
                style={{ marginRight: "10px" }}
              />

            }
            <RaisedButton
              onClick={this.mountFilterDialog}
              label="Filter"
              icon={getIcon('filter')}
            />
          </div>
        </div>
        <h3>Showing all companies mapped to brands</h3>
        <MappedCompanyList
          companyList={mappedCompanyList}
          loadingCompanyList={loadingMappedCompanyList}
          history={this.props.history}
        />
        {
          !loadingMappedCompanyList && mappedCompanyList && !appliedFilter
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={this.props.mappedCompanyCount}
              setPage={this.setPage}
            />
            : ''
        }
        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter mapped companies by brand"
                unmountFilterModal={this.unmountFilterModal}
                floatingLabelText="Brand Name"
                filter="brandName"
              ></FilterModal>
            )
            : ""
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
