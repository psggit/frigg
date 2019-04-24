import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Moment from 'moment'

class PredictionForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      predictionTitle: props.data ? props.data.prediction_title : "",
      activeFrom: props.data ? (props.data.active_from).slice(0,16) : "",
      activeTo: props.data ? (props.data.active_to).slice(0,16) : "",
      predictionImage:  props.data ? props.data.prediction_image : "",
      detailedPredictionImage:  props.data ? props.data.detailed_prediction_image : "",
      orderType: props.data ? props.data.order_type : "",

      predictionTitleErr: {
        value: "",
        status: false
      },
      activeFromErr: {
        value: "",
        status: false
      },
      activeToErr: {
        value: "",
        status: false
      },
      predictionImageErr: {
        value: "",
        status: false
      },
      detailedPredictionImageErr: {
        value: "",
        status: false
      },
      orderTypeErr: {
        value: "",
        status: false
      }
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName] : {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDate(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName] : {
        value: "",
        status: false
      }
    })
    const d = new Date(e.target.value)
    this.setState({ [e.target.name]: d.toISOString() })
  }

  isFormValid() {
    console.log("state", this.state)
    if (this.state.predictionTitle.length === 0) {
      this.setState({
        predictionTitleErr: {
          value: "Prediction title is required",
          status: true
        }
      })
      return false
    } else if (this.state.predictionImage.toString().length === 0) {
      this.setState({
        predictionImageErr: {
          value: "Prediction image  is required",
          status: true
        }
      })
      return false
    } else if (this.state.detailedPredictionImage.toString().length === 0) {
      this.setState({
        detailedPredictionImageErr: {
          value: "Detailed prediction image is required",
          status: true
        }
      })
      return false
    } else if (this.state.orderType.toString().length === 0) {
      this.setState({
        orderTypeErr: {
          value: "Order type is required",
          status: true
        }
      })
      return false
    } else if (this.state.activeFrom.toString().length === 0) {
      this.setState({
        activeFromErr: {
          value: "Active from is required",
          status: true
        }
      })
      return false
    } else if (this.state.activeTo.toString().length === 0) {
      this.setState({
        activeToErr: {
          value: "Active to is required",
          status: true
        }
      })
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
    const {
      activeFromErr, 
      activeToErr, 
      predictionTitleErr, 
      predictionImageErr, 
      detailedPredictionImageErr, 
      orderTypeErr
    } = this.state
    
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Prediction Details</h4>
          <div className="form-group">
            <label className="label">Prediction Title</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="predictionTitle"
              value={this.state.predictionTitle}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
            {
              predictionTitleErr.status &&
              <p className="error-message">* {predictionTitleErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Prediction Image</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="predictionImage"
              value={this.state.predictionImage}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
            {
              predictionImageErr.status &&
              <p className="error-message">* {predictionImageErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Detailed Prediction Image</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="detailedPredictionImage"
              value={this.state.detailedPredictionImage}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
            {
              detailedPredictionImageErr.status &&
              <p className="error-message">* {detailedPredictionImageErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Order Type</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="orderType"
              value={this.state.orderType}
              style={{ width: '100%' }}
              placeholder="quick_pay, pickup"
              disabled={this.props.isDisabled}
            />
            {
              orderTypeErr.status &&
              <p className="error-message">* {orderTypeErr.value}</p>
            }
          </div>
        
          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">Active From</label><br/>
            <input
              type='datetime-local'
              onChange={this.handleDate}
              defaultValue={this.state.activeFrom}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="activeFrom"
            />
            {
              activeFromErr.status &&
              <p className="error-message">* {activeFromErr.value}</p>
            }
          </div>

          <div className="form-group" style={{ width: '100%' }}>
            <label className="label">Active to</label><br/>
            <input
              type='datetime-local'
              onChange={this.handleDate}
              defaultValue={this.state.activeTo}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="activeTo"
            />
            {
              activeToErr.status &&
              <p className="error-message">* {activeToErr.value}</p>
            }
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

export default PredictionForm
