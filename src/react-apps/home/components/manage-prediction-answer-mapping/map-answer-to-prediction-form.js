import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import * as Api from "./../../middleware/api"

class MapAnswerToPredictionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOptionIdx: "",
      selectedPredictionIdx: "",
      selectedCashbackTypeIdx: this.props.cashbackType[0].value,
      selectedCashbackType: "",
      flatAmount: "",
      amount: "",
      maxCashbackAmount: "",
      predictionSms: "",
      cashbackSms: "",
      cashbackPendingSms: "",
      optionList: [],
      predictionList: []
    }

    this.getData = this.getData.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.successOptionMappedToPredictionListCallback = this.successOptionMappedToPredictionListCallback.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handlePredictionChange = this.handlePredictionChange.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.handleCashbackTypeChange = this.handleCashbackTypeChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.predictionList !== newProps.predictionList) {
      this.setState({
        predictionList: newProps.predictionList,
        selectedPredictionIdx: newProps.predictionList[0].prediction_id
      })
      Api.fetchOptionMappedToPredictionList({
        prediction_id: parseInt(newProps.predictionList[0].prediction_id),
        offset: 0,
        limit: 1000
      }, this.successOptionMappedToPredictionListCallback)
    }
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName]: {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handlePredictionChange(e, k) {
    this.setState({
      selectedPredictionIdx: (this.state.predictionList[k].prediction_id),
      loadingOptionList: true
    })
    Api.fetchOptionMappedToPredictionList({
      prediction_id: parseInt(this.state.predictionList[k].prediction_id),
      offset: 0,
      limit: 1000
    }, this.successOptionMappedToPredictionListCallback)
  }

  successOptionMappedToPredictionListCallback(response) {
    this.setState({
      optionList: response.options,
      loadingOptionList: false,
      selectedOptionIdx: response.options.length > 0 ? response.options[0].option_id : []
    })
  }

  handleOptionChange(e, k) {
    this.setState({
      selectedOptionIdx: (this.state.optionList[k].option_id)
    })
  }

  handleCashbackTypeChange(e, k) {
    this.setState({
      selectedCashbackTypeIdx: this.props.cashbackType[k].value
    })
  }

  handleSave() {
    this.props.handleSave()
  }

  render() {
    return (
      <Fragment>
        <Card style={{
          padding: '20px',
          width: '300px',
          position: 'relative',
          display: 'block',
          verticalAlign: 'top',
          marginRight: '20px'
        }}
        >
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Map Answer to Prediction</h4>
          <div className="form-group">
            <label className="label">Prediction</label><br />
            <SelectField
              value={parseInt(this.state.selectedPredictionIdx)}
              onChange={this.handlePredictionChange}
              style={{ width: '100%' }}
            >
              {
                this.state.predictionList.map((item, i) => (
                  <MenuItem
                    value={parseInt(item.prediction_id)}
                    key={parseInt(item.prediction_id)}
                    primaryText={item.prediction_title}
                  />
                ))
              }
            </SelectField>
          </div>

          <div className="form-group">
            <label className="label">Option</label><br />
            <SelectField
              value={this.state.selectedOptionIdx}
              onChange={this.handleOptionChange}
              style={{ width: '100%' }}
            >
              {
                !this.state.loadingOptionList && this.state.optionList.map((item, i) => (
                  <MenuItem
                    value={parseInt(item.option_id)}
                    key={parseInt(item.option_id)}
                    primaryText={item.option_name}
                  />
                ))
              }
            </SelectField>
          </div>
          <div className="form-group">
            <label className="label">Cashback Type</label><br />
            <SelectField
              value={this.state.selectedCashbackTypeIdx}
              onChange={this.handleCashbackTypeChange}
              style={{ width: '100%' }}
            >
              {
                this.props.cashbackType.map((item, i) => (
                  <MenuItem
                    value={parseInt(item.value)}
                    key={parseInt(item.value)}
                    primaryText={item.text}
                  />
                ))
              }
            </SelectField>
          </div>
          <div className="form-group">
            <label className="label">Flat Amount</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="flatAmount"
              value={this.state.flatAmount}
              style={{ width: '100%' }}
              disabled={this.state.selectedCashbackTypeIdx === 2}
            />
          </div>
          <div className="form-group">
            <label className="label">Amount</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="amount"
              value={this.state.amount}
              style={{ width: '100%' }}
              disabled={this.state.selectedCashbackTypeIdx === 1}
            />
          </div>
          <div className="form-group">
            <label className="label">Max Cashback Amount</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="maxCashbackAmount"
              value={this.state.maxCashbackAmount}
              style={{ width: '100%' }}
              disabled={this.state.selectedCashbackTypeIdx === 1}
            />
          </div>
          <div className="form-group">
            <label className="label">Prediction SMS</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="predictionSms"
              value={this.state.predictionSms}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
          </div>
          <div className="form-group">
            <label className="label">Cashback SMS</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="cashbackSms"
              value={this.state.cashbackSms}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
          </div>
          <div className="form-group">
            <label className="label">Pending Cashback SMS</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="cashbackPendingSms"
              value={this.state.cashbackPendingSms}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
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
      </Fragment>
    )
  }
}

export default MapAnswerToPredictionForm
