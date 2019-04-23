import React from "react"
import UpdateCityForm from './map-city-to-prediction-form'
import * as Api from "../../middleware/api"
//import { formatStateAndCityList } from '@utils/response-format-utils'

class UpdateCityToPrediction extends React.Component {
  constructor() {
    super()
    this.state = {
      updatingCity: false,
      loadingPredictionList: true,
      loadingCityList: true,
      predictionList: [],
      // stateList: [],
      cityList: [],
      // stateMap: {}
    }
    this.handleSave = this.handleSave.bind(this)
    this.successUpdateCityCallback = this.successUpdateCityCallback.bind(this)
    this.failureUpdateCityCallback = this.failureUpdateCityCallback.bind(this)
    this.successCityListCallback = this.successCityListCallback.bind(this)
    this.successPredictionListCallback = this.successPredictionListCallback.bind(this)
  }

  componentDidMount() {
    Api.fetchCityList({
      available: true,
      delivery_available: false,
      wallet_available: false
    }, this.successCityListCallback)
    Api.fetchPredictionList({
      limit: 10000,
      offset: 0
    }, this.successPredictionListCallback)
  }

  successUpdateCityCallback() {
    this.setState({ updatingCity: false })
    //this.props.history.push("/home/manage-option-mapping")
  }

  failureUpdateCityCallback() {
    this.setState({ updatingCity: false })
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

  successCityListCallback(response) {
    let cityList = []
    if(response.availableCities) {
      cityList = response.availableCities.map((item, i) => {
        return {
          text: item.name,
          value: item.id
        }
      })
    }
		this.setState({ cityList, loadingCityList: false })
  }


  handleSave() {
    const mapCityForm = this.mapCityForm.getData()
    this.setState({mappingCity: true})
    Api.updateCityToPrediction({
      prediction_id: mapCityForm.selectedPredictionIdx,
      city_id: mapCityForm.selectedCityIdx,
      status: mapCityForm.selectedStatusIdx === 1 ? 'Active' : 'Inactive'
    }, this.successUpdateCityCallback, this.failureUpdateCityCallback)
  }

  render() {
    return (
      <UpdateCityForm
        ref={(node) => { this.mapCityForm = node }}
        handleSave={this.handleSave}
        disableSave={this.state.updatingCity}
        data={this.props.location.state}
        predictionList={this.state.predictionList}
        cityList={this.state.cityList}
        loadingPredictionList={this.state.loadingPredictionList}
        loadingCityList={this.state.loadingCityList}
      />
    )
  }
}

export default UpdateCityToPrediction