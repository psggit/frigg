import React from "react"
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../../middleware/api"
import PropTypes from 'prop-types'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

// DeliveryAgentForm.propTypes = {
//   data: PropTypes.any,
// }

class DeliveryAgentForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedCityIdx: props.data ? props.data.city_id : "",
      cityList: [],
      serviceProviderList: [],
      serviceProvider: props.data ? props.data.service_provider : "",
      name: props.data ? props.data.name : "",
      employeeId: props.data ? props.data.employee_id : "",
      gcmToken: props.data ? props.data.gcm_token : "",
      contactNumber: props.data ? props.data.contact_number : "",
      dob: props.data ? props.data.dob: "",
      radialDistance: props.data ? props.data.radial_distance: "",
      maxTravelDistance: props.data ? props.data.max_travel_distance: "",
      // subsequentDistance: props.data ? props.data.subsequent_distance: "",
      vehicleNumber: props.data ? props.data.vehicle_number : "",
      vehicleVolumeCapacity: props.data ? props.data.vehicle_volume_capacity : "",
      considerVehicleVolumeCapacity: props.data ? props.data.consider_vehicle_volume_capacity : false,
      vehicleOrderCapacity: props.data ? props.data.vehicle_order_capacity : "",
      isActive: props.data ? props.data.is_active : false,
      considerVehicleOrderCapacity: props.data ? props.data.consider_vehicle_order_capacity : false,
      vehicleSkuCapacity: props.data ? props.data.vehicle_sku_capacity : "",
      considerVehicleSkuCapacity: props.data ? props.data.consider_vehicle_sku_capacity : false,
      considerDaMaxTravelDistance: props.data ? props.data.consider_da_max_travel_distance : false,
      deliverPodOrder: props.data ? props.data.deliver_pod_order: false,
      selectedBatching: props.data ? props.data.consider_radial_batching ? "considerRadialBatching" : "" : ""
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleDecimalFields = this.handleDecimalFields.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.getData = this.getData.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.handleServiceProviderChange = this.handleServiceProviderChange.bind(this)
  }

  // componentWillReceiveProps(newProps) {
  //   if (this.props.warehouseList !== newProps.warehouseList) {
  //     this.setState({
  //       warehouseList: newProps.warehouseList,
  //       selectedWarehouseIdx: !this.state.selectedWarehouseIdx ? newProps.warehouseList[0].value : this.state.selectedWarehouseIdx
  //     })
  //   }
  // }

  componentDidMount() {
    this.fetchCityList()
    this.fetchServiceProviderList()
  } 

  fetchCityList() {
    Api.fetchCities({
      data: {
        state_short_name: null,
        is_available: false,
        offset: 0,
        limit: 1000,
        deliverable_city: true,
        no_filter: true
      }
    })
      .then((response) => {
        this.setState({
          cityList: response.cities,
          loadingCityList: false,
          selectedCityIdx: !this.state.selectedCityIdx ? response.cities[0].id : this.state.selectedCityIdx
        })
        // this.fetchLocalityList({
        //   pagination: { "limit": 1000, "offset": 0 },
        //   filter: { "field": "city_id", "value": !this.state.selectedCityIdx ? response.cities[0].id.toString() : this.state.selectedCityIdx.toString() }
        // })
      })
      .catch((error) => {
        this.setState({ loadingCityList: false })
        console.log("Error in fetching city list", error)
      })
  }

  fetchServiceProviderList() {
    Api.fetchServiceProvider()
    .then((response) => {
      this.setState({
        serviceProviderList: response.service_providers,
        serviceProvider: !this.state.serviceProvider ? response.service_providers[0].service_provider : this.state.serviceProvider
      })
    })
    .catch((error) => {
      console.log("Error in fetching service provider list", error)
    })
  }

  // componentDidMount () {
  //   Api.fetchWarehouseList({
  //     pagination: {
  //       limit: 1000,
  //       offset: 0
  //     }
  //   })
  //   .then((response) => {
  //     this.setState({
  //       warehouseList: response.message
  //     })
  //   })
  //   .catch((error) => {
  //     console.log("Error in fetching warehouse list", error)
  //   })
  // }

  handleTextFields (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDecimalFields (e) {
    const regex = /^[0-9.\b]*$/;

    if (regex.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleRadioChange(e, value) {
    this.setState({
      selectedBatching: value
    })
  }

  handleCityChange(e, k) {
    this.setState({
      selectedCityIdx: (this.state.cityList[k].id),
    })
  }

  handleServiceProviderChange(e,k) {
    console.log("from handleServiceProvider", this.state.serviceProviderList[k].service_provider)
    this.setState({
      serviceProvider: (this.state.serviceProviderList[k].service_provider)
    })
  }

  // handleWarehouseChange (e, k) {
  //   this.setState({
  //     selectedWarehouseIdx: (this.state.warehouseList[k].id)
  //   })
  // }

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
              <label className="label">City ID</label><br />
              <SelectField
                value={this.state.selectedCityIdx}
                onChange={this.handleCityChange}
              >
                {
                  this.state.cityList.map((item, i) => (
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
                disabled={location.pathname.includes("edit")}
                value={this.state.contactNumber}
                style={{ width: '100%' }}
              />
            </div>
            {/* <div className="form-group">
              <label className="label">Subsequent Distance</label><br />
              <TextField
                onChange={this.handleDecimalFields}
                name="subsequentDistance"
                //disabled={location.pathname.includes("edit")}
                value={this.state.subsequentDistance}
                style={{ width: '100%' }}
              />
            </div> */}
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
              <label className="label">Radial Distance (Km)</label><br />
              <TextField
                onChange={this.handleDecimalFields}
                name="radialDistance"
                //disabled={location.pathname.includes("edit")}
                value={this.state.radialDistance}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Service Provider</label><br />
              <SelectField
                value={this.state.serviceProvider}
                onChange={this.handleServiceProviderChange}
              >
                {
                  this.state.serviceProviderList.map((item, i) => (
                    <MenuItem
                      value={item.service_provider}
                      key={item.service_provider}
                      primaryText={item.service_provider_name}
                    />
                  ))
                }
              </SelectField>
            </div>

            <div className="form-group">
              <label className="label">Max distance from the order to be considered as Potential DA (Km)</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="maxTravelDistance"
                value={this.state.maxTravelDistance}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Consider DA's Maximum Distance limit for being a Potential DA [Not selecting this will take the  Locality’s DA Distance Limit]"
                name="considerDaMaxTravelDistance"
                checked={this.state.considerDaMaxTravelDistance}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="is_active"
                name="isActive"
                disabled={location.pathname.includes("edit")}
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
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Deliver POD Order"
                name="deliverPodOrder"
                checked={this.state.deliverPodOrder}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <RadioButtonGroup name="selectedBatching" onChange={this.handleRadioChange} defaultSelected={this.state.selectedBatching}>
                <RadioButton
                  label="Consider Radial Batching"
                  value="considerRadialBatching"
                  //defaultSelected={this.state.selectedBatching}
                />
                {/* <RadioButton
                  label="considerSubsequentBatching"
                  value="considerSubsequentBatching"
                  //defaultSelected={this.state.selectedBatching}
                /> */}
                <RadioButton
                  label="None"
                  value=""
                //defaultSelected={this.state.selectedBatching}
                />
              </RadioButtonGroup>
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