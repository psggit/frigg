import React from "react"
import DeliveryServiceProviderForm from "./delivery-service-provider-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class EditDeliveryServiceProvider extends React.Component {
  constructor() {
    super()
    this.state = {
      updatingDeliveryServiceProvider: false,
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    const serviceProviderFormData = this.DeliveryServiceProviderForm.getData()
    this.setState({ updatingDeliveryServiceProvider: true })
    Api.updateDeliveryServiceProvider({
      delivery_service_provider_id: this.props.location.state.delivery_service_provider_id,
      delivery_service_provider_name: serviceProviderFormData.name,
    })
      .then((response) => {
        Notify(response.message, 'success')
        this.setState({ updatingDeliveryServiceProvider: false })
        this.props.history.push("/home/manage-delivery-service-provider")
      })
      .catch((err) => {
        console.log("Error in updating delivery service provider", err)
        this.setState({ updatingDeliveryServiceProvider: false })
      })
  }

  render() {
    return (
      <React.Fragment>
        <DeliveryServiceProviderForm
          ref={(node) => { this.DeliveryServiceProviderForm = node }}
          disableSave={this.state.updatingDeliveryServiceProvider}
          data={this.props.location.state}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default EditDeliveryServiceProvider
