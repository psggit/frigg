import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import '@sass/components/_form.scss'
import LocalityDetailsForm from './locality-details-form'
import IfElse from '@components/declarative-if-else'
import { Card } from 'material-ui/Card'
import DefineLocality from './../manage-geofencing/define-locality'
import { getQueryObj } from '@utils/url-utils'
import '@sass/animations.scss'

class CreateLocality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityId: null,
      isDisabled: false,
      localityErr: false
    }
    this.submit = this.submit.bind(this)
    this.setCityName = this.setCityName.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
    this.removeLocalityErr = this.removeLocalityErr.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState()
    this.props.actions.fetchStates()
  }

  removeLocalityErr() {
    this.setState({ localityErr: false })
  }

  setCityName(cityName) {
    this.setState({ cityName })
  }

  callbackUpdate(status) {
    if (status) {
      this.setState({ isDisabled: false })
    }
    this.localityData.callbackUpdate()
  }

  handleStateChange(e, k) {
    const { statesData } = this.props
    const stateIdx = k + 1
    this.setState({ stateIdx, cityIdx: -1, cityId: null })

    this.props.actions.fetchCities({
      state_short_name: statesData[k].short_name,
      is_available: false,
      offset: 0,
      limit: 10,
      deliverable_city: true,
      no_filter: false
    })
  }

  handleCityChange(e, k) {
    const { citiesData } = this.props
    const cityIdx = k + 1
    this.setState({
      cityIdx,
      cityId: citiesData[k].id,
      cityName: citiesData[k].name
    })

    this.props.actions.fetchLocalities({
      city_id: citiesData[k].id,
      offset: 0,
      limit: 50,
      is_available: false,
      no_filter: false
    }, this.localityData.changeGmapKey)
  }

  submit() {
    const data = this.localityDetailsForm.getData()
    const localityData = this.localityData.getData()

    if (!data.localityName.length) {
      document.getElementById("display-screen").scrollTop = 0
      this.setState({ localityErr: true })
    }

    if (localityData !== null && data.localityName.length) {
      this.setState({ isDisabled: true })
      this.props.actions.createGeolocality({
        city_id: this.state.cityId,
        coordinates: localityData,
        name: data.localityName,
        is_available: data.isLocalityActive,
        max_dorders_per_batch: parseInt(data.maxDeliveryOrderPerBatch),
        max_wait_time_for_potential_das: parseInt(data.maxWaitTimeForPotentialDas),
        max_da_travel_distance: parseInt(data.maxDaTravelDistance),
        consider_locality_order_limit: data.considerLocalityOrderlimit,
        pay_on_delivery_limit: parseInt(data.payOnDeliveryLimit),
        payment_on_delivery_enabled: data.paymentOnDeliveryEnabled,
        pay_by_cash_enabled: data.payByCashEnabled,
        pay_by_upi_enabled: data.payByUpiEnabled,
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

        <div
          style={{
            width: '80%',
            position: 'relative',
            display: 'flex',
            // justifyContent: 'space-between',
            verticalAlign: 'top',
            marginRight: '20px'
          }}
        >
          <Card style={{
            padding: '20px',
            width: '300px',
            marginBottom: '20px',
            marginRight: '20px',
            //height: 'fit-content',
          }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Enter city details</h3>

            <div className="form-group">
              <label className="label">State name</label><br/>
              <SelectField
                value={this.state.stateIdx}
                onChange={this.handleStateChange}
                iconStyle={{ fill: '#9b9b9b' }}
              >
                {
                  this.props.statesData.map((state, i) => (
                    <MenuItem
                      value={i + 1}
                      key={state.id}
                      primaryText={state.state_name}
                    />
                  ))
                }
              </SelectField>
            </div>
            <br />

            <div className="form-group">
              <label className="label">City name</label><br/>
              <SelectField
                disabled={this.props.loadingCities}
                value={this.state.cityIdx}
                onChange={this.handleCityChange}
              >
                {
                  this.props.citiesData.map((city, i) => (
                    <MenuItem
                      value={i + 1}
                      key={city.id}
                      primaryText={city.name}
                    />
                  ))
                }
              </SelectField>
            </div>

          </Card>
          <Card
            className={this.state.localityErr ? 'animated shake' : ''}
            style={{
              padding: '20px',
              width: '300px',
              height: '100%'
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Enter locality details</h3>
            <LocalityDetailsForm
              removeLocalityErr={this.removeLocalityErr}
              localityErr={this.state.localityErr}
              ref={(node) => { this.localityDetailsForm = node }}
            />
            { this.state.localityErr && <p className="error"> Please enter locality name</p> }
          </Card>
        </div>

          <Card style={{
            padding: '20px',
            paddingTop: '0',
            marginTop: '40px',
            width: '100%',
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top'
          }}
          >
            <DefineLocality
              ref={(node) => this.localityData = node}
              viewGeolocalities={actions.fetchLocalities}
              updateGeolocality={actions.updateGeolocality}
              createGeolocality={actions.createGeolocality}
              geoLocalitiesData={geoLocalitiesData}
              loadingGeolocalities={loadingGeolocalities}
              zoomLevel={11}
              cityId={this.state.cityId}
              cityName={this.state.cityName}
            />
          </Card>
          <RaisedButton
            primary
            disabled={this.state.isDisabled}
            label="Save"
            onClick={this.submit}
            style={{ marginTop: '40px' }}
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
)(CreateLocality)
