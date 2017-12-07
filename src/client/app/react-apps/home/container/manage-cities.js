import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import * as Actions from './../actions'
import CreateCity from './../components/manage-cities/create-city'
import EditCity from './../components/manage-cities/edit-city'
import ViewCities from './../components/manage-cities/view-cities'
import RoleBasedComponent from '@components/RoleBasedComponent'

import * as Roles from './../constants/roles'

class ManageCities extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldMountEditState: false,
      shouldMountCreateState: false,
      stateIdx: 0,
      snackBar: { open: false, message: '' }
    }
    this.mountEditStateDialog = this.mountEditStateDialog.bind(this)
    this.unmountEditStateDialog = this.unmountEditStateDialog.bind(this)
    this.mountCreateStateDialog = this.mountCreateStateDialog.bind(this)
    this.unmountCreateStateDialog = this.unmountCreateStateDialog.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
  }

  componentDidMount() {
    this.props.actions.setGeoboundaryLoadingState()
    this.props.actions.fetchStates()
    // const queryString = this.props.location.search.slice(1)
    // const queryParams = queryString.split('&')
    // console.log(queryParams);
    // this.setState({ stateIdx: parseInt(queryParams[0].split('=')[1]) })
    // this.props.actions.fetchCities({
    //   state_short_name: queryParams[1].split('=')[1]
    // })
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

  handleStateChange(e, k) {
    const { statesData } = this.props
    const stateIdx = k + 1
    this.setState({ stateIdx })
    // history.pushState(null, null, `/home/manage-cities?stateIdx=${stateIdx}&short_name=${statesData[k].short_name}`)
    this.props.actions.fetchCities({
      state_short_name: statesData[k].short_name
    })
  }

  unmountEditStateDialog() {
    this.setState({ shouldMountEditState: false })
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
        <RaisedButton
          style={{ marginTop: '40px' }}
          label="Create new city"
          primary
          onClick={this.mountCreateStateDialog}
        />

        <p style={{ color: '#9b9b9b', margin: '20px 0px 0 20px' }}>or</p>

        <br />

        <SelectField
          floatingLabelText="Choose state"
          value={this.state.stateIdx}
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
