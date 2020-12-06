import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class StoryForm extends React.Component {

  constructor(props) {
    super(props)
    console.log("data", props.data)
    this.state = {
      selectedTypeIdx: props.data ? props.data.type === "image" ? 1 : -1 : -1,
      selectedStatusIdx: props.data ? props.data.is_active ? 1 : -1 : -1,
      file: '',
      fileUrl: props.data ? props.data.url : '',
      storyName: props.data ? props.data.name : '',
      thumbnailUrl: props.data ? props.data.thumbnail_url :'',
      displayDuration: props.data ? props.data.default_display_duration :'',
      startsOn: props.data ? (props.data.starts_on).slice(0, 16) : '',
      expiresOn: props.data ? (props.data.expires_on).slice(0, 16) : ''
    }

    this.fileType = [
      { text: 'Image', value: 1 },
      { text: 'Video', value: 2 },
    ]

    this.status = [
      { text: 'Active', value: 1 },
      { text: 'Inctive', value: 2 }
    ]

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.getData = this.getData.bind(this)
    this.handleUploadChange = this.handleUploadChange.bind(this)
  }

  handleTypeChange(e, k) {
    const typeIdx = k + 1
    console.log("status", typeIdx)
    this.setState({ selectedTypeIdx: typeIdx })
  }

  handleStatusChange(e, k) {
    const statusIdx = k + 1
    console.log("status", statusIdx)
    this.setState({ selectedStatusIdx: statusIdx })
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDate(e) {
    const d = new Date(e.target.value)
    this.setState({ [e.target.name]: d.toISOString() })
  }

  handleUploadChange(e) {
    const file = e.target.files[0]
    this.setState({
      file
    })
  }

  getData() {
    return this.state
  }

  render() {
    return (
      <React.Fragment>
        <Card style={{
          padding: '20px',
          width: '300px',
          position: 'relative',
          display: 'block',
          verticalAlign: 'top',
          marginRight: '20px'
        }}
        >
          <div className="form-group">
            <label className="label">Story Name</label><br />
            <TextField
              disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="storyName"
              value={this.state.storyName}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Type</label><br />
            <SelectField
              disabled={this.props.isDisabled}
              value={this.state.selectedTypeIdx}
              onChange={this.handleTypeChange}
            >
              {
                this.fileType.map((item, i) => (
                  <MenuItem
                    value={i + 1}
                    key={item.value}
                    primaryText={item.text}
                  />
                ))
              }
            </SelectField>
          </div>
          {
            this.props.action === "create" &&
            <div className="form-group">
              <label className="label">Upload File</label><br />
              <div>
                <input
                  disabled={this.props.isDisabled}
                  onChange={this.handleUploadChange}
                  type="file"
                  style={{
                    marginTop: '15px',
                    padding: '0',
                    border: '0'
                  }}
                />
              </div>
            </div>
          }

          {
            this.props.action === "edit" &&
            <div className="form-group">
              <label className="label">Uploaded File Url</label><br />
              <TextField
                disabled={this.props.isDisabled}
                name="fileUrl"
                value={this.state.fileUrl}
              />
            </div>
          }

          <div className="form-group">
            <label className="label">Thumbnail Url</label><br />
            <TextField
              //disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="thumbnailUrl"
              value={this.state.thumbnailUrl}
            />
          </div>

          <div className="form-group">
            <label className="label">Default Display Duration (in secs)</label><br />
            <TextField
              //disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="displayDuration"
              value={this.state.displayDuration}
            />
          </div>

          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">Starts On</label><br />
            <input
              type='datetime-local'
              onChange={this.handleDate}
              defaultValue={this.state.startsOn}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="startsOn"
            />
          </div>

          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">Expires On</label><br />
            <input
              type='datetime-local'
              onChange={this.handleDate}
              className="inline-input"
              defaultValue={this.state.expiresOn}
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="expiresOn"
            />
          </div>
          
          <div className="form-group">
            <label className="label">Status</label><br />
            <SelectField
              value={this.state.selectedStatusIdx}
              onChange={this.handleStatusChange}
            >
              {
                this.status.map((item, i) => (
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
              onClick={this.props.handleSave}
            />
          </div>
        </Card>
      </React.Fragment>
    )
  }
}

export default StoryForm