import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

class CityDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.homepageView = [
      { text: 'catalog', value: 1 },
      { text: 'retailer_map', value: 2 },
      { text: 'retailer_list', value: 3 }
    ]

    this.walletPreference = [
      { text: 'gift', value: 1 },
      { text: 'hipbar', value: 2 },
      { text: '', value: 3 }
    ]

    console.log("props", props)
    this.initialState = {
      stateIdx: props.stateIdx || 0,
      isCityActive: props.isCityActive !== null ? props.isCityActive : true,
      isDeliveryActive: props.isDeliveryActive !== null ? props.isDeliveryActive : true,
      isWalletCityActive: props.isWalletCityActive !== null ? props.isWalletCityActive : true,
      storePickupDisabled: props.storePickupDisabled !== null ? props.storePickupDisabled : true,
      quickpayDisabled: props.quickpayDisabled !== null ? props.quickpayDisabled : true,
      addMoney: props.addMoney !== null ? props.addMoney : true,
      hipbarWalletLoadingEnabled: props.hipbarWalletLoadingEnabled !== null ? props.hipbarWalletLoadingEnabled : true,
      giftWalletLoadingEnabled: props.giftWalletLoadingEnabled !== null ? props.giftWalletLoadingEnabled : true,
      hipbarWalletUsageEnabled: props.hipbarWalletUsageEnabled !== null ? props.hipbarWalletUsageEnabled : true,
      giftWalletUsageEnabled: props.giftWalletUsageEnabled !== null ? props.giftWalletUsageEnabled : true,
      fkEnabled: props.fkEnabled !== null ? props.fkEnabled : false,
      partialDeliveryEnabled: props.partialDeliveryEnabled !== null ? props.partialDeliveryEnabled : true,
      cityName: props.cityName || '',
      geoboundary: props.geoboundary || '',
      selectedHomePageIdx: props.homepageView ? 
        this.homepageView.find(item => (item.text).toLowerCase() === (props.homepageView).toLowerCase()).value : 
        1,
      homepageView: props.homepageView ? props.homepageView : 'catalog',
      selectedWalletIdx: props.walletPreference ? 
        this.walletPreference.find(item => (item.text).toLowerCase() === (props.walletPreference).toLowerCase()).value : 
        3,
      walletPreference: props.walletPreference ? props.walletPreference : '',
      cityGPS: props.cityGPS || '',
      shouldTrim: true
    }
    //console.log("data", props.data)
    //console.log("index", this.homepageView.find(item => (item.text).toLowerCase() === (props.data.homepage_view).toLowerCase()).value, "wallet", this.walletPreference.find(item => (item.text).toLowerCase() === (props.data.wallet_preference).toLowerCase()).value)

    this.state = Object.assign({}, this.initialState)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.setCityGPSInputFromMarker = this.setCityGPSInputFromMarker.bind(this)
    this.handleHomePageChange = this.handleHomePageChange.bind(this)
    this.handleWalletPreference = this.handleWalletPreference.bind(this)
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

  handleHomePageChange(e, k) {
    this.setState({
      homepageView: this.homepageView[k].text,
      selectedHomePageIdx: this.homepageView[k].value
    })
  }

  handleWalletPreference(e, k) {
    this.setState({
      walletPreference: this.walletPreference[k].text,
      selectedWalletIdx: this.walletPreference[k].value
    })
  }

  render () {
    //console.log("test", selectedHomePageIdx, "wallet", selectedWalletIdx)
    return (
      <Fragment>
        <div className="form-group">
          <label className="label">State name</label><br />
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
          <label className="label">City name</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="cityName"
            value={this.state.cityName}
          />
        </div>

        <div style={{ marginTop: '30px' }} className="form-group">
          <label className="label">City gps</label><br />
          <TextField
            hintText="12.9542946,77.4908533"
            style={{ width: '48%' }}
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="cityGPS"
            value={this.state.cityGPS}
            style={{ width: '100%' }}
          />
          {
            !this.props.isDisabled &&
            <RaisedButton
              style={{ width: '100%' }}
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
          <label className="label">Homepage View</label><br />
          <SelectField
            value={this.state.selectedHomePageIdx}
            onChange={this.handleHomePageChange}
            disabled={this.props.isDisabled}
          >
            {
              this.homepageView.map((item, i) => (
                <MenuItem
                  value={i + 1}
                  key={item.value}
                  primaryText={item.text}
                />
              ))
            }
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">Wallet Preference</label><br />
          <SelectField
            value={this.state.selectedWalletIdx}
            onChange={this.handleWalletPreference}
            disabled={this.props.isDisabled}
          >
            {
              this.walletPreference.map((item, i) => (
                <MenuItem
                  value={i + 1}
                  key={item.value}
                  primaryText={item.text}
                />
              ))
            }
          </SelectField>
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

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.isWalletCityActive}
            onCheck={this.handleCheckboxes}
            name="isWalletCityActive"
            label="is_wallet_city"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.storePickupDisabled}
            onCheck={this.handleCheckboxes}
            name="storePickupDisabled"
            label="Store Pickup Disabled"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.quickpayDisabled}
            onCheck={this.handleCheckboxes}
            name="quickpayDisabled"
            label="Quickpay Disabled"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.addMoney}
            onCheck={this.handleCheckboxes}
            name="addMoney"
            label="Add Money Disabled"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.partialDeliveryEnabled}
            onCheck={this.handleCheckboxes}
            name="partialDeliveryEnabled"
            label="Partial Delivery"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.hipbarWalletLoadingEnabled}
            onCheck={this.handleCheckboxes}
            name="hipbarWalletLoadingEnabled"
            label="Hipbar Wallet Loading"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.giftWalletLoadingEnabled}
            onCheck={this.handleCheckboxes}
            name="giftWalletLoadingEnabled"
            label="Gift Wallet Loading"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.hipbarWalletUsageEnabled}
            onCheck={this.handleCheckboxes}
            name="hipbarWalletUsageEnabled"
            label="Hipbar Wallet Usage"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.giftWalletUsageEnabled}
            onCheck={this.handleCheckboxes}
            name="giftWalletUsageEnabled"
            label="Gift Wallet Usage"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.fkEnabled}
            onCheck={this.handleCheckboxes}
            name="fkEnabled"
            label="Fk Enabled"
          />
        </div>

      </Fragment>
    )
  }
}

export default CityDetailsForm
