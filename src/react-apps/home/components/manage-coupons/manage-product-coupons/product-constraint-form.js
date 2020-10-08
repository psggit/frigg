import React from "react"
import PropTypes from "prop-types"
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

class ProductConstraintForm extends React.Component {
  constructor (props) {
    super(props)

    this.inputNameMap = {
      skuid: 'SKU ID',
      quantity: 'Quantity',
      flat: 'Flat',
      newDeliveryFee: 'New Delivery Fee'
    }

    this.state = {
      skuid: props.data ? props.data.sku_id : 0,
      quantity: props.data ? props.data.quantity : 0,
      flat: props.data ? props.data.flat_discount : 0,
      constraint_id: props.data ? props.data.constraint_id : 0,
      coupon_id: props.data ? props.data.coupon_id : 0,
      disabledInput: props.data ? props.data.disable : false,
      isReviseDeliveryFee: props.data ? props.data.revise_delivery_fee : false,
      newDeliveryFee: props.data ? props.data.new_delivery_fee : 0,
    }
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    this.getData = this.getData.bind(this)
    this.updateConstraint = this.updateConstraint.bind(this)
    this.deleteProductConstraint = this.deleteProductConstraint.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)

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

  getData () {
    return this.state
  }

  updateConstraint () {
    this.props.updateProductConstraint ({
      constraint_id: (this.state.constraint_id),
      coupon_id: (this.state.coupon_id),
      sku_id: parseFloat(this.state.skuid),
      quantity: parseFloat(this.state.quantity),
      flat_discount: parseFloat(this.state.flat),
      revise_delivery_fee: (this.state.isReviseDeliveryFee),
      new_delivery_fee: parseFloat(this.state.newDeliveryFee)
    })
  }

  deleteProductConstraint () {
    this.props.deleteProductConstraint({
      constraint_id: this.state.constraint_id,
      coupon_id: this.state.coupon_id,
      constraint_type: "product"
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
        <h4 style={{ margin: "40px 0" }}>Product Constraint</h4>
        <React.Fragment>
          <div className="form-group">
            <label className="label">SKU ID</label><br />
            <TextField
              onChange={this.handleTextFieldChange}
              name="skuid"
              required
              value={this.state.skuid}
              style={inputStyle}
              disabled={this.state.disabledInput}
            />
          </div>

          <div className="form-group">
            <label className="label">Quantity</label><br />
            <TextField
              onChange={this.handleTextFieldChange}
              name="quantity"
              required
              value={this.state.quantity}
              style={inputStyle}
              disabled={this.state.disabledInput}
            />
          </div>

          <div className="form-group">     
            <label className="label">Flat</label><br />
            <TextField
              onChange={this.handleTextFieldChange}
              name="flat"
              required
              style={inputStyle}
              value={this.state.flat}
              disabled={this.state.disabledInput}
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
            this.state.isReviseDeliveryFee && !location.pathname.includes("edit") &&
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
              onClick={this.deleteProductConstraint}
              style={{ marginTop: '40px', marginLeft: '20px' }}
            />
          }
        </React.Fragment>
      </React.Fragment>
    )
  }
}

ProductConstraintForm.propTypes = {
  skuid: PropTypes.string,
  quantity: PropTypes.string,
  flat: PropTypes.string,
  isReviseDeliveryFee: PropTypes.bool,
  newDeliveryFee: PropTypes.string
}

export default ProductConstraintForm