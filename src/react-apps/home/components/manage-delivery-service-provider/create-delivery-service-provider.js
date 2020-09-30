import React from "react"
//import WareHouseForm from "./warehouse-form"
import DeliveryServiceProviderForm from "./delivery-service-provider-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class CreateDeliveryServiceProvider extends React.Component {
  constructor() {
    super()
    this.state = {
      creatingDeliveryServiceProvider: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    const serviceProviderFormData = this.DeliveryServiceProviderForm.getData()
    console.log("service-provider form data", serviceProviderFormData)
    this.setState({ creatingDeliveryServiceProvider: true })
    Api.createDeliveryServiceProvider({
      delivery_service_provider_name: serviceProviderFormData.name,
    })
      .then((response) => {
        Notify(response.message, 'success')
        this.setState({ creatingDeliveryServiceProvider: false })
        this.props.history.push("/home/manage-delivery-service-provider")
      })
      .catch((err) => {
        console.log("Error in creating delivery service provider", err)
        this.setState({ creatingDeliveryServiceProvider: false })
      })
  }

  render() {
    return (
      <React.Fragment>
        <DeliveryServiceProviderForm
          ref={(node) => { this.DeliveryServiceProviderForm = node }}
          disableSave={this.state.creatingDeliveryServiceProvider}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default CreateDeliveryServiceProvider