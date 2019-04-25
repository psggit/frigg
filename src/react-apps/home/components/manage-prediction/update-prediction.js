import React from "react"
import PredictionForm from "./prediction-form"
import * as Api from "./../../middleware/api"

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
    Api.updatePrediction({
      prediction_id: this.props.location.state.prediction_id,
      prediction_title: predictionForm.predictionTitle,
      active_from: new Date(predictionForm.activeFrom),
      active_to:  new Date(predictionForm.activeTo),
      prediction_image: predictionForm.predictionImage,
      order_type: predictionForm.orderType.join(",").toString(),
      detailed_prediction_image: predictionForm.detailedPredictionImage,
      prediction_response: predictionForm.predictionResponse
    }, this.successUpdatePredictionCallback, this.failureUpdatePredictionCallback)
  }

  successUpdatePredictionCallback() {
    this.setState({updatingPrediction: false})
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
        disableSave={this.state.updatingPrediction}
      />
    )
  }
}

export default EditPrediction