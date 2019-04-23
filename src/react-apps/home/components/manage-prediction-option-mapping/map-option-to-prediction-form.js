import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class MapOptionToPredictionForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedOptionIdx: props.data ? props.data.option_id : "",
      selectedPredictionIdx: props.data ? props.data.prediction_id : "",
      optionList: [],
      predictionList: []
    }

    this.getData = this.getData.bind(this)
    //this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handlePredictionChange = this.handlePredictionChange.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
  }

  getData() {
    return this.state
  }

  componentWillReceiveProps(newProps) {
    if(this.props.optionList !== newProps.optionList) {
      this.setState({
        optionList: newProps.optionList,
        selectedOptionIdx: newProps.optionList[0].value
      })
    }
    if(this.props.predictionList !== newProps.predictionList) {
      this.setState({
        predictionList: newProps.predictionList,
        selectedPredictionIdx: newProps.predictionList[0].value
      })
    }
  }

  handlePredictionChange(e,k) {
    this.setState({
      selectedPredictionIdx: (this.state.predictionList[k].value)
    })
  }

  handleOptionChange(e,k) {
    this.setState({
      selectedOptionIdx: (this.state.optionList[k].value)
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Map Option to Prediction</h4>
          <div className="form-group">
            <label className="label">Prediction</label><br />
            <SelectField
              value={this.state.selectedPredictionIdx}
              onChange={this.handlePredictionChange}
              style={{ width: '100%' }}
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
            <label className="label">Option</label><br />
            <SelectField
              value={this.state.selectedOptionIdx}
              onChange={this.handleOptionChange}
              style={{ width: '100%' }}
            >
              {
                !this.props.loadingOptionList && this.state.optionList.map((item, i) => (
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

export default MapOptionToPredictionForm
