import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class MapCityToPredictionForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedCityIdx: props.data ? props.data.city_id : "",
      selectedPredictionIdx: props.data ? props.data.prediction_id : "",
      selectedStatusIdx: props.data && props.data.status === 'Inactive' ? 2 : 1,
      cityList: [],
      predictionList: [],
    }

    this.status = [
      {text: 'Active', value: 1},
      {text: 'Inctive', value: 2}
    ]

    this.getData = this.getData.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handlePredictionChange = this.handlePredictionChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
  }

  getData() {
    return this.state
  }

  componentWillReceiveProps(newProps) {
    if(this.props.cityList !== newProps.cityList) {
      this.setState({
        cityList: newProps.cityList,
        selectedCityIdx: !this.state.selectedCityIdx ? newProps.cityList[0].value : this.state.selectedCityIdx
      })
    }
    if(this.props.predictionList !== newProps.predictionList) {
      this.setState({
        predictionList: newProps.predictionList,
        selectedPredictionIdx: !this.state.selectedPredictionIdx ? newProps.predictionList[0].value : this.state.selectedPredictionIdx
      })
    }
  }

  handlePredictionChange(e,k) {
    this.setState({
      selectedPredictionIdx: (this.state.predictionList[k].value)
    })
  }

  handleStatusChange(e, k) {
    this.setState({
      selectedStatusIdx: (this.status[k].value)
    })
  }

  handleCityChange(e,k) {
    this.setState({
      selectedCityIdx: (this.state.cityList[k].value)
    })
  }

  handleSave() {
    this.props.handleSave()
  }

  render() {
    console.log("data", this.props, this.props.data)
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Map City to Prediction</h4>
          <div className="form-group">
            <label className="label">Prediction</label><br />
            <SelectField
              value={this.state.selectedPredictionIdx}
              onChange={this.handlePredictionChange}
              style={{ width: '100%' }}
              disabled={this.props.disablePrediction}
              disabled={this.props.disableCity}
            >
              {
                !this.props.loadingPredictionList && this.state.predictionList.map((item, i) => (
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
            <label className="label">City</label><br />
            <SelectField
              value={this.state.selectedCityIdx}
              onChange={this.handleCityChange}
              style={{ width: '100%' }}
            >
              {
                !this.props.loadingCityList && this.state.cityList.map((item, i) => (
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
            <label className="label">Status</label><br />
            <SelectField
              value={this.state.selectedStatusIdx}
              onChange={this.handleStatusChange}
              style={{ width: '100%' }}
            >
              {
                this.status.map((item, i) => (
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

export default MapCityToPredictionForm
