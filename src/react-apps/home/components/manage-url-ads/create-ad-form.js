import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { POST } from '@utils/fetch'
import { Api } from '@utils/config'
import getIcon from './../icon-utils'

class CreateAdForm extends React.Component {
  constructor(props) {
    super(props)
    this.uploadedImageUrl = ''
    this.intialState = {
      status: props.status,
      title: props.title || '',
      image_url: props.image_url || '',
      hyperlink_url: props.hyperlink_url || '',
      high_res_image: '',
      low_res_image: '',
      active_from: null,
      active_to: null,
      shouldTrim: true,
      //collectionName: 'select-collection',
      isImageUploaded: false,
      isImageUploading: false,
      isImageSelected: false
    }

    this.state = Object.assign({}, this.intialState)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleDate = this.handleDate.bind(this)
    //this.handleCollectionChange = this.handleCollectionChange.bind(this)
    this.handleUploadChange = this.handleUploadChange.bind(this)
    this.submitUploadedImage = this.submitUploadedImage.bind(this)
    this.resetUploadImage = this.resetUploadImage.bind(this)
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

  handleUploadChange(e) {
    const file = e.target.files[0]
    this.setState({
      data: file,
      isImageSelected: true
    })
  }

  resetUploadImage() {
    this.setState({ isImageUploaded: false, isImageSelected: false, isImageUploading: false, image_url: '' })
  }

  submitUploadedImage() {
    const formData = new FormData()
    formData.append('file', this.state.data)
    this.setState({ isImageUploading: true, isImageSelected: false })
    POST({
      api: '/upload',
      type: 'FormData',
      apiBase: 'api2',
      data: formData,
      handleError: true
    })
      .then((json) => {
        this.uploadedImageUrl = `${Api.api2}/get?fs_url=${json[0]}`
        this.setState({ isImageUploaded: true, isImageUploading: false, image_url: json[0] })
      })
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

  // handleCollectionChange(e) {
  //   this.setState({ collectionName: e.target.value })
  // }

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
          <label className="label">Upload image</label><br />
          {
            !this.state.isImageUploaded &&
            <div>
              <input
                onChange={this.handleUploadChange}
                type="file"
                style={{
                  marginTop: '15px',
                  padding: '0',
                  border: '0'
                }}
              />

              <button
                disabled={!this.state.isImageSelected || this.state.isImageUploading}
                onClick={this.submitUploadedImage}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: this.state.isImageUploading ? 'progress' : 'pointer'
                }}
              >
                Upload
              </button>
            </div>
          }
          {
            this.state.isImageUploaded &&
            <div style={{
              width: '200px',
              marginTop: '15px',
              position: 'relative'
            }}>
              <img src={this.uploadedImageUrl} style={{ width: '200px', height: '120px' }} />
              <div
                onClick={this.resetUploadImage}
                style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                zIndex: '1',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#fff'
              }}>
                { getIcon('cross-circle') }
              </div>
            </div>
          }
        </div>

        <div className="form-group">
          <label className="label">Image url</label><br />
          <TextField
            readOnly
            onChange={this.handleTextFields}
            name="high_res_image"
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.image_url}
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
          <label className="label">Hyperlink Url</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="hyperlink_url"
            hintText="https://hipbar.com"
            value={this.state.hyperlink_url}
            style={{ width: '100%' }}
          />
        </div>

        {/* <div className="form-group">
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
        </div> */}

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
