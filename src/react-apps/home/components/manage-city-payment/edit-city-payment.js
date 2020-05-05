import React from "react"
import CityPaymentForm from "../manage-city-payment/city-payment-form"
import * as Api from "../../middleware/api"
import Notify from "@components/Notification"

class EditCityPayment extends React.Component {
  constructor () {
    super()
    this.state = {
      updatingCityPayment: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave () {
    const CityPaymentForm = this.CityPaymentForm.getData()
    this.setState({ updatingCityPayment: true })
    Api.updateCityPayment({
      city_id: parseInt(this.props.match.params.cityId),
      upi_time_limit: parseInt(CityPaymentForm.upiTimeLimit),
      upi_low_rate_message: CityPaymentForm.upiLowRateMessage,
      app_type: CityPaymentForm.selectedAppTypeIdx === 1 ? "Android" : "iOS",
      jp_payment_method: CityPaymentForm.selectedJPPaymentMethodIdx === 3 ? "nodal" : CityPaymentForm.selectedJPPaymentMethodIdx === 1 ? "wallet" : "dmo wallet",
      icici_payment_method: CityPaymentForm.selectedICICIPaymentMethodIdx === 3 ? "nodal" : CityPaymentForm.selectedICICIPaymentMethodIdx === 1 ? "wallet" : "dmo wallet",
      is_card_enabled: CityPaymentForm.isCardEnabled,
      is_nb_enabled: CityPaymentForm.isNBEnabled,
      is_upi_low_success_rate: CityPaymentForm.isUpiLowSuccessRate,
      is_upi_collect_low_success_rate: CityPaymentForm.isUpiCollectLowSuccessRate,
      is_jp_upi_collect_enabled: CityPaymentForm.isJPUpiCollectEnabled,
      is_icici_upi_intent_enabled: CityPaymentForm.is_icici_upi_intent_enabled,
      is_icici_upi_collect_enabled: CityPaymentForm.is_icici_upi_collect_enabled
    })
      .then((response) => {
        Notify('Successfully Updated City Payment', 'success')
        this.setState({ updatingCityPayment: false })
        this.props.history.push(`/home/manage-city-payment/${this.props.match.params.cityId}`)
      })
      .catch((err) => {
        console.log("Error in Updating City Payment", err)
        this.setState({ updatingCityPayment: false })
      })
  }

  render () {
    return (
      <React.Fragment>
        <CityPaymentForm
          ref={(node) => { this.CityPaymentForm = node }}
          data={this.props.location.state}
          cityId={this.props.match.params.cityId}
          disableSave={this.state.updatingCityPayment}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default EditCityPayment