import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Moment from 'moment'

class PredictionForm extends React.Component {
  constructor(props) {
    super(props)
    if(props.data) {
      console.log("test", props.data.order_type.split(","), props.data.order_type.split(",").length, props.data.order_type.split(",").length >= 1 && props.data.order_type.split(",")[0] !== "")
    }
    
    this.state = {
      predictionTitle: props.data ? props.data.prediction_title : "",
      activeFrom: props.data ? (props.data.active_from).slice(0,16) : "",
      activeTo: props.data ? (props.data.active_to).slice(0,16) : "",
      predictionImage:  props.data ? props.data.prediction_image : "",
      detailedPredictionImage:  props.data ? props.data.detailed_prediction_image : "",
      //orderType: props.data ? props.data.order_type : "",
      predictionResponse: props.data ? props.data.prediction_response : "",
      orderType: props.data ? props.data.order_type.split(",").length >= 1 && props.data.order_type.split(",")[0] !== "" ? props.data.order_type.split(",") : [] : [],
      isStorePickUp: props.data ? this.getOrderTypeStatus('pickup') : false,
      isQuickPay: props.data ? this.getOrderTypeStatus('quick_pay') : false,
     
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
      predictionResponseErr: {
        value: "",
        status: false
      }
    }

    console.log("test op", this.state)

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.getOrderTypeStatus = this.getOrderTypeStatus.bind(this)
    this.updateOrderType = this.updateOrderType.bind(this)
  }

  getData() {
    return this.state
  }

  getOrderTypeStatus(orderType) {
    const orderTypes = this.props.data.order_type.split(",")
    let orderTypeStatus = false
    
    if(orderTypes.length > 0) {
      orderTypes.map((item, i) => {
        if(item.trim() === orderType) {
          orderTypeStatus = true
        }
      })
    }
    return orderTypeStatus
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
    } else if (this.state.predictionResponse.toString().length === 0) {
      this.setState({
        predictionResponseErr: {
          value: "Prediction response is required",
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

  updateOrderType(targetName, orderType, status) {
    console.log("update", targetName, orderType, status)
    const type = orderType === "pickup" ? "pickup" : "quick_pay"
    if(targetName.toLowerCase().indexOf(orderType) !== -1 && status) {
      this.setState({ 
        [targetName]: status,
        orderType: [...new Set([...this.state.orderType, type])]
      })
    } else if (targetName.toLowerCase().indexOf(orderType) !== -1 && !status) {
      const orderTypes = this.state.orderType.filter((item) => item !== type)
      this.setState({ 
        [targetName]: status,
        orderType: orderTypes
      })
    }
  }

  handleCheckboxes(e) {
    const targetName = e.target.name
    if(targetName.toLowerCase().indexOf("pickup") !== -1) {
      this.updateOrderType(targetName, "pickup", e.target.checked)
    } else {
      this.updateOrderType(targetName, "quick", e.target.checked)
    }
    // const targetName = e.target.name

    // if(targetName.toLowerCase().indexOf("pickup") !== -1 && e.target.checked) {
    //   this.setState({ 
    //     [e.target.name]: e.target.checked,
    //     orderType: [...new Set([...this.state.orderType, 'pickup'])]
    //   })
    // } else if(targetName.toLowerCase().indexOf("quick") !== -1 && e.target.checked) {
    //   this.setState({ 
    //     [e.target.name]: e.target.checked,
    //     orderType: [...new Set([...this.state.orderType, 'quick_pay'])]
    //   })
    // } else if(targetName.toLowerCase().indexOf("pickup") !== -1 && !e.target.checked) {
    //   const orderTypes = this.state.orderType.filter((item) => item !== "pickup")
    //   this.setState({ 
    //     [e.target.name]: e.target.checked,
    //     orderType: orderTypes
    //   })
    // } else if(targetName.toLowerCase().indexOf("quick") !== -1 && !e.target.checked) {
    //   const orderTypes = this.state.orderType.filter((item) => item !== "quick_pay")
    //   this.setState({ 
    //     [e.target.name]: e.target.checked,
    //     orderType: orderTypes
    //   })
    // }
  }

  render() {
    const {
      activeFromErr, 
      activeToErr, 
      predictionTitleErr, 
      predictionImageErr, 
      detailedPredictionImageErr, 
      predictionResponseErr
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
            <label className="label">Prediction Response</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="predictionResponse"
              value={this.state.predictionResponse}
              style={{ width: '100%' }}
              //placeholder="quick_pay, pickup"
              disabled={this.props.isDisabled}
            />
            {
              predictionResponseErr.status &&
              <p className="error-message">* {predictionResponseErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Order Type</label><br/>
            <Checkbox
              disabled={this.props.isDisabled}
              checked={this.state.isStorePickUp}
              onCheck={this.handleCheckboxes}
              name="isStorePickUp"
              label="is_store_pick_up"
              style={{marginTop: '10px'}}
            />
          </div>
          <div className="form-group">
            <Checkbox
              disabled={this.props.isDisabled}
              checked={this.state.isQuickPay}
              onCheck={this.handleCheckboxes}
              name="isQuickPay"
              label="is_quick_pay"
            />
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
