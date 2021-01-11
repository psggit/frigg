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
        min_value: 0.0,
        max_value: 0.0,
        flat_discount: 0.0,
        percentage_discount: 0.0,
        disable: false,
        revise_delivery_fee: false,
        new_delivery_fee: 0.0,
        //cashback_expiry: "",

      }]
    }

    this.createCoupon = this.createCoupon.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd () {

    const couponFormData = this.couponFormRef.getData()
    const cartConstraintData = couponFormData.cartConstraintFormRef.getData()

    // this.setState({
    //   cartConstraints: [...this.state.cartConstraint, cartConstraint]
    // })
    // console.log("handle Add", cartConstraintData, (cartConstraintData.max_value > 0 && cartConstraintData.min_value >= 0 && cartConstraintData.flat_discount >= 0 && cartConstraintData.min_value <= cartConstraintData.max_value),  (cartConstraintData.max_value > 0 && cartConstraintData.min_value >= 0 && cartConstraintData.percentage_discount >= 0 && cartConstraintData.min_value <= cartConstraintData.max_value))
    const isValidConstraint = ((cartConstraintData.max > 0 && cartConstraintData.min >= 0 && cartConstraintData.flat >= 0 && cartConstraintData.min <= cartConstraintData.max) || (cartConstraintData.max > 0 && cartConstraintData.min >= 0 && cartConstraintData.percent >= 0 && cartConstraintData.min <= cartConstraintData.max)) ? true : false
    
    if (isValidConstraint) {

      const cartConstraint = this.state.cartConstraints.pop()

      cartConstraint.min_value = cartConstraintData.min ? parseFloat(cartConstraintData.min) : 0.0
      cartConstraint.max_value = cartConstraintData.max ? parseFloat(cartConstraintData.max) : 0.0
      cartConstraint.flat_discount = cartConstraintData.flat ? parseFloat(cartConstraintData.flat) : 0.0
      cartConstraint.percentage_discount = cartConstraintData.percent ? parseFloat(cartConstraintData.percent) : 0.0
      cartConstraint.revise_delivery_fee = cartConstraintData.isReviseDeliveryFee ? cartConstraintData.isReviseDeliveryFee : false
      cartConstraint.new_delivery_fee = cartConstraintData.newDeliveryFee ? parseFloat(cartConstraintData.newDeliveryFee) : 0.0
      // cartConstraint.cashback_expiry = cartConstraintData.cashbackExpiry ? cartConstraintData.cashbackExpiry : "",
      cartConstraint.cashback_expiry = cartConstraintData.cashbackExpiry === "" ? null : cartConstraintData.cashbackExpiry,
      cartConstraint.disable = true

      //console.log("handle add1", [...this.state.cartConstraints, cartConstraint])

      const updatedCartConstraint = [...this.state.cartConstraints, cartConstraint]

      const defaultConstraint = {
        coupon_constraint_id: this.state.cartConstraints.length + 1,
        min_value: 0.0,
        max_value: 0.0,
        flat_discount: 0.0,
        percentage_discount: 0.0,
        disable: false,
        revise_delivery_fee: false,
        new_delivery_fee: 0.0,
        //cashback_expiry: "",
      }

      //console.log("handle add2", [...updatedCartConstraint, defaultConstraint])
      this.setState({
        cartConstraints: [...updatedCartConstraint, defaultConstraint]
      })
    }
  }

  createCoupon () {
    const couponFormData = this.couponFormRef.getData()
    const cartCouponData = couponFormData.cartFormRef.getData()
    const cartConstraintData = couponFormData.cartConstraintFormRef.getData()
   
    // console.log("max", cartConstraintData.max, "min", cartConstraintData.min,"flat", cartConstraintData.flat)
    console.log("create coupon", cartConstraintData, (cartConstraintData.max > 0 && cartConstraintData.min >= 0 && cartConstraintData.flat > 0 && cartConstraintData.min <= cartConstraintData.max), (cartConstraintData.max > 0 && cartConstraintData.min >= 0 && cartConstraintData.percent > 0 && cartConstraintData.min <= cartConstraintData.max))

    const isValidConstraint = ((cartConstraintData.max > 0 && cartConstraintData.min >= 0 && cartConstraintData.flat >= 0 && cartConstraintData.min <= cartConstraintData.max) || (cartConstraintData.max > 0 && cartConstraintData.min >= 0 && cartConstraintData.percent >= 0 && cartConstraintData.min <= cartConstraintData.max)) ? true : false

    if (isValidConstraint) {

      const cartConstraint = this.state.cartConstraints.pop()

      cartConstraint.min_value = cartConstraintData.min ? parseFloat(cartConstraintData.min) : 0.0
      cartConstraint.max_value = cartConstraintData.max ? parseFloat(cartConstraintData.max) : 0.0
      cartConstraint.flat_discount = cartConstraintData.flat ? parseFloat(cartConstraintData.flat) : 0.0
      cartConstraint.percentage_discount = cartConstraintData.percent ? parseFloat(cartConstraintData.percent) : 0.0
      cartConstraint.revise_delivery_fee = cartConstraintData.isReviseDeliveryFee ? cartConstraintData.isReviseDeliveryFee : false
      cartConstraint.new_delivery_fee = cartConstraintData.newDeliveryFee ? parseFloat(cartConstraintData.newDeliveryFee) : 0.0
      //cartConstraint.cashback_expiry = cartConstraintData.cashbackExpiry ? cartConstraintData.cashbackExpiry : "",
      cartConstraint.disable = true
      //console.log("constarint", cartConstraint, "data", [...this.state.cartConstraints, cartConstraint])
      console.log("cart constraints", [...this.state.cartConstraints, cartConstraint])
      this.setState({ cartConstraints: [...this.state.cartConstraints, cartConstraint] })

      this.setState({
        creatingCoupon: true
      })
      Api.createCoupon({
        name: cartCouponData.couponName,
        constraint_type: "cart",
        start_time: cartCouponData.startTime,
        end_time: cartCouponData.endTime,
       // cashback_expiry: cartCouponData.cashbackExpiry,
        max_count: parseInt(cartCouponData.maxCount),
        //available_count: parseInt(cartCouponData.availableCount),
        // pay_by_wallet: cartCouponData.option === "payByWallet" ? true : false,
        // store_pickup: cartCouponData.option === "storePickup" ? true : false,
        // is_consumer_specific: cartCouponData.option === "isConsumerSpecific" ? true : false,
        pay_by_wallet: cartCouponData.payByWallet,
        store_pickup: cartCouponData.storePickup,
        delivery: cartCouponData.delivery,
        is_consumer_specific: cartCouponData.isConsumerSpecific,
        //revise_delivery_fee: cartCouponData.isReviseDeliveryFee,
        is_retailer_specific: cartCouponData.isRetailerSpecific,
        // app: cartCouponData.selectedAppIdx === 1 ? "drinks" : "fk-web",
        hipbar_drinks: cartCouponData.drinks,
        fk_web: cartCouponData.fkWeb,
        list_only_when_applicable: cartCouponData.showWhenApplicable,
        city_list: cartCouponData.cityList ? cartCouponData.cityList.trim().split(",").map((cityId) => parseInt(cityId)) : [],
        limit_per_user: parseInt(cartCouponData.limitPerUser),
        consider_sign_up: cartCouponData.considerSignUp,
        frequency: parseInt(cartCouponData.frequency),
        short_desc: cartCouponData.shortDesc,
        long_desc: cartCouponData.longDesc,
        is_unlimited: cartCouponData.isUnlimited,
        sign_up_date: cartCouponData.signUpDate,
        consumer_list: cartCouponData.consumerList ? cartCouponData.consumerList.trim().split(",").map((consumerId) => parseInt(consumerId)) : [],
        //new_delivery_fee: parseFloat(cartCouponData.newDeliveryFee),
        retailer_list: cartCouponData.retailerList,
        destination: cartCouponData.selectedDestinationIdx === 1 ? "UPI" : "hipcoin",
        listing_order: parseInt(cartCouponData.listingOrder),
        long_html_desc: cartCouponData.longHtmlDesc,
        cart_constraints: [...this.state.cartConstraints, cartConstraint]
      })
        .then((response) => {
          Notify('Successfully created coupon', 'success')
          this.setState({ creatingCoupon: false })
          this.props.history.push("/home/manage-cart-coupons")
        })
        .catch((err) => {
          err.response.json().then((json) => {
            Notify(json.message, "warning")
          })
          this.setState({ creatingCoupon: false })
        })
    }
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
              style={this.state.creatingCoupon ? disabledButtonStyle : ""}
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