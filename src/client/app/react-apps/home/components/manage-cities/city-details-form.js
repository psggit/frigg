import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

class CityDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCityActive: props.isCityActive || false,
      cityName: props.cityName || ''
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
          <p className="label">Name</p>
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="cityName"
            value={this.state.cityName}
          />
        </div>

        <div className="form-group">
          <p className="label">Active</p>
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.isCityActive}
            onCheck={this.handleCheckboxes}
            name="isCityActive"
            label="is_active"
          />
        </div>
      </Fragment>
    )
  }
}

export default CityDetailsForm