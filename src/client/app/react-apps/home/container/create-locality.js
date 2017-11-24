import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
    this.setCityCenter =this.setCityCenter.bind(this)
    this.setStepIndex = this.setStepIndex.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // Object.keys(nextProps).forEach((key) => {
    //   if (key.indexOf('loading') > -1) {
    //     this.setState({ isNextDisabled: nextProps[key] })
    //   }
    // })
    if (!this.state.state)
    this.setState({ state: nextProps.statesData[0] })

    if (!this.state.city)
    this.setState({ city: nextProps.citiesData[0] })
  }

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
            localities={localities}
            loadingLocalites={loadingLocalites}
            fetchLocalities={actions.fetchLocalities}
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
  }

  setCityData(cityObj) {
    this.setState({
      city: cityObj.cityData,
      cityIdx: cityObj.cityIdx
    })
  }

  shouldNextDisabled() {

  }

  handleNext() {
    const { stepIndex } = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    })
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
    const steps = [
      'Select state',
      'Select city',
      'City boundary',
      'Locality'
    ]

    return (
      <div style={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
        <Stepper linear activeStep={stepIndex}>
          {
            steps.map((step, i) => {
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
