import React from "react"
import { Card } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

class CouponForm extends React.Component {
  constructor() {
    super()
    this.state = {
      couponName: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
      selectedStatusIdx: 1,
      cityList: [],
      loadingCityList: true,
      mappedCityList: [],
      cityMap: {}
    }
    this.status = [
      { text: 'Active', value: 1 },
      { text: 'Inctive', value: 2 }
    ]

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.getData = this.getData.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  componentDidUpdate(newProps) {
    const cityMap = {}
    if (this.props.cityList !== newProps.cityList) {
      const mappedCityList = this.props.cityList.map((item) => {
        cityMap[item.value] = { city_id: item.value, city_name: item.text, status: false }
        return { city_id: item.value, city_name: item.text, status: false }
      })

      console.log("list", mappedCityList, "map", cityMap)
      this.setState({
        cityList: this.props.cityList,
        loadingCityList: this.props.loadingCityList,
        mappedCityList: mappedCityList,
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

  createCoupon() {
    console.log("create coupon")
  }

  handleCheckboxes(e, cityId) {
    let updatedCityMap = Object.assign({}, this.state.cityMap)
    updatedCityMap[cityId].status = e.target.checked
    this.setState({
      cityMap: updatedCityMap,
      mappedCityList: Object.values(updatedCityMap)
    })
  }

  getData() {
    return this.state
  }

  render() {
    const { mappedCityList, loadingCityList, cityMap } = this.state
    // console.log("city list", cityList)
    const inputStyle = {
      width: '100%',
      border: '0',
      borderBottom: '1px solid #9b9b9b',
      fontSize: '14px',
      padding: '0'
    }
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
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
            <form onSubmit={this.createCoupon}>
              <div className="form-group">
                <label className="label">Coupon Name</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="couponName"
                  value={this.state.couponName}
                  style={inputStyle}
                  required
                  pattern="^[^-\s][a-zA-Z0-9_\s-]+$"
                />
              </div>
              <div className="form-group">
                <label className="label">Min Amount</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="minAmount"
                  pattern="[0-9]*"
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
                  value={this.state.maxAmount}
                  style={inputStyle}
                />
              </div>
              <div className="form-group">
                <label className="label">Start Date</label><br />
                <input
                  type='datetime-local'
                  onChange={this.handleDate}
                  defaultValue={this.state.startDate}
                  className="inline-input"
                  style={inputStyle}
                  name="startDate"
                />
              </div>
              <div className="form-group">
                <label className="label">End Date</label><br />
                <input
                  type='datetime-local'
                  onChange={this.handleDate}
                  defaultValue={this.state.endDate}
                  className="inline-input"
                  style={inputStyle}
                  name="endDate"
                />
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
                <RaisedButton
                  label="Save"
                  primary
                  disabled={this.props.disableSave}
                  onClick={this.props.handleSave}
                />
              </div>
            </form>
          </Card>
        </div>
        <div>
          <div style={{ width: '50%' }}>
            <Card style={{
              padding: '20px',
              width: '300px',
              position: 'relative',
              display: 'block',
              verticalAlign: 'top',
              marginRight: '20px'
            }}
            >
              <h4 style={{ margin: '0', marginBottom: '40px' }}>Choose city</h4>
              {
                !loadingCityList && mappedCityList.length > 0 &&
                mappedCityList.map((item, i) => {
                  return (
                    <div style={{ display: 'flex', }}>
                      <Checkbox
                        checked={cityMap[item.city_id].status}
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