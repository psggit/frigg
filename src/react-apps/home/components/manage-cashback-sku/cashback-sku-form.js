import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Moment from 'moment'

class CashbackSkuForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      skuId: "",
      offerId: "",
      price: "",
      isPackOn: false
    }
    
    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  // componentWillReceiveProps(newProps) {
  // }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleStatusChange(e, k) {
    const selectedStatusIdx = k + 1
    this.setState({ selectedStatusIdx })
  }

  handleCheckboxChange(fieldName) {
    this.setState({[fieldName]: true})
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Sku Promo Details</h4>

          <div className="form-group">
            <label className="label">Campaign ID</label><br />
            <SelectField
              value={this.state.selectedCampaignIdx}
              onChange={this.handleSelectChange}
            >
              {
                this.props.campaignList.map((item, i) => (
                  <MenuItem
                    value={item.value}
                    key={item.value}
                    primaryText={item.text}
                  />
                ))
              }
            </SelectField>
          </div>

          <div className="form-group">
            <label className="label">Price</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="campaignName"
              value={this.state.campaignName}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Price</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="campaignName"
              value={this.state.campaignName}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Price</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="campaignName"
              value={this.state.campaignName}
              style={{ width: '100%' }}
            />
          </div>
              
          <div className="form-group">
            <Checkbox
              checked={this.state.isPackOn}
              onChange={this.handleCheckboxChange('isPackOn')}
              value="isPackOn"
            />
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

export default CashbackSkuForm
