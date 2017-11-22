import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Step,
  Stepper,
  StepLabel,
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
      stepIndex: 2,
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
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <ChooseState
            setStateData={this.setStateData}
          />
        )
      case 1:
        return (
          <MapCity
            setCityData={this.setCityData}
          />
        )
      case 2:
        return (
          <DefineLocality
            actions={this.props.actions}
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

  setCityCenter(center) {
    this.setState({ center })
  }

  setStateData(value) {
    this.setState({ state: value })
  }

  setCityData(value) {
    this.setState({ city: value })
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
        <Stepper activeStep={stepIndex}>
          {
            steps.map((step, i) => {
              return (
                <Step key={`step-${i}`}>
                  <StepLabel>{step}</StepLabel>
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
    );
  }
}

const mapStateToProps = state => state.reducer

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLocality)
