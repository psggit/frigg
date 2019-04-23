import React from "react"
import MapOptionForm from './map-option-to-prediction-form'
import * as Api from "../../middleware/api"

class MapOptionToPrediction extends React.Component {
  constructor() {
    super()
    this.state = {
      mappingOption: false,
      loadingPredictionList: true,
      loadingOptionList: true,
      predictionList: [],
      optionList: []
    }
    this.handleSave = this.handleSave.bind(this)
    this.successMapOptionCallback = this.successMapOptionCallback.bind(this)
    this.failureMapOptionCallback = this.failureMapOptionCallback.bind(this)
    this.successOptionListCallback = this.successOptionListCallback.bind(this)
    this.successPredictionListCallback = this.successPredictionListCallback.bind(this)
  }

  componentDidMount() {
    Api.fetchOptionList({}, this.successOptionListCallback)
    Api.fetchPredictionList({
      limit: 10000,
      offset: 0
    }, this.successPredictionListCallback)
  }

  successMapOptionCallback() {
    this.setState({ mappingOption: false })
    //this.props.history.push("/home/manage-option-mapping")
  }

  failureMapOptionCallback() {
    this.setState({ mappingOption: false })
  }

  successPredictionListCallback(response) {
    let predictionList = []
    if(response.prediction_data) {
      predictionList = response.prediction_data.map((item, i) => {
        return {
          text: item.prediction_title,
          value: item.prediction_id
        }
      })
    }

    this.setState({
      predictionList,
      loadingPredictionList: false
    })
  }

  successOptionListCallback(response) {
    let optionList = []
    if(response.options) {
      optionList = response.options.map((item, i) => {
        return {
          text: item.option_name,
          value: item.option_id
        }
      })
    }

    this.setState({
      optionList,
      loadingOptionList: false
    })
  }


  handleSave() {
    const mapOptionForm = this.mapOptionForm.getData()
    this.setState({mappingOption: true})
    Api.mapOptionToPrediction({
      prediction_id: mapOptionForm.selectedPredictionIdx,
      option_id: mapOptionForm.selectedOptionIdx
    }, this.successMapOptionCallback, this.failureMapOptionCallback)
  }

  render() {
    return (
      <MapOptionForm
        ref={(node) => { this.mapOptionForm = node }}
        handleSave={this.handleSave}
        disableSave={this.state.mappingOption}
        disablePrediction={false}
        predictionList={this.state.predictionList}
        optionList={this.state.optionList}
        loadingPredictionList={this.state.loadingPredictionList}
        loadingOptionList={this.state.loadingOptionList}
      />
    )
  }
}

export default MapOptionToPrediction