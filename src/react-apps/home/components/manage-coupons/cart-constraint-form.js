import React from "react"
import PropTypes from "prop-types"
import TextField from 'material-ui/TextField'

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
      min: props.data ? props.data.min : 0,
      max: props.data ? props.data.max : 0,
      flat: props.data ? props.data.flat : 0,
      percent: props.data ? props.data.percent : 0
    }
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    this.handleFlatDiscountChange = this.handleFlatDiscountChange.bind(this)
    this.handlePercentDiscountChange = this.handlePercentDiscountChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  handleTextFieldChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })   
  }

  handleFlatDiscountChange (e) {
    if(this.state.percent === 0) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handlePercentDiscountChange (e) {
    if (this.state.flat === 0) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  getData () {
    return this.state
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
              style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
              disabled={location.pathname.indexOf("edit") !== -1}
            />
          </div>

          <div className="form-group">
            <label className="label">Max</label><br />
            <TextField
              onChange={this.handleTextFieldChange}
              name="max"
              required
              value={this.state.max}
              style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
              disabled={location.pathname.indexOf("edit") !== -1}
            />
          </div>

          <div className="form-group">
            <label className="label">Flat</label><br />
            <TextField
              onChange={this.handleFlatDiscountChange}
              name="flat"
              required
              value={this.state.flat}
              style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
              disabled={location.pathname.indexOf("edit") !== -1}
            />
          </div>

          <div className="form-group">
            <label className="label">Percent</label><br />
            <TextField
              onChange={this.handlePercentDiscountChange}
              name="percent"
              required
              value={this.state.percent}
              style={location.pathname.indexOf("edit") !== -1 ? disabledInputStyle : inputStyle}
            />
          </div>
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