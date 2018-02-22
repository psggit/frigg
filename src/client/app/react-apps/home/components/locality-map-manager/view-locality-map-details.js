import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import * as Actions from './../../actions'
import { getQueryObj } from '@utils/url-utils'
import MappedRetailersList from './mapped-retailers-list'
import MappedDeliveryAgentList from './mapped-delivery-agent-list'
import ConfirmDeleteRetailer from './confirm-delete-retailer'
import ConfirmDeleteDp from './confirm-delete-dp'
import ConfirmMakePrimeRetailer from './confirm-make-prime-retailer'
import AddRetailerDialog from './add-retailer-dialog'
import AddDeliveryAgentDialog from './add-delivery-agent-dialog'
import { Card } from 'material-ui/Card';

class ViewLocalityMapDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountConfirmDeleteRetailer: false,
      shouldMountAddRetailerDialog: false,
      shouldMountConfirmMakePrimeRetailer: false,
      shouldMountAddDeliveryAgentDialog: false,
      shouldMountConfirmDeleteDp: false
    }

    this.primeRetailerId = null
    this.mountConfirmDeleteRetailer = this.mountConfirmDeleteRetailer.bind(this)
    this.unmountConfirmDeleteRetailer = this.unmountConfirmDeleteRetailer.bind(this)
    this.mountConfirmDeleteDp = this.mountConfirmDeleteDp.bind(this)
    this.unmountConfirmDeleteDp = this.unmountConfirmDeleteDp.bind(this)
    this.handleDeleteRetailer = this.handleDeleteRetailer.bind(this)
    this.handleDeleteDp = this.handleDeleteDp.bind(this)
    this.mountAddRetailerDialog = this.mountAddRetailerDialog.bind(this)
    this.unmountAddRetailerDialog = this.unmountAddRetailerDialog.bind(this)
    this.mountConfirmMakePrimeRetailer = this.mountConfirmMakePrimeRetailer.bind(this)
    this.unmountConfirmMakePrimeRetailer = this.unmountConfirmMakePrimeRetailer.bind(this)
    this.handleMakePrimeRetailer = this.handleMakePrimeRetailer.bind(this)
    this.mountAddDeliveryAgentDialog = this.mountAddDeliveryAgentDialog.bind(this)
    this.unmountAddDeliveryAgentDialog = this.unmountAddDeliveryAgentDialog.bind(this)
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
    this.props.actions.fetchCityDetails({
      id: parseInt(queryObj.city_id)
    })
  }

  handleDeleteRetailer(id) {
    const queryObj = getQueryObj(location.search.slice(1))
    this.props.actions.deleteRetailerFromLocalityMap({
      retailer_id: id,
      locality_id: parseInt(queryObj.id)
    })
  }

  handleDeleteDp(id) {
    const queryObj = getQueryObj(location.search.slice(1))
    this.props.actions.deleteDpFromLocalityMap({
      dp_id: id,
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

  unmountConfirmDeleteDp() {
    this.setState({ shouldMountConfirmDeleteDp: false })
  }

  mountConfirmDeleteDp(dp_id) {
    this.setState({ shouldMountConfirmDeleteDp: true, dp_id })
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

  mountAddDeliveryAgentDialog(locality_id) {
    this.setState({ shouldMountAddDeliveryAgentDialog: true, locality_id })
  }

  unmountAddDeliveryAgentDialog() {
    this.setState({ shouldMountAddDeliveryAgentDialog: false })
  }

  unmountAddRetailerDialog() {
    this.setState({ shouldMountAddRetailerDialog: false })
  }

  render() {
    const {
      mappedRetailersToLocality,
      loadingMappedRetailersToLocality,
      loadingMappedDpToLocality,
      loadingCityDetails,
      cityDetails,
      mappedDpToLocality
    } = this.props

    mappedRetailersToLocality.forEach((retailer) => {
      if (retailer.is_prime) {
        this.primeRetailerId = retailer.id
      }
    })

    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        {/* {
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
        } */}
        <Card
          style={{
            padding: '20px',
            width: '30%',
            marginTop: '0',
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top',
            marginBottom: '40px'
          }}
        >
          {
            !loadingCityDetails &&
            <div>
              <p><b>Locality name</b>: { this.props.match.params.localitySlug }</p>
              <p><b>City</b>: { this.props.cityDetails.name }</p>
              <p><b>is_available</b>: <input disabled type='checkbox' defaultChecked={this.props.cityDetails.is_available} /></p>
              <p><b>is_deliverable</b>: <input disabled type='checkbox' defaultChecked={this.props.cityDetails.deliverable_city} /></p>
            </div>
          }
        </Card>
        <div>
          <h3 style={{ margin: 0 }}>Showing mapped delivery agents</h3>
          <RaisedButton
            primary
            label="Add delivery agent"
            onClick={this.mountAddDeliveryAgentDialog}
            style={{ margin: '20px 0' }}
          />
          <MappedDeliveryAgentList
            mappedDpToLocality={mappedDpToLocality}
            loadingMappedDpToLocality={loadingMappedDpToLocality}
            mountConfirmDeleteDp={this.mountConfirmDeleteDp}
          />
        </div>
        <br/><br/>
        <div>
          <h3 style={{ margin: 0 }}>Showing mapped retailers</h3>
          <RaisedButton
            primary
            label="Add retailer"
            onClick={this.mountAddRetailerDialog}
            style={{ margin: '20px 0' }}
          />
          <MappedRetailersList
            mappedRetailers={mappedRetailersToLocality}
            loadingMappedRetailers={loadingMappedRetailersToLocality}
            mountConfirmDeleteRetailer={this.mountConfirmDeleteRetailer}
            mountConfirmMakePrimeRetailer={this.mountConfirmMakePrimeRetailer}
          />
        </div>
        {
          this.state.shouldMountConfirmDeleteRetailer &&
          <ConfirmDeleteRetailer
            retailer_id={this.state.retailer_id}
            unmountConfirmDeleteRetailer={this.unmountConfirmDeleteRetailer}
            handleDeleteRetailer={this.handleDeleteRetailer}
          />
        }

        {
          this.state.shouldMountConfirmDeleteDp &&
          <ConfirmDeleteDp
            dp_id={this.state.dp_id}
            unmountConfirmDeleteDp={this.unmountConfirmDeleteDp}
            handleDeleteDp={this.handleDeleteDp}
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
          this.state.shouldMountAddDeliveryAgentDialog &&
          <AddDeliveryAgentDialog
            locality_id={this.locality_id}
            deleteDpFromLocalityMap={this.props.actions.deleteDpFromLocalityMap}
            addDpToLocalityMap={this.props.actions.addDpToLocalityMap}
            currentDelivererId={mappedDpToLocality.length ? mappedDpToLocality[0].id : null}
            unmountAddDeliveryAgentDialog={this.unmountAddDeliveryAgentDialog}
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

// ViewLocalityMapDetails.propTypes = {
//   mappedRetailersToLocality: PropTypes.arrayOf(PropTypes.object).isRequired,
//   loadingMappedRetailersToLocality: PropTypes.bool.isRequired,
//   mappedDpToLocality: PropTypes.arrayOf(PropTypes.object).isRequired,
//   loadingMappedDpToLocality: PropTypes.bool.isRequired
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLocalityMapDetails)
