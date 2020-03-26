import React from "react"
import * as Api from "./../../middleware/api"
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Notify from "@components/Notification"

class UpdateConsumerSpecificCartCoupon extends React.Component {
  constructor (props){
    super(props)

    this.state = {
      updatingConsumerSpecificCoupon: false,
      couponId: props.location.state.id,
      consumerList: ""
    }

    this.updateCartSpecificCartCoupon = this.updateCartSpecificCartCoupon.bind(this)
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
  }

  componentDidMount () {
    Api.fetchCartSpecificConsumer({
      coupon_id: this.state.couponId
    })
      .then((response) => {
        this.setState({consumerList: response.message})
        console.log("Successfully fetched cart specific consumer")
      })
      .catch((error) => {
        console.log("Error in fetching cart specific consumer", error)
      })
  }

  handleTextFieldChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  updateCartSpecificCartCoupon () {
    this.setState({ updatingConsumerSpecificCoupon: true})
    Api.updateConsumerSpecificConsumer({
      id: this.state.couponId,
      consumer_list: this.state.consumerList ? this.state.consumerList.trim().split(",").map((consumer) => parseInt(consumer)) : []
    })
      .then((response) => {
        Notify("Updated cart specific consumer detail successfully", "success")
        this.setState({ updatingConsumerSpecificCoupon: false })
        this.props.history.push("/home/manage-consumer-specific-cart-coupons")
      })
      .catch((err) => {
        console.log("Error in updating coupon", err)
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ updatingConsumerSpecificCoupon: false })
      })
  }

  render () {
    const inputStyle = {
      width: '100%'
    }
    return(
      <Card
        style={{
          padding: '20px',
          width: '370px',
          marginRight: '20px'
        }}
      >
        <h4 style={{ margin: "20px 0" }}>Enter Cart Specific Consumer Details</h4>
        <React.Fragment>
          <div className="form-group">
            <label className="label">Coupon Id</label><br />
            <TextField
              onChange={this.handleTextFieldChange}
              name="couponId"
              required
              value={this.state.couponId}
              style={inputStyle}
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label className="label">Consumer List</label><br />
            <TextField
              onChange={this.handleTextFieldChange}
              name="consumerList"
              required
              style={inputStyle}
              value={this.state.consumerList}
            />
          </div>
          <div className="form-group">
            <RaisedButton
              label="Save"
              primary
              disabled={this.state.updatingConsumerSpecificCoupon}
              onClick={this.updateCartSpecificCartCoupon}
            />
          </div>
        </React.Fragment>
      </Card>
    )
  }
}

export default UpdateConsumerSpecificCartCoupon