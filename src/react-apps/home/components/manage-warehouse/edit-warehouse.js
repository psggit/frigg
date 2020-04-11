import React from "react"
import WareHouseForm from "./warehouse-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class EditWareHouse extends React.Component {
  constructor () {
    super()
    this.state = {
      updatingWarehouse: false,
    }
    this.handleSave = this.handleSave.bind(this)
  }
  
  handleSave () {
    const warehouseFormData = this.warehouseForm.getData()
    this.setState({ updatingWarehouse: true })
    Api.updateWarehouse({
      id: this.props.location.state.id,
      name: warehouseFormData.name,
      city_id: parseInt(warehouseFormData.selectedCityIdx),
      locality_id: parseInt(warehouseFormData.selectedLocalityIdx),
      gps_x_cordinate: parseFloat(warehouseFormData.gps_x_coordinate),
      gps_y_cordinate: parseFloat(warehouseFormData.gps_y_coordinate),
      //old_locality_id: this.props.location.state.locality_id
    })
      .then((response) => {
        Notify('Successfully updated warehouse', 'success')
        this.setState({updatingWarehouse: false })
        this.props.history.push("/home/manage-warehouse")
      })
      .catch((err) => {
        console.log("Error in updating warehouse", err)
        this.setState({ updatingWarehouse: false })
      })
  }

  render () {
    return (
      <React.Fragment>
        <WareHouseForm
          ref={(node) => { this.warehouseForm = node }}
          disableSave={this.state.updatingWarehouse}
          data={this.props.location.state}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default EditWareHouse
