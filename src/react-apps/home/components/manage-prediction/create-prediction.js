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
    //this.formIsValid = this.formIsValid.bind(this)
    this.successPredictionCallback = this.successPredictionCallback.bind(this)
    this.failurePredictionCallback = this.failurePredictionCallback.bind(this)
  }

  // formIsValid() {
  //   const predictionForm = this.predictionForm.getData()

  //   if (predictionForm.predictionTitle.length === 0) {
  //     return false
  //   } else if (predictionForm.activeFrom.toString().length === 0) {
  //     return false
  //   } else if (predictionForm.activeTo.toString().length === 0) {
  //     return false
  //   } else if (predictionForm.predictionImage.toString().length === 0) {
  //     return false
  //   } else if (predictionForm.detailedPredictionImage.toString().length === 0) {
  //     return false
  //   }

  //   return true
  // }

  successPredictionCallback() {
    this.setState({ creatingPrediction: false })
    this.props.history.push("/home/manage-prediction")
  }

  failurePredictionCallback() {
    this.setState({ creatingPrediction: false })
  }

  handleSave() {
    const predictionForm = this.predictionForm.getData()
    //console.log("form data", campaignForm)
    //if (this.formIsValid()) {
      this.setState({creatingPrediction: true})
      Api.createPrediction({
        prediction_title: predictionForm.predictionTitle,
        prediction_image: predictionForm.predictionImage,
        active_from: predictionForm.activeFrom,
        active_to: predictionForm.activeTo,
        detailed_prediction_image: predictionForm.detailedPredictionImage
      }, this.successPredictionCallback, this.failurePredictionCallback)
    //}
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
// const mapStateToProps = state => state.main

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(Actions, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CreatePrediction)