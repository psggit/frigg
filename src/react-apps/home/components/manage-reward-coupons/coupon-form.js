import React from "react"
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

class CouponForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      couponName: props.data ? props.data.coupon_name : "",
      message: props.data ? props.data.message : "",
      expiryMessage: props.data ? props.data.expiry_message : "",
      campaignId: props.data ? props.data.campaign_id : "",
      minAmount: props.data ? props.data.min_amount : "",
      maxAmount: props.data ? props.data.max_amount : "",
      startDate: props.data ? props.data.start_time.slice(0, 16) : "",
      endDate: props.data ? props.data.end_time.slice(0, 16) : "",
      selectedStatusIdx: props.data ? props.data.activity_status ? 1 : 2 : 1,
      selectedOrderTypeIdx: props.data ?
        props.data.order_type.toLowerCase().trim() !== "both"
          ? props.data.order_type.toLowerCase().trim() === "pickup" ? 1 : 2 : 3 : 1,
      batchId: props.data ? props.data.batch_id : "",
      couponId: props.data ? props.data.coupon_id : "",
      count: props.data ? props.data.count : 0,
      expiry: props.data ? props.data.expiry : 0,
      cityList: [],
      loadingCityList: true,
      mappedCityList: [],
      cityMap: {}
    }
    this.status = [
      { text: 'Active', value: 1 },
      { text: 'Inactive', value: 2 }
    ]

    this.orderType = [
      { text: 'Pickup', value: 1 },
      { text: 'PayByWallet', value: 2 },
      { text: 'Both', value: 3 }
    ]

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleOrderTypeChange = this.handleOrderTypeChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.getData = this.getData.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  componentDidUpdate(newProps) {
    const cityMap = {}
    if (this.props.cityList !== newProps.cityList) {
      this.props.cityList.map((item) => {
        cityMap[item.value] = { city_id: item.value, city_name: item.text, activity_status: false }
      })
      if (location.pathname.indexOf("edit") !== -1) {
        this.props.data.city_list.map((item) => {
          if (cityMap[item.city_id]) {
            cityMap[item.city_id].activity_status = item.activity_status
          }
        })
      }

      this.setState({
        loadingCityList: this.props.loadingCityList,
        mappedCityList: Object.values(cityMap),
        cityMap: cityMap
      })
    }
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName]: {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleStatusChange(e, k) {
    this.setState({
      selectedStatusIdx: (this.status[k].value)
    })
  }

  handleOrderTypeChange(e, k) {
    this.setState({
      selectedOrderTypeIdx: (this.orderType[k].value)
    })
  }

  handleDate(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName]: {
        value: "",
        status: false
      }
    })
    const d = new Date(e.target.value)
    this.setState({ [e.target.name]: d.toISOString() })
  }

  handleCheckboxes(e, cityId) {
    let updatedCityMap = Object.assign({}, this.state.cityMap)
    updatedCityMap[cityId].activity_status = e.target.checked
    this.setState({
      cityMap: updatedCityMap,
      mappedCityList: Object.values(updatedCityMap)
    })
  }

  handleSave(e) {
    e.preventDefault()
    this.props.handleSave()
  }

  getData() {
    return this.state
  }

  render() {
    const { mappedCityList, loadingCityList, cityMap } = this.state
    const inputStyle = {
      width: '100%',
      border: '0',
      borderBottom: '1px solid #9b9b9b',
      fontSize: '14px',
      padding: '0'
    }
    const disabledInputStyle = {
      outline: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: 'rgba(0, 0, 0, 0.3)',
      width: '100%',
      border: '0',
      borderBottom: '1px solid #9b9b9b',
      fontSize: '14px',
      padding: '0',
      cursor: 'not-allowed'
    }

    const buttonStyle = {
      border: '10px',
      cursor: 'pointer',
      textDecoration: 'none',
      fontWeight: '600',
      margin: '0px',
      padding: '0 40px',
      outline: 'none',
      height: '36px',
      lineHeight: '36px',
      textTransform: 'uppercase',
      color: '#fff',
      borderRadius: '2px',
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      backgroundColor: 'rgb(0, 188, 212)',
      textAlign: 'center'
    }

    const disabledButtonStyle = {
      opacity: 0.5,
      cursor: 'not-allowed'
    }

    return (
      <div style={{ display: 'flex' }}>
        <div>
          <Card style={{
            padding: '20px',
            width: '300px',
            position: 'relative',
            display: 'block',
            verticalAlign: 'top',
            marginRight: '20px'
          }}
          >
            <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter coupon details</h4>
            <form onSubmit={this.handleSave}>
              <div className="form-group">
                <label className="label">Batch ID</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="batchId"
                  value={this.state.batchId}
                  style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
                  disabled={location.pathname.indexOf("edit") !== -1}
                  required
                  pattern="^[^-\s][a-zA-Z0-9_\s-]+$"
                />
              </div>
              <div className="form-group">
                <label className="label">Campaign ID</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="campaignId"
                  value={this.state.campaignId}
                  style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
                  disabled={location.pathname.indexOf("edit") !== -1}
                  required
                  pattern="[0-9]*"
                />
              </div>
              <div className="form-group">
                <label className="label">Coupon ID</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="couponId"
                  value={this.state.couponId}
                  style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
                  disabled={location.pathname.indexOf("edit") !== -1}
                  required
                  pattern="[0-9]*"
                />
              </div>
              <div className="form-group">
                <label className="label">Coupon Name</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="couponName"
                  value={this.state.couponName}
                  style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
                  disabled={location.pathname.indexOf("edit") !== -1}
                  required
                  pattern="^[^-\s][a-zA-Z0-9_\s-]+$"
                />
              </div>
              <div className="form-group">
                <label className="label">Message</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="message"
                  value={this.state.message}
                  style={inputStyle}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Expiry Message</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="expiryMessage"
                  value={this.state.expiryMessage}
                  style={inputStyle}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Min Amount</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="minAmount"
                  pattern="[0-9]*"
                  required
                  style={inputStyle}
                  value={this.state.minAmount}
                />
              </div>
              <div className="form-group">
                <label className="label">Max Amount</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="maxAmount"
                  pattern="[0-9]*"
                  required
                  value={this.state.maxAmount}
                  style={inputStyle}
                />
              </div>
              <div className="form-group">
                <label className="label">Start Time</label><br />
                <input
                  type='datetime-local'
                  onChange={this.handleDate}
                  defaultValue={this.state.startDate}
                  className="inline-input"
                  style={inputStyle}
                  required
                  name="startDate"
                />
              </div>
              <div className="form-group">
                <label className="label">End Time</label><br />
                <input
                  type='datetime-local'
                  onChange={this.handleDate}
                  defaultValue={this.state.endDate}
                  className="inline-input"
                  style={inputStyle}
                  name="endDate"
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Count</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="count"
                  pattern="[0-9]*"
                  required
                  value={this.state.count}
                  style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
                  disabled={location.pathname.indexOf("edit") !== -1}
                />
              </div>
              <div className="form-group">
                <label className="label">Expiry (in days)</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="expiry"
                  pattern="[0-9]*"
                  required
                  value={this.state.expiry}
                  style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
                  disabled={location.pathname.indexOf("edit") !== -1}
                />
              </div>
              <div className="form-group">
                <label className="label">Order Type</label><br />
                <SelectField
                  value={this.state.selectedOrderTypeIdx}
                  onChange={this.handleOrderTypeChange}
                  style={{ width: '100%' }}
                >
                  {
                    this.orderType.map((item, i) => (
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
                <label className="label">Status</label><br />
                <SelectField
                  value={this.state.selectedStatusIdx}
                  onChange={this.handleStatusChange}
                  style={{ width: '100%' }}
                >
                  {
                    this.status.map((item, i) => (
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
                <button
                  disabled={this.props.disableSave}
                  style={!this.props.disableSave ? buttonStyle : Object.assign(buttonStyle, disabledButtonStyle)}>
                  Save
                </button>
              </div>
            </form>
          </Card>
        </div>
        <div>
          <div>
            <Card style={{
              padding: '20px',
              width: '300px',
              position: 'relative',
              display: 'block',
              verticalAlign: 'top',
              marginRight: '20px'
            }}
            >
              <h4 style={{ margin: '0', marginBottom: '40px' }}>Map cities to coupon</h4>
              {
                !loadingCityList && mappedCityList.length > 0 &&
                mappedCityList.map((item, i) => {
                  return (
                    <div style={{ display: 'flex', }}>
                      <Checkbox
                        checked={cityMap[item.city_id].activity_status}
                        onCheck={(e) => this.handleCheckboxes(e, item.city_id)}
                        label={item.city_name}
                      />
                    </div>
                  )
                })
              }
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default CouponForm