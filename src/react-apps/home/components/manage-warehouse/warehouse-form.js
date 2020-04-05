import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import * as Api from "./../../middleware/api"

class WareHouseForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedCityIdx: props.data ? props.data.city_id : "",
      selectedLocalityIdx: props.data ? props.data.locality_id : "",
      cityList: [],
      loadingCityList: true,
      localityList: [],
      cityMap: {},
      name: props.data ? props.data.name: "",
      gps_x_coordinate: props.data ? props.data.gps_x_cordinate : "",
      gps_y_coordinate: props.data ? props.data.gps_y_cordinate : "",
      
      nameErr: {
        status: false,
        value: ""
      },
      gpsXCoordinateErr: {
        status: false,
        value: ""
      },
      gpsYCoordinateErr: {
        status: false,
        value: ""
      }
    }

    this.getData = this.getData.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleLocalityChange = this.handleLocalityChange.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.fetchLocalityList = this.fetchLocalityList.bind(this)
    this.fetchCityList = this.fetchCityList.bind(this)
  }

  componentDidMount () {
    this.fetchCityList()
  }

  fetchCityList () {
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
        selectedCityIdx: !this.state.selectedCityIdx ? response.cities[0].id : this.props.data.city_id
      })
      this.fetchLocalityList({
        pagination: { "limit": 1000, "offset": 0 },
        filter: { "field": "city_id", "value": !this.state.selectedCityIdx ? response.cities[0].id.toString() : this.props.data.city_id.toString() }
      })
    })
    .catch((error) => {
      this.setState({loadingCityList: false})
      console.log("Error in fetching city list", error)
    })
  }

  fetchLocalityList (payload) {
    Api.fetchLocalityList(payload)
    .then((response) => {
      this.setState({
        localityList: response.message,
        selectedLocalityIdx: response.message[0].locality_id
      })
    })
    .catch((error) => {
      console.log("Error in fetching locality list", error)
    })
  }

  handleCityChange (e, k) {
    this.setState({
      selectedCityIdx: (this.state.cityList[k].id),
    })
    this.fetchLocalityList({
      pagination: { "limit": 1000, "offset": 0 },
      filter: { "field": "city_id", "value": this.state.cityList[k].id.toString() }
    })
  }

  handleLocalityChange (e, k) {
    this.setState({selectedLocalityIdx: this.state.localityList[k].locality_id})
  }

  isFormValid () {
    if (this.state.name.toString().length === 0) {
      this.setState({
        nameErr: {
          value: "name is required",
          status: true
        }
      })
      return false
    } else if (this.state.gps_x_coordinate.length === 0) {
      this.setState({
        gpsXCoordinateErr: {
          value: "X cordinate is required",
          status: true
        }
      })
      return false
    } else if (this.state.gps_y_coordinate.length === 0) {
      this.setState({
        gpsYCoordinateErr: {
          value: "Y cordinate is required",
          status: true
        }
      })
      return false
    }
    return true
  }

  getData () {
    return this.state
  }

  handleTextFields (e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName]: {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSave () {
    if (this.isFormValid()) {
      this.props.handleSave()
    }
  }

  render () {
    const { nameErr, gpsXCoordinateErr, gpsYCoordinateErr } = this.state
    return (
      <Fragment>
        
        <Card style={{
          padding: '20px',
          width: '300px',
          position: 'relative',
          display: 'block',
          verticalAlign: 'top',
          marginRight: '20px'
        }}
        >
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter warehouse details</h4>
          <div className="form-group">
            <label className="label">Name</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="name"
              value={this.state.name}
              style={{ width: '100%' }}
            />
            {
              nameErr.status &&
              <p className="error-message">* {nameErr.value}</p>
            }
          </div>
          
          <div className="form-group">
            <label className="label">City</label><br />
            <SelectField
              value={this.state.selectedCityIdx}
              onChange={this.handleCityChange}
            >
              {
                !this.state.loadingCityList && this.state.cityList.map((item, i) => (
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
            <label className="label">Locality</label><br />
            <SelectField
              value={this.state.selectedLocalityIdx}
              onChange={this.handleLocalityChange}
            >
              {
                this.state.localityList.map((item, i) => (
                  <MenuItem
                    value={item.locality_id}
                    key={item.locality_id}
                    primaryText={item.name}
                  />
                ))
              }
            </SelectField>
          </div>
          <div className="form-group">
            <label className="label">GPS X Cordinate</label><br />
            <TextField
              placeholder="15.4935224"
              onChange={this.handleTextFields}
              name="gps_x_coordinate"
              value={this.state.gps_x_coordinate}
              style={{ width: '100%' }}
            />
            {
              gpsXCoordinateErr.status &&
              <p className="error-message">* {gpsXCoordinateErr.value}</p>
            }
          </div>
          <div className="form-group">
            <label className="label">GPS Y Cordinate</label><br />
            <TextField
              placeholder="15.4935224"
              onChange={this.handleTextFields}
              name="gps_y_coordinate"
              value={this.state.gps_y_coordinate}
              style={{ width: '100%' }}
            />
            {
              gpsYCoordinateErr.status &&
              <p className="error-message">* {gpsYCoordinateErr.value}</p>
            }
          </div>
        

          <div className="form-group">
            <RaisedButton
              label="Save"
              primary
              disabled={this.props.disableSave}
              onClick={this.handleSave}
            />
          </div>
        </Card>
      </Fragment>
    )
  }
}

export default WareHouseForm
