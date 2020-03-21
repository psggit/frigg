/* eslint-disable no-dupe-class-members */
/* eslint-disable react/jsx-key */
import React from "react"
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import CartConstraintForm from "./cart-constraint-form"

class ProductForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cartConstraints: [],
      couponName: props.data ? props.data.coupon_name : "",
      startDate: props.data ? props.data.start_time.slice(0, 16) : "",
      endDate: props.data ? props.data.end_time.slice(0, 16) : "",
      redemptionCount: props.data ? props.data.redemptionCount : "",
      frequency: props.data ? props.data.frequency : "",
      shortDesc: props.data ? props.data.shortDesc : "",
      longDesc: props.data ? props.data.longDesc : "",
      totalCoupons: props.data ? props.data.totalCoupons : "",

    }

    this.typesOfCoupons = [
      { text: 'Product', value: 1 },
      { text: 'Cart', value: 2 },
    ]

    this.redemptionLimit = [
      { text: 'Limited', value: 1 },
      { text: 'Unlimited', value: 2 },
    ]
    this.status = [
      { text: 'Active', value: 1 },
      { text: 'Inctive', value: 2 }
    ]

    this.orderType = [
      { text: ' Store Pickup', value: 1 },
      { text: 'Quick Pay', value: 2 },
    ]

    this.destination = [
      { text: 'UPI', value: 1 },
      { text: 'Wallet', value: 2 },
      { text: 'Gift Wallet', value: 3 }
    ]

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleOrderTypeChange = this.handleOrderTypeChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    // this.getData = this.getData.bind(this)
    //this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
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

  handleNumericFields (e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName]: {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleStatusChange (e, k) {
    this.setState({
      //selectedStatusIdx: (this.status[k].value)
      status: e.target.value
    })
  }

  handleOrderTypeChange (e) {
    this.setState({
      orderType: e.target.value
    })
  }

  handleCouponChange (e) {
    this.setState({
      typesOfCoupons: e.target.value
    })
  }

  handleDestinationChange (e) {
    this.setState({
      destination: e.target.value
    })
  }

  handleDate (e) {
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

  // handleCheckboxes(e, cityId) {
  //   let updatedCityMap = Object.assign({}, this.state.cityMap)
  //   updatedCityMap[cityId].activity_status = e.target.checked
  //   this.setState({
  //     cityMap: updatedCityMap,
  //     mappedCityList: Object.values(updatedCityMap)
  //   })
  // }

  handleSave (e) {
    e.preventDefault()
    this.props.handleSave()
  }

  handleAdd (e) {
    console.log("The add button was clicked")
    this.setState(
      {
        cartConstraints: [
          ...this.state.cartConstraints,
          { id: this.state.cartConstraints.length }
        ]
      }
    )
  }

  render () {
    //const { mappedCityList, loadingCityList, cityMap } = this.state
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
            <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter cart details</h4>
            <form onSubmit={this.handleSave}>
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
                <label className="label">Start Time</label><br />
                <input
                  type="datetime-local"
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
                  type="datetime-local"
                  onChange={this.handleDate}
                  defaultValue={this.state.endDate}
                  className="inline-input"
                  style={inputStyle}
                  name="endDate"
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Redemption Count</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="redemptionCount"
                  type="number"
                  required
                  value={this.state.redemptionCount}
                  style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
                  disabled={location.pathname.indexOf("edit") !== -1}

                />
              </div>
              <div className="form-group">
                <label className="label">Frequency</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="frequency"
                  type="number"
                  required
                  value={this.state.frequency}
                  style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
                  disabled={location.pathname.indexOf("edit") !== -1}

                />
              </div>

              <div className="form-group">
                <label className="label">Short Description</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="shortDesc"
                  value={this.state.shortDesc}
                  style={inputStyle}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Long Description</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="longDesc"
                  value={this.state.longDesc}
                  style={inputStyle}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Total Coupons</label><br />
                <input
                  onChange={this.handleTextFields}
                  name="totalCoupons"
                  required
                  type="number"
                  value={this.state.totalCoupons}
                  style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
                  disabled={location.pathname.indexOf("edit") !== -1}

                />
              </div>
              <div className="form-group">
                <label className="label">Redemption Limit</label><br />
                <SelectField
                  value={this.state.redemptionLimit}
                  onChange={this.handleOrderTypeChange}
                  style={{ width: '100%' }}
                >
                  {
                    this.redemptionLimit.map((item, i) => (
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
                <Checkbox
                  style={{ marginTop: "10px" }}
                  label="Active"
                  name="isUPIEnabled"
                />
              </div>

              <div className="form-group">
                <label className="label">Order Type</label><br />
                <SelectField
                  value={this.state.orderType}
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

              {/* <div className="form-group">
                <label className="label">Types of Coupon</label><br />
                <SelectField
                  value={this.state.typesOfCoupons}
                  onChange={this.handleOrderTypeChange}
                  style={{ width: '100%' }}
                >
                  {
                    this.typesOfCoupons.map((item, i) => (
                      <MenuItem
                        value={parseInt(item.value)}
                        key={parseInt(item.value)}
                        primaryText={item.text}
                      />
                    ))
                  }
                </SelectField>
              </div> */}
              <div className="form-group">
                <label className="label">Destination</label><br />
                <SelectField
                  value={this.state.destination}
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
              <h4 style={{ margin: '0', marginBottom: '40px' }}>Cart Constraint</h4>
              <CartConstraintForm />
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div className="form-group">
                  <button
                    name="btn"
                    style={!this.props.disableSave ? buttonStyle : Object.assign(buttonStyle, disabledButtonStyle)}
                    onClick={this.handleAdd}
                  >
                    Add
                </button>
                </div>
              </div>
              <div className="card-constraint">
                {
                  this.state.cartConstraints.map((item) => {
                    return <CartConstraintForm
                      id={item.id}
                      cartConstraints={this.state.cartConstraints}
                    />
                  })
                }
              </div>
              <div className="form-group">
                <div>
                  <button
                    disabled={this.props.disableSave}
                    style={!this.props.disableSave ? buttonStyle : Object.assign(buttonStyle, disabledButtonStyle)}>
                    Save
                </button>
                </div>
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
              {/* {
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
              } */}
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductForm