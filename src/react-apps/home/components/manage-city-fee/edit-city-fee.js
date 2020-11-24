import React from "react"
import EditCityFeeForm from "./city-fee-form"
import * as Api from "../../middleware/api"
import Notify from "@components/Notification"

class EditCityFee extends React.Component {
  constructor () {
    super()
    this.state = {
      updatingCityFee: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave () {
    const cityFeeForm = this.cityFeeForm.getData()
    this.setState({ updatingCityFee: true })
    Api.updateCityFee({
      id: parseInt(cityFeeForm.id),
      city_id: parseInt(this.props.match.params.cityId),
      order_type: cityFeeForm.selectedOrderTypeIdx,
      charge_type: cityFeeForm.selectedChargeTypeIdx,
      title: cityFeeForm.title,
      txn_fee_flat: parseFloat(cityFeeForm.flat),
      txn_fee_percentage: parseFloat(cityFeeForm.percentage),
      min_value: parseFloat(cityFeeForm.min),
      max_value: parseFloat(cityFeeForm.max),
      platform: cityFeeForm.selectedPlatformIdx === 1 ? "hb" : "fk-web",
      cart_min: parseInt(cityFeeForm.minCartValue),
      cart_max: parseInt(cityFeeForm.maxCartValue),
      start_time: cityFeeForm.startTime + ":00+05:30",
      end_time: cityFeeForm.endTime + ":00+05:30"
    })
      .then((response) => {
        Notify('Successfully updated City Fee', 'success')
        this.setState({ updatingCityFee: false })
        this.props.history.push(`/home/manage-city-fee/${this.props.match.params.cityId}`)
      })
      .catch((err) => {
        console.log("Error in Updating City Fee", err)
        err.response.json().then((json) => {
          Notify(json.message, "error")
        })
        this.setState({ updatingCityFee: false })
      })
  }

  render () {
    return (
      <React.Fragment>
        <EditCityFeeForm
          ref={(node) => { this.cityFeeForm = node }}
          data={this.props.location.state}
          cityId={this.props.match.params.cityId}
          disableSave={this.state.updatingCityFee}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default EditCityFee