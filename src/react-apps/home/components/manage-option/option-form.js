import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'

class OptionForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      optionName: props.data ? props.data.name : "",
    
      optionNameErr: {
        value: "",
        status: false
      },
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
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

  isFormValid() {
    if (this.state.optionName.length === 0) {
      this.setState({
        optionNameErr: {
          value: "option name is required",
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
    const {optionNameErr} = this.state
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Option Details</h4>
          <div className="form-group">
            <label className="label">Option Name</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="optionName"
              value={this.state.optionName}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
            {
              optionNameErr.status &&
              <p className="error-message">* {optionNameErr.value}</p>
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

export default OptionForm
