import React from "react"
import { Card } from 'material-ui/Card'
import * as Api from "./../../middleware/api"
// import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import Notify from "@components/Notification"
// import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

class MapRetailerToWarehouse extends React.Component {

  constructor () {
    super()

    this.state = {
      mappingRetailerToWarehouse: false,
      // selectedCityIdx: "",
      warehouseId: "",
      retailerId: "",
      // cityList: [],
      // retailerList: [],
      // warehouseList: []
    }

    // this.handleRetailerChange = this.handleRetailerChange.bind(this) 
    // this.handleWarehouseChange = this.handleWarehouseChange.bind(this)
    // this.handleCityChange = this.handleCityChange.bind(this) 
    this.handleTextFields = this.handleTextFields.bind(this)
    // this.fetchRetailerList = this.fetchRetailerList.bind(this)
    // this.fetchWarehouseList = this.fetchWarehouseList.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  // componentDidMount () {
  //   this.fetchCities()
  // }

  // fetchCities () {
  //   Api.fetchCities({
  //     data: {
  //       state_short_name: null,
  //       is_available: false,
  //       offset: 0,
  //       limit: 1000,
  //       deliverable_city: true,
  //       no_filter: true
  //     }
  //   })
  //   .then((response) => {
  //     this.setState({
  //       cityList: response.cities,
  //       selectedCityIdx: response.cities[0].id
  //     })
  //     this.fetchRetailerList()
  //     this.fetchWarehouseList()
  //   })
  //   .catch((error) => {
  //     console.log("Error in fetching cities list", error)
  //   })
  // }

  // handleRetailerChange (e, k) {
  //   const retailerId = this.state.retailerList[k].id
  //   this.setState({ retailerId })
  // }

  // handleWarehouseChange (e, k) {
  //   const warehouseId = this.state.warehouseList[k].id
  //   this.setState({ warehouseId })
  // }

  // handleCityChange (e, k) {
  //   const selectedCityIdx = this.state.cityList[k].id
  //   this.setState({ selectedCityIdx }, () => {
  //     this.fetchRetailerList()
  //     this.fetchWarehouseList()
  //   })
  // }

  handleTextFields (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  // fetchRetailerList () {
  //   Api.fetchRetailers({
  //     data: {
  //       city_id: parseInt(this.state.selectedCityIdx),
  //       is_available: false,
  //       offset: 0,
  //       limit: 1000,
  //       no_filter: false
  //     }
  //   })
  //   .then((response) => {
  //     this.setState({
  //       retailerList: response.retailer_data,
  //       retailerId: response.retailer_data[0].id
  //     })
  //   })
  //   .catch((error) => {
  //     console.log("Error in fetching retailer list", error)
  //   })
  // }

  // fetchWarehouseList () {
  //   Api.fetchWarehouses({
  //     pagination: { "limit": 1000, "offset": 0 },
  //     filter: { "field": "city_id", "value": this.state.selectedCityIdx.toString() }
  //   })
  //   .then((response) => {
  //     this.setState({
  //       warehouseList: response.message,
  //       warehouseId: response.message[0].id
  //     })
  //   })
  //   .catch((error) => {
  //     console.log("Error in fetching warehouse list", error)
  //   })
  // }

  handleSave () {
    this.setState({ mappingRetailerToWarehouse: true})
    Api.mapRetailerToWarehouse({
      retailer_id: parseInt(this.state.retailerId),
      warehouse_id: parseInt(this.state.warehouseId)
    })
    .then((response) => {
      Notify('Successfully mapped', 'success')
      this.setState({ mappingRetailerToWarehouse: false })
      this.props.history.push(`/home/retailer-warehouse-mapping?id=${this.state.retailerId}&optionIdx=1`)
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
        marginRight: '20px'
      }}
      >
        <h4 style={{ margin: '0', marginBottom: '40px' }}>Map retailer to warehouse</h4>
        {/* <div className="form-group">
          <label className="label">City</label><br />
          <SelectField
            value={this.state.selectedCityIdx}
            onChange={this.handleCityChange}
          >
            {
              this.state.cityList.map((item, i) => (
                <MenuItem
                  value={item.id}
                  key={parseInt(item.id)}
                  primaryText={item.name}
                />
              ))
            }
          </SelectField>
        </div> */}
        <div className="form-group">
          <label className="label">Retailer</label><br />
          <TextField
            disabled={false}
            name="retailerId"
            //defaultValue={this.state.retailerId}
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
            {/* {
              this.state.retailerList.map((item, i) => (
                <MenuItem
                  value={item.id}
                  key={parseInt(item.id)}
                  primaryText={item.retailer_name}
                />
              ))
            }
          </SelectField> */}
        </div>
        <div className="form-group">
          <label className="label">Warehouse</label><br />
          <TextField
            disabled={false}
            name="warehouseId"
            //defaultValue={this.state.warehouseId}
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
          {/* <SelectField
            value={this.state.warehouseId}
            onChange={this.handleWarehouseChange}
          >
            {
              this.state.warehouseList.map((item, i) => (
                <MenuItem
                  value={item.id}
                  key={parseInt(item.id)}
                  primaryText={item.name}
                />
              ))
            }
          </SelectField> */}
        </div>
        <div className="form-group">
          <RaisedButton
            label="Save"
            primary
            disabled={this.state.mappingRetailerToWarehouse}
            onClick={this.handleSave}
          />
        </div>
      </Card>
    )
  }
}

export default MapRetailerToWarehouse