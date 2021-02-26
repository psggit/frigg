import React from "react"
import EditDeliveryAgentForm from "./delivery-agent-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class EditDeliveryAgent extends React.Component {
  constructor () {
    super()
    this.state = {
      updatingDeliveryagent: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave () {
    const deliveryAgentForm = this.deliveryAgentForm.getData()
    this.setState({ updatingDeliveryagent: true })
    Api.updateDeliveryagent({
      id:this.props.location.state.id,
      name: deliveryAgentForm.name,
      city_id: parseInt(deliveryAgentForm.selectedCityIdx),
      employee_id: deliveryAgentForm.employeeId,
      gcm_token: deliveryAgentForm.gcmToken,
      max_travel_distance: parseFloat(deliveryAgentForm.maxTravelDistance),
      dob: deliveryAgentForm.dob.slice(0,10),
      vehicle_number: deliveryAgentForm.vehicleNumber,
      vehicle_volume_capacity: parseInt(deliveryAgentForm.vehicleVolumeCapacity),
      consider_vehicle_volume_capacity: deliveryAgentForm.considerVehicleVolumeCapacity,
      vehicle_order_capacity: parseInt(deliveryAgentForm.vehicleOrderCapacity),
      consider_vehicle_order_capacity: deliveryAgentForm.considerVehicleOrderCapacity,
      vehicle_sku_capacity: parseInt(deliveryAgentForm.vehicleSkuCapacity),
      consider_vehicle_sku_capacity: deliveryAgentForm.considerVehicleSkuCapacity,
      radial_distance: parseFloat(deliveryAgentForm.radialDistance),
      // subsequent_distance: parseFloat(deliveryAgentForm.subsequentDistance),
      consider_radial_batching: deliveryAgentForm.selectedBatching.includes("RadialBatching") ? true : false,
      // consider_subsequent_batching: deliveryAgentForm.selectedBatching.includes("SubsequentBatching") ? true : false,
      service_provider: deliveryAgentForm.serviceProvider,
      consider_da_max_travel_distance: deliveryAgentForm.considerDaMaxTravelDistance,
      deliver_pod_order: deliveryAgentForm.deliverPodOrder,

    })
      .then((response) => {
        console.log("message")
        Notify('Successfully updated Delivery Agent', 'success')
        this.setState({ updatingDeliveryagent: false })
        this.props.history.push("/home/delivery-agent/")
      })
      .catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        console.log("Error in updating delivery agent", err)
        this.setState({ updatingDeliveryagent: false })
      })
  }


  render () {
    return (
      <React.Fragment>
        <EditDeliveryAgentForm
          ref={(node) => { this.deliveryAgentForm = node }}
          data={this.props.location.state}
          // disableContactNumber={true}
          // disableIsActive={true}
          disableSave={this.state.updatingDeliveryagent}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default EditDeliveryAgent