import React from "react"
import { Card } from 'material-ui/Card'
import * as Api from "../../middleware/api"
import TextField from 'material-ui/TextField'
import Notify from "@components/Notification"
import RaisedButton from 'material-ui/RaisedButton'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'

class MapDeliveryAgentToWarehouseForm extends React.Component {

  constructor () {
    super()

    this.state = {
      mappingDAToWarehouse: false,
      warehouseId: "",
      deliveryAgentId: "",
      disableSave: false,
      disableDelete: true,
      showConfirmDialog: false,
      message: ""
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.mountConfirmDialog = this.mountConfirmDialog.bind(this)
    this.unmountConfirmDialog = this.unmountConfirmDialog.bind(this)
    this.mapDeliveryAgentToWarehouse = this.mapDeliveryAgentToWarehouse.bind(this)
  }

  handleTextFields (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDelete () {
    this.setState({ mappingDAToWarehouse: true })
    console.log("Value from delete", this.state.deliveryAgentId)
    Api.deleteDeliveryAgentMappedToWarehouse({
      da_id: parseInt(this.state.deliveryAgentId),
      warehouse_id: parseInt(this.state.warehouseId)
    })
      .then((response) => {
        Notify('Deleted Succesfully', 'success')
        setTimeout(() => {
          location.reload()
        }, 300)
        this.setState({ mappingDAToWarehouse: false, disableSave: false, disableDelete: true })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ mappingDAToWarehouse: false })
      })
  }

  handleSave () {
    Api.fetchWarhouseCount({
      da_id: parseInt(this.state.deliveryAgentId),
    })
    .then((response) => {
      console.log("response", response)
      if (!response.is_mapped) this.mapDeliveryAgentToWarehouse()
      else {
        this.setState({ message: response.message})
        this.mountConfirmDialog()
      }
    })
    .catch((error) => {
      error.response.json().then((json) => {
        Notify(json.message, "warning")
      })
      console.log("Error fetching warehouse count", error)
    })
  }

  mountConfirmDialog () {
    this.setState({ showConfirmDialog: true })
  }

  unmountConfirmDialog () {
    this.setState({ showConfirmDialog: false })
  }

  mapDeliveryAgentToWarehouse () {
    this.setState({ mappingDAToWarehouse: true, showConfirmDialog: false })
    Api.mapDeliveryAgentToWarehouse({
      da_id: parseInt(this.state.deliveryAgentId),
      warehouse_id: parseInt(this.state.warehouseId)
    })
      .then((response) => {
        Notify('Successfully mapped', 'success')
        this.setState({ mappingDAToWarehouse: false, disableSave: true, disableDelete: false })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        //Notify("Error in mapping DA to warehouse", "warning")
        this.setState({ mappingDAToWarehouse: false })
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
            disabled={this.state.mappingDAToWarehouse || this.state.disableSave}
            onClick={this.handleSave}
          />
          <RaisedButton
            label="Delete"
            primary
            disabled={this.state.mappingDAToWarehouse || this.state.disableDelete}
            onClick={this.handleDelete}
            style={{marginLeft:"50px"}}
          />
        </div>
        {
          this.state.showConfirmDialog &&
          <ModalBox>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalBody>{this.state.message}</ModalBody>
            <ModalFooter>
              <button className="btn btn-secondary" onClick={() => this.unmountConfirmDialog()}> Cancel </button>
              <button className="btn btn-secondary" onClick={() => this.mapDeliveryAgentToWarehouse()}> Confirm </button>
            </ModalFooter>
          </ModalBox>
        }
      </Card>
    )
  }
}

export default MapDeliveryAgentToWarehouseForm