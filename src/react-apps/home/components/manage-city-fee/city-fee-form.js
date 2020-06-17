import React from "react"
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../../middleware/api"


class CityFeeForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedOrderTypeIdx: props.data ? props.data.order_type : "",
      orderTypeList: [],
      selectedChargeTypeIdx: props.data ? props.data.charge_type : "",
      chargeTypeList: [],
      title: props.data ? props.data.title : "",
      flat: props.data ? props.data.txn_fee_flat : "",
      percentage: props.data ? props.data.txn_fee_percentage : "",
      min: props.data ? props.data.min_value : 0,
      max: props.data ? props.data.max_value : 0,
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleOrderTypeChange = this.handleOrderTypeChange.bind(this)
    this.handleChargeTypeChange = this.handleChargeTypeChange.bind(this)
    this.fetchOrderTypes = this.fetchOrderTypes.bind(this)
    this.fetchChargeTypes = this.fetchChargeTypes.bind(this)
    this.handleFlatChange = this.handleFlatChange.bind(this)
    this.handlePercentageChange = this.handlePercentageChange.bind(this)
  }

  componentDidMount () {
    this.fetchOrderTypes()
    this.fetchChargeTypes()
  }

  fetchOrderTypes () {
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

  fetchChargeTypes () {
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

  handleTextFields (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleOrderTypeChange (e, k) {
    this.setState({
      selectedOrderTypeIdx: (this.state.orderTypeList[k].Order_type)
    })
  }

  handleChargeTypeChange (e, k) {
    this.setState({
      selectedChargeTypeIdx: (this.state.chargeTypeList[k].Charge_type)
    })
  }

  getData () {
    return this.state
  }

  handleSave () {
    this.props.handleSave()
  }

  handleFlatChange (e) {
    if(parseInt(this.state.percentage) === 0) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handlePercentageChange (e) {
    if (parseInt(this.state.flat) === 0) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  render () {
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>{`Enter City Fee Details (${this.props.cityId})`}</h4>
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
            </div>

            <div className="form-group">
              <label className="label">Flat</label><br />
              <TextField
                onChange={this.handleFlatChange}
                name="flat"
                value={this.state.flat}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Percentage</label><br />
              <TextField
                onChange={this.handlePercentageChange}
                name="percentage"
                value={this.state.percentage}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Min</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="min"
                value={this.state.min}
                style={{ width: '100%' }}
              />
            </div>

            <div className="form-group">
              <label className="label">Max</label><br />
              <TextField
                onChange={this.handleTextFields}
                name="max"
                value={this.state.max}
                style={{ width: '100%' }}
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
          </form>
        </Card>
      </React.Fragment>
    )
  }
}

export default CityFeeForm