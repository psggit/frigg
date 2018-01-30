import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RoleBasedComponent from '@components/RoleBasedComponent'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import '@sass/components/_circular-progress.scss'

import * as Actions from './../actions'
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
      <div style={{ width: '100%', maxWidth: 800 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <a href={`${location.pathname}/create-new-state`}>
            <RaisedButton
              label="Create new state"
              primary
              onClick={this.mountCreateStateDialog}
            />
          </a>

          {/* <RaisedButton
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          /> */}
        </div>

        <br />

        <h3>Showing available states</h3>

        <ViewStates
          loadingStates={loadingStates}
          statesData={statesData}
          mountEditStateDialog={this.mountEditStateDialog}
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
