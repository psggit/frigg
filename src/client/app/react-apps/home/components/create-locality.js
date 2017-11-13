import React from 'react'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ChooseState from './choose-state'
import MapCity from './map-city'
import DefineLocality from './define-locality'

class CreateLocality extends React.Component {
  constructor() {
    super()
    this.state = {
      finished: false,
      stepIndex: 2,
    }
    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ChooseState />
      case 1:
        return <MapCity />
      case 2:
        return <DefineLocality />
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  handleNext() {
    const { stepIndex } = this.state
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

  render() {
    const { finished, stepIndex } = this.state
    const contentStyle = { margin: '0 16px' }
    const steps = [
      'Select state',
      'Select city',
      'Define locality'
    ]

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
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
                  this.setState({stepIndex: 0, finished: false})
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div style={{marginTop: '30px'}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
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

export default CreateLocality
