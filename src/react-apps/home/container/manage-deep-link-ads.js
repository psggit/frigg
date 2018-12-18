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
import ViewDeepLinkAds from '../components/manage-deep-link-ads/view-ads'
import RoleBasedComponent from '@components/RoleBasedComponent'
import getIcon from '../components/icon-utils'
import FilterModal from '@components/filter-modal'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'
import { NavLink } from 'react-router-dom'

import * as Roles from '../constants/roles'

class ManageDeepLinkAds extends React.Component {
  constructor(props) {
    super(props)
    this.filter = {
      stateShortName: null,
      isLocalityAvailable: false,
      stateName: null,
      cityId: null
    }
    this.state = {
      shouldMountFilterDialog: false,
      shouldMountViewFencesDialog: false,
      stateIdx: null,
      cityIdx: null,
      activePage: 1,
      isLocalityAvailable: false
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
  }

  componentDidMount() {
    console.log('mounting manage localities');
    this.fetchData()
    window.onpopstate = this.fetchData
  }

  componentWillUnmount() {
    console.log('unmounting manage localities');
    window.onpopstate = () => {}
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
      this.props.actions.fetchDeepLinkAds({
        city_id: null,
        offset: 0,
        limit: 10
      })
      this.setState({ stateIdx: 0 })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      this.filter[item[0]] = item[1]
    })

    this.props.actions.fetchDeepLinkAds({
      city_id: parseInt(queryObj.cityId) || null,
      offset: parseInt(queryObj.offset),
      limit: 10
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    const { statesData } = this.props

    this.setState(pageObj)
    this.props.actions.fetchDeepLinkAds({
      city_id: parseInt(queryObj.cityId) || null,
      offset: pageObj.offset,
      limit: 10
    })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "city listing", `/home/manage-deep-link-ads?${getQueryUri(queryObj)}`)
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

    this.props.actions.fetchCities({
      state_short_name: statesData[k].short_name,
      is_available: false,
      offset: 0,
      limit: 999999,
      deliverable_city: true,
      no_filter: false
    })
  }

  // handleChangeIsLocalityAvailable(e) {
  //   this.setState({ isLocalityAvailable: e.target.checked })
  //   // this.filter.isCityAvailable = e.target.checked
  // }

  applyFilter(stateIdx) {
    const { statesData } = this.props
    console.log(this.filter);
    const queryObj = {
      stateIdx: stateIdx,
      stateShortName: this.filter.stateShortName,
      cityId: this.filter.cityId,
      stateName: this.filter.stateName,
      offset: 0,
      cityName: this.filter.cityName,
      activePage: 1,
      filter: true
    }

    this.setState({
      offset: 0,
      activePage: 1,
      stateShortName: this.filter.stateShortName,
      stateName: this.filter.stateName,
      cityName: this.filter.cityName,
      cityId: this.filter.cityId
    })

    history.pushState(queryObj, "image-ads listing", `/home/manage-deep-link-ads?${getQueryUri(queryObj)}`)

    this.props.actions.fetchDeepLinkAds({
      city_id: queryObj.cityId,
      offset: 0,
      limit: 10
    })
  }

  render() {
    const {
      loadingCities,
      citiesData,
      loadingStates,
      citiesCount,
      deepLinkAdsData,
      loadingDeepLinkingAds,
      statesData
    } = this.props

    return (
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`${location.pathname}/create-new-deep-link-ad`}>
              <RaisedButton
                label="Create new ad"
                primary
                onClick={this.mountCreateStateDialog}
              />
            </NavLink>

          </div>

          <RaisedButton
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          />
        </div>

        <br />

        {
          !loadingDeepLinkingAds && deepLinkAdsData.ads_data.length && this.state.cityName
          ? <h3>Showing ads in {`${this.state.cityName}`}</h3>
          : ''
        }

        {
          !this.state.stateName
          ? <h3>Showing all ads</h3>
          : ''
        }

        <ViewDeepLinkAds
          deepLinkAdsData={deepLinkAdsData.ads_data}
          loadingDeepLinkingAds={loadingDeepLinkingAds}
          updateDeepLinkAdStatus={this.props.actions.updateDeepLinkAdStatus}
          updateDeepLinkAdStatusCB={this.fetchData}
        />

        {
          !loadingDeepLinkingAds && deepLinkAdsData.ads_data.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={10}
            totalItemsCount={deepLinkAdsData.count}
            pageRangeDisplayed={5}
            setPage={this.setPage}
          />
          : ''
        }

        {
          this.state.shouldMountFilterDialog
          ? (
         
            //<FilterModal
            //   applyFilter={this.applyFilter}
            //   title="Filter ads"
            //   unmountFilterModal={this.unmountFilterModal}
            // >
            //   <div>
            //     <div className="form-group">
            //       <label>State</label><br />
            //       <SelectField
            //         style={{ width: '100%' }}
            //         floatingLabelText="Choose state"
            //         value={parseInt(this.state.stateIdx)}
            //         onChange={this.handleStateChange}
            //         iconStyle={{ fill: '#9b9b9b' }}
            //       >
            //         {
            //           !loadingStates
            //           ? (
            //             statesData.map((state, i) => (
            //               <MenuItem
            //                 value={i + 1}
            //                 key={state.id}
            //                 primaryText={state.state_name}
            //               />
            //             ))
            //           )
            //           : ''
            //         }
            //       </SelectField>
            //     </div>
            //     <div className="form-group">
            //       <label>City</label><br />
            //       <SelectField
            //         style={{ width: '100%' }}
            //         floatingLabelText="Choose state"
            //         disabled={loadingCities || !citiesData.length}
            //         value={parseInt(this.state.cityIdx)}
            //         onChange={this.handleCityChange}
            //       >
            //         {
            //           !loadingCities && citiesData.length
            //           ? (
            //             citiesData.map((city, i) => (
            //               <MenuItem
            //                 value={i + 1}
            //                 key={city.id}
            //                 primaryText={city.name}
            //               />
            //             ))
            //           )
            //           : ''
            //         }
            //       </SelectField>
            //     </div>
            //     {/* <div className="form-group">
            //       <Checkbox
            //         style={{ marginTop: '10px' }}
            //         // disabled={this.props.isDisabled}
            //         checked={this.state.isLocalityAvailable}
            //         onCheck={this.handleChangeIsLocalityAvailable}
            //         name="isLocalityAvailable"
            //         label="is_available"
            //       />
            //     </div> */}
            //   </div>
            <FilterModal
              applyFilter={this.applyFilter}
              title="Filter ads"
              unmountFilterModal={this.unmountFilterModal}
              handleStateChange={this.handleStateChange}
              handleCityChange={this.handleCityChange}
              floatingLabelText="Choose state"
              citiesData={citiesData}
              statesData={statesData}
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
)(ManageDeepLinkAds)
