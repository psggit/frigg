import React from "react"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'


class CityPaymentForm extends React.Component {
  constructor (props){
    super(props)

    this.app_type = [
      { text: 'Android', value: 1 },
      { text: 'iOS', value: 2 },
    ]

    this.jp_payment_method = [
      { text: 'Wallet', value: 1 },
      { text: 'Dmo Wallet', value: 2 },
      { text: 'Nodal', value: 3 },
    ]

    this.icici_payment_method = [
      { text: 'Wallet', value: 1 },
      { text: 'Dmo Wallet', value: 2 },
      { text: 'Nodal', value: 3 },
    ]

    this.state = {
      upiTimeLimit:props.data ? props.data.upi_time_limit : "",
      upiLowRateMessage: props.data ? props.data.upi_low_rate_message: "",
      isCardEnabled:props.data ? props.data.is_card_enabled: false,
      isNBEnabled:props.data ? props.data.is_nb_enabled: false,
      isUpiLowSuccessRate: props.data ? props.data.is_upi_low_success_rate: false,
      isUpiCollectLowSuccessRate: props.data ? props.data.is_upi_collect_low_success_rate: false,
      isJPUpiCollectEnabled: props.data ? props.data.is_jp_upi_collect_enabled: false,
      is_icici_upi_intent_enabled: props.data ? props.data.is_icici_upi_intent_enabled: false,
      is_icici_upi_collect_enabled: props.data ? props.data.is_icici_upi_collect_enabled: false,
      selectedAppTypeIdx: props.data ? this.app_type.find(item => (item.text).toLowerCase() === (props.data.app_type).toLowerCase()).value : 1,
      // selectedAppTypeIdx: props.data ? props.data.app_type ? 1 : 2 : 1,
      // selectedJPPaymentMethodIdx: props.data ? props.data.jp_payment_method.toLowerCase().trim() !== "nodal"
      //   ? props.data.jp_payment_method.toLowerCase().trim() === "wallet" ? 1 : 2 : 3 : 1,
      selectedJPPaymentMethodIdx: props.data ? this.jp_payment_method.find(item => (item.text).toLowerCase() === (props.data.jp_payment_method).toLowerCase()).value : 1,
      selectedICICIPaymentMethodIdx: props.data ? this.icici_payment_method.find(item => (item.text).toLowerCase() === (props.data.icici_payment_method).toLowerCase()).value : 1,
      //  selectedICICIPaymentMethodIdx: props.data ? props.data.icici_payment_method.toLowerCase().trim() !== "nodal"
      //     ? props.data.icici_payment_method.toLowerCase().trim() === "wallet" ? 1 : 2 : 3 : 1,
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleICICIPaymentChange = this.handleICICIPaymentChange.bind(this)
    this.handleJPPaymentChange = this.handleJPPaymentChange.bind(this)
    this.handleAppTypeChange = this.handleAppTypeChange.bind(this)
    this.getData = this.getData.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }
 
  handleTextFields (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCheckboxChange (e) {
    this.setState({
      [e.target.name]: e.target.checked
    })
  }

  handleAppTypeChange (e, k) {
    this.setState({
      selectedAppTypeIdx: (this.app_type[k].value)
    })
  }

  handleJPPaymentChange (e, k) {
    this.setState({
      selectedJPPaymentMethodIdx: (this.jp_payment_method[k].value)
    })
  }

  handleICICIPaymentChange (e, k) {
    this.setState({
      selectedICICIPaymentMethodIdx: (this.icici_payment_method[k].value)
    })
  }

  getData () {
    return this.state
  }

  handleSave () {
    this.props.handleSave()
  }

  render () {
    return(
      <React.Fragment>
        <Card style={{
          padding: '20px',
          width: '300px',
          position: 'relative',
          display: 'block',
          verticalAlign: 'top',
          marginRight: '20px'
        }}
        >
          <h4 style={{ margin: '0', marginBottom: '40px' }}>{`Enter City Payment Details (${this.props.cityId})`}</h4>
          <form>

            <div className="form-group">
              <label className="label">App Type</label><br />
              <SelectField
                name="app_type"
                value={this.state.selectedAppTypeIdx}
                onChange={this.handleAppTypeChange}
                style={{ width: '100%' }}
              >
                {
                  this.app_type.map((item, i) => (
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
              <label className="label">JP Payment Method</label><br />
              <SelectField
                name="jp_payment_method"
                value={this.state.selectedJPPaymentMethodIdx}
                onChange={this.handleJPPaymentChange}
                style={{ width: '100%' }}
              >
                {
                  this.jp_payment_method.map((item, i) => (
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
              <label className="label">ICICI Payment Method</label><br />
              <SelectField
                name="icici_payment_method"
                value={this.state.selectedICICIPaymentMethodIdx}
                onChange={this.handleICICIPaymentChange}
                style={{ width: '100%' }}
              >
                {
                  this.icici_payment_method.map((item, i) => (
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
              <label className="label">UPI Time Limit</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="upiTimeLimit"
                required
                value={this.state.upiTimeLimit}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">UPI Low Rate Message</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="upiLowRateMessage"
                required
                value={this.state.upiLowRateMessage}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Is Card Enabled"
                name="isCardEnabled"
                checked={this.state.isCardEnabled}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Is Nodal Enabled"
                name="isNBEnabled"
                checked={this.state.isNBEnabled}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Is UPI Low Success Rate "
                name="isUpiLowSuccessRate"
                checked={this.state.isUpiLowSuccessRate}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Is UPI Collect Low Success Rate "
                name="isUpiCollectLowSuccessRate"
                checked={this.state.isUpiCollectLowSuccessRate}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Is JB UPI Collect Enabled "
                name="isJPUpiCollectEnabled"
                checked={this.state.isJPUpiCollectEnabled}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Is ICICI UPI Intent Enabled"
                name="is_icici_upi_intent_enabled"
                checked={this.state.is_icici_upi_intent_enabled}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <Checkbox
                style={{ marginTop: "10px" }}
                label="Is ICICI UPI Collect Enabled "
                name="is_icici_upi_collect_enabled"
                checked={this.state.is_icici_upi_collect_enabled}
                onCheck={this.handleCheckboxChange}
              />
            </div>

            <div className="form-group">
              <RaisedButton
                label="Save"
                primary
                disabled={this.props.disableSave}
                onClick={this.handleSave}
              />
            </div>
          </form>
        </Card>
      </React.Fragment>
    )
  }
}

export default CityPaymentForm