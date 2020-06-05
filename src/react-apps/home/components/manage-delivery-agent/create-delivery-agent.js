import React from "react"
import CreateDeliveryAgentForm from "./delivery-agent-form"
import * as Api from "../../middleware/api"
import Notify from "@components/Notification"

class CreateDeliveryAgent extends React.Component {
  constructor () {
    super()
    this.state = {
      creatingDeliveryagent: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave () {
    const deliveryAgentForm = this.deliveryAgentForm.getData()
    this.setState({ creatingDeliveryagent: true })
    Api.createDeliveryagent({
      name: deliveryAgentForm.name,
      // warehouse_id: parseInt(deliveryAgentForm.selectedWarehouseIdx),
      employee_id: deliveryAgentForm.employeeId,
      gcm_token: deliveryAgentForm.gcmToken,
      contact_number: deliveryAgentForm.contactNumber,
      is_active: deliveryAgentForm.isActive,
      dob: deliveryAgentForm.dob,
      vehicle_number:deliveryAgentForm.vehicleNumber,
      vehicle_volume_capacity: parseInt(deliveryAgentForm.vehicleVolumeCapacity),
      consider_vehicle_volume_capacity: deliveryAgentForm.considerVehicleVolumeCapacity,
      vehicle_order_capacity: parseInt(deliveryAgentForm.vehicleOrderCapacity),
      consider_vehicle_order_capacity: deliveryAgentForm.considerVehicleOrderCapacity,
      vehicle_sku_capacity: parseInt(deliveryAgentForm.vehicleSkuCapacity),
      consider_vehicle_sku_capacity: deliveryAgentForm.considerVehicleSkuCapacity
    })
      .then((response) => {
        Notify('Successfully created Delivery Agent', 'success')
        this.setState({ creatingDeliveryagent: false })
        this.props.history.push("/home/delivery-agent/")
      })
      .catch((err) => {
        console.log("Error in creating delivery agent", err)
        this.setState({ creatingDeliveryagent: false })
      })
  }

  render () {
    return (
      <React.Fragment>
        <CreateDeliveryAgentForm
          ref={(node) => { this.deliveryAgentForm = node }}
          data={this.props.location.state}
          disableSave={this.state.creatingWarehouse}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default CreateDeliveryAgent