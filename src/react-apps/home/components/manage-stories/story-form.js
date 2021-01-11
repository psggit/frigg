import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class StoryForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      error: {},
      selectedTypeIdx: props.data ? props.data.type === "image" ? 1 : 2 : 1,
      selectedStatusIdx: props.data ? props.data.is_active ? 1 : 2 : 1,
      url: props.data ? props.data.url : '',
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
      { text: 'Inactive', value: 2 }
    ]

    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.getData = this.getData.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
    //this.handleUploadChange = this.handleUploadChange.bind(this)
  }

  handleTypeChange(e, k) {
    const typeIdx = k + 1
    this.setState({ selectedTypeIdx: typeIdx })
  }

  handleStatusChange(e, k) {
    const statusIdx = k + 1
    this.setState({ selectedStatusIdx: statusIdx })
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Status`
    this.setState({
      error: {
        value: "",
        [errName]: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDate(e) {
    const errName = `${e.target.name}Status`
    this.setState({
      error: {
        value: "",
        [errName]: false
      }
    })
    const d = new Date(e.target.value)
    this.setState({ [e.target.name]: d.toISOString() })
  }

  // handleUploadChange(e) {
  //   const file = e.target.files[0]
  //   this.setState({
  //     file
  //   })
  // }

  getData() {
    return this.state
  }

  isFormValid() {
    if (this.state.storyName.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Storyname is required",
          storyNameStatus: true
        }
      }))
      return false
    } else if (this.state.url.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Url is required",
          urlStatus: true
        }
      }))
      return false
    } else if (this.state.displayDuration.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Display duration is required",
          displayDurationStatus: true
        }
      }))
      return false
    } else if (this.state.displayDuration.toString() === "0") {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Display duration should not be zero",
          displayDurationStatus: true
        }
      }))
      return false
    } else if (this.state.startsOn.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Starts on is required",
          startsOnStatus: true
        }
      }))
      return false
    } else if (this.state.expiresOn.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Expires on is required",
          expiresOnStatus: true
        }
      }))
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
    return (
      <React.Fragment>
        <Card style={{
          padding: '20px',
          width: '600px',
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
            {
              this.state.error.storyNameStatus &&
              <p className="error-message">* {this.state.error.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Type</label><br />
            <SelectField
              disabled={this.props.isDisabled}
              value={this.state.selectedTypeIdx}
              onChange={this.handleTypeChange}
              style={{ width: '100%' }}
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
          {/* {
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
          } */}
         
          <div className="form-group">
            <label className="label">Url</label><br />
            <TextField
              onChange={this.handleTextFields}
              disabled={this.props.isDisabled}
              name="url"
              value={this.state.url}
              style={{ width: '100%' }}
            />
            {
              this.state.error.urlStatus &&
              <p className="error-message">* {this.state.error.value}</p>
            }
          </div>
          {
            this.state.selectedTypeIdx === 2 &&
            <div className="form-group">
              <label className="label">Thumbnail Url</label><br />
              <TextField
                //disabled={this.props.isDisabled}
                onChange={this.handleTextFields}
                name="thumbnailUrl"
                value={this.state.thumbnailUrl}
                style={{ width: '100%' }}
              />
              {
                this.state.error.thumbnailUrlStatus &&
                <p className="error-message">* {this.state.error.value}</p>
              }
            </div>
          }
          
          <div className="form-group">
            <label className="label">Default Display Duration (in secs)</label><br />
            <TextField
              //disabled={this.props.isDisabled}
              onChange={this.handleTextFields}
              name="displayDuration"
              value={this.state.displayDuration}
              style={{ width: '100%' }}
            />
            {
              this.state.error.displayDurationStatus &&
              <p className="error-message">* {this.state.error.value}</p>
            }
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
            {
              this.state.error.startsOnStatus &&
              <p className="error-message">* {this.state.error.value}</p>
            }
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
            {
              this.state.error.expiresOnStatus &&
              <p className="error-message">* {this.state.error.value}</p>
            }
          </div>
          
          <div className="form-group">
            <label className="label">Status</label><br />
            <SelectField
              value={this.state.selectedStatusIdx}
              onChange={this.handleStatusChange}
              style={{ width: '100%' }}
            >
              {
                this.status.map((item, i) => {
                  return (
                    <MenuItem
                      value={i + 1}
                      key={item.value}
                      primaryText={item.text}
                    />
                  )
                })
              }
            </SelectField>
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
      </React.Fragment>
    )
  }
}

export default StoryForm