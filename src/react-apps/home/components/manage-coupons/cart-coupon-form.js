import React from "react"
//import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
//import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
// import Radio from '@material-ui/core/Radio'
// import RadioGroup from '@material-ui/core/RadioGroup'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import FormControl from '@material-ui/core/FormControl'
// import FormLabel from '@material-ui/core/FormLabel'
//import Radio from '@material-ui/core/Radio'


class CartForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      couponName: props.data ? props.data.name : "",
      startTime: props.data ? props.data.start_time.slice(0, 16) : "",
      endTime: props.data ? props.data.end_time.slice(0, 16) : "",
      maxCount: props.data ? props.data.max_count : 0,
      availableCount: props.data ? props.data.available_count : 0,
      frequency: props.data ? props.data.frequency : "",
      signUpDate: props.data ? props.data.sign_up_date.slice(0, 16) : "0001-01-01T00:00:00.000Z",
      considerSignUp: props.data ? props.data.consider_sign_up : false,
      payByWallet: props.data ? props.data.pay_by_wallet : false,
      storePickup: props.data ? props.data.store_pickup : false,
      isConsumerSpecific: props.data ? props.data.is_consumer_specific : false,
      isUnlimited: props.data ? props.data.is_unlimited : false,
      cityList: props.data ? props.data.city_list_str : "",
      limitPerUser: props.data ? props.data.limit_per_user : "",
      selectedAppIdx: props.data ? props.data.app === "drinks" ? 1 : 1 : 1,
      selectedDestinationIdx: props.data ? props.data.destination === "UPI" ? 1 : 1 : 1,
      shortDesc: props.data ? props.data.short_desc : "",
      longDesc: props.data ? props.data.long_desc : "",
      longHtmlDesc: props.data ? props.data.long_html_desc : "",
      consumerList: props.data ? props.data.consumer_list: [],
      listingOrder: props.data ? props.data.listing_order : ""
    }

    this.destination = [
      { text: 'UPI', value: 1 },
    ]

    this.app = [
      { text: 'HipBar-Drink', value: 1 },
    ]

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.getData = this.getData.bind(this)
    this.handleDestinationChange = this.handleDestinationChange.bind(this)
    this.handleAppChange = this.handleAppChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleTextFieldChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDestinationChange (e, k) {
    this.setState({
      selectedDestinationIdx: (this.destination[k].value)
    })
  }

  handleAppChange (e, k) {
    this.setState({
      selectedAppIdx: (this.app[k].value)
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

  render () {
    return (
      <React.Fragment>
        <div className="form-group" >
          <label className="label">Coupon Name</label><br />
          <TextField
            onChange={this.handleTextFieldChange}
            name="couponName"
            value={this.state.couponName}
            required
            style={{ width: '100%' }}
            pattern="^[^-\s][a-zA-Z0-9_\s-]+$"
          />
        </div>

        <div className="form-group">
          <label className="label">Start Time</label><br />
          <input
            type="datetime-local"
            onChange={this.handleDate}
            defaultValue={this.state.startTime}
            className="inline-input"
            style={{
              width: '100%',
              marginTop: '10px',
              border: '0',
              borderBottom: '1px solid #9b9b9b',
              fontSize: '14px',
              padding: '5px 0'
            }}
            required
            name="startTime"
          />
        </div>

        <div className="form-group">
          <label className="label">End Time</label><br />
          <input
            type="datetime-local"
            onChange={this.handleDate}
            defaultValue={this.state.endTime}
            className="inline-input"
            name="endTime"
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
          <label className="label">Frequency</label><br />
          <TextField
            onChange={this.handleTextFieldChange}
            name="frequency"
            required
            style={{ width: '100%' }}
            value={this.state.frequency}
          />
        </div>

        <div className="form-group">
          <label className="label">City</label><br />
          <TextField
            onChange={this.handleTextFieldChange}
            name="cityList"
            required
            value={this.state.cityList}
            style={{ width: '100%' }}
          />
        </div>

        <div className="form-group">
          <label className="label">Limit Per User</label><br />
          <TextField
            onChange={this.handleTextFieldChange}
            name="limitPerUser"
            required
            style={{ width: '100%' }}
            value={this.state.limitPerUser}
          />
        </div>


        <div className="form-group">
          <label className="label">Short Description</label><br />
          <TextField
            onChange={this.handleTextFieldChange}
            name="shortDesc"
            value={this.state.shortDesc}
            style={{ width: '100%' }}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Long Description</label><br />
          <TextField
            onChange={this.handleTextFieldChange}
            name="longDesc"
            value={this.state.longDesc}
            style={{ width: '100%' }}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Long HTML Description</label><br />
          <TextField
            onChange={this.handleTextFieldChange}
            name="longHtmlDesc"
            value={this.state.longHtmlDesc}
            style={{ width: '100%' }}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Destination</label><br />
          <SelectField
            name="destination"
            value={this.state.selectedDestinationIdx}
            onChange={this.handleDestinationChange}
            style={{ width: '100%' }}
          >
            {
              this.destination.map((item, i) => (
                <MenuItem
                  value={parseInt(item.value)}
                  key={parseInt(item.value)}
                  primaryText={item.text}
                />
              ))
            }
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">App</label><br />
          <SelectField
            name="app"
            value={this.state.selectedAppIdx}
            onChange={this.handleAppChange}
            style={{ width: '100%' }}
          >
            {
              this.app.map((item, i) => (
                <MenuItem
                  value={parseInt(item.value)}
                  key={parseInt(item.value)}
                  primaryText={item.text}
                />
              ))
            }
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">Order Type</label>
          <Checkbox
            style={{ marginTop: "10px" }}
            label="Pay By Wallet"
            name="payByWallet"
            checked={this.state.payByWallet}
            onCheck={this.handleCheckboxChange}
          />
          <Checkbox
            style={{ marginTop: "10px" }}
            label="Store Pickup"
            name="storePickup"
            checked={this.state.storePickup}
            onCheck={this.handleCheckboxChange}
          />
        </div>

        <div className="form-group">
          <Checkbox
            style={{ marginTop: "10px" }}
            label="Consumer Specific"
            name="isConsumerSpecific"
            checked={this.state.isConsumerSpecific}
            onCheck={this.handleCheckboxChange}
          />
        </div>

        {
          this.state.isConsumerSpecific && !location.pathname.includes("edit") &&
          <div className="form-group">
            <label className="label">Consumer ID's</label>
            <TextField
              onChange={this.handleTextFieldChange}
              name="consumerList"
              required
              style={{ width: '100%' }}
              value={this.state.consumerList}
            />
          </div>
        }

        <div className="form-group">
          <Checkbox
            style={{ marginTop: "10px" }}
            label="SignUp"
            name="considerSignUp"
            checked={this.state.considerSignUp}
            onCheck={this.handleCheckboxChange}
          />
        </div>
        {
          this.state.considerSignUp === true &&
          <div className="form-group">
            <label className="label">SignUp Date</label><br />
            <input
              className="inline-input"
              onChange={this.handleDate}
              name="signUpDate"
              type="datetime-local"
              required
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              defaultValue={this.state.signUpDate}
            />
          </div>
        }
        <div className="form-group">
          <Checkbox
            style={{ marginTop: "10px" }}
            label="Is Unlimited"
            name="isUnlimited"
            checked={this.state.isUnlimited}
            onCheck={this.handleCheckboxChange}
          />
        </div>
        {
          !this.state.isUnlimited &&
          <div>
            <div className="form-group">
              <label className="label">Max Count</label><br />
              <TextField
                onChange={this.handleTextFieldChange}
                name="maxCount"
                required
                style={{ width: '100%' }}
                value={this.state.maxCount}
              />
            </div>
            <div className="form-group">
              <label className="label">Available Count</label><br />
              <TextField
                onChange={this.handleTextFieldChange}
                name="availableCount"
                required
                style={{ width: '100%' }}
                value={this.state.availableCount}
              />
            </div>
          </div>
        }
        <div className="form-group">
          <label className="label">Listing Order</label><br />
          <TextField
            onChange={this.handleTextFieldChange}
            name="listingOrder"
            required
            style={{ width: '100%' }}
            value={this.state.listingOrder}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default CartForm