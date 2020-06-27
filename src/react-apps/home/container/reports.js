import React from "react"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import { exportCSV } from './../../utils'

class Reports extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedReportId: 1,
      selectedReport: 'Retailer Redemption Report',
      reportOptions: [],
      selectedReport: {},
      fromDate: "",
      toDate: "",
      isDownloading: false,
      fromDateErr: {
        value: "",
        status: false
      },
      toDateErr: {
        value: "",
        status: false
      }
    }

    this.handleReportChange = this.handleReportChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.downloadReport = this.downloadReport.bind(this)
  }

  componentDidMount() {
    Api.reportOptions()
     .then((response) => {
       const reportList = response.reports.map((item, index) => {
         return ({
           text: item.display_name,
           value: index,
           report_name: item.report_name
         })
       })
        this.setState({
          reportOptions: reportList,
          selectedReport: reportList[0]
        })
     })
     .catch((error) => {
       console.log("Error in fetching report list", error)
     })
  }

  handleReportChange(e, k) {
    this.setState({
      selectedReport: this.state.reportOptions[k]
    })
  }

  handleDate(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  downloadReport() {
    this.setState({ isDownloading: true })
    Api.downloadReport({
      url: this.state.selectedReport.report_name,
      start_date: this.state.fromDate,
      end_date: this.state.toDate
    })
      .then((csv) => {
        this.setState({ isDownloading: false })
        exportCSV(csv, this.state.selectedReport.report_name)
      })
      .catch((err) => {
        console.log("Error in downloading reports", err)
      })
  }

  // exportCSV(csv) {
  //   const filename = 'export.csv'
  //   const blob = new Blob([csv], { type: `text/csv`});
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = filename;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  render() {
    const { fromDateErr, toDateErr } = this.state
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Report Details</h4>

          <div className="form-group">
            <SelectField
              value={this.state.selectedReport.value}
              onChange={this.handleReportChange}
              disabled={this.props.isDisabled}
            >
              {
                this.state.reportOptions.map((item, i) => (
                  <MenuItem
                    value={item.value}
                    key={item.value}
                    primaryText={item.text}
                  />
                ))
              }
            </SelectField>
          </div> 
          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">From</label><br />
            <input
              type='date'
              onChange={this.handleDate}
              defaultValue={this.state.from}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="fromDate"
            />
            {
              fromDateErr.status &&
              <p className="error-message">* {fromDateErr.value}</p>
            }
          </div>
          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">To</label><br />
            <input
              type='date'
              onChange={this.handleDate}
              defaultValue={this.state.from}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="toDate"
            />
            {
              toDateErr.status &&
              <p className="error-message">* {toDateErr.value}</p>
            }
          </div>
          <div className="form-group">
            <RaisedButton
              label={this.state.isDownloading ? "Downloading..." : "Download"}
              primary
              disabled={this.state.isDownloading || (this.state.fromDate.length === 0 && this.state.toDate.length === 0)}
              onClick={this.downloadReport}
            />
          </div>
        </Card>
      </React.Fragment>
    )
  }
}

export default Reports