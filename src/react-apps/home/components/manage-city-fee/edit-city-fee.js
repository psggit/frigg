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
      city_id: parseInt(this.props.match.params.cityId),
      order_type: cityFeeForm.selectedOrderTypeIdx,
      charge_type: cityFeeForm.selectedChargeTypeIdx,
      title: cityFeeForm.title,
      txn_fee_flat: parseInt(cityFeeForm.flat),
      txn_fee_percentage: parseInt(cityFeeForm.percentage),
      min_value: parseInt(cityFeeForm.min),
      max_value: parseInt(cityFeeForm.max),
    })
      .then((response) => {
        Notify('Successfully updated City Fee', 'success')
        this.setState({ updatingCityFee: false })
        this.props.history.push(`/home/manage-city-fee/${this.props.match.params.cityId}`)
      })
      .catch((err) => {
        console.log("Error in Updating City Fee", err)
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