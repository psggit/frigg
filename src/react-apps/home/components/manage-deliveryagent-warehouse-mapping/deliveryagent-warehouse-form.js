import React from "react"
import { Card } from 'material-ui/Card'
import * as Api from "../../middleware/api"
import TextField from 'material-ui/TextField'
import Notify from "@components/Notification"
import RaisedButton from 'material-ui/RaisedButton'

class MapDeliveryAgentToWarehouseForm extends React.Component {

  constructor () {
    super()

    this.state = {
      mappingRetailerToWarehouse: false,
      warehouseId: "",
      deliveryAgentId: "",
      disableSave: false,
      disableDelete: true,
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleTextFields (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDelete () {
    this.setState({ mappingRetailerToWarehouse: true })
    console.log("Value from delete", this.state.deliveryAgentId)
    Api.deleteDeliveryAgentMappedToWarehouse({
      da_id: parseInt(this.state.deliveryAgentId),
      warehouse_id: parseInt(this.state.warehouseId)
    })
      .then((response) => {
        Notify('Deleted Succesfully', 'success')
        this.setState({ mappingRetailerToWarehouse: false, disableSave: false, disableDelete: true })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ mappingRetailerToWarehouse: false })
      })
  }

  handleSave () {
    this.setState({ mappingRetailerToWarehouse: true })
    Api.mapDeliveryAgentToWarehouse({
      da_id: parseInt(this.state.deliveryAgentId),
      warehouse_id: parseInt(this.state.warehouseId)
    })
      .then((response) => {
        Notify('Successfully mapped', 'success')
        this.setState({ mappingRetailerToWarehouse: false, disableSave: true, disableDelete: false })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ mappingRetailerToWarehouse: false })
      })
  }

  render () {
    return (
      <Card style={{
        padding: '20px',
        width: '300px',
        position: 'relative',
        display: 'block',
        verticalAlign: 'top',
        marginRight: '30px',
        marginBottom:"30px"
      }}
      >
        <div className="form-group">
          <label className="label">Delivery Agent ID</label><br />
          <TextField
            disabled={false}
            name="deliveryAgentId"
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
        </div>
        <div className="form-group">
          <label className="label">Warehouse ID</label><br />
          <TextField
            disabled={false}
            name="warehouseId"
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
        </div>
        <div className="form-group">
          <RaisedButton
            label="Save"
            primary
            disabled={this.state.mappingRetailerToWarehouse || this.state.disableSave}
            onClick={this.handleSave}
          />
          <RaisedButton
            label="Delete"
            primary
            disabled={this.state.mappingRetailerToWarehouse || this.state.disableDelete}
            onClick={this.handleDelete}
            style={{marginLeft:"50px"}}
          />
        </div>
      </Card>
    )
  }
}

export default MapDeliveryAgentToWarehouseForm