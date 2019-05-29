import React from 'react'
import StateTimingForm from './state-timings-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class UpdateStateTiming extends React.Component {
  constructor() {
    super()

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('updatingStateTiming')
    this.props.actions.fetchStates()
  }

  formIsValid() {
    const stateTimingForm = this.stateTimingForm.getData()

    if (stateTimingForm.stateShortName.toString().length === 0) {
      return false
    } else if (stateTimingForm.startTime.toString().length === 0) {
      return false
    } else if (stateTimingForm.endTime.toString().length === 0) {
      return false
    }

    return true
  }

  handleSave() {
    const stateTimingForm = this.stateTimingForm.getData()
    console.log("data", stateTimingForm)
    if (this.formIsValid()) {
      this.props.actions.updateStateTiming({
        state_short_name: stateTimingForm.stateShortName,
        start_time: stateTimingForm.startTime+":00+05:30",
        end_time: stateTimingForm.endTime+":00+05:30"
      })
    }
  }

  render() {
    return (
      <StateTimingForm
        ref={(node) => { this.stateTimingForm = node }}
        data={this.props.location.state}
        handleSave={this.handleSave}
        disableStateChange={true}
        stateList={this.props.statesData}
        disableSave={!this.props.updatingStateTiming}
      />
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
)(UpdateStateTiming)