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

class MapDeliveryAgentToLocalityForm extends React.Component {

  constructor () {
    super()

    this.state = {
      mappingDAToLocality: false,
      localityId: "",
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
    this.mapDeliveryAgentToLocality = this.mapDeliveryAgentToLocality.bind(this)
  }

  handleTextFields (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDelete () {
    this.setState({ mappingDAToLocality: true })
    console.log("Value from delete", this.state.deliveryAgentId)
    Api.deleteDeliveryAgentMappedToLocality({
      delivery_agent_id: parseInt(this.state.deliveryAgentId),
      locality_id: parseInt(this.state.localityId)
    })
      .then((response) => {
        Notify(response.message, 'success')
        setTimeout(() => {
          location.reload()
        }, 300)
        this.setState({ mappingDAToLocality: false, disableSave: false, disableDelete: true })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ mappingDAToLocality: false })
      })
  }

  handleSave () {
    Api.fetchLocalityCount({
      delivery_agent_id: parseInt(this.state.deliveryAgentId),
    })
    .then((response) => {
      console.log("response", response)
      if (!response.is_mapped) this.mapDeliveryAgentToLocality()
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

  mapDeliveryAgentToLocality () {
    this.setState({ mappingDAToLocality: true, showConfirmDialog: false })
    Api.mapDeliveryAgentToLocality({
      delivery_agent_id: parseInt(this.state.deliveryAgentId),
      locality_id: parseInt(this.state.localityId)
    })
      .then((response) => {
        Notify(response.message, 'success')
        this.setState({ mappingDAToLocality: false, disableSave: true, disableDelete: false })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        //Notify("Error in mapping DA to warehouse", "warning")
        this.setState({ mappingDAToLocality: false })
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
        marginBottom:"30px",
        zIndex: "auto"
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
          <label className="label">Locality ID</label><br />
          <TextField
            disabled={false}
            name="localityId"
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
        </div>
        <div className="form-group">
          <RaisedButton
            label="Save"
            primary
            disabled={this.state.mappingDAToLocality || this.state.disableSave}
            onClick={this.handleSave}
          />
          <RaisedButton
            label="Delete"
            primary
            disabled={this.state.mappingDAToLocality || this.state.disableDelete}
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
              <button className="btn btn-secondary" onClick={() => this.mapDeliveryAgentToLocality()}> Confirm </button>
            </ModalFooter>
          </ModalBox>
        }
      </Card>
    )
  }
}

export default MapDeliveryAgentToLocalityForm