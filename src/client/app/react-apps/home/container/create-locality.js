import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AlertContainer from 'react-alert'
import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import * as Actions from './../actions'
import ChooseState from './../components/choose-state'
import MapCity from './../components/map-city'
import DefineLocality from './../components/define-locality'

class CreateLocality extends React.Component {
  constructor() {
    super()
    this.steps = [
      'Select state',
      'Select city',
      'City boundary',
      'Locality'
    ]
    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'light',
      time: 5000,
      transition: 'scale'
    }
    this.state = {
      finished: false,
      stepIndex: 0,
      stateIdx: 1,
      cityIdx: null,
      city: null,
      state: null,
      center: { lat: null, lng: null },
      isNextDisabled: false
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.setStateData = this.setStateData.bind(this)
    this.setCityData = this.setCityData.bind(this)
    this.setCityCenter = this.setCityCenter.bind(this)
    this.setStepIndex = this.setStepIndex.bind(this)
    this.goToNextStep = this.goToNextStep.bind(this)
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   // Object.keys(nextProps).forEach((key) => {
  //   //   if (key.indexOf('loading') > -1) {
  //   //     this.setState({ isNextDisabled: nextProps[key] })
  //   //   }
  //   // })
  //   if (!this.state.state)
  //   this.setState({ state: nextProps.statesData[0] })
  //
  //   if (!this.state.city)
  //   this.setState({ city: nextProps.citiesData[0] })
  // }

  getStepContent(stepIndex) {
    const {
      actions,
      statesData,
      citiesData,
      localities,
      loadingCities,
      loadingStates,
      loadingLocalites
    } = this.props

    const { state, stateIdx, cityIdx } = this.state
    switch (stepIndex) {
      case 0:
        return (
          <ChooseState
            ref={(node) => { this.chooseState = node }}
            stateIdx={stateIdx}
            statesData={statesData}
            loadingStates={loadingStates}
            fetchStates={actions.fetchStates}
            setStateData={this.setStateData}
          />
        )
      case 1:
        return (
          <MapCity
            ref={(node) => { this.chooseCity = node }}
            cityIdx={cityIdx}
            citiesData={citiesData}
            loadingCities={loadingCities}
            fetchCities={actions.fetchCities}
            stateShortName={state.short_name}
            setCityData={this.setCityData}
          />
        )
      case 2:
        return (
          <DefineLocality
            ref={(node) => { this.geoBoundary = node }}
            setCityCenter={this.setCityCenter}
            center={this.state.center}
            key="boundary"
            isLocality={false}
            zoomLevel={12}
            city={this.state.city}
          />
        )

      case 3:
        return (
          <DefineLocality
            ref={(node) => { this.locality = node }}
            setCityCenter={this.setCityCenter}
            localities={localities}
            loadingLocalites={loadingLocalites}
            fetchLocalities={actions.fetchLocalities}
            sendMarkerGPS={actions.sendMarkerGPS}
            key="locality"
            center={this.state.center}
            isLocality
            zoomLevel={14}
            city={this.state.city}
          />
        )

      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  setStepIndex(i) {
    this.setState({ stepIndex: i })
  }

  setCityCenter(center) {
    this.setState({ center })
  }

  setStateData(stateObj) {
    this.setState({
      state: stateObj.stateData,
      stateIdx: stateObj.stateIdx
    })
    this.setCityData({ cityData: null, cityIdx: 0 })
  }

  setCityData(cityObj) {
    this.setState({
      city: cityObj.cityData,
      cityIdx: cityObj.cityIdx
    })
  }

  goToNextStep() {
    const { stepIndex } = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    })
  }

  showError(errorMessage) {
    this.msg.error(errorMessage, {
      time: 2000,
      type: 'error',
      icon: <img src="/images/error.png" />
    })
  }

  handleNext() {
    const { stepIndex } = this.state
    const callback = (isCompleted, message) => {
      if (isCompleted) {
        this.goToNextStep()
      } else {
        this.showError(message)
      }
    }

    let postData = null

    switch (stepIndex) {
      case 0:
        postData = this.chooseState.getData()
        this.props.actions.setStateData(postData, callback)
        break
      case 1:
        postData = this.chooseCity.getData()
        this.props.actions.setCityData(postData, callback)
        break
      case 2:
        postData = this.geoBoundary.getData()
        this.props.actions.setGeoBoundary(postData, callback)
        break
      case 3:
        postData = this.locality.getData()
        this.props.actions.setLocality(postData, callback)
        break
      default:
        break
    }
  }

  handlePrev() {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  render() {
    const { finished, stepIndex, isNextDisabled } = this.state
    const contentStyle = { margin: '0 16px' }

    return (
      <div style={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
        <AlertContainer ref={(node) => { this.msg = node }} {...this.alertOptions} />
        <Stepper linear activeStep={stepIndex}>
          {
            this.steps.map((step, i) => {
              return (
                <Step key={`step-${i}`}>
                  <StepLabel
                    // style={{ cursor: 'pointer' }}
                    // onClick={() => this.setStepIndex(i)}
                  >
                    {step}
                  </StepLabel>
                </Step>
              )
            })
          }
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  this.setState({ stepIndex: 0, finished: false })
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div style={{ marginTop: '30px' }}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  disabled={isNextDisabled}
                  label={stepIndex === 3 ? 'Finish' : 'Next'}
                  primary
                  onClick={this.handleNext}
                />
              </div>
            </div>
          )}
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
