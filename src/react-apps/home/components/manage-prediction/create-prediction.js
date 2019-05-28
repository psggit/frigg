import React from "react"
import PredictionForm from './prediction-form'
import * as Api from "./../../middleware/api"

class CreatePrediction extends React.Component {
  constructor() {
    super()
    this.state = {
      creatingPrediction: false
    }
    this.handleSave = this.handleSave.bind(this)
    this.successPredictionCallback = this.successPredictionCallback.bind(this)
    this.failurePredictionCallback = this.failurePredictionCallback.bind(this)
  }

  successPredictionCallback() {
    this.setState({ creatingPrediction: false })
  }

  failurePredictionCallback() {
    this.setState({ creatingPrediction: false })
  }

  handleSave() {
    const predictionForm = this.predictionForm.getData()

    this.setState({creatingPrediction: true})
    Api.createPrediction({
      prediction_title: predictionForm.predictionTitle,
      prediction_image: predictionForm.predictionImage,
      active_from: predictionForm.activeFrom,
      active_to: predictionForm.activeTo,
      order_type: predictionForm.orderType.join(",").toString(),
      detailed_prediction_image: predictionForm.detailedPredictionImage,
      prediction_response: predictionForm.predictionResponse
    }, this.successPredictionCallback, this.failurePredictionCallback)
  }

  render() {
    return (
      <PredictionForm
        ref={(node) => { this.predictionForm = node }}
        handleSave={this.handleSave}
        disableSave={this.state.creatingPrediction}
      />
    )
  }
}

export default CreatePrediction