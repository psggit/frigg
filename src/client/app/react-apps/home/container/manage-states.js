import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RoleBasedComponent from '@components/RoleBasedComponent'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import '@sass/components/_circular-progress.scss'

import * as Actions from './../actions'
import CreateState from './../components/manage-states/create-state'
import EditState from './../components/manage-states/edit-state'
import ViewStates from './../components/manage-states/view-states'

import * as Roles from './../constants/roles'

class ManageStates extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountEditState: false,
      shouldMountCreateState: false,
      snackBar: { open: false, message: '' }
    }
    this.mountEditStateDialog = this.mountEditStateDialog.bind(this)
    this.unmountEditStateDialog = this.unmountEditStateDialog.bind(this)
    this.mountCreateStateDialog = this.mountCreateStateDialog.bind(this)
    this.unmountCreateStateDialog = this.unmountCreateStateDialog.bind(this)
    this.setSnackBarOptions = this.setSnackBarOptions.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchStates()
    this.props.actions.setLoadingState('loadingCities')
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

  render() {
    const { loadingStates, statesData } = this.props

    return (
      <div style={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
        <RaisedButton
          style={{ marginBottom: '20px' }}
          label="Create new state"
          primary
          onClick={this.mountCreateStateDialog}
        />

        <ViewStates
          loadingStates={loadingStates}
          statesData={statesData}
          mountEditStateDialog={this.mountEditStateDialog}
        />

        {
          this.state.shouldMountEditState
          ? (
            <EditState
              updateState={this.props.actions.updateState}
              stateToBeEdit={this.state.stateToBeEdit}
              shouldMountEditState={this.state.shouldMountEditState}
              unmountEditStateDialog={this.unmountEditStateDialog}
            />
          )
          : ''
        }

        {
          this.state.shouldMountCreateState
          ? (
            <CreateState
              setSnackBarOptions={this.setSnackBarOptions}
              createState={this.props.actions.createState}
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
)(ManageStates)
