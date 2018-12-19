import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'

class CreateAdForm extends React.Component {
  constructor(props) {
    super(props)
    this.intialState = {
      status: props.status,
      title: props.title || '',
      image_url: props.image_url || '',
      high_res_image: '',
      low_res_image: '',
      active_from: null,
      active_to: null,
      shouldTrim: true
    }

    this.state = Object.assign({}, this.intialState)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleDate = this.handleDate.bind(this)
  }

  resetState() {
    this.setState(this.intialState)
  }

  handleDate(e) {
    const d = new Date(e.target.value)
    this.setState({ [e.target.name]: d.toISOString() })
  }

  handleCheckboxes(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  handleTextFields(e) {
    let value = e.target.value
    if (this.state.shouldTrim) {
      value = value.trim()
    }

    if (value.trim().length) {
      this.setState({ shouldTrim: false })
    } else {
      this.setState({ shouldTrim: true })
    }

    this.setState({ [e.target.name]: value })
    if (e.target.name === 'localityName' && this.props.removeLocalityErr) {
      this.props.removeLocalityErr()
    }
  }

  getData() {
    return this.state
  }

  render() {
    return (
      <Fragment>
        <div className="form-group">
          <label className="label">Ad title</label><br/>
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="title"
            hintText="sample ad title"
            value={this.state.title}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">Active from</label><br/>
            <input
              type='datetime-local'
              onChange={this.handleDate}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="active_from"
            />
          </div>

          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">Active to</label><br/>
            <input
              type='datetime-local'
              onChange={this.handleDate}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="active_to"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="label">Image url</label><br/>
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="image_url"
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.image_url}
            style={{ width: '100%' }}
          />
        </div>

        <div className="form-group">
          <label className="label">Low res image</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="low_res_image"
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.low_res_image}
            style={{ width: '100%' }}
          />
        </div>

        <div className="form-group">
          <label className="label">High res image</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="high_res_image"
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.high_res_image}
            style={{ width: '100%' }}
          />
        </div>

        <div className="form-group">
          <Checkbox
            disabled={this.props.isDisabled}
            onCheck={this.handleCheckboxes}
            name="status"
            label="status"
            checked={this.state.status}
          />
        </div>
      </Fragment>
    )
  }
}

export default CreateAdForm
