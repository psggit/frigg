import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class CampaignForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      campaignName: props.data ? props.data.name : "",
      activeFrom: props.data ? props.data.active_from : "",
      activeTo: props.data ? props.data.active_to : "",
      // fundsCredits: props.data ? props.data.funds_credited : "",
      // budgetedAmount: props.data ? props.data.budgeted_amount : "",
      brandManagerId: props.data ? props.data.brand_manager_id : "",
      type: props.data ? props.data.type : "",
      //orderType: props.data ? props.data.order_type : "",
      status: "",
      selectedStatusIdx: props.data ? props.data.is_active ? 1 : 2 : 1
    }

    // this.campaignStatus = [
    //   { text: 'Active', value: 1 },
    //   { text: 'Inactive', value: 2 },
    // ]

    // this.brandManagerList = [
    //   { text: "abc@gmail.com", value: 21 },
    //   { text: "jki@gmail.com", value: 22 }
    // ]
    
    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleStatusChange(e, k) {
    const selectedStatusIdx = k + 1
    //const selectedCampaignStatus = this.campaignStatus.find((item) => item.value === selectedStatusIdx).text
    this.setState({ selectedStatusIdx })
    // console.log("status change", selectedStatusIdx, selectedPromoStatus)
  }

  render() {
    return (
      <Fragment>
        <Card style={{
            padding: '20px',
            width: '300px',
            position: 'relative',
            display: 'block',
            verticalAlign: 'top',
            marginRight: '20px'
          }}
        >
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Campaign Details</h4>
          <div className="form-group">
            <label className="label">Campaign Name</label><br/>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="campaignName"
              placeholder="TestCampaign"
              value={this.state.campaignName}
              style={{ width: '100%' }}
            />
          </div>
        
          <div className="form-group">
            <label className="label">Active From</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="activeFrom"
              //placeholder=""
              value={this.state.activeFrom}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Active To</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="activeTo"
              //placeholder="pickup,"
              value={this.state.activeTo}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Type</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="type"
              placeholder="cashback"
              value={this.state.type}
              style={{ width: '100%' }}
            />
          </div>

          {/* <div className="form-group">
            <label className="label">Budgeted Amount</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="budgetedAmount"
              placeholder="10000"
              value={this.state.budgetedAmount}
              style={{ width: '100%' }}
            />
          </div> */}

          {/* <div className="form-group">
            <label className="label">Funds Credited</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="fundsCredited"
              placeholder="10000"
              value={this.state.fundsCredited}
              style={{ width: '100%' }}
            />
          </div> */}

          <div className="form-group">
            <label className="label">Brand Manager ID</label><br />
            <SelectField
              //disabled={this.props.isDisabled}
              value={this.state.brandManagerId}
              onChange={this.handleStatusChange}
            >
              {
                this.brandManagerList.map((item, i) => (
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
            <label className="label">Status</label><br/>
            <SelectField
              //disabled={this.props.isDisabled}
              value={this.state.selectedStatusIdx}
              onChange={this.handleStatusChange}
            >
              {
                this.promoStatus.map((item, i) => (
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
            <RaisedButton
              label="Save"
              primary
              disabled={this.props.disableSave}
              onClick={this.props.handleSave}
            />
          </div>
        </Card>
      </Fragment>
    )
  }
}

export default CampaignForm
