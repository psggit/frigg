import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import * as Actions from './../actions'
import ViewLocalities from './../components/manage-localities/view-localities'
import RoleBasedComponent from '@components/RoleBasedComponent'
import getIcon from './../components/icon-utils'
import FilterModal from '@components/filter-modal'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'

import * as Roles from './../constants/roles'

class ManageLocalities extends React.Component {
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
    this.handleChangeIsLocalityAvailable = this.handleChangeIsLocalityAvailable.bind(this)
  }

  componentDidMount() {
    this.fetchData()
    window.onpopstate = this.fetchData
  }

  fetchData() {
    this.props.actions.setLoadingState('loadingCities')
    this.props.actions.setLoadingState('loadingStates')
    // this.props.actions.setLoadingState('loadingGeoboundary')

    this.props.actions.fetchStates()

    if (location.search.length) {
      // if query string exists then apply filters
      this.setQueryParamas()
    } else {
      // if there is no query string then fetch defult citiesData/all citiesData
      this.props.actions.fetchLocalities({
        city_id: null,
        is_available: false,
        offset: 0,
        limit: 10,
        no_filter: true
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

    this.props.actions.fetchLocalities({
      city_id: parseInt(queryObj.cityId) || null,
      is_available: queryObj.isLocalityAvailable || false,
      offset: parseInt(queryObj.offset),
      limit: 10,
      no_filter: queryObj.filter ? false : true
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    const { statesData } = this.props

    this.setState(pageObj)
    this.props.actions.fetchLocalities({
      city_id: parseInt(queryObj.cityId) || null,
      is_available: queryObj.isLocalityAvailable || false,
      offset: pageObj.offset,
      limit: 10,
      no_filter: queryObj.filter ? false : true
    })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "city listing", `/home/manage-localities?${getQueryUri(queryObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  handleCityChange(e, k) {
    const { citiesData } = this.props
    const cityIdx = k + 1
    this.setState({ cityIdx })
    this.filter.cityId = citiesData[k].id
    this.filter.cityName = citiesData[k].name
  }

  handleStateChange(e, k) {
    const { statesData } = this.props
    const stateIdx = k + 1
    this.setState({ stateIdx, cityIdx: null })


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

  handleChangeIsLocalityAvailable(e) {
    this.setState({ isLocalityAvailable: e.target.checked })
    // this.filter.isCityAvailable = e.target.checked
  }

  applyFilter() {
    const { statesData } = this.props
    console.log(this.filter);
    const queryObj = {
      stateIdx: this.state.stateIdx,
      stateShortName: this.filter.stateShortName,
      cityId: this.filter.cityId,
      stateName: this.filter.stateName,
      isLocalityAvailable: this.state.isLocalityAvailable,
      offset: 0,
      activePage: 1,
      filter: true
    }

    this.setState({
      offset: 0,
      activePage: 1,
      stateShortName: this.filter.stateShortName,
      stateName: this.filter.stateName,
      cityName: this.filter.cityName
    })

    history.pushState(queryObj, "city listing", `/home/manage-localities?${getQueryUri(queryObj)}`)

    this.props.actions.fetchLocalities({
      city_id: queryObj.cityId,
      is_available: queryObj.isLocalityAvailable,
      offset: 0,
      limit: 10,
      no_filter: false
    })
  }

  render() {
    const {
      loadingCities,
      citiesData,
      loadingStates,
      citiesCount,
      geoLocalitiesData,
      loadingGeolocalities,
      statesData
    } = this.props

    return (
      <div style={{ width: '100%', maxWidth: 900, margin: 'auto' }}>
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <a href={`${location.pathname}/create-new-locality`}>
            <RaisedButton
              label="Create new locality"
              primary
              onClick={this.mountCreateStateDialog}
            />
          </a>

          <RaisedButton
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          />
        </div>

        <br />

        {
          !loadingCities && statesData.length && this.state.cityName
          ? <h3>Showing localities in {`${this.state.cityName}`}</h3>
          : ''
        }

        {
          !this.state.stateName
          ? <h3>Showing all localities</h3>
          : ''
        }

        <ViewLocalities
          geoLocalitiesData={geoLocalitiesData}
          loadingGeolocalities={loadingGeolocalities}
          mountEditStateDialog={this.mountEditStateDialog}
          stateIdx={this.state.stateIdx}
        />

        {
          !loadingGeolocalities && geoLocalitiesData.fences.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={10}
            totalItemsCount={geoLocalitiesData.count}
            pageRangeDisplayed={5}
            setPage={this.setPage}
          />
          : ''
        }

        {
          this.state.shouldMountFilterDialog
          ? (
            <FilterModal
              applyFilter={this.applyFilter}
              title="Filter localities"
              unmountFilterModal={this.unmountFilterModal}
            >
              <div>
                <div className="form-group">
                  <label>State</label><br />
                  <SelectField
                    floatingLabelText="Choose state"
                    value={parseInt(this.state.stateIdx)}
                    onChange={this.handleStateChange}
                  >
                    {
                      !loadingStates
                      ? (
                        statesData.map((state, i) => (
                          <MenuItem
                            value={i + 1}
                            key={state.id}
                            primaryText={state.state_name}
                          />
                        ))
                      )
                      : ''
                    }
                  </SelectField>
                </div>
                <div className="form-group">
                  <label>City</label><br />
                  <SelectField
                    floatingLabelText="Choose state"
                    disabled={loadingCities || !citiesData.length}
                    value={parseInt(this.state.cityIdx)}
                    onChange={this.handleCityChange}
                  >
                    {
                      !loadingCities && citiesData.length
                      ? (
                        citiesData.map((city, i) => (
                          <MenuItem
                            value={i + 1}
                            key={city.id}
                            primaryText={city.name}
                          />
                        ))
                      )
                      : ''
                    }
                  </SelectField>
                </div>
                <div className="form-group">
                  <Checkbox
                    style={{ marginTop: '10px' }}
                    // disabled={this.props.isDisabled}
                    checked={this.state.isLocalityAvailable}
                    onCheck={this.handleChangeIsLocalityAvailable}
                    name="isLocalityAvailable"
                    label="is_available"
                  />
                </div>
              </div>
            </FilterModal>
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
)(ManageLocalities)
