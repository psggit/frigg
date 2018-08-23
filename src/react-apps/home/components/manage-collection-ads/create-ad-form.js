import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class CreateAdForm extends React.Component {
  constructor(props) {
    super(props)
    this.intialState = {
      status: props.status,
      title: props.title || '',
      image_url: props.image_url || '',
      active_from: null,
      active_to: null,
      shouldTrim: true,
      collectionName: 'select-collection'
    }

    this.state = Object.assign({}, this.intialState)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleCollectionChange = this.handleCollectionChange.bind(this)
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

  handleCollectionChange(e) {
    this.setState({ collectionName: e.target.value })
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
          <label className="label">Collection</label><br />
          <select selected={this.state.collectionName} onChange={this.handleCollectionChange} style={{ marginTop: '10px', width: '100%', height: '36px' }}>
            <option>select-collection</option>
            {
              !this.props.loadingCollections
              ? (
                this.props.collectionsData.map((item, i) => (
                  <option
                    key={item.short_name}
                    value={item.short_name}
                  >
                    { item.display_name }
                  </option>
                ))
              )
              : ''
            }
          </select>
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
