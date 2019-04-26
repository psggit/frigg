import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Moment from 'moment'

class CompanyForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedCityId: props.data ? props.data.city_id : "",
      selectedStateId: props.data ? props.data.state_id : "",
      stateList: [],
      cityList: [],
      stateMap: {},
      companyName: props.data ? props.data.name : "",
      address: props.data ? props.data.address : "",
      pincode: props.data ? props.data.pin_code : "",
      companyNameErr: {
        status: false,
        value: ""
      },
      addressErr: {
        status: false,
        value: ""
      },
      pincodeErr: {
        status: false,
        value: ""
      }
    }
  
    this.getData = this.getData.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleChangeInPincode = this.handleChangeInPincode.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if(this.props.cityList !== newProps.cityList) {
      this.setState({
        cityList: newProps.cityList, 
        selectedCityId: !this.state.selectedCityId ? newProps.cityList[0].value : this.state.selectedCityId 
      })
    }

    if(this.props.stateList !== newProps.stateList) {
      this.setState({
        stateList: newProps.stateList, 
        selectedStateId: !this.state.selectedStateId ? newProps.stateList[0].value : this.state.selectedStateId
      })
    }

    if(this.props.stateMap !== newProps.stateMap) {
      this.setState({
        stateMap: newProps.stateMap,
        cityList: !this.state.selectedCityId ? newProps.cityList : newProps.stateMap[this.state.selectedStateId]
      })
    }
  }

  handleCityChange(e, k) {
    this.setState({ selectedCityId: this.state.cityList[k].value })
  }

  handleStateChange(e, k) {
    this.setState({ 
      selectedStateId: this.state.stateList[k].value,
      cityList: this.state.stateMap[parseInt(this.state.stateList[k].value)],
      selectedCityId: this.state.stateMap[parseInt(this.state.stateList[k].value)][0].value
    })
  }

  handleChangeInPincode(e) {
    this.setState({
      pincodeErr: {
        value: "",
        status: false
      }
    })
    const re = /^[0-9\b]*$/;
    if ((e.target.value === '' || re.test(e.target.value))) {
       this.setState({pincode: e.target.value})
    }
  }

  isFormValid() {
    if(this.state.companyName.toString().length === 0) {
      this.setState({
        companyNameErr: {
          value: "Company name is required",
          status: true
        }
      })
      return false
    } else if(this.state.address.toString().length === 0) {
      this.setState({
        addressErr: {
          value: "Address is required",
          status: true
        }
      })
      return false
    } else if(this.state.pincode.toString().length === 0) {
      this.setState({
        pincodeErr: {
          value: "Pincode is required",
          status: true
        }
      })
      return false
    }
    return true
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

  handleSave() {
    //console.log("is form", this.isFormValid())
    if(this.isFormValid()) {
      this.props.handleSave()
    }
  }

  render() {
    const {addressErr, companyNameErr, pincodeErr} = this.state
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
          <div className="form-group">
            <label className="label">Company Name</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="companyName"
              value={this.state.companyName}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
            {
              companyNameErr.status &&
              <p className="error-message">* {companyNameErr.value}</p>
            }
          </div>
          <div className="form-group">
            <label className="label">State</label><br />
            <SelectField
              value={this.state.selectedStateId}
              onChange={this.handleStateChange}
            >
              {
                this.state.stateList.map((item, i) => (
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
            <label className="label">City</label><br />
            <SelectField
              value={this.state.selectedCityId}
              onChange={this.handleCityChange}
            >
              {
                this.state.cityList.map((item, i) => (
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
            <label className="label">Address</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="address"
              value={this.state.address}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
            {
              addressErr.status &&
              <p className="error-message">* {addressErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Pincode</label><br/>
            <TextField 
              value={this.state.pincode}
              onChange={this.handleChangeInPincode}
              maxlength={6}
            />
            {
              pincodeErr.status &&
              <p className="error-message">* {pincodeErr.value}</p>
            }
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

export default CompanyForm
