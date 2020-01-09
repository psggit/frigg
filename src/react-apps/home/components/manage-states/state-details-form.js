import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import PropTypes from "prop-types"

class StateDetailsForm extends React.Component {
  constructor (props) {
    super(props)
    this.priceType = [
      { text: 'MRP', value: 1 },
      { text: 'MSRP', value: 2 },
      { text: 'LABEL', value: 3 },
      { text: 'DISPLAY-MRP', value: 4 }
    ]

    this.intitialState = {
      stateShortName: props.data ? props.data.stateShortName : '',
      stateName: props.data ? props.data.stateName : '',
      shouldTrim: true,
      isUPIEnabled: props.data ? props.data.isUPIEnabled : false,
      isGiftWalletEnabled: props.data ? props.data.isGiftWalletEnabled : false,
      isHipbarWalletEnabled: props.data ? props.data.isHipbarWalletEnabled : false,
      isCatalogEnabled: props.data ? props.data.isCatalogEnabled : false,
      selectedPriceTypeIdx: props.data ? props.data.priceType
        ? this.priceType.find(item => (item.text).toLowerCase() === (props.data.priceType).toLowerCase()).value
        : 1 : 1,
      priceType: props.data ? props.data.priceType : 'MRP',
    }

    this.state = Object.assign({}, this.intitialState)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.resetState = this.resetState.bind(this)
    this.handlePriceTypeChange = this.handlePriceTypeChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  resetState () {
    this.setState(this.intitialState)
  }

  handleCheckboxes (e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  handleTextFields (e) {
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

  getData () {
    return this.state
  }

  handlePriceTypeChange (e, k) {
    this.setState({
      priceType: this.priceType[k].text,
      selectedPriceTypeIdx: this.priceType[k].value
    })
  }

  handleCheckbox (e) {
    this.setState({ [e.target.name]: e.target.checked });
  }

  render () {
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
          <div className="form-group">
            <label className="label">Payment Option</label><br />
            <Checkbox
              style={{marginTop: "10px"}}
              checked={this.state.isUPIEnabled}
              onCheck={this.handleCheckboxChange}
              disabled={this.props.isDisabled}
              label="UPI"
              name="isUPIEnabled"
              value={this.state.isUPIEnabled}
            />
            <Checkbox
              disabled={this.props.isDisabled}
              checked={this.state.isGiftWalletEnabled}
              value={this.state.isGiftWalletEnabled}
              onCheck={this.handleCheckboxChange}
              label="Gift Wallet"
              name="isGiftWalletEnabled"
            />
            <Checkbox
              disabled={this.props.isDisabled}
              checked={this.state.isHipbarWalletEnabled}
              onCheck={this.handleCheckboxChange}
              label="Hipbar Wallet"
              name="isHipbarWalletEnabled"
            />
          </div>
          <div className="form-group">
            <Checkbox
              disabled={this.props.isDisabled}
              checked={this.state.isCatalogEnabled}
              onCheck={this.handleCheckboxChange}
              label="Catalog Enabled"
              name="isCatalogEnabled"
            />
          </div>
      </Fragment>
    )
  }
}

StateDetailsForm.propTypes = {
  data: PropTypes.object,
  stateShortName: PropTypes.string,
  priceType: PropTypes.string
}

export default StateDetailsForm
