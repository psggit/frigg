import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import * as Actions from '../actions'
import ViewConsumerAds from '../components/manage-consumer-ads/view-ads'
import RoleBasedComponent from '@components/RoleBasedComponent'
import getIcon from '../components/icon-utils'
import FilterModal from '@components/filter-modal'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'
import { NavLink } from 'react-router-dom'

import * as Roles from '../constants/roles'

class ManageConsumerAds extends React.Component {
  constructor(props) {
    super(props)
    this.filter = {
      stateShortName: null,
      isLocalityAvailable: false,
      stateName: null,
      cityId: null,
      stateId: null,
      adId: null
    }
    this.pageLimit = 10
    this.state = {
      shouldMountFilterDialog: false,
      shouldMountViewFencesDialog: false,
      stateId: null,
      cityId: null,
      stateShortName: null,
      adId: null,
      activePage: 1,
      isLocalityAvailable: false,
      isFilterApplied: false
    }

    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.setPage = this.setPage.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    //this.handleChangeIsLocalityAvailable = this.handleChangeIsLocalityAvailable.bind(this)
    this.mountViewFencesDialog = this.mountViewFencesDialog.bind(this)
    this.unmountViewFencesDialog = this.unmountViewFencesDialog.bind(this)
    this.fetchConsumerAdList = this.fetchConsumerAdList.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.fetchCities = this.fetchCities.bind(this)
  }

  componentDidMount() {
    console.log('mounting manage localities');
    this.fetchData()
    window.onpopstate = this.fetchData
  }

  componentWillUnmount() {
    console.log('unmounting manage localities');
    window.onpopstate = () => { }
  }

  unmountViewFencesDialog() {
    this.setState({ shouldMountViewFencesDialog: false })
  }

  mountViewFencesDialog() {
    this.setState({ shouldMountViewFencesDialog: true })
  }

  fetchData() {
    this.props.actions.setLoadingState()
    // this.props.actions.setLoadingState('loadingGeoboundary')

    this.props.actions.fetchStates()

    if (location.search.length) {
      // if query string exists then apply filters
      this.setQueryParamas()
    } else {
      // if there is no query string then fetch defult citiesData/all citiesData
      this.fetchConsumerAdList()
      //this.setState({ stateId: 0 })
    }
  }

  fetchConsumerAdList() {
    this.props.actions.fetchConsumerAds({
      offset: (this.state.activePage - 1) * this.pageLimit,
      limit: this.pageLimit
    })
  }

  fetchCities(stateShortName) {
    this.props.actions.fetchCities({
      state_short_name: stateShortName,
      is_available: false,
      offset: 0,
      limit: 999999,
      deliverable_city: true,
      no_filter: false
    })
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      this.filter[item[0]] = item[1]
    })
    this.fetchCities(queryObj.stateShortName)
    this.props.actions.fetchConsumerAds({
      ad_id: parseInt(queryObj.adId) || null,
      city_id: parseInt(queryObj.cityId) || null,
      offset: parseInt(queryObj.offset),
      limit: this.pageLimit
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    const { statesData } = this.props

    this.setState(pageObj)
    this.props.actions.fetchConsumerAds({
      city_id: parseInt(queryObj.cityId) || null,
      ad_id: parseInt(queryObj.adId) || null,
      offset: pageObj.offset,
      limit: this.pageLimit
    })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "city listing", `/home/manage-consumer-ads?${getQueryUri(queryObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  handleCityChange(k) {
    const { citiesData } = this.props
    this.filter.cityId = citiesData[k].id
    this.filter.cityName = citiesData[k].name
  }

  handleStateChange(k) {
    const { statesData } = this.props

    this.filter.stateShortName = statesData[k].short_name
    this.filter.stateName = statesData[k].state_name
    this.filter.stateId = statesData[k].id

    this.props.actions.fetchCities({
      state_short_name: statesData[k].short_name,
      is_available: false,
      offset: 0,
      limit: 999999,
      deliverable_city: true,
      no_filter: false
    })
  }

  resetFilter() {
    this.props.history.push(`/home/manage-consumer-ads`)
  }

  applyFilter(adId) {
    const { statesData } = this.props
    const queryObj = {
      stateId: this.filter.stateId,
      adId: adId.trim().length > 0 ? adId : null,
      stateShortName: this.filter.stateShortName,
      cityId: this.filter.cityId,
      //stateName: this.filter.stateName,
      offset: 0,
      //cityName: this.filter.cityName,
      activePage: 1,
      isFilterApplied: true
    }

    this.setState({
      offset: 0,
      activePage: 1,
      stateShortName: this.filter.stateShortName,
      stateName: this.filter.stateName,
      cityName: this.filter.cityName,
      cityId: this.filter.cityId,
      stateId: this.filter.stateId,
      adId,
      isFilterApplied: true
    })

    history.pushState(queryObj, "image-ads listing", `/home/manage-consumer-ads?${getQueryUri(queryObj)}`)

    this.props.actions.fetchConsumerAds({
      ad_id: adId.trim().length > 0 ? parseInt(adId) : null,
      city_id: parseInt(queryObj.cityId),
      offset: 0,
      limit: this.pageLimit
    })
  }

  render() {
    const {
      loadingCities,
      citiesData,
      loadingStates,
      citiesCount,
      consumerAdsData,
      loadingConsumerAds,
      statesData
    } = this.props
    //console.log("consumer", consumerAdsData.count)
    return (
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`manage-consumer-ads/create-new-consumer-ad`}>
              <RaisedButton
                label="Create new ad"
                primary
                onClick={this.mountCreateStateDialog}
              />
            </NavLink>

          </div>
          <div>
            {
              this.state.isFilterApplied &&
              <RaisedButton
                onClick={this.resetFilter}
                label="Reset filter"
                icon={getIcon('filter')}
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

        <br />

        {
          !loadingConsumerAds && consumerAdsData.ads_data.length && this.state.cityName
            ? <h3>Showing ads in {`${this.state.cityName}`}</h3>
            : ''
        }

        {
          !this.state.stateName
            ? <h3>Showing all ads</h3>
            : ''
        }

        <ViewConsumerAds
          fetchConsumerAds={this.fetchConsumerAdList}
          // activePage={this.state.activePage}
          // limit={this.pageLimit}
          consumerAdsData={consumerAdsData.ads_data}
          loadingConsumerAds={loadingConsumerAds}
          updateConsumerAdStatus={this.props.actions.updateConsumerAdStatus}
          updateConsumerAdStatusCB={this.fetchData}
        />

        {
          !loadingConsumerAds && consumerAdsData.ads_data.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={consumerAdsData.count}
              //pageRangeDisplayed={2}
              setPage={this.setPage}
            />
            : ''
        }

        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter ads"
                unmountFilterModal={this.unmountFilterModal}
                handleStateChange={this.handleStateChange}
                handleCityChange={this.handleCityChange}
                citiesData={citiesData}
                statesData={statesData}
                cityId={this.state.cityId}
                stateId={this.state.stateId}
                adId={this.state.adId}
                loadingCities={loadingCities}
                loadingStates={loadingStates}
                filter="stateAndCityWithoutIsAvailableCheck"
              ></FilterModal>
            )
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
)(ManageConsumerAds)
