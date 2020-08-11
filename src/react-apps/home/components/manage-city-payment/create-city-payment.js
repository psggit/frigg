import React from "react"
import CityPaymentForm from "../manage-city-payment/city-payment-form"
import * as Api from "../../middleware/api"
import Notify from "@components/Notification"

class createCityPayment extends React.Component {
  constructor () {
    super()
    this.state = {
      creatingCityPayment: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave () {
    const CityPaymentForm = this.CityPaymentForm.getData()
    this.setState({ creatingCityPayment: true })
    Api.createCityPayment({
      city_id: parseInt(this.props.match.params.cityId),
      upi_time_limit: parseInt(CityPaymentForm.upiTimeLimit),
      upi_low_rate_message: CityPaymentForm.upiLowRateMessage,
      // app_type: CityPaymentForm.selectedAppTypeIdx === 1 ? "android" : "ios",
      app_type:CityPaymentForm.app_type,
      jp_payment_method: CityPaymentForm.selectedJPPaymentMethodIdx === 1 ? "wallet" : "nodal",
      icici_payment_method: CityPaymentForm.selectedICICIPaymentMethodIdx === 1 ? "dmo-wallet" : "nodal",
      is_card_enabled: CityPaymentForm.isCardEnabled,
      is_nb_enabled: CityPaymentForm.isNBEnabled,
      is_upi_low_success_rate: CityPaymentForm.isUpiLowSuccessRate,
      is_upi_collect_low_success_rate: CityPaymentForm.isUpiCollectLowSuccessRate,
      is_jp_upi_collect_enabled: CityPaymentForm.isJPUpiCollectEnabled,
      is_icici_upi_intent_enabled: CityPaymentForm.is_icici_upi_intent_enabled,
      is_icici_upi_collect_enabled: CityPaymentForm.is_icici_upi_collect_enabled
    })
      .then((response) => {
        Notify('Successfully created City Payment', 'success')
        this.setState({ creatingCityPayment: false })
        this.props.history.push(`/home/manage-city-payment/${this.props.match.params.cityId}`)
      })
      .catch((err) => {
        console.log("Error in creating City Payment", err)
        this.setState({ creatingCityPayment: false })
      })
  }

  render () {
    return (
      <React.Fragment>
        <CityPaymentForm
          ref={(node) => { this.CityPaymentForm = node }}
          cityId={this.props.match.params.cityId}
          disableSave={this.state.creatingCityPayment}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default createCityPayment