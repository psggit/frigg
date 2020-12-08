import React from "react"
import WareHouseForm from "./warehouse-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class CreateWareHouse extends React.Component {
  constructor () {
    super()
    this.state = {
      creatingWarehouse: false
    }
    this.handleSave = this.handleSave.bind(this)
  }
  
  handleSave () {
    const warehouseFormData = this.warehouseForm.getData()
    console.log("warehouse form data", warehouseFormData)
    this.setState({ creatingWarehouse: true })
    Api.createDenomination({
      name: warehouseFormData.name,
      city_id: parseInt(warehouseFormData.selectedCityIdx),
      //locality_id: parseInt(warehouseFormData.selectedLocalityIdx),
      gps_x_cordinate: parseFloat(warehouseFormData.gps_x_coordinate),
      gps_y_cordinate: parseFloat(warehouseFormData.gps_y_coordinate)
    })
      .then((response) => {
        Notify('Successfully created warehouse', 'success')
        this.setState({ creatingWarehouse: false })
        this.props.history.push("/home/manage-warehouse")
      })
      .catch((err) => {
        console.log("Error in creating warehouse", err)
        this.setState({ creatingWarehouse: false })
      })
  }

  render () {
    return (
      <React.Fragment>
        <WareHouseForm
          ref={(node) => { this.warehouseForm = node }}
          disableSave={this.state.creatingWarehouse}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default CreateWareHouse