import React from 'react'
import ManageProductForm from "./manage-product-form"
import * as Api from "../../../middleware/api"
import Notify from "@components/Notification"
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'

class CreateProductCoupon extends React.Component {

  constructor () {
    super()
    this.state = {
      creatingCoupon: false,
      productConstraints: [{
        coupon_constraint_id: 1,
        sku_id: 0.0,
        quantity: 0.0,
        flat_discount: 0.0,
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
    const productConstraintData = couponFormData.productConstraintFormRef.getData()

    const productConstraint = this.state.productConstraints.pop()
      productConstraint.sku_id = productConstraintData.skuid ? parseFloat(productConstraintData.skuid) : 0.0,
      productConstraint.quantity = productConstraintData.quantity ? parseFloat(productConstraintData.quantity) : 0.0,
      productConstraint.flat_discount = productConstraintData.flat ? parseFloat(productConstraintData.flat) : 0.0,
      productConstraint.revise_delivery_fee = productConstraintData.isReviseDeliveryFee ? productConstraintData.isReviseDeliveryFee : false
      productConstraint.new_delivery_fee = productConstraintData.newDeliveryFee ? parseFloat(productConstraintData.newDeliveryFee) : 0.0
      //productConstraint.cashback_expiry = productConstraintData.cashbackExpiry ? productConstraintData.cashbackExpiry : "",
      productConstraint.disable = true

    console.log("handle add1", [...this.state.productConstraints, productConstraint])

    const updatedProductConstraint = [...this.state.productConstraints, productConstraint]
    // this.setState({
    //   cartConstraints: [...this.state.cartConstraint, cartConstraint]
    // })
    const defaultConstraint = {
      coupon_constraint_id: this.state.productConstraints.length + 1,
      sku_id: 0.0,
      quantity: 0.0,
      flat_discount: 0.0,
      disable: false,
      revise_delivery_fee: false,
      new_delivery_fee: 0.0,
      //cashback_expiry: "",
    }

    console.log("handle add2", [...updatedProductConstraint, defaultConstraint])
    this.setState({
      productConstraints: [...updatedProductConstraint, defaultConstraint]
    })
  }

  createCoupon () {
    const couponFormData = this.couponFormRef.getData()
    const productCouponData = couponFormData.productFormRef.getData()
    console.log("consumer", productCouponData)
    const productConstraintData = couponFormData.productConstraintFormRef.getData()

    const productConstraint = this.state.productConstraints.pop()
    productConstraint.sku_id = productConstraintData.skuid ? parseFloat(productConstraintData.skuid) : 0.0,
    productConstraint.quantity = productConstraintData.quantity ? parseFloat(productConstraintData.quantity) : 0.0,
    productConstraint.flat_discount = productConstraintData.flat ? parseFloat(productConstraintData.flat) : 0.0,
    productConstraint.revise_delivery_fee = productConstraintData.isReviseDeliveryFee ? productConstraintData.isReviseDeliveryFee : false
    productConstraint.new_delivery_fee = productConstraintData.newDeliveryFee ? parseFloat(productConstraintData.newDeliveryFee) : 0.0
    // productConstraint.cashback_expiry = productConstraintData.cashbackExpiry ? productConstraintData.cashbackExpiry : null,
    productConstraint.cashback_expiry = productConstraintData.cashbackExpiry === "" ? null : productConstraintData.cashbackExpiry,
    productConstraint.disable = true
    
    //console.log("constarint", cartConstraint, "data", [...this.state.cartConstraints, cartConstraint])
    console.log("product constraints", [...this.state.productConstraints, productConstraint])
    this.setState({ productConstraints: [...this.state.productConstraints, productConstraint] })

    this.setState({
      creatingCoupon: true
    })
    Api.createCoupon({
      name: productCouponData.couponName,
      constraint_type: "product",
      start_time: productCouponData.startTime,
      end_time: productCouponData.endTime,
     // cashback_expiry: productCouponData.cashbackExpiry,
      max_count: parseInt(productCouponData.maxCount),
      //available_count: parseInt(productCouponData.availableCount),
      pay_by_wallet: productCouponData.payByWallet,
      store_pickup: productCouponData.storePickup,
      delivery: productCouponData.delivery,
      is_consumer_specific: productCouponData.isConsumerSpecific,
      //revise_delivery_fee: productCouponData.isReviseDeliveryFee,
      is_retailer_specific: productCouponData.isRetailerSpecific,
      // app: productCouponData.selectedAppIdx === 1 ? "drinks" : "fk-web",
      hipbar_drinks: productCouponData.drinks,
      fk_web: productCouponData.fkWeb,
      list_only_when_applicable: productCouponData.showWhenApplicable,
      city_list: productCouponData.cityList ? productCouponData.cityList.trim().split(",").map((cityId) => parseInt(cityId)) : [],
      limit_per_user: parseInt(productCouponData.limitPerUser),
      consider_sign_up: productCouponData.considerSignUp,
      frequency: parseInt(productCouponData.frequency),
      short_desc: productCouponData.shortDesc,
      long_desc: productCouponData.longDesc,
      is_unlimited: productCouponData.isUnlimited,
      sign_up_date: productCouponData.signUpDate,
      consumer_list: productCouponData.consumerList ? productCouponData.consumerList.trim().split(",").map((consumerId) => parseInt(consumerId)) : [],
      //new_delivery_fee: parseFloat(productCouponData.newDeliveryFee),
      retailer_list: productCouponData.retailerList,
      destination: productCouponData.selectedDestinationIdx === 1 ? "UPI" : "hipcoin",
      // destination: productCouponData.selectedDestinationIdx === 1 ? "UPI" : "hipcoin",
      listing_order: parseInt(productCouponData.listingOrder),
      long_html_desc: productCouponData.longHtmlDesc,
      product_constraints: [...this.state.productConstraints, productConstraint]
    })
      .then((response) => {
        Notify('Successfully created coupon', 'success')
        this.setState({ creatingCoupon: false })
        this.props.history.push("/home/manage-product-coupons")
      })
      .catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ creatingCoupon: false })
      })
  }

  render () {
    const disabledButtonStyle = {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
    console.log("prod cos", this.state.productConstraints)
    return (
      <React.Fragment>
        <Card
          style={{
            padding: '20px',
            width: '370px',
            marginRight: '20px'
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Enter product coupon details</h3>

          <ManageProductForm
            ref={(node) => { this.couponFormRef = node }}
            totalProductConstraints={this.state.productConstraints}
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

export default CreateProductCoupon
