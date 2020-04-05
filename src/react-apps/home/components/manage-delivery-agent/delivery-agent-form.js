import React from "react"
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../../middleware/api"


class DeliveryAgentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedWarehouseIdx: props.data ? props.data.warehouse_id : "",
      warehouseList: [],
      name: props.data ? props.data.name : "",
      employeeId: props.data ? props.data.employee_id : "",
      gcmToken: props.data ? props.data.gcm_token : "",
      contactNumber: props.data ? props.data.contact_number : "",
      dob: props.data ? props.data.dob: "",
      vehicleNumber: props.data ? props.data.vehicle_number : "",
      vehicleVolumeCapacity: props.data ? props.data.vehicle_volume_capacity : "",
      considerVehicleVolumeCapacity: props.data ? props.data.consider_vehicle_volume_capacity : false,
      vehicleOrderCapacity: props.data ? props.data.vehicle_order_capacity : "",
      isActive: props.data ? props.data.is_active : false,
      considerVehicleOrderCapacity: props.data ? props.data.consider_vehicle_order_capacity : false,
      vehicleSkuCapacity: props.data ? props.data.vehicle_sku_capacity : "",
      considerVehicleSkuCapacity: props.data ? props.data.consider_vehicle_sku_capacity : false,
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.getData = this.getData.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleWarehouseChange = this.handleWarehouseChange.bind(this)
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.warehouseList !== newProps.warehouseList) {
  //     this.setState({
  //       warehouseList: newProps.warehouseList,
  //       selectedWarehouseIdx: !this.state.selectedWarehouseIdx ? newProps.warehouseList[0].value : this.state.selectedWarehouseIdx
  //     })
  //   }
  // }

  componentDidMount () {
    Api.fetchWarehouseList({
      pagination: {
        limit: 1000,
        offset: 0
      }
    })
    .then((response) => {
      this.setState({
        warehouseList: response.message
      })
    })
    .catch((error) => {
      console.log("Error in fetching warehouse list", error)
    })
  }

  handleTextFields (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleWarehouseChange (e, k) {
    this.setState({
      selectedWarehouseIdx: (this.state.warehouseList[k].id)
    })
  }

  handleDate (e) {
    const d = new Date(e.target.value)
    this.setState({ [e.target.name]: d.toISOString() })
  }

  handleCheckboxChange (e) {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  getData () {
    return this.state
  }

  handleSave () {
    this.props.handleSave()
  }

  render () {
    return (
      <React.Fragment>
        <Card style={{
          padding: '20px',
          width: '300px',
          position: 'relative',
          display: 'block',
          verticalAlign: 'top',
          marginRight: '20px'
        }}
        >
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Delivery Agent Details</h4>
          <form>
            <div className="form-group">
              <label className="label">WareHouse ID</label><br />
              <SelectField
                value={this.state.selectedWarehouseIdx}
                onChange={this.handleWarehouseChange}
              >
                {
                   this.state.warehouseList.map((item, i) => (
                    <MenuItem
                      value={item.id}
                      key={item.id}
                      primaryText={item.name}
                    />
                  ))
                }
              </SelectField>
            </div>

            <div className="form-group">
              <label className="label">Name</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="name"
                value={this.state.name}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Employee ID</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="employeeId"
                value={this.state.employeeId}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Gcm Token</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="gcmToken"
                value={this.state.gcmToken}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Contact Number</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="contactNumber"
                value={this.state.contactNumber}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">DOB</label><br />
              <input
                type="date"
                onChange={this.handleDate}
                defaultValue={this.state.dob.slice(0,10)}
                className="inline-input"
                name="dob"
                style={{
                  width: '100%',
                  marginTop: '10px',
                  border: '0',
                  borderBottom: '1px solid #9b9b9b',
                  fontSize: '14px',
                  padding: '5px 0'
                }}
                required
              />
            </div>

            <div className="form-group">
              <label className="label">Vehicle Number</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="vehicleNumber"
                value={this.state.vehicleNumber}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Vehicle Volume Capacity</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="vehicleVolumeCapacity"
                value={this.state.vehicleVolumeCapacity}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Vehicle Order Capacity</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="vehicleOrderCapacity"
                value={this.state.vehicleOrderCapacity}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Vehicle SKU Capacity</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="vehicleSkuCapacity"
                value={this.state.vehicleSkuCapacity}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="is_active"
                name="isActive"
                checked={this.state.isActive}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Vehicle Order Capacity"
                name="considerVehicleOrderCapacity"
                checked={this.state.considerVehicleOrderCapacity}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Vehicle Volume Capacity"
                name="considerVehicleVolumeCapacity"
                checked={this.state.considerVehicleVolumeCapacity}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Vehicle SKU Capacity"
                name="considerVehicleSkuCapacity"
                checked={this.state.considerVehicleSkuCapacity}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <RaisedButton
                label="Save"
                primary
                disabled={this.props.disableSave}
                onClick={this.handleSave}
              />
            </div>
          </form>
        </Card>
      </React.Fragment>
    )
  }
}

export default DeliveryAgentForm