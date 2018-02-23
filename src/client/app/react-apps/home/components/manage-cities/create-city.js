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

class CreateCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityName: ''
    }
    this.submit = this.submit.bind(this)
    this.reset = this.reset.bind(this)
    this.setCityName = this.setCityName.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchStates()
  }

  setCityName(cityName) {
    this.setState({ cityName })
  }

  reset() {
    this.cityBoundaryData.changeGmapKey()
  }

  submit() {
    const data = this.cityDetailsForm.getData()
    const cityBoundaryData = this.cityBoundaryData.getData()

    if (data.cityName && data.stateShortName && cityBoundaryData) {
      this.props.actions.createCity({
        is_available: data.isCityActive,
        deliverable_city: data.isDeliveryActive,
        state_short_name: data.stateShortName,
        gps: data.gps,
        name: data.cityName,
        geoboundary: cityBoundaryData
      })
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
              setCityName={this.setCityName}
              statesData={statesData}
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
              updateGeoboundary={actions.updateGeoboundary}
              cityDetails={cityDetails}
              loadingCityDetails={loadingCityDetails}
              isGeolocalityUpdated={isGeolocalityUpdated}
              cityName={this.state.cityName}
            />
          </Card>
          <RaisedButton
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
