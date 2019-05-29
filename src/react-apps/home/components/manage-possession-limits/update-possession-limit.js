import React from 'react'
import PossessionLimitForm from './possession-limit-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class UpdatePossessionLimit extends React.Component {
  constructor() {
    super()

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('updatingPossessionLimit')
    //this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const possessionLimitForm = this.possessionLimitForm.getData()

    if (possessionLimitForm.selectedTypeIdx.length === 0) {
      return false
    } else if (possessionLimitForm.bottleCount.length === 0) {
      return false
    } else if (possessionLimitForm.volume.toString().length === 0) {
      return false
    }

    return true
  }

  handleSave() {
    const possessionLimitForm = this.possessionLimitForm.getData()
    console.log("props", this.props.params)
    if (this.formIsValid()) {
      this.props.actions.updatePossessionLimit({
        type_id: possessionLimitForm.selectedTypeIdx,
        state_short_name: this.props.match.params.stateShortName,
        bottle_count: parseInt(possessionLimitForm.bottleCount),
        volume: parseInt(possessionLimitForm.volume)
      })
    }
  }

  render() {
    return (
      <PossessionLimitForm
        ref={(node) => { this.possessionLimitForm = node }}
        data={this.props.location.state}
        handleSave={this.handleSave}
        disableBrandTypeEdit={true}
        stateShortName={this.props.match.params.stateShortName}
        disableSave={!this.props.creatingPossessionLimit}
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
)(UpdatePossessionLimit)