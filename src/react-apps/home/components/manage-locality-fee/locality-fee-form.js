import React from "react"
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../../middleware/api"


class LocalityFeeForm extends React.Component {
  constructor(props) {
    super(props)

    this.platform = [
      { text: 'hb', value: 1 },
      { text: 'fk-web', value: 2 },
    ]
    this.state = {
      error: {},
      id: props.data ? props.data.id : "",
      selectedOrderTypeIdx: props.data ? props.data.order_type : "",
      orderTypeList: [],
      selectedChargeTypeIdx: props.data ? props.data.charge_type : "",
      chargeTypeList: [],
      title: props.data ? props.data.title : "",
      flat: props.data ? props.data.txn_fee_flat : 0,
      percentage: props.data ? props.data.txn_fee_percentage : 0,
      min: props.data ? props.data.min_value : 0,
      max: props.data ? props.data.max_value : 0,
      startTime: props.data ? props.data.start_time.substring(11, 19) : "00:00:00",
      endTime: props.data ? props.data.end_time.substring(11, 19) : "23:59:59",
      minCartValue: props.data ? props.data.cart_min : 0,
      maxCartValue: props.data ? props.data.cart_max : 0,
      selectedPlatformIdx: props.data ? this.platform.find(item => (item.text).toLowerCase() === (props.data.platform).toLowerCase()).value : 1,
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleOrderTypeChange = this.handleOrderTypeChange.bind(this)
    this.handleChargeTypeChange = this.handleChargeTypeChange.bind(this)
    this.fetchOrderTypes = this.fetchOrderTypes.bind(this)
    this.fetchChargeTypes = this.fetchChargeTypes.bind(this)
    this.handleFlatChange = this.handleFlatChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handlePercentageChange = this.handlePercentageChange.bind(this)
    this.handlePlatformChange = this.handlePlatformChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
  }

  componentDidMount() {
    this.fetchOrderTypes()
    this.fetchChargeTypes()
  }

  fetchOrderTypes() {
    Api.fetchOrderTypeList({})
      .then((response) => {
        this.setState({
          orderTypeList: response.cityorders,
          selectedOrderTypeIdx: this.props.data ? this.state.selectedOrderTypeIdx : response.cityorders[0].Order_type
        })
      })
      .catch((error) => {
        console.log("Error in fetching OrderType List", error)
      })
  }

  fetchChargeTypes() {
    Api.fetchChargeTypeList({})
      .then((response) => {
        this.setState({
          chargeTypeList: response.citycharges,
          selectedChargeTypeIdx: this.props.data ? this.state.selectedChargeTypeIdx : response.citycharges[0].Charge_type
        })
      })
      .catch((error) => {
        console.log("Error in fetching City Charges List", error)
      })
  }

  handlePlatformChange(e, k) {
    this.setState({
      selectedPlatformIdx: (this.platform[k].value)
    })
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Status`
    this.setState({
      error: {
        value: "",
        [errName]: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleNumberChange(e) {
    const regex = /^[0-9.\b]*$/;
    const errName = `${e.target.name}Status`
    this.setState({
      error: {
        value: "",
        [errName]: false
      }
    })

    if (regex.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleOrderTypeChange(e, k) {
    this.setState({
      selectedOrderTypeIdx: (this.state.orderTypeList[k].Order_type)
    })
  }

  handleChargeTypeChange(e, k) {
    this.setState({
      selectedChargeTypeIdx: (this.state.chargeTypeList[k].Charge_type)
    })
  }

  getData() {
    return this.state
  }

  isFormValid() {
    if (this.state.title.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Title is required",
          titleStatus: true
        }
      }))
      return false
    } else if (this.state.flat.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Flat is required",
          flatStatus: true
        }
      }))
      return false
    } else if (this.state.percentage.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Percent is required",
          percentageStatus: true
        }
      }))
      return false
    } else if (this.state.min.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Min is required",
          minStatus: true
        }
      }))
      return false
    } else if (this.state.max.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Max is required",
          maxStatus: true
        }
      }))
      return false
    } else if (this.state.minCartValue.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Min Cart Value is required",
          minCartValueStatus: true
        }
      }))
      return false
    } else if (this.state.maxCartValue.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Max Cart Value is required",
          maxCartValueStatus: true
        }
      }))
      return false
    } else if (this.state.startTime.toString().length === 0) {
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "Start Time is required",
          startTimeStatus: true
        }
      }))
      return false
    } else if (this.state.endTime.toString().length === 0) {
      console.log("etime", this.state.startTime)
      this.setState(prevState => ({
        error: {
          ...prevState.error,
          value: "End Time is required",
          endTimeStatus: true
        }
      }))
      return false
    }
    return true
  }

  handleSave() {
    if (this.isFormValid())
      this.props.handleSave()
  }

  handleFlatChange(e) {
    const errName = `${e.target.name}Status`
    this.setState({
      error: {
        value: "",
        [errName]: false
      }
    })

    if (parseInt(this.state.percentage) === 0) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handlePercentageChange(e) {
    const errName = `${e.target.name}Status`
    this.setState({
      error: {
        value: "",
        [errName]: false
      }
    })

    if (parseInt(this.state.flat) === 0) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleTimeChange(e) {
    const errName = `${e.target.name}Status`
    this.setState({
      error: {
        value: "",
        [errName]: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>{`Enter Locality Fee Details (${this.props.localityId})`}</h4>
          <form>

            {/* <div className="form-group">
              <label className="label">City ID</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="cityId"
                value={this.state.cityId}
                style={{ width: '100%' }}
              />
            </div> */}

            <div className="form-group">
              <label className="label">Order Type</label><br />
              <SelectField
                value={this.state.selectedOrderTypeIdx}
                onChange={this.handleOrderTypeChange}
                disabled={location.pathname.includes("edit")}
              >
                {
                  this.state.orderTypeList.map((item, i) => (
                    <MenuItem
                      value={item.Order_type}
                      key={item.Order_type}
                      primaryText={item.Description}
                    />
                  ))
                }
              </SelectField>
            </div>

            <div className="form-group">
              <label className="label">Charge Type</label><br />
              <SelectField
                value={this.state.selectedChargeTypeIdx}
                onChange={this.handleChargeTypeChange}
                disabled={location.pathname.includes("edit")}
              >
                {
                  this.state.chargeTypeList.map((item, i) => (
                    <MenuItem
                      value={item.Charge_type}
                      key={item.Charge_type}
                      primaryText={item.Description}
                    />
                  ))
                }
              </SelectField>
            </div>

            <div className="form-group">
              <label className="label">Title</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="title"
                value={this.state.title}
                style={{ width: '100%' }}
              />
              {
                this.state.error.titleStatus &&
                <p className="error-message">* {this.state.error.value}</p>
              }
            </div>

            <div className="form-group">
              <label className="label">Flat</label><br />
              <TextField
                onChange={this.handleFlatChange}
                name="flat"
                value={this.state.flat}
                style={{ width: '100%' }}
              />
              {
                this.state.error.flatStatus &&
                <p className="error-message">* {this.state.error.value}</p>
              }
            </div>

            <div className="form-group">
              <label className="label">Percentage</label><br />
              <TextField
                onChange={this.handlePercentageChange}
                name="percentage"
                value={this.state.percentage}
                style={{ width: '100%' }}
              />
              {
                this.state.error.percentageStatus &&
                <p className="error-message">* {this.state.error.value}</p>
              }
            </div>

            <div className="form-group">
              <label className="label">Min</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="min"
                value={this.state.min}
                style={{ width: '100%' }}
              />
              {
                this.state.error.minStatus &&
                <p className="error-message">* {this.state.error.value}</p>
              }
            </div>

            <div className="form-group">
              <label className="label">Max</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="max"
                value={this.state.max}
                style={{ width: '100%' }}
              />
              {
                this.state.error.maxStatus &&
                <p className="error-message">* {this.state.error.value}</p>
              }
            </div>

            <div className="form-group">
              <label className="label">Platform</label><br />
              <SelectField
                name="platform"
                value={this.state.selectedPlatformIdx}
                onChange={this.handlePlatformChange}
                style={{ width: '100%' }}
              >
                {
                  this.platform.map((item, i) => (
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
              <label className="label">Start Time</label><br />
              <input
                type='time'
                onChange={this.handleTimeChange}
                defaultValue={this.state.startTime}
                //value={this.state.startTime}
                className="inline-input"
                style={{
                  width: '100%',
                  marginTop: '10px',
                  border: '0',
                  borderBottom: '1px solid #9b9b9b',
                  fontSize: '14px',
                  padding: '5px 0'
                }}
                name="startTime"
              />
              {
                this.state.error.startTimeStatus &&
                <p className="error-message">* {this.state.error.value}</p>
              }
            </div>

            <div className="form-group">
              <label className="label">End Time</label><br />
              <input
                type='time'
                onChange={this.handleTimeChange}
                defaultValue={this.state.endTime}
                className="inline-input"
                style={{
                  width: '100%',
                  marginTop: '10px',
                  border: '0',
                  borderBottom: '1px solid #9b9b9b',
                  fontSize: '14px',
                  padding: '5px 0'
                }}
                name="endTime"
              />
              {
                this.state.error.endTimeStatus &&
                <p className="error-message">* {this.state.error.value}</p>
              }
            </div>

            <div className="form-group">
              <label className="label">Min Cart Value</label><br />
              <TextField
                onChange={this.handleNumberChange}
                name="minCartValue"
                value={this.state.minCartValue}
                style={{ width: '100%' }}
              />
              {
                this.state.error.minCartValueStatus &&
                <p className="error-message">* {this.state.error.value}</p>
              }
            </div>
            <div className="form-group">
              <label className="label">Max Cart Value</label><br />
              <TextField
                onChange={this.handleNumberChange}
                name="maxCartValue"
                value={this.state.maxCartValue}
                style={{ width: '100%' }}
              />
              {
                this.state.error.maxCartValueStatus &&
                <p className="error-message">* {this.state.error.value}</p>
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
          </form>
        </Card>
      </React.Fragment>
    )
  }
}

export default LocalityFeeForm