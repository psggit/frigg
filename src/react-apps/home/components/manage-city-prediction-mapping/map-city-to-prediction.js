import React from "react"
import MapCityForm from './map-city-to-prediction-form'
import * as Api from "../../middleware/api"
//import { formatStateAndCityList } from '@utils/response-format-utils'

class MapCityToPrediction extends React.Component {
  constructor() {
    super()
    this.state = {
      mappingCity: false,
      loadingPredictionList: true,
      loadingCityList: true,
      predictionList: [],
      // stateList: [],
      cityList: [],
      // stateMap: {}
    }
    this.handleSave = this.handleSave.bind(this)
    this.successMapCityCallback = this.successMapCityCallback.bind(this)
    this.failureMapCityCallback = this.failureMapCityCallback.bind(this)
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

  successMapCityCallback() {
    this.setState({ mappingCity: false })
    //this.props.history.push("/home/manage-option-mapping")
  }

  failureMapCityCallback() {
    this.setState({ mappingCity: false })
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
    Api.mapCityToPrediction({
      prediction_id: mapCityForm.selectedPredictionIdx,
      city_id: mapCityForm.selectedCityIdx,
      status: mapCityForm.selectedStatusIdx === 1 ? 'Active' : 'Inactive'
    }, this.successMapCityCallback, this.failureMapCityCallback)
  }

  render() {
    return (
      <MapCityForm
        ref={(node) => { this.mapCityForm = node }}
        handleSave={this.handleSave}
        disableSave={this.state.mappingOption}
        predictionList={this.state.predictionList}
        cityList={this.state.cityList}
        disablePrediction={false}
        // stateList={this.state.stateList}
        // stateMap={this.state.stateMap}
        loadingPredictionList={this.state.loadingPredictionList}
        loadingCityList={this.state.loadingCityList}
      />
    )
  }
}

export default MapCityToPrediction