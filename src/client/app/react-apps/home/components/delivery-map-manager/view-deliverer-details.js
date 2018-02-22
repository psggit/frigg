import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import * as Actions from './../../actions'
import ViewMappedLocalities from './view-mapped-localities'
import ViewMappedRetailers from './view-mapped-retailers'
import AddLocalityDialog from './add-locality-dialog'
import AddRetailerDialog from './add-retailer-dialog'
import ConfirmDeleteRetailerFromDpMap from './confirm-delete-retailer-from-dp-map'
import { getQueryObj } from '@utils/url-utils'

class DelivererDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountAddLocalityDialog: false,
      shouldMountAddRetailerDialog: false,
      shouldMountConfirmDeleteRetailerFromDpMap: false
    }

    this.mountAddLocalityDialog = this.mountAddLocalityDialog.bind(this)
    this.mountAddRetailerDialog = this.mountAddRetailerDialog.bind(this)
    this.unmountAddLocalityDialog = this.unmountAddLocalityDialog.bind(this)
    this.unmountAddRetailerDialog = this.unmountAddRetailerDialog.bind(this)
    this.handleDeleteRetailerFromDpMap = this.handleDeleteRetailerFromDpMap.bind(this)
    this.mountConfirmDeleteRetailerFromDpMap = this.mountConfirmDeleteRetailerFromDpMap.bind(this)
    this.unmountConfirmDeleteRetailerFromDpMap = this.unmountConfirmDeleteRetailerFromDpMap.bind(this)
  }
  componentDidMount() {
    const queryObj = getQueryObj(location.search.slice(1))
    this.setState({ dp_id: queryObj.id })
    this.props.actions.fetchDPRetailerMap({
      dp_id: parseInt(queryObj.id)
    })
    this.props.actions.fetchDPLocalityMap({
      dp_id: parseInt(queryObj.id)
    })
  }
  handleDeleteRetailerFromDpMap(id) {
    this.props.actions.deleteRetailerFromDpMap({
      retailer_id: id,
      dp_id: parseInt(this.state.dp_id)
    })
  }
  mountConfirmDeleteRetailerFromDpMap(retailer_id) {
    this.setState({ shouldMountConfirmDeleteRetailerFromDpMap: true, retailer_id })
  }
  unmountConfirmDeleteRetailerFromDpMap() {
    this.setState({ shouldMountConfirmDeleteRetailerFromDpMap: false })
  }
  handleChangeLocality() {
    this.mountAddLocalityDialog()
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
        {
          !loadingMappedLocalities &&
          <p style={{ fontSize: '18px' }}>
            Locality mapped to: <b>{ mappedLocalities[0].name }</b>
            <span
              style={{
                color: '#4990e2',
                fontSize: '16px',
                marginLeft: '10px',
                cursor: 'pointer'
              }}
              onClick={this.mountAddLocalityDialog}
            >
              Change
            </span>
          </p>
        }
        <br /><br />
        <div>
          <h3 style={{ margin: 0 }}>Showing mapped retailers</h3>
          <RaisedButton
            primary
            label="Add retailer"
            onClick={this.mountAddRetailerDialog}
            style={{ margin: '20px 0' }}
          />
        </div>
        <ViewMappedRetailers
          mappedRetailers={mappedRetailers}
          mountConfirmDeleteRetailerFromDpMap={this.mountConfirmDeleteRetailerFromDpMap}
          loadingMappedRetailers={loadingMappedRetailers}
        />

        {
          this.state.shouldMountAddLocalityDialog &&
          <AddLocalityDialog
            dp_id={this.state.dp_id}
            deleteLocalityFromDpMap={this.props.actions.deleteLocalityFromDpMap}
            unmountAddLocalityDialog={this.unmountAddLocalityDialog}
            currentLocalityId={mappedLocalities[0].id}
          />
        }

        {
          this.state.shouldMountAddRetailerDialog &&
          <AddRetailerDialog
            dp_id={this.state.dp_id}
            unmountAddRetailerDialog={this.unmountAddRetailerDialog}
          />
        }

        {
          this.state.shouldMountConfirmDeleteRetailerFromDpMap &&
          <ConfirmDeleteRetailerFromDpMap
            retailer_id={this.state.retailer_id}
            handleDeleteRetailerFromDpMap={this.handleDeleteRetailerFromDpMap}
            unmountConfirmDeleteRetailerFromDpMap={this.unmountConfirmDeleteRetailerFromDpMap}
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
