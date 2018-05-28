import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'

class DeliveryAgentDetailsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dpId: props.dpId || null
    }
  }
  render() {
    return (
      <Fragment>
        <div>
          <h4 style={{ textAlign: 'center' }}>Employee info</h4>
          <div className="form-group form-inline">
            <label className="label">Employee Id</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Employee name</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Contact no</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Date of birth</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Nationality</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">City</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Branch</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Device no</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Device operator</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Email</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Is freelancer</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Is active</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>
        </div>

        <div>
          <h4 style={{ textAlign: 'center' }}>Employee Id</h4>
          <div className="form-group form-inline">
            <label className="label">Proof type</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Proof text</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group">
            <label className="label">Proof image</label><br /><br />
            <input
              type="file"
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>
        </div>

        <div>
          <h4 style={{ textAlign: 'center' }}>Vehicle info</h4>
          <div className="form-group form-inline">
            <label className="label">Vehicle reg. no.</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Vehicle type</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group form-inline">
            <label className="label">Driving license no.</label>
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>

          <div className="form-group">
            <label className="label">Driving license image</label><br /><br />
            <input
              type="file"
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="cityName"
              value={this.state.dpId}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default DeliveryAgentDetailsForm
