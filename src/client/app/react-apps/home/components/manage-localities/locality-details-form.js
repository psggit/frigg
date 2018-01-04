import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class LocalityDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLocalityActive: props.isLocalityActive || true,
      cityName: props.cityName || '',
      localityName: props.localityName || ''
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ localityName: nextProps.localityName })
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
          <label className="label">Locality name</label><br/>
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="localityName"
            value={this.state.localityName}
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            checked={this.state.isLocalityActive}
            onCheck={this.handleCheckboxes}
            name="isLocalityActive"
            label="is_available"
          />
        </div>
      </Fragment>
    )
  }
}

export default LocalityDetailsForm
