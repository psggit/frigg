import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class CityDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.initialState = {
      stateIdx: props.stateIdx || 0,
      isCityActive: props.isCityActive !== null ? props.isCityActive : true,
      isDeliveryActive: props.isDeliveryActive !== null ? props.isDeliveryActive : true,
      cityName: props.cityName || '',
      shouldTrim: true
    }

    this.state = Object.assign({}, this.initialState)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
  }

  resetState() {
    this.setState(this.initialState)
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ cityName: nextProps.cityName, stateIdx: nextProps.stateIdx })
  //
  //   if (nextProps.isCityActive !== undefined) {
  //     this.setState({ isCityActive: nextProps.isCityActive })
  //   }
  //
  //   if (nextProps.isDeliveryActive !== undefined) {
  //     this.setState({ isDeliveryActive: nextProps.isDeliveryActive })
  //   }
  //
  // }

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
    this.setState({ [e.target.name]: e.target.checked })
  }

  handleTextFields(e) {
    let value = e.target.value
    if (this.state.shouldTrim) {
      value = value.trim()
    }

    if (value.trim().length) {
      this.setState({ shouldTrim: false })
    } else {
      this.setState({ shouldTrim: true })
    }

    if (e.target.name === 'cityName') {
      this.setGPSUsingGeocoder(e.target.value)
    }
    this.setState({ [e.target.name]: value })
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
