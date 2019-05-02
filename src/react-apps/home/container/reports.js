import React from "react"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import {exportCSV} from './../../utils'

class Reports extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedReportId: 1,
      selectedReport: 'Retailer Redemption Report',
      fromDate: "",
      toDate: "",
      fromDateErr: {
        value: "",
        status: false
      },
      toDateErr: {
        value: "",
        status: false
      }
    }

    this.reportOptions = [
      { text: 'Retailer Redemption Report', value: 1 },
      { text: 'Brand Sales Report', value: 2 },
      { text: 'Loading Cash Into Wallet', value: 3 },
      { text: 'Retailer Manual Credits and Debits', value: 4 },
      { text: 'Consumer Manual Credit and Debit', value: 5 }
    ]

    this.reportMap = {
      'Retailer Redemption Report': 'retailer_redemption_report',
      'Brand Sales Report': 'brand_sales_report',
      'Loading Cash Into Wallet': 'loading_cash_into_wallet',
      'Retailer Manual Credits and Debits': 'retailer_manual_credits_and_debits_report',
      'Consumer Manual Credit and Debit': 'consumer_manual_credits_and_debits_view'
    }

    this.handleReportChange = this.handleReportChange.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.downloadReport = this.downloadReport.bind(this)
  }

  handleReportChange(e, k) {
    this.setState({
      selectedReportId: this.reportOptions[k].value,
      selectedReport: this.reportOptions[k].text
    }, this.successReportDownloadCallback)
  }

  handleDate(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  downloadReport() {
    Api.downloadReport({
      url: this.reportMap[this.state.selectedReport],
      start_date: this.state.fromDate,
      end_date: this.state.toDate
    })
      .then(csv => {
        exportCSV(csv)
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
              value={this.state.selectedReportId}
              onChange={this.handleReportChange}
              disabled={this.props.isDisabled}
            >
              {
                this.reportOptions.map((item, i) => (
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
              label="Save"
              primary
              disabled={this.state.creatingReport}
              onClick={this.downloadReport}
            />
          </div>
        </Card>
      </React.Fragment>
    )
  }
}

export default Reports