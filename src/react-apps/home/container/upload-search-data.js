import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import getIcon from './../components/icon-utils'
import * as Actions from './../actions'
import '@sass/components/_file-uploader.scss'

class UploadSearchData extends React.Component {
  constructor() {
    super()
    this.state = {
      message: 'Choose a csv file'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUploadClick = this.handleUploadClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleIndexSearchData = this.handleIndexSearchData.bind(this)
  }

  handleSubmit() {
    const formData = new FormData()
    formData.append('data', this.state.data)
    this.props.actions.uploadSearchData(formData)
  }

  handleIndexSearchData() {
    this.props.actions.indexSearchData()
  }

  handleUploadClick() {
    this.fileInput.click()
  }

  handleChange(e) {
    this.setState({ message: 'Choose csv file' })
    const file = e.target.files[0]
    this.setState({
      data: file,
      message: file.name
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
          <p>{ this.state.message }</p>
        </div>
        <input
          style={{ display: 'none' }}
          ref={(node) => { this.fileInput = node }}
          onChange={(e) => { this.handleChange(e) }}
          type="file"
          accept=".csv"
        />
        <br />
        <RaisedButton
          onClick={this.handleSubmit}
          primary
          label="Save"
        />
        <RaisedButton
          style={{ marginLeft: '20px' }}
          onClick={this.handleIndexSearchData}
          primary
          label="Index"
        />
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadSearchData)
