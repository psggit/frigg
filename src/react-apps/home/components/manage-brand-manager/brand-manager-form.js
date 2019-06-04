import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Moment from 'moment'

class BrandManagerForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.data ? props.data.name : "",
      phone: props.data ? props.data.mobile_number : "",
      email: props.data ? props.data.email : "",
      password: props.data ? props.data.password : "",
      selectedCompanyIdx: props.data ? props.data.company_id : "",
      //status: "",
      selectedKycStatusIdx: props.data ? props.data.kyc_status === "Verified" ? 1 : 2 : 1,
      selectedStatusIdx: props.data ? props.data.activity_status ? 1 : 2 : 1,
      nameErr: {
        value: "",
        status: false
      },
      emailErr: {
        value: "",
        status: false
      },
      phoneErr: {
        value: "",
        status: false
      },
      passwordErr: {
        value: "",
        status: false
      }
    }

    this.brandManagerStatus = [
      { text: 'Active', value: 1 },
      { text: 'Inactive', value: 2 },
    ]

    this.kycStatus = [
      { text: 'Verified', value: 1 },
      { text: 'Not Verified', value: 2 },
    ]

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleKycStatusChange = this.handleKycStatusChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleCompanyChange = this.handleCompanyChange.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.companyList !== this.props.companyList) {
      if (this.state.selectedCompanyIdx.toString().length === 0) {
        this.setState({ selectedCompanyIdx: newProps.companyList[0].value })
      }
    }
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName]: {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleStatusChange(e, k) {
    const selectedIdx = k + 1
    this.setState({ selectedStatusIdx: selectedIdx })
  }

  handleKycStatusChange(e, k) {
    const selectedIdx = k + 1
    this.setState({ selectedKycStatusIdx: selectedIdx })
  }

  handleCompanyChange(e, k) {
    this.setState({ selectedCompanyIdx: this.props.companyList[k].value })
  }

  isFormValid() {
    if (this.state.name.length === 0) {
      this.setState({
        nameErr: {
          value: "Name is required",
          status: true
        }
      })
      return false
    } else if (this.state.email.toString().length === 0) {
      this.setState({
        emailErr: {
          value: "Email is required",
          status: true
        }
      })
      return false
    } else if (this.state.phone.toString().length === 0) {
      this.setState({
        phoneErr: {
          value: "Phone is required",
          status: true
        }
      })
      return false
    } else if (location.href.indexOf('create') !== -1 && this.state.password.toString().length === 0) {
      this.setState({
        passwordErr: {
          value: "Password is required",
          status: true
        }
      })
      return false
    }

    return true
  }

  handleSave() {
    if (this.isFormValid()) {
      this.props.handleSave()
    }
  }

  render() {
    console.log("props", this.props, "date", this.state.selectedBrandManagerIdx)
    const { nameErr, emailErr, phoneErr, passwordErr } = this.state
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Brand Manager Details</h4>
          <div className="form-group">
            <label className="label">Name *</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="name"
              value={this.state.name}
              style={{ width: '100%' }}
            />
            {
              nameErr.status &&
              <p className="error-message">* {nameErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Email *</label><br />
            <TextField
              disabled={this.props.data !== undefined}
              onChange={this.handleTextFields}
              name="email"
              value={this.state.email}
              style={{ width: '100%' }}
            />
            {
              emailErr.status &&
              <p className="error-message">* {emailErr.value}</p>
            }
          </div>

          {
            location.href.indexOf('edit') === -1 &&
            <div className="form-group">
              <label className="label">Password *</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="password"
                value={this.state.password}
                style={{ width: '100%' }}
              />
              {
                passwordErr.status &&
                <p className="error-message">* {passwordErr.value}</p>
              }
            </div>
          }

          <div className="form-group">
            <label className="label">Phone *</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="phone"
              disabled={this.props.data !== undefined}
              value={this.state.phone}
              style={{ width: '100%' }}
            />
            {
              phoneErr.status &&
              <p className="error-message">* {phoneErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Company</label><br />
            <SelectField
              value={this.state.selectedCompanyIdx}
              onChange={this.handleCompanyChange}
              name="selectedCompanyIdx"
            >
              {
                this.props.companyList.map((item, i) => (
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
            <label className="label">KYC Status</label><br />
            <SelectField
              //disabled={this.props.isDisabled}
              value={this.state.selectedKycStatusIdx}
              onChange={this.handleKycStatusChange}
              name="selectedKycStatusIdx"
            >
              {
                this.kycStatus.map((item, i) => (
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
            <label className="label">Status</label><br />
            <SelectField
              //disabled={this.props.isDisabled}
              value={this.state.selectedStatusIdx}
              onChange={this.handleStatusChange}
            >
              {
                this.brandManagerStatus.map((item, i) => (
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

export default BrandManagerForm
