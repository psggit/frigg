import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import * as Actions from './../../actions'
import ViewMappedLocalities from './view-mapped-localities'
import ViewMappedRetailers from './view-mapped-retailers'
import AddLocalityDialog from './add-locality-dialog'
import AddRetailerDialog from './add-retailer-dialog'
import { getQueryObj } from '@utils/url-utils'

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
  componentDidMount() {
    const queryObj = getQueryObj(location.search.slice(1))
    this.props.actions.fetchDPRetailerMap({
      dp_id: parseInt(queryObj.id)
    })
    this.props.actions.fetchDPLocalityMap({
      dp_id: parseInt(queryObj.id)
    })
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
      mappedLocalities,
      retailers
    } = this.props

    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        <p style={{ fontSize: '18px' }}>
          Locality mapped to: Adyar
        </p>
        <br /><br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <h3 style={{ margin: 0 }}>Showing mapped retailers</h3>
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
            retailers={retailers}
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
