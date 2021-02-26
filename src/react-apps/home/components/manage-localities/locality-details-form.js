import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class LocalityDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    console.log("name", props.localityName)
    this.intialState = {
      isLocalityActive: props.isLocalityActive,
      localityName: props.localityName || '',
      shouldTrim: true,
      maxDeliveryOrderPerBatch: props.maxDeliveryOrderPerBatch || '0',
      maxWaitTimeForPotentialDas: props.maxWaitTimeForPotentialDas,
      maxDaTravelDistance: props.maxDaTravelDistance,
      considerLocalityOrderlimit: props.considerLocalityOrderlimit || false,
      payOnDeliveryLimit: props.payOnDeliveryLimit || '0',
      considerLocalityOrderlimit: props.considerLocalityOrderlimit || false,
      payByCashEnabled: props.payByCashEnabled || false,
      payByUpiEnabled: props.payByUpiEnabled || false,
      paymentOnDeliveryEnabled: props.paymentOnDeliveryEnabled || false,
    }

    this.state = Object.assign({}, this.intialState)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
  }

  resetState() {
    this.setState(this.intialState)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.localityName) {
  //     this.setState({
  //       localityName: nextProps.localityName,
  //     })
  //   }
  //   if (nextProps.isLocalityActive !== undefined) {
  //     this.setState({ isLocalityActive: nextProps.isLocalityActive })
  //   }
  // }

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
    if (e.target.name === 'localityName' && this.props.removeLocalityErr) {
      this.props.removeLocalityErr()
    }
  }

  getData() {
    return this.state
  }

  render () {
    return (
      <Fragment>
        <div className="form-group">
          <label className="label">Locality name</label><br/>
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="localityName"
            value={this.state.localityName}
          />
        </div>

        <div className="form-group">
          <label className="label">Max delivery orders per batch</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="maxDeliveryOrderPerBatch"
            value={this.state.maxDeliveryOrderPerBatch}
          />
        </div>

        <div className="form-group">
          <label className="label">Prioritise Potential DAs for (Min)</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="maxWaitTimeForPotentialDas"
            value={this.state.maxWaitTimeForPotentialDas}
          />
        </div>

        <div className="form-group">
          <label className="label">Look for Potential DAs within (Km)</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="maxDaTravelDistance"
            value={this.state.maxDaTravelDistance}
            />
          <label className="label">Cash Limit</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="payOnDeliveryLimit"
            value={this.state.payOnDeliveryLimit}
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.isLocalityActive}
            onCheck={this.handleCheckboxes}
            name="isLocalityActive"
            label="is_available"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.considerLocalityOrderlimit}
            onCheck={this.handleCheckboxes}
            name="considerLocalityOrderlimit"
            label="Consider locality order limit "
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.paymentOnDeliveryEnabled}
            onCheck={this.handleCheckboxes}
            name="paymentOnDeliveryEnabled"
            label="Payment on Delivery Enabled"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.payByCashEnabled}
            onCheck={this.handleCheckboxes}
            name="payByCashEnabled"
            label="Pay By Cash"
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.payByUpiEnabled}
            onCheck={this.handleCheckboxes}
            name="payByUpiEnabled"
            label="Pay By UPI"
          />
        </div>
      </Fragment>
    )
  }
}

export default LocalityDetailsForm
