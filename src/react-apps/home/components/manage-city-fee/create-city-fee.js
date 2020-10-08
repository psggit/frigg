import React from "react"
import CityFeeForm from "./../manage-city-fee/city-fee-form"
import * as Api from "../../middleware/api"
import Notify from "@components/Notification"

class CreateCityFee extends React.Component {
  constructor () {
    super()
    this.state = {
      creatingCityFee: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    const cityFeeForm = this.cityFeeForm.getData()
    this.setState({ creatingCityFee: true })
    Api.createCityFee({
      city_id: parseInt(this.props.match.params.cityId),
      order_type: cityFeeForm.selectedOrderTypeIdx,
      charge_type: cityFeeForm.selectedChargeTypeIdx,
      title: cityFeeForm.title,
      txn_fee_flat: parseFloat(cityFeeForm.flat),
      txn_fee_percentage: parseFloat(cityFeeForm.percentage),
      min_value: parseFloat(cityFeeForm.min),
      max_value: parseFloat(cityFeeForm.max),
      platform: cityFeeForm.selectedPlatformIdx === 1 ? "hb" : "fk-web",

    })
      .then((response) => {
        Notify('Successfully created City Fee', 'success')
        this.setState({ creatingCityFee: false })
        this.props.history.push(`/home/manage-city-fee/${this.props.match.params.cityId}`)
      })
      .catch((err) => {
        console.log("Error in creating City Fee", err)
        this.setState({ creatingCityFee: false })
      })
  }

  render () {
    return (
      <React.Fragment>
        <CityFeeForm
          ref={(node) => { this.cityFeeForm = node }}
          cityId={this.props.match.params.cityId}
          disableSave={this.state.creatingCityFee}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default CreateCityFee