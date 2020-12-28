import React from 'react';
import * as Api from "../middleware/api"
import Notify from "@components/Notification"

class ManageRefund extends React.Component {

  constructor() {
    super()
    this.state = {
      orderIds: '',
      isSubmitting: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.triggerRefund = this.triggerRefund.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  triggerRefund() {
    this.setState({isSubmitting: true})
    Api.triggerRefund({
      "order_ids": this.state.orderIds
    })
      .then((response) => {
        this.setState({isSubmitting: false})
        Notify(response.message, "success")
      })
      .catch((err) => {
        this.setState({isSubmitting: false})
        err.response.json().then((json) => {
          Notify(json.message, "error")
        })
        console.log("Error in triggering refund", err)
      })
  }

  render() {
    const {isSubmitting, orderIds} = this.state
    return (
      <div className="form">
        <div className="input-field">
          <span>Delivery Order Ids</span>
          <textarea className="field-value" onChange={this.handleChange} value={this.state.orderIds} name="orderIds" rows="2" cols="40"></textarea>
        </div>
        <div className={`submit-button ${(orderIds.length === 0 || isSubmitting) ? 'disable' : ''}`} onClick={this.triggerRefund}>
          <button> Create </button>
        </div>
      </div>
    )
  }
}

export default ManageRefund