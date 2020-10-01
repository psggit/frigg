import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'

class DeliveryServiceProviderForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: props.data ? props.data.delivery_service_provider_name : "",

      nameErr: {
        status: false,
        value: ""
      },
    }
    this.getData = this.getData.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
  }

  isFormValid() {
    if (this.state.name.toString().length === 0) {
      this.setState({
        nameErr: {
          value: "name is required",
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
      [errName]: {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSave() {
    if (this.isFormValid()) {
      this.props.handleSave()
    }
  }

  render(){
    const { nameErr } = this.state
    return(
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter DSP details</h4>
          <div className="form-group">
            <label className="label">Name</label><br />
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

export default DeliveryServiceProviderForm