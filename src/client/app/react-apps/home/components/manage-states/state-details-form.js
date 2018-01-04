import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'

class StateDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stateShortName: props.stateShortName || '',
      stateName: props.stateName || ''
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
  }

  handleCheckboxes(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  getData() {
    return this.state
  }

  render() {
    return (
      <Fragment>
        <div className="form-group">
          <label className="label">State name</label><br/>
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="stateName"
            value={this.state.stateName}
          />
        </div>

        <div className="form-group">
          <label className="label">State short name</label><br/>
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="stateShortName"
            value={this.state.stateShortName}
          />
        </div>
      </Fragment>
    )
  }
}

export default StateDetailsForm
