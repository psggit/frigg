import React from "react"
import PredictionForm from "./prediction-form"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class EditPrediction extends React.Component {
  constructor() {
    super()
   
    this.state = {
      updatingPrediction: false
    }

    this.handleSave = this.handleSave.bind(this)
    this.successUpdatePredictionCallback = this.successUpdatePredictionCallback.bind(this)
    this.failureUpdatePredictionCallback = this.failureUpdatePredictionCallback.bind(this)
  }

  handleSave() {
    const predictionForm = this.predictionForm.getData()
    this.setState({updatingPrediction: true})
    this.props.actions.updatePrediction({
      id: this.props.location.state.id,
      prediction_title: predictionForm.predictionTitle,
      active_from: new Date(predictionForm.activeFrom),
      active_to:  new Date(predictionForm.activeTo),
      prediction_image: predictionForm.predictionImage,
      detailed_prediction_image: predictionForm.detailedPredictionImage
    }, this.successUpdatePredictionCallback, this.failureUpdatePredictionCallback)
  }

  successUpdatePredictionCallback() {
    this.setState({updatingPrediction: false})
    this.props.history.push("/home/manage-prediction")
  }

  failureUpdatePredictionCallback() {
    this.setState({updatingPrediction: false})
  }

  render() {
    return (
      <PredictionForm
        ref={(node) => { this.predictionForm = node }}
        handleSave={this.handleSave}
        data={this.props.location.state}
        disableSave={this.state.updatingCampaign}
      />
    )
  }
}

export default EditPrediction
// const mapStateToProps = state => state.main

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(Actions, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(EditPrediction)