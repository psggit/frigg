import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import getIcon from './../components/icon-utils'
import '@sass/components/_file-uploader.scss'
import * as Api from "./../middleware/api"

class UploadPurchasedGiftCardDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      message: 'Choose a csv file',
      data: '',
      uploadingCsv: true,
      reconciliing: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUploadClick = this.handleUploadClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleIndexSearchData = this.handleIndexSearchData.bind(this)
  }

  handleSubmit() {
    // console.log("stat", this.state)
    const formData = new FormData()
    console.log("form data", formData)
    formData.append('data', this.state.data)
    console.log("form data1", formData)
    this.setState({
      uploadingCsv: true
    })
    Api.uploadGiftCardData({
      data: formData
    })
      .then((response) => {
        console.log("response", response)
        this.setState({
          uploadingCsv: false
        })
      })
      .catch((err) => {
        console.log("Error", err)
        this.setState({
          uploadingCsv: false
        })
      })
  }

  handleIndexSearchData() {
    this.setState({
      reconciliing: true
    })
    Api.reconcile({})
      .then((response) => {
        console.log("Response", response)
        this.setState({
          reconciliing: false
        })
      })
      .catch((err) => {
        console.log("Error", err)
        this.setState({
          reconciliing: false
        })
      })
  }

  handleUploadClick() {
    this.fileInput.click()
  }

  handleChange(e) {
    this.setState({ message: 'Choose csv file' })
    const file = e.target.files[0]
    console.log("file", file)
    this.setState({
      data: file,
      message: file.name
    })
  }

  render() {
    const { uploadingCsv } = this.state
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
          {getIcon('upload')}
          <p>{this.state.message}</p>
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
          // disabled={!uploadingCsv}
          label="Save"
        />
        <RaisedButton
          style={{ marginLeft: '20px' }}
          onClick={this.handleIndexSearchData}
          disabled={uploadingCsv}
          primary
          label="Reconciliation"
        />
      </div>
    )
  }
}
export default UploadPurchasedGiftCardDetails
