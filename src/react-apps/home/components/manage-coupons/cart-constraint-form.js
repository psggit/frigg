import React from "react"
import PropTypes from "prop-types"
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

class CartConstraintForm extends React.Component{
  constructor (props) {
    super (props)

    this.inputNameMap = {
      min:'Min',
      max:'Max',
      flat:'Flat',
      percent:'Percent',
      newDeliveryFee: 'New Delivery Fee',
      cashbackExpiry: 'Cashback Expiry',
    }

    this.state = {
      min: props.data ? props.data.min_value : 0,
      max: props.data ? props.data.max_value : 0,
      flat: props.data ? props.data.flat_discount : 0,
      percent: props.data ? props.data.percentage_discount : 0,
      constraint_id: props.data ? props.data.constraint_id : 0,
      coupon_id: props.data ? props.data.coupon_id : 0,
      disabledInput: props.data ? props.data.disable : false,
      isReviseDeliveryFee: props.data ? props.data.revise_delivery_fee : false,
      newDeliveryFee: props.data ? props.data.new_delivery_fee : "",
      //cashbackExpiry: props.data ? props.data.cashback_expiry.slice(0, 16) : "",
      cashbackExpiry: props.data ? props.data.cashback_expiry !== null ? props.data.cashback_expiry.slice(0, 16) : null : null,

    }
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    this.handleFlatDiscountChange = this.handleFlatDiscountChange.bind(this)
    this.handlePercentDiscountChange = this.handlePercentDiscountChange.bind(this)
    this.getData = this.getData.bind(this)
    this.updateConstraint = this.updateConstraint.bind(this)
    this.deleteCartConstraint = this.deleteCartConstraint.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleDate = this.handleDate.bind(this)

  }

  handleCheckboxChange(e) {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  handleTextFieldChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })   
  }

  handleFlatDiscountChange (e) {
    if(this.state.percent === 0.0 || this.state.percent.trim().length === 0) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handlePercentDiscountChange (e) {
    if (this.state.flat === 0.0 || this.state.flat.trim().length === 0) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleDate(e) {
    const d = new Date(e.target.value)
    this.setState({ [e.target.name]: d.toISOString() })
  }

  getData () {
    return this.state
  }

  updateConstraint () {
    this.props.updateCartConstraint({
      constraint_id: (this.state.constraint_id),
      coupon_id: (this.state.coupon_id),
      min_value: parseFloat(this.state.min),
      max_value: parseFloat(this.state.max),
      percentage_discount: parseFloat(this.state.percent),
      flat_discount: parseFloat(this.state.flat),
      revise_delivery_fee: (this.state.isReviseDeliveryFee),
      new_delivery_fee: parseFloat(this.state.newDeliveryFee),
      cashback_expiry: (this.state.cashbackExpiry),
    })
  }

  deleteCartConstraint () {
    this.props.deleteCartConstraint({
      constraint_id: this.state.constraint_id,
      coupon_id: this.state.coupon_id,
      constraint_type: "cart"
    })
  }

  render () {
    const inputStyle = {
      width: '100%'
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

    return (
     <React.Fragment>
        <h4 style={{ margin: "40px 0" }}>Cart Constraint</h4>
        <React.Fragment>
          <div className="form-group">
            <label className="label">Min</label><br />
            <TextField
              onChange={this.handleTextFieldChange}
              name="min"
              required
              value={this.state.min}
              style={inputStyle}
              disabled={this.state.disabledInput}
            />
          </div>

          <div className="form-group">
            <label className="label">Max</label><br />
            <TextField
              onChange={this.handleTextFieldChange}
              name="max"
              required
              value={this.state.max}
              style={inputStyle}
              disabled={this.state.disabledInput}
            />
          </div>

          <div className="form-group">
            <label className="label">Flat Cashback</label><br />
            <TextField
              onChange={this.handleFlatDiscountChange}
              name="flat"
              required
              style={inputStyle}
              value={this.state.flat}
              disabled={this.state.disabledInput}
            />
          </div>

          <div className="form-group">
            <label className="label">Percent Cashback</label><br />
            <TextField
              onChange={this.handlePercentDiscountChange}
              name="percent"
              required
              value={this.state.percent}
              style={inputStyle}
              disabled={this.state.disabledInput}
            />
          </div>
          <div className="form-group">
            <label className="label">Cashback Expiry</label><br />
            <input
              type="datetime-local"
              onChange={this.handleDate}
              defaultValue={this.state.cashbackExpiry}
              className="inline-input"
              disabled={this.state.disabledInput}
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              required
              name="cashbackExpiry"
            />
          </div>
          
          <div className="form-group">
            <Checkbox
              style={{ marginTop: "10px" }}
              label="Revise Delivery Fee"
              name="isReviseDeliveryFee"
              checked={this.state.isReviseDeliveryFee}
              onCheck={this.handleCheckboxChange}
              disabled={this.state.disabledInput}

            />
          </div>

          {
            this.state.isReviseDeliveryFee &&
            <div className="form-group">
              <label className="label">New Delivery Fee</label>
              <TextField
                onChange={this.handleTextFieldChange}
                name="newDeliveryFee"
                required
                style={{ width: '100%' }}
                value={this.state.newDeliveryFee}
                disabled={this.state.disabledInput}
              />
            </div>
          }
          {
            location.pathname.includes("edit") &&
            <RaisedButton
              primary
              disabled={this.props.disable}
              label="Update"
              onClick={this.updateConstraint}
              style={{ marginTop: '40px' }}
            />
          }
          {
            location.pathname.includes("edit") &&
            <RaisedButton
              primary
              disabled={this.props.disable}
              label="Delete"
              onClick={this.deleteCartConstraint}
              style={{ marginTop: '40px',marginLeft:'20px' }}
            />
          }
        </React.Fragment>
      </React.Fragment>
    )
  }
}

CartConstraintForm.propTypes = {
  min:PropTypes.string,
  max: PropTypes.string,
  flat: PropTypes.string,
  percent: PropTypes.string,
  isReviseDeliveryFee: PropTypes.bool,
  newDeliveryFee: PropTypes.string
}

export default CartConstraintForm