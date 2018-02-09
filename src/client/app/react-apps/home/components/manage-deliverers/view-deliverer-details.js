import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import * as Actions from './../../actions'
import ViewMappedLocalities from './view-mapped-localities'
import ViewMappedRetailers from './view-mapped-retailers'
import AddLocalityDialog from './add-locality-dialog'
import AddRetailerDialog from './add-retailer-dialog'

class DelivererDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountAddLocalityDialog: false,
      shouldMountAddRetailerDialog: false
    }

    this.mountAddLocalityDialog = this.mountAddLocalityDialog.bind(this)
    this.mountAddRetailerDialog = this.mountAddRetailerDialog.bind(this)
    this.unmountAddLocalityDialog = this.unmountAddLocalityDialog.bind(this)
    this.unmountAddRetailerDialog = this.unmountAddRetailerDialog.bind(this)
  }
  unmountAddLocalityDialog() {
    this.setState({ shouldMountAddLocalityDialog: false })
  }

  unmountAddRetailerDialog() {
    this.setState({ shouldMountAddRetailerDialog: false })
  }

  mountAddRetailerDialog() {
    this.setState({ shouldMountAddRetailerDialog: true })
  }

  mountAddLocalityDialog() {
    this.setState({ shouldMountAddLocalityDialog: true })
  }
  render() {
    const {
      loadingMappedLocalities,
      loadingMappedRetailers,
      mappedRetailers,
      mappedLocalities
    } = this.props

    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <h3>`Showing mapped localities`</h3>
          <RaisedButton
            primary
            label="Add locality"
            onClick={this.mountAddLocalityDialog}
            style={{ marginBottom: '40px', marginRight: '20px' }}
          />
        </div>
        <ViewMappedLocalities
          mappedLocalities={mappedLocalities}
          loadingMappedLocalities={loadingMappedLocalities}
        />

        <br /><br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <h3>`Showing mapped retailers`</h3>
          <RaisedButton
            primary
            label="Add retailer"
            onClick={this.mountAddRetailerDialog}
            style={{ marginBottom: '40px', marginRight: '20px' }}
          />
        </div>
        <ViewMappedRetailers
          mappedRetailers={mappedRetailers}
          loadingMappedRetailers={loadingMappedRetailers}
        />

        {
          this.state.shouldMountAddLocalityDialog &&
          <AddLocalityDialog
            unmountAddLocalityDialog={this.unmountAddLocalityDialog}
          />
        }

        {
          this.state.shouldMountAddRetailerDialog &&
          <AddRetailerDialog
            unmountAddRetailerDialog={this.unmountAddRetailerDialog}
          />
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
)(DelivererDetails)
