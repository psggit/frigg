import React from "react"
import PredictionAnswerForm from './map-answer-to-prediction-form'
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class CreatePredictionAnswer extends React.Component {
  constructor() {
    super()
    this.state = {
      creatingPredictionAnswer: false,
      loadingPredictionList: true,
      predictionList: []
    }
    this.cashbackType = [
      { text: 'Flat', value: 1 },
      { text: 'Percentage', value: 2 }
    ]
    this.handleSave = this.handleSave.bind(this)
    this.successPredictionListCallback = this.successPredictionListCallback.bind(this)
  }

  componentDidMount() {
    this.setState({ loadingPredictionList: true })
    Api.fetchPredictionList({
      limit: 10000,
      offset: 0
    }, this.successPredictionListCallback)
  }

  successPredictionListCallback(response) {
    this.setState({
      predictionList: response.prediction_data,
      loadingPredictionList: false
    })
  }

  handleSave() {
    const predictionAnswerForm = this.predictionAnswerForm.getData()

    this.setState({ creatingPredictionAnswer: true })
    const payload = {
      prediction_id: parseInt(predictionAnswerForm.selectedPredictionIdx),
      option_id: parseInt(predictionAnswerForm.selectedOptionIdx),
      is_percentage: predictionAnswerForm.selectedCashbackTypeIdx === 1 ? false : true,
      value: parseInt(predictionAnswerForm.amount),
      max_cap: parseInt(predictionAnswerForm.maxCashbackAmount),
      is_triggered: false,
      prediction_sms: predictionAnswerForm.predictionSms,
      prediction_cashback_sms: predictionAnswerForm.cashbackSms,
      prediction_pending_cashback_sms: predictionAnswerForm.cashbackPendingSms,
      flat_amount: predictionAnswerForm.flatAmount
    }
    Api.createPredictionAnswer(payload)
      .then((response) => {
        console.log("created")
        this.setState({ creatingPredictionAnswer: false })
        this.props.history.push(`/home/manage-answer-mapping`)
      })
      .catch((err) => {
        this.setState({ creatingPredictionAnswer: false })
        Notify("Something went wrong", 'success')
      })
  }

  render() {
    return (
      <PredictionAnswerForm
        ref={(node) => { this.predictionAnswerForm = node }}
        handleSave={this.handleSave}
        disableSave={this.state.creatingPredictionAnswer}
        predictionList={this.state.predictionList}
        loadingPredictionList={this.state.loadingPredictionList}
        cashbackType={this.cashbackType}
      />
    )
  }
}

export default CreatePredictionAnswer