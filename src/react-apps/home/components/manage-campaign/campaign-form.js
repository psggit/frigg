import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Moment from 'moment'

class CampaignForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      campaignName: props.data ? props.data.name : "",
      activeFrom: props.data ? (props.data.active_from).slice(0,16) : "",
      activeTo: props.data ? (props.data.active_to).slice(0,16) : "",
      selectedBrandManagerIdx: props.data ? props.data.brand_manager_id : "",
      status: "",
      selectedStatusIdx: props.data ? props.data.is_active ? 1 : 2 : 1,
      campaignNameErr: {
        value: "",
        status: false
      },
      activeFromErr: {
        value: "",
        status: false
      },
      activeToErr: {
        value: "",
        status: false
      }
    }

    this.campaignStatus = [
      { text: 'Active', value: 1 },
      { text: 'Inactive', value: 2 },
    ]

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleBrandManagerChange = this.handleBrandManagerChange.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if(newProps.brandManagerList !== this.props.brandManagerList) {
      if(this.state.selectedBrandManagerIdx.toString().length === 0) {
        this.setState({selectedBrandManagerIdx: newProps.brandManagerList[0].value})
      }
    }
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName] : {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleStatusChange(e, k) {
    const selectedStatusIdx = k + 1
    this.setState({ selectedStatusIdx })
  }

  handleBrandManagerChange(e, k) {
    console.log("brand manaer", k, this.props.brandManagerList[k])
    const selectedBrandManagerIdx = k
    this.setState({ selectedBrandManagerIdx: this.props.brandManagerList[k].value })
  }

  handleDate(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName] : {
        value: "",
        status: false
      }
    })
    const d = new Date(e.target.value)
    this.setState({ [e.target.name]: d.toISOString() })
  }

  isFormValid() {
    if (this.state.campaignName.length === 0) {
      this.setState({
        campaignNameErr: {
          value: "Campaign name is required",
          status: true
        }
      })
      return false
    } else if (this.state.activeFrom.toString().length === 0) {
      this.setState({
        activeFromErr: {
          value: "Active from is required",
          status: true
        }
      })
      return false
    } else if (this.state.activeTo.toString().length === 0) {
      this.setState({
        activeToErr: {
          value: "Active to is required",
          status: true
        }
      })
      return false
    }

    return true
  }

  handleSave() {
    if(this.isFormValid()) {
      this.props.handleSave()
    }
  }

  render() {
    console.log("props", this.props, "date", this.state.selectedBrandManagerIdx)
    const {activeFromErr, activeToErr, campaignNameErr} = this.state
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
              onChange={this.handleTextFields}
              name="campaignName"
              value={this.state.campaignName}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
            {
              campaignNameErr.status &&
              <p className="error-message">* {campaignNameErr.value}</p>
            }
          </div>
        
          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">Active From</label><br/>
            <input
              type='datetime-local'
              onChange={this.handleDate}
              defaultValue={this.state.activeFrom}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="activeFrom"
            />
            {
              activeFromErr.status &&
              <p className="error-message">* {activeFromErr.value}</p>
            }
          </div>

          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">Active to</label><br/>
            <input
              type='datetime-local'
              onChange={this.handleDate}
              defaultValue={this.state.activeTo}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="activeTo"
            />
            {
              activeToErr.status &&
              <p className="error-message">* {activeToErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Brand Manager ID</label><br />
            <SelectField
              value={this.state.selectedBrandManagerIdx}
              onChange={this.handleBrandManagerChange}
            >
              {
                this.props.brandManagerList.map((item, i) => (
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
            <label className="label">Status</label><br/>
            <SelectField
              //disabled={this.props.isDisabled}
              value={this.state.selectedStatusIdx}
              onChange={this.handleStatusChange}
            >
              {
                this.campaignStatus.map((item, i) => (
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
              onClick={this.handleSave}
            />
          </div>
        </Card>
      </Fragment>
    )
  }
}

export default CampaignForm
