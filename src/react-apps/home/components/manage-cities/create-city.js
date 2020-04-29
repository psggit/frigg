import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import CityDetailsForm from './city-details-form'
import IfElse from '@components/declarative-if-else'
import { Card } from 'material-ui/Card'
import DefineGeoboundary from './../manage-geofencing/define-geoboundary'
import { getQueryObj } from '@utils/url-utils'
import { parseExpressionAt } from 'acorn'

class CreateCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityName: '',
      isDisabled: false
    }
    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
    this.setCityName = this.setCityName.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
    this.setCityGPS = this.setCityGPS.bind(this)
    this.setCityGPSInputFromMarker = this.setCityGPSInputFromMarker.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchStates()
  }

  callbackUpdate(status) {
    if (status) {
      this.setState({ isDisabled: false })
    }
    this.cityBoundaryData.changeGmapKey()
  }

  setCityGPSInputFromMarker(gps) {
    this.cityDetailsForm.setCityGPSInputFromMarker(gps)
  }

  setCityGPS(gps) {
    this.cityBoundaryData.setCenter(gps)
  }

  setCityName(cityName) {
    this.setState({ cityName })
  }

  reset() {
    this.cityBoundaryData.changeGmapKey()
  }

  submit() {
    const data = this.cityDetailsForm.getData()
    const cityBoundaryData = this.cityBoundaryData.getCoordinates()

    if (data.cityName && data.stateShortName && cityBoundaryData && data.cityGPS.length) {
      this.setState({ isDisabled: true })
      this.props.actions.createCity({
        is_available: data.isCityActive,
        is_wallet_city: data.isWalletCityActive,
        store_pickup_disabled: data.storePickupDisabled,
        quickpay_disabled: data.quickpayDisabled,
        add_money_diasabled: data.addMoney,
        is_partial_delivery_enabled: data.partialDeliveryEnabled,
        homepage_view: data.homepageView,
        wallet_preference: data.walletPreference,
        is_hw_loading_enabled: data.hipbarWalletLoadingEnabled,
        is_gw_loading_enabled : data.giftWalletLoadingEnabled,
        is_hw_usage_enabled: data.hipbarWalletUsageEnabled,
        is_gw_usage_enabled: data.giftWalletUsageEnabled,
        deliverable_city: data.isDeliveryActive,
        state_short_name: data.stateShortName,
        gps: data.cityGPS,
        name: data.cityName,
        geoboundary: cityBoundaryData,
      }, this.callbackUpdate)
    }
  }

  render() {
    const {
      actions,
      statesData,
      citiesData,
      cityDetails,
      geoLocalitiesData,
      loadingCities,
      loadingStates,
      loadingCityDetails,
      loadingGeoboundary,
      loadingGeolocalities,
      isGeolocalityUpdated,
      match
    } = this.props

    const queryObj = getQueryObj(location.search.slice(1))
    return (
      <div style={{
        position: 'relative',
        width: '100%'
      }}
      >

        <div>
          <Card style={{
            padding: '20px',
            width: '30%',
            position: 'relative',
            display: 'block',
            verticalAlign: 'top',
            marginRight: '20px'
          }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Enter city details</h3>
            <CityDetailsForm
              setCityGPS={this.setCityGPS}
              setCityName={this.setCityName}
              statesData={statesData}
              isCityActive
              isDeliveryActive={false}
              ref={(node) => { this.cityDetailsForm = node }}
            />
          </Card>

          <Card style={{
            padding: '20px',
            paddingTop: '0',
            width: '100%',
            marginTop: '40px',
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top'
          }}
          >
            <DefineGeoboundary
              ref={(node) => this.cityBoundaryData = node}
              setLoadingState={actions.setLoadingState}
              fetchCityDetails={actions.fetchCityDetails}
              setCityGPSInputFromMarker={this.setCityGPSInputFromMarker}
              updateGeoboundary={actions.updateGeoboundary}
              cityDetails={cityDetails}
              zoomLevel={5}
              loadingCityDetails={loadingCityDetails}
              isGeolocalityUpdated={isGeolocalityUpdated}
              cityName={this.state.cityName}
            />
          </Card>
          <RaisedButton
            disabled={this.state.isDisabled}
            primary
            label="Save"
            onClick={this.submit}
            style={{ marginTop: '40px' }}
          />
          <RaisedButton
            primary
            label="Reset"
            onClick={this.reset}
            style={{ marginTop: '40px', marginLeft: '20px' }}
          />
        </div>

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
)(CreateCity)
