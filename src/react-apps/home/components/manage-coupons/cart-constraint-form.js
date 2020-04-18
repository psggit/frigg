import React from "react"
import PropTypes from "prop-types"
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class CartConstraintForm extends React.Component{
  constructor (props) {
    super (props)

    this.inputNameMap = {
      min:'Min',
      max:'Max',
      flat:'Flat',
      percent:'Percent'
    }

    this.state = {
      min: props.data ? props.data.min_value : 0,
      max: props.data ? props.data.max_value : 0,
      flat: props.data ? props.data.flat_discount : 0,
      percent: props.data ? props.data.percentage_discount : 0,
      constraint_id: props.data ? props.data.constraint_id : 0,
      coupon_id: props.data ? props.data.coupon_id : 0,
      disabledInput: props.data ? props.data.disable : false
    }
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    this.handleFlatDiscountChange = this.handleFlatDiscountChange.bind(this)
    this.handlePercentDiscountChange = this.handlePercentDiscountChange.bind(this)
    this.getData = this.getData.bind(this)
    this.updateConstraint = this.updateConstraint.bind(this)
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
      flat_discount: parseFloat(this.state.flat)
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
            <label className="label">Flat</label><br />
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
            <label className="label">Percent</label><br />
            <TextField
              onChange={this.handlePercentDiscountChange}
              name="percent"
              required
              value={this.state.percent}
              style={inputStyle}
              disabled={this.state.disabledInput}
            />
          </div>
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
              onClick={this.props.deleteCartConstraint}
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
  percent: PropTypes.string
}

export default CartConstraintForm