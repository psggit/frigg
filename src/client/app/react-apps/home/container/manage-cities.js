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
import ViewDeliverers from './../components/manage-cities/view-cities'
import RoleBasedComponent from '@components/RoleBasedComponent'
import getIcon from './../components/icon-utils'
import FilterModal from '@components/filter-modal'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'

import * as Roles from './../constants/roles'

class ManageCities extends React.Component {
  constructor(props) {
    super(props)
    this.filter = {
      stateShortName: null,
      isCityAvailable: false,
      stateName: null
    }
    this.state = {
      shouldMountFilterDialog: false,
      stateIdx: null,
      activePage: 1,
      isCityAvailable: false
    }

    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.setPage = this.setPage.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.handleChangeIsCityAvailable = this.handleChangeIsCityAvailable.bind(this)
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
      this.props.actions.fetchCities({
        state_short_name: null,
        is_available: false,
        offset: 0,
        limit: 10,
        deliverable_city: true,
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

    this.props.actions.fetchCities({
      state_short_name: queryObj.stateShortName || null,
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: 10,
      is_available: queryObj.isCityAvailable ? JSON.parse(queryObj.isCityAvailable) : false,
      deliverable_city: true,
      no_filter: queryObj.filter ? false : true
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    const { statesData } = this.props

    this.setState(pageObj)
    this.props.actions.fetchCities({
      state_short_name: this.filter.stateShortName,
      offset: pageObj.offset,
      limit: 10,
      is_available: this.filter.isCityAvailable,
      deliverable_city: true,
      no_filter: queryObj.filter ? false : true
    })


    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "city listing", `/home/manage-cities?${getQueryUri(queryObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  handleStateChange(e, k) {
    const { statesData } = this.props
    const stateIdx = k + 1
    this.setState({ stateIdx })

    const queryObj = {
      stateIdx,
      short_name: statesData[k].short_name,
      offset: 0,
      activePage: 1
    }

    this.filter.stateShortName = statesData[k].short_name
    this.filter.stateName = statesData[k].state_name
  }

  handleChangeIsCityAvailable(e) {
    this.setState({ isCityAvailable: e.target.checked })
    // this.filter.isCityAvailable = e.target.checked
  }

  applyFilter() {
    const { statesData } = this.props
    console.log(this.filter);
    const queryObj = {
      stateIdx: this.state.stateIdx,
      stateShortName: this.filter.stateShortName,
      stateName: this.filter.stateName,
      isCityAvailable: this.state.isCityAvailable,
      offset: 0,
      activePage: 1,
      filter: true
    }

    this.setState({
      stateShortName: this.filter.stateShortName,
      stateName: this.filter.stateName
    })

    history.pushState(queryObj, "city listing", `/home/manage-cities?${getQueryUri(queryObj)}`)

    this.props.actions.fetchCities({
      state_short_name: queryObj.stateShortName,
      is_available: queryObj.isCityAvailable,
      offset: 0,
      limit: 10,
      deliverable_city: true,
      no_filter: false
    })
  }

  render() {
    const {
      loadingCities,
      citiesData,
      loadingStates,
      citiesCount,
      statesData
    } = this.props

    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <a href={`${location.pathname}/create-new-city`}>
            <RaisedButton
              label="Create new city"
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
          !loadingCities && statesData.length && this.state.stateName
          ? <h3>Showing cities in {`${this.state.stateName}`}</h3>
          : ''
        }

        {
          !this.state.stateName
          ? <h3>Showing all cities</h3>
          : ''
        }

        <ViewDeliverers
          citiesData={citiesData}
          loadingCities={loadingCities}
          mountEditStateDialog={this.mountEditStateDialog}
        />

        {
          !loadingCities && citiesData.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={10}
            totalItemsCount={citiesCount}
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
              title="Filter Cities"
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
                  <Checkbox
                    style={{ marginTop: '10px' }}
                    // disabled={this.props.isDisabled}
                    checked={this.state.isCityAvailable}
                    onCheck={this.handleChangeIsCityAvailable}
                    name="isCityActive"
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
)(ManageCities)
