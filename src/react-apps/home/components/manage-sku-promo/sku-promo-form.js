import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import Checkbox from 'material-ui/Checkbox'
import MenuItem from 'material-ui/MenuItem'
import Moment from 'moment'

class SkuPromoForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedCampaignIdx: "",
      promoName: "",
      amount: "",
      description: "",
      isPackOn: false
    }
    
    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }


  componentWillReceiveProps(newProps) {
    console.log("pros", newProps)
    if(newProps.campaignList !== this.props.campaignList) {
      //console.log("props", newProps.brandManagerList[0])
      if(this.state.selectedCampaignIdx.toString().length === 0) {
        this.setState({selectedCampaignIdx: newProps.campaignList[0].value})
      }
    }
  }
  
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
            <label className="label">Amount</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="price"
              value={this.state.amount}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Promo Name</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="campaignName"
              value={this.state.promoName}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Promo Description</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="campaignName"
              value={this.state.promoDescription}
              style={{ width: '100%' }}
            />
          </div>
              
          <div className="form-group">
            <Checkbox
              checked={this.state.isPackOn}
              onChange={() => this.handleCheckboxChange('isPackOn')}
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

export default SkuPromoForm
