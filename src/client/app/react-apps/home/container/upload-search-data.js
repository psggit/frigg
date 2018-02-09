import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import getIcon from './../components/icon-utils'
import '@sass/components/_file-uploader.scss'

class UploadSearchData extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleUploadClick = this.handleUploadClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    this.props.actions.uploadSearchData({
      fileName: this.state.data,
      name: 'data'
    })
  }

  handleUploadClick() {
    this.fileInput.click()
  }

  handleChange(e) {
    const file = e.target.files[0]
    this.setState({
      data: file,
    })
  }

  render() {
    return (
      <div style={{
        width: '100%',
        maxWidth: 900
      }}
      >
        <h3>Upload CSV file</h3>
        <div
          onClick={this.handleUploadClick}
          className='file-uploader'
        >
          { getIcon('upload') }
          {
            this.state.data &&
            <p>{ this.state.data.name }</p>
          }
        </div>
        <input
          style={{ display: 'none' }}
          ref={(node) => { this.fileInput = node }}
          onChange={(e) => { this.handleChange(e) }}
          type="file"
        />
        <br />
        <RaisedButton
          onClick={this.handleSubmit}
          primary
          label="Save"
        />
      </div>
    )
  }
}

export default UploadSearchData
