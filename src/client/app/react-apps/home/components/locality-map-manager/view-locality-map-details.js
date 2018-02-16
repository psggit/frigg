import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import * as Actions from './../../actions'
import { getQueryObj } from '@utils/url-utils'
import MappedRetailersList from './mapped-retailers-list'
import ConfirmDeleteRetailer from './confirm-delete-retailer'
import ConfirmMakePrimeRetailer from './confirm-make-prime-retailer'
import AddRetailerDialog from './add-retailer-dialog'
import MapDeliveryAgentDialog from './map-delivery-agent-dialog'

class ViewLocalityMapDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountConfirmDeleteRetailer: false,
      shouldMountAddRetailerDialog: false,
      shouldMountConfirmMakePrimeRetailer: false,
      shouldMountMapDeliveryAgentDialog: false
    }

    this.primeRetailerId = null
    this.mountConfirmDeleteRetailer = this.mountConfirmDeleteRetailer.bind(this)
    this.unmountConfirmDeleteRetailer = this.unmountConfirmDeleteRetailer.bind(this)
    this.handleDeleteRetailer = this.handleDeleteRetailer.bind(this)
    this.mountAddRetailerDialog = this.mountAddRetailerDialog.bind(this)
    this.unmountAddRetailerDialog = this.unmountAddRetailerDialog.bind(this)
    this.mountConfirmMakePrimeRetailer = this.mountConfirmMakePrimeRetailer.bind(this)
    this.unmountConfirmMakePrimeRetailer = this.unmountConfirmMakePrimeRetailer.bind(this)
    this.handleMakePrimeRetailer = this.handleMakePrimeRetailer.bind(this)
    this.mountMapDeliveryAgentDialog = this.mountMapDeliveryAgentDialog.bind(this)
    this.unmountMapDeliveryAgentDialog = this.unmountMapDeliveryAgentDialog.bind(this)
  }
  componentDidMount() {
    const queryObj = getQueryObj(location.search.slice(1))
    this.locality_id = queryObj.id
    this.props.actions.fetchLocalityRetailersMap({
      locality_id: parseInt(queryObj.id)
    })
    this.props.actions.fetchDpByLocality({
      locality_id: parseInt(queryObj.id)
    })
  }

  handleDeleteRetailer(id) {
    const queryObj = getQueryObj(location.search.slice(1))
    this.props.actions.deleteRetailerFromLocalityMap({
      retailer_id: id,
      locality_id: parseInt(queryObj.id)
    })
  }

  handleMakePrimeRetailer(id) {
    const queryObj = getQueryObj(location.search.slice(1))
    if (!this.primeRetailerId) {
      this.props.actions.mapRetailerToLocalityAsPrime({
        retailer_id: id,
        locality_id: parseInt(queryObj.id)
      })
    } else {
      this.props.actions.unmapRetailerToLocalityAsPrime({
        retailer_id: this.primeRetailerId,
        locality_id: parseInt(queryObj.id)
      }, id)
    }
  }

  unmountConfirmDeleteRetailer() {
    this.setState({ shouldMountConfirmDeleteRetailer: false })
  }

  mountConfirmDeleteRetailer(retailer_id) {
    this.setState({ shouldMountConfirmDeleteRetailer: true, retailer_id })
  }

  unmountConfirmMakePrimeRetailer() {
    this.setState({ shouldMountConfirmMakePrimeRetailer: false })
  }

  mountConfirmMakePrimeRetailer(retailer_id) {
    this.setState({ shouldMountConfirmMakePrimeRetailer: true, retailer_id })
  }

  mountAddRetailerDialog() {
    this.setState({ shouldMountAddRetailerDialog: true })
  }

  mountMapDeliveryAgentDialog(locality_id) {
    this.setState({ shouldMountMapDeliveryAgentDialog: true, locality_id })
  }

  unmountMapDeliveryAgentDialog() {
    this.setState({ shouldMountMapDeliveryAgentDialog: false })
  }

  unmountAddRetailerDialog() {
    this.setState({ shouldMountAddRetailerDialog: false })
  }

  render() {
    const {
      mappedRetailersToLocality,
      loadingMappedRetailersToLocality,
      loadingMappedDpToLocality,
      mappedDpToLocality
    } = this.props

    mappedRetailersToLocality.forEach((retailer) => {
      if (retailer.is_prime) {
        this.primeRetailerId = retailer.id
      }
    })

    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        {
          !loadingMappedDpToLocality && mappedDpToLocality.length > 0
          ? (
            <p style={{ fontSize: '18px' }}>
              Delivery agent mapped to: <b>{ mappedDpToLocality[0].name }</b>
              <span
                style={{
                  color: '#4990e2',
                  fontSize: '16px',
                  marginLeft: '10px',
                  cursor: 'pointer'
                }}
                onClick={this.mountMapDeliveryAgentDialog}
              >
                Change
              </span>
            </p>
          )
          : (
            <p style={{ fontSize: '18px' }}>
                No delivery agent mapped
                <span
                  onClick={this.mountMapDeliveryAgentDialog}
                  style={{
                    color: '#4990e2',
                    fontSize: '16px',
                    marginLeft: '10px',
                    cursor: 'pointer'
                  }}
                >
                  Map new delivery agent
                </span>
            </p>
          )
        }
        <br/><br/>
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
        <MappedRetailersList
          mappedRetailers={mappedRetailersToLocality}
          loadingMappedRetailers={loadingMappedRetailersToLocality}
          mountConfirmDeleteRetailer={this.mountConfirmDeleteRetailer}
          mountConfirmMakePrimeRetailer={this.mountConfirmMakePrimeRetailer}
        />
        {
          this.state.shouldMountConfirmDeleteRetailer &&
          <ConfirmDeleteRetailer
            retailer_id={this.state.retailer_id}
            unmountConfirmDeleteRetailer={this.unmountConfirmDeleteRetailer}
            handleDeleteRetailer={this.handleDeleteRetailer}
          />
        }

        {
          this.state.shouldMountConfirmMakePrimeRetailer &&
          <ConfirmMakePrimeRetailer
            retailer_id={this.state.retailer_id}
            unmountConfirmMakePrimeRetailer={this.unmountConfirmMakePrimeRetailer}
            handleMakePrimeRetailer={this.handleMakePrimeRetailer}
          />
        }

        {
          this.state.shouldMountAddRetailerDialog &&
          <AddRetailerDialog
            unmountAddRetailerDialog={this.unmountAddRetailerDialog}
          />
        }

        {
          this.state.shouldMountMapDeliveryAgentDialog &&
          <MapDeliveryAgentDialog
            locality_id={this.locality_id}
            deleteDpFromLocalityMap={this.props.actions.deleteDpFromLocalityMap}
            addDpToLocalityMap={this.props.actions.addDpToLocalityMap}
            currentDelivererId={mappedDpToLocality.length ? mappedDpToLocality[0].id : null}
            unmountMapDeliveryAgentDialog={this.unmountMapDeliveryAgentDialog}
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

ViewLocalityMapDetails.propTypes = {
  mappedRetailersToLocality: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingMappedRetailersToLocality: PropTypes.bool.isRequired,
  mappedDpToLocality: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingMappedDpToLocality: PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLocalityMapDetails)
