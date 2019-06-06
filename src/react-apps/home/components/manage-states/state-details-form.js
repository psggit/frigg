import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class StateDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.priceType = [
      { text: 'MRP', value: 1 },
      { text: 'MSRP', value: 2 },
      { text: 'LABEL', value: 3 },
      { text: 'DISPLAY_MRP', value: 4 }
    ]
    console.log("props", props.priceType)
    this.intitialState = {
      stateShortName: props.stateShortName || '',
      stateName: props.stateName || '',
      shouldTrim: true,
      selectedPriceTypeIdx: props.priceType
        ? this.priceType.find(item => (item.text).toLowerCase() === (props.priceType).toLowerCase()).value
        : 1,
      priceType: props.priceType || 'MRP',
    }

    this.state = Object.assign({}, this.intitialState)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.resetState = this.resetState.bind(this)
    this.handlePriceTypeChange = this.handlePriceTypeChange.bind(this)
  }

  resetState() {
    this.setState(this.intitialState)
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
    this.setState({ [e.target.name]: value })
  }

  getData() {
    return this.state
  }

  handlePriceTypeChange(e, k) {
    this.setState({
      priceType: this.priceType[k].text,
      selectedPriceTypeIdx: this.priceType[k].value
    })
  }

  render() {
    return (
      <Fragment>
        <div className="form-group">
          <label className="label">State name</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="stateName"
            value={this.state.stateName}
          />
        </div>

        <div className="form-group">
          <label className="label">State short name</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="stateShortName"
            value={this.state.stateShortName}
          />
        </div>
        <div className="form-group">
          <label className="label">Price type</label><br />
          <SelectField
            value={this.state.selectedPriceTypeIdx}
            onChange={this.handlePriceTypeChange}
            disabled={this.props.isDisabled}
          >
            {
              this.priceType.map((item, i) => (
                <MenuItem
                  value={i + 1}
                  key={item.value}
                  primaryText={item.text}
                />
              ))
            }
          </SelectField>
        </div>
      </Fragment>
    )
  }
}

export default StateDetailsForm
