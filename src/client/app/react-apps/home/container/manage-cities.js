import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import * as Actions from './../actions'
import CreateCity from './../components/manage-cities/create-city'
import EditCity from './../components/manage-cities/edit-city'
import ViewCities from './../components/manage-cities/view-cities'
import RoleBasedComponent from '@components/RoleBasedComponent'
import getIcon from './../components/icon-utils'
import FilterModal from '@components/filter-modal'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
// import '@sass/components/_button.scss'

import * as Roles from './../constants/roles'

class ManageCities extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldMountEditState: false,
      shouldMountCreateState: false,
      shouldMountFilterDialog: false,
      stateIdx: 0,
      snackBar: { open: false, message: '' }
    }
    this.mountEditStateDialog = this.mountEditStateDialog.bind(this)
    this.unmountEditStateDialog = this.unmountEditStateDialog.bind(this)
    this.mountCreateStateDialog = this.mountCreateStateDialog.bind(this)
    this.unmountCreateStateDialog = this.unmountCreateStateDialog.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount() {
    this.fetchData()
    window.onpopstate = this.fetchData
  }

  fetchData() {
    this.props.actions.setLoadingState('loadingCities')
    this.props.actions.setLoadingState('loadingStates')
    this.props.actions.setLoadingState('loadingGeoboundary')
    // this.props.actions.setGeoboundaryLoadingState()
    this.props.actions.fetchStates()
    if (location.search.length) {
      // if query string exists then apply filters
      this.setQueryParamas()
    } else {
      // if there is no query string then fetch defult citiesData/all citiesData
      // this.props.actions.fetchCities()
      this.setState({ stateIdx: 0 })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
    this.props.actions.fetchCities({
      state_short_name: queryObj.short_name
    })
  }

  setSnackBarOptions(options) {
    this.setState({ snackBar: options })
  }

  mountCreateStateDialog() {
    this.setState({ shouldMountCreateState: true })
  }

  unmountCreateStateDialog() {
    this.setState({ shouldMountCreateState: false })
  }

  mountEditStateDialog(stateToBeEdit) {
    this.setState({
      shouldMountEditState: true,
      stateToBeEdit
    })
  }

  unmountEditStateDialog() {
    this.setState({ shouldMountEditState: false })
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
      short_name: statesData[k].short_name
    }

    history.pushState(queryObj, "city listing", `/home/manage-cities?${getQueryUri(queryObj)}`)

    this.props.actions.fetchCities({
      state_short_name: statesData[k].short_name
    })
  }

  render() {
    const {
      loadingCities,
      citiesData,
      loadingStates,
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
          <RaisedButton
            label="Create new city"
            primary
            onClick={this.mountCreateStateDialog}
          />

          <RaisedButton
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          />
        </div>

        {/* <p style={{ color: '#9b9b9b', margin: '20px 0px 0 20px' }}>or</p> */}

        <br />

        {
          !loadingCities && statesData.length
          ? <h3>Showing cities in {`${statesData[this.state.stateIdx - 1].state_name}`}</h3>
          : ''
        }

        {
          !this.state.stateIdx
          ? <h3>Showing all cities</h3>
          : ''
        }

        <ViewCities
          citiesData={citiesData}
          loadingCities={loadingCities}
          mountEditStateDialog={this.mountEditStateDialog}
        />

        {
          this.state.shouldMountEditState
          ? (
            <EditCity
              shouldMountEditState={this.state.shouldMountEditState}
              unmountEditStateDialog={this.unmountEditStateDialog}
            />
          )
          : ''
        }

        {
          this.state.shouldMountCreateState
          ? (
            <CreateCity
              statesData={this.props.statesData}
              shouldMountCreateState={this.state.shouldMountCreateState}
              unmountCreateStateDialog={this.unmountCreateStateDialog}
            />
          )
          : ''
        }

        {
          this.state.shouldMountFilterDialog
          ? (
            <FilterModal
              title="Filter Cities"
              unmountFilterModal={this.unmountFilterModal}
            >
              <div style={{
                display: 'flex'
              }}
              >
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
            </FilterModal>
          )
          : ''
        }
        <Snackbar
          open={this.state.snackBar.open}
          message={this.state.snackBar.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
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
