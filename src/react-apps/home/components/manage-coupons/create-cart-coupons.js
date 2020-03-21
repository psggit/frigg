import React from 'react'
import ManageCartForm from "./manage-cart-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'

class CreateCartCoupon extends React.Component {

  constructor () {
    super()
    this.state = {
      creatingCoupon: false,
      cartConstraints: [{
        coupon_constraint_id: 1,
        min_value: "",
        max_value: "",
        flat_discount: "",
        percent_discount: ""
      }]
    }

    this.createCoupon = this.createCoupon.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd () {
    const defaultConstraint = {
      coupon_constraint_id: this.state.cartConstraints.length + 1,
      min_value: "",
      max_value: "",
      flat_discount: "",
      percent_discount: ""
    }

    console.log("handle add", [ ...this.state.cartConstraints, defaultConstraint ])
    this.setState({
      cartConstraints: [ ...this.state.cartConstraints, defaultConstraint ]
    })
  }

  createCoupon () {
    const couponFormData = this.couponFormRef.getData()
    const cartCouponData = couponFormData.cartFormRef.getData()
    const cartConstraintData = couponFormData.cartConstraintFormRef.getData()

    const cartConstraint = this.state.cartConstraints.pop()
    cartConstraint.min_value = cartConstraintData.min ? parseInt(cartConstraintData.min) : 0,
    cartConstraint.max_value = cartConstraintData.max ? parseInt(cartConstraintData.max) : 0,
    cartConstraint.flat_discount = cartConstraintData.flat ? parseInt(cartConstraintData.flat) : 0,
    cartConstraint.percent_discount = cartConstraintData.percent ? parseInt(cartConstraintData.percent) : 0,

    console.log("constarint", cartConstraint, "data", [...this.state.cartConstraints, cartConstraint])

    this.setState({ cartConstraints: [...this.state.cartConstraints, cartConstraint] })
  
    this.setState({ 
      creatingCoupon: true
    })
    Api.createCartCoupon({
      name: cartCouponData.couponName,
      constraint_type: "cart",
      start_time: cartCouponData.startTime,
      end_time: cartCouponData.endTime,
      max_count: parseInt(cartCouponData.maxCount),
      available_count: parseInt(cartCouponData.availableCount),
      // pay_by_wallet: cartCouponData.option === "payByWallet" ? true : false,
      // store_pickup: cartCouponData.option === "storePickup" ? true : false,
      // is_consumer_specific: cartCouponData.option === "isConsumerSpecific" ? true : false,
      pay_by_wallet: cartCouponData.payByWallet,
      store_pickup: cartCouponData.storePickup,
      is_consumer_specific: cartCouponData.isConsumerSpecific,
      app: cartCouponData.selectedAppIdx === 1 ? "drinks" : "HipBar-Drink",
      city_list: cartCouponData.cityList.trim().split(",").map((cityId) => parseInt(cityId)),
      limit_per_user: parseInt(cartCouponData.limitPerUser),
      consider_sign_up: cartCouponData.considerSignUp,
      frequency: parseInt(cartCouponData.frequency),
      short_desc: cartCouponData.shortDesc,
      long_desc: cartCouponData.longDesc,
      is_unlimited: cartCouponData.isUnlimited,
      sign_up_date:cartCouponData.signUpDate,
      consumer_list: cartCouponData.consumerList.trim().split(",").map((consumerId) => parseInt(consumerId)),
      destination: cartCouponData.selectedDestinationIdx === 1 ? "UPI" : "UPI",
      listing_order: parseInt(cartCouponData.listingOrder),
      long_html_desc: cartCouponData.long_html_desc,
      cart_constraints: [...this.state.cartConstraints, cartConstraint]
    })
      .then((response) => {
        Notify('Successfully created coupon', 'success')
        this.setState({ creatingCoupon: false })
        this.props.history.push("/home/manage-cart-coupons")
      })
      .catch((err) => {
        console.log("Error in creating coupon and mapping cities", err)
        this.setState({ creatingCoupon: false })
      })
  }

  render () {
    const disabledButtonStyle = {
      opacity: 0.5,
      cursor: 'not-allowed'
    }

    return (
      <React.Fragment>
        <Card
          style={{
            padding: '20px',
            width: '370px',
            marginRight: '20px'
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Enter cart coupon details</h3>
          
          <ManageCartForm
            ref={(node) => { this.couponFormRef = node }}
            totalCartConstraints = {this.state.cartConstraints}
          />

          <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
            <RaisedButton
              primary
              onClick={this.handleAdd}
              label="Add"
            />
            <RaisedButton
              primary
              onClick={this.createCoupon}
              className={this.state.creatingCoupon ? disabledButtonStyle : ""}
              label="Save"
              disabled={this.state.creatingCoupon}
            />
          </div>
        </Card>
      </React.Fragment>
    )
  }
}

export default CreateCartCoupon