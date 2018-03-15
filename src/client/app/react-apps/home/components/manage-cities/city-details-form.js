import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

class CityDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.initialState = {
      stateIdx: props.stateIdx || 0,
      isCityActive: props.isCityActive !== null ? props.isCityActive : true,
      isDeliveryActive: props.isDeliveryActive !== null ? props.isDeliveryActive : true,
      cityName: props.cityName || '',
      cityGPS: props.cityGPS || '',
      shouldTrim: true
    }

    this.state = Object.assign({}, this.initialState)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.setCityGPSInputFromMarker = this.setCityGPSInputFromMarker.bind(this)
  }

  resetState() {
    this.setState(this.initialState)
  }

  setCityGPSInputFromMarker(gps) {
    this.setState({ cityGPS: `${gps.lat},${gps.lng}` })
  }

  handleStateChange(e, k) {
    const { statesData } = this.props
    const stateIdx = k + 1
    this.setState({
      stateIdx,
      stateShortName: statesData[k].short_name
    })
  }

  setGPSUsingGeocoder(address) {
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address }, (res, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const lat = res[0].geometry.location.lat()
        const lng = res[0].geometry.location.lng()
        this.setState({ gps: `${lat},${lng}` })
      }
    })
  }

  handleCheckboxes(e) {
    if (e.target.name === 'isDeliveryActive' && e.target.checked) {
      this.setState({ isDeliveryActive: true, isCityActive: true })
    } else if (e.target.name === 'isCityActive' && this.state.isDeliveryActive) {
      this.setState({ isCityActive: e.target.checked, isDeliveryActive: false })
    } else {
      this.setState({ [e.target.name]: e.target.checked })
    }
  }

  handleTextFields(e) {
    let value = e.target.value
    let name = e.target.name

    if (this.state.shouldTrim) {
      value = value.trim()
    }

    if (value.trim().length) {
      this.setState({ shouldTrim: false })
    } else {
      this.setState({ shouldTrim: true })
    }

    // if (name === 'cityGPS_lat' || name === 'cityGPS_lng') {
    //   if (validateNumType(e.keyCode) || checkCtrlA(e)) {
    //     this.setState({ [name]: parseInt(value) })
    //   } else {
    //     e.preventDefault()
    //   }
    // }
    this.setState({ [name]: value })
  }

  getData() {
    return this.state
  }

  render() {
    return (
      <Fragment>
        <div className="form-group">
          <label className="label">State name</label><br/>
          <SelectField
            disabled={this.props.isDisabled}
            value={this.state.stateIdx}
            onChange={this.handleStateChange}
            iconStyle={{ fill: '#9b9b9b' }}
          >
            {
              this.props.statesData.map((state, i) => (
                <MenuItem
                  value={i + 1}
                  key={state.id}
                  primaryText={state.state_name}
                />
              ))
            }
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">City name</label><br/>
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="cityName"
            value={this.state.cityName}
          />
        </div>

        <div style={{ marginTop: '30px' }} className="form-group">
          <label className="label">City gps</label><br/>
            <TextField
              hintText="12.9542946,77.4908533"
              style={{width: '48%'}}
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityGPS"
              value={this.state.cityGPS}
            />
          {
            !this.props.isDisabled &&
            <RaisedButton
              label="set gps"
              onClick={() => {
                this.props.setCityGPS({
                  lat: this.state.cityGPS.split(',')[0],
                  lng: this.state.cityGPS.split(',')[1]
                })
              }}
            />
          }
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.isCityActive}
            onCheck={this.handleCheckboxes}
            name="isCityActive"
            label="is_available"
          />

          <Checkbox
            style={{ marginTop: '10px' }}
            disabled={this.props.isDisabled}
            checked={this.state.isDeliveryActive}
            onCheck={this.handleCheckboxes}
            name="isDeliveryActive"
            label="is_deliverable"
          />
        </div>
      </Fragment>
    )
  }
}

export default CityDetailsForm
