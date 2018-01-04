import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import IfElse from '@components/declarative-if-else'
import { Card } from 'material-ui/Card'
import DefineLocality from './../manage-geofencing/define-locality'
import { getQueryObj } from '@utils/url-utils'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'

import ChooseState from './../manage-geofencing/choose-state'
import MapCity from './../manage-geofencing/map-city'

class CreateLocality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIndex: 0,
      stateShortName: null,
      cityId: null
    }
    this.submit = this.submit.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.setStateShortName = this.setStateShortName.bind(this)
    this.setCityId = this.setCityId.bind(this)
    this.resetCityId = this.resetCityId.bind(this)
  }

  componentDidMount() {
    // this.props.actions.fetchStates()
  }

  setStateShortName(stateShortName) {
    this.setState({ stateShortName })
  }

  setCityId(cityId) {
    this.setState({ cityId })
  }

  resetCityId() {
    this.setState({ cityId: null })
  }

  handleNext() {
    const { stepIndex } = this.state
    if (!this.state.stateShortName) {
      return;
    }
    if (stepIndex == 1 && !this.state.cityId) {
      return;
    }
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    })
  }

  handlePrev() {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  getStepContent(stepIndex) {
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

    switch (stepIndex) {
      case 0:
        return (
          <ChooseState
            setStateShortName={this.setStateShortName}
            statesData={statesData}
            loadingStates={loadingStates}
            fetchStates={actions.fetchStates}
            setLoadingState={actions.setLoadingState}
            resetCityId={this.resetCityId}
          />
        )
      case 1:
        return (
          <MapCity
            setCityId={this.setCityId}
            citiesData={citiesData}
            loadingCities={loadingCities}
            stateShortName={this.state.stateShortName}
            fetchCities={actions.fetchCities}
            setLoadingState={actions.setLoadingState}
          />
        )
      case 2:
        return (
          <DefineLocality
            viewGeolocalities={actions.fetchLocalities}
            updateGeolocality={actions.updateGeolocality}
            createGeolocality={actions.createGeolocality}
            geoLocalitiesData={geoLocalitiesData}
            loadingGeolocalities={loadingGeolocalities}
            zoomLevel={11}
            cityId={this.state.cityId}
            mode="create"
          />
        )
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  submit() {
    const data = this.cityDetailsForm.getData()

    this.props.actions.updateCity({
      id: data.id,
      is_available: data.isCityActive,
      deliverable_city: data.deliverable_city,
      state_short_name: data.state_short_name,
      gps: data.gps,
      name: data.cityName,
      geoboundary: data.geoboundary
    }, this.disableEditMode)
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'}

    const queryObj = getQueryObj(location.search.slice(1))
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto'
      }}
      >
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Select state</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select city</StepLabel>
          </Step>
          <Step>
            <StepLabel>Define locality</StepLabel>
          </Step>
        </Stepper>

        <div style={contentStyle}>
          <div>
            {this.getStepContent(stepIndex)}
            <div style={{marginTop: 12}}>
              <FlatButton
                label="Back"
                disabled={stepIndex === 0}
                onClick={this.handlePrev}
                style={{marginRight: 12}}
              />
              {
                stepIndex < 2
                ? <RaisedButton
                  label="Next"
                  primary
                  onClick={this.handleNext}
                />
                : ''
              }
            </div>
          </div>
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
)(CreateLocality)
