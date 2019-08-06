import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import getIcon from './../components/icon-utils'
import '@sass/components/_file-uploader.scss'
import * as Api from "./../middleware/api"
import Notify from '@components/Notification'

class UploadPurchasedGiftCardDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      message: 'Choose a csv file',
      data: null,
      uploadingCsv: false,
      reconciling: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleUploadClick = this.handleUploadClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleIndexSearchData = this.handleIndexSearchData.bind(this)
  }

  handleSubmit() {
    console.log("stat", this.state)
    if (this.state.data) {
      const formData = new FormData()
      formData.append('data', this.state.data)
      this.setState({
        uploadingCsv: true
      })
      Api.uploadGiftCardData({
        data: formData
      })
        .then((response) => {
          Notify("Successfully uploaded report", "success")
          this.setState({
            uploadingCsv: false,
            reconciling: false
          })
        })
        .catch((err) => {
          Notify("Something went wrong", "warning")
          this.setState({
            uploadingCsv: false
          })
        })
    }
  }

  handleIndexSearchData() {
    this.setState({
      reconciling: true
    })
    Api.reconcile({})
      .then((response) => {
        Notify("Reconciled successfully", "success")
        this.setState({
          reconciling: false
        })
      })
      .catch((err) => {
        Notify("Something went wrong", "warning")
        this.setState({
          reconciling: false
        })
      })
  }

  handleUploadClick() {
    this.fileInput.click()
  }

  handleChange(e) {
    this.setState({ message: 'Choose csv file', data: null })
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel'];
    if (allowedTypes.indexOf(e.target.files[0].type) !== -1) {
      const file = e.target.files[0]
      this.setState({
        data: file,
        message: file.name
      })
    } else {
      Notify("Please upload (.csv) file", "warning")
    }
  }

  render() {
    const { uploadingCsv, reconciling, data } = this.state
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
          disabled={uploadingCsv}
          label="Save"
        />
        <RaisedButton
          style={{ marginLeft: '20px' }}
          onClick={this.handleIndexSearchData}
          disabled={reconciling}
          primary
          label="Reconcile"
        />
      </div>
    )
  }
}
export default UploadPurchasedGiftCardDetails
