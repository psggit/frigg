import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import CartForm from '../cart-coupon-form'
import ProductConstraintForm from './product-constraint-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../../../middleware/api"
import Notify from "@components/Notification"

class EditProductCoupons extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedUpdationTypeIdx: -1,
      fetchingProductConstraintDetails: false,
      productConstraints: []
    }

    this.updationType = [
      { text: 'Product Coupon', value: 1 },
      { text: 'Product Constraint', value: 2 }
    ]
    this.handleUpdationTypeChange = this.handleUpdationTypeChange.bind(this)
    this.updateCouponDetails = this.updateCouponDetails.bind(this)
    this.handleAddProductConstraint = this.handleAddProductConstraint.bind(this)
    this.updateCouponConstraintDetails = this.updateCouponConstraintDetails.bind(this)
    this.deleteCouponConstraintDetails = this.deleteCouponConstraintDetails.bind(this)
  }

  handleUpdationTypeChange (e, k) {
    this.setState({
      selectedUpdationTypeIdx: (this.updationType[k].value)
    })
    if (this.updationType[k].value === 2) {
      this.fetchConstraintDetails()
    }
  }

  updateCouponDetails () {
    this.setState({ updatingCoupon: true })
    const couponDetails = this.couponDetailsFormRef.getData()
    Api.updateCouponDetails({
      id: this.props.location.state.id,
      name: couponDetails.couponName,
      start_time: new Date(couponDetails.startTime),
      end_time: new Date(couponDetails.endTime),
      max_count: !couponDetails.isUnlimited ? couponDetails.maxCount : 0,
      limit_per_user: parseInt(couponDetails.limitPerUser),
      //available_count: couponDetails.availableCount,
      frequency: parseInt(couponDetails.frequency),
      sign_up_date: new Date(couponDetails.signUpDate),
      consider_sign_up: couponDetails.considerSignUp,
      app: couponDetails.selectedAppIdx === 1 ? "drinks" : "",
      pay_by_wallet: couponDetails.payByWallet,
      store_pickup: couponDetails.storePickup,
      destination: couponDetails.selectedDestinationIdx === 1 ? "UPI" : "UPI",
      is_unlimited: couponDetails.isUnlimited,
      listing_order: parseInt(couponDetails.listingOrder),
      is_consumer_specific: couponDetails.isConsumerSpecific,
      long_desc: couponDetails.longDesc,
      short_desc: couponDetails.shortDesc,
      constraint_type: "product",
      long_html_desc: couponDetails.longHtmlDesc,
      city_list: couponDetails.cityList ? couponDetails.cityList.trim().split(",").map((city) => parseInt(city)) : []
    })
      .then((response) => {
        this.setState({
          updatingCoupon: false
        })
        Notify("Updated Coupon Details Successfully", "success")
        this.props.history.push(`/home/manage-product-coupons`)
      })
      .catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({
          updatingCoupon: false
        })
        console.log("Error in updating coupon details", err)
      })
  }


  fetchConstraintDetails () {
    this.setState({ fetchingProductConstraintDetails: true })
    Api.fetchCouponConstraintDetails({
      coupon_id: this.props.location.state.id,
      constraint_type: "product"
    })
      .then((response) => {
        this.setState({
          fetchingProductConstraintDetails: false,
          productConstraints: response.message.PC
        })
      })
      .catch((error) => {
        this.setState({ fetchingProductConstraintDetails: false })
        console.log("Error in fetching product constraint details", error)
      })
  }

  updateCouponConstraintDetails (payload) {
    this.setState({
      updatingCoupon: true
    })
    Api.updateProductConstraintDetails(payload)
      .then((response) => {
        this.setState({
          updatingCoupon: false
        })
        Notify("Updated Product Constraint Details Successfully", "success")
        this.props.history.push(`/home/manage-product-coupons`)
      })
      .catch((error) => {
        this.setState({
          updatingCoupon: false
        })
        console.log("Error in updating product constraint details", error)
      })
  }

  handleAddProductConstraint () {
    const defaultConstraint = {
      sku_id: 0.0,
      quantity: 0.0,
      flat_discount: 0.0,
      constraint_id: 0,
      coupon_id: this.props.location.state.id,
      disable: false
    }

    this.setState({
      productConstraints: [...this.state.productConstraints, defaultConstraint]
    })
  }

  deleteCouponConstraintDetails() {
    this.setState({ updatingCoupon: true })
    const productConstraintDetails = this.productConstraintFormRef.getData()
    Api.deleteConstraintDetails({
      constraint_id: productConstraintDetails.constraint_id,
      coupon_id: productConstraintDetails.coupon_id,
      constraint_type: "product"
    })
      .then((response) => {
        this.setState({
          updatingCoupon: false
        })
        Notify("Deleted Product Constraint Details Successfully", "success")
        this.props.history.push(`/home/manage-product-coupons`)
      })
      .catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({
          updatingCoupon: false
        })
        console.log("Error in deleting product constraint details", err)
      })
  }

  render () {
    return (
      <Card style={{
        padding: '20px',
        width: '370px',
        marginRight: '20px'
      }}>
        <div className="form-group">
          <label className="label">Select Product Updation Type</label><br />
          <SelectField
            name="selectedUpdationTypeIdx"
            value={this.state.selectedUpdationTypeIdx}
            onChange={this.handleUpdationTypeChange}
            style={{ width: '100%' }}
          >
            {
              this.updationType.map((item, i) => (
                <MenuItem
                  value={parseInt(item.value)}
                  key={parseInt(item.value)}
                  primaryText={item.text}
                />
              ))
            }
          </SelectField>
        </div>
        {
          this.state.selectedUpdationTypeIdx === 1 &&
          <React.Fragment>
            <h3 style={{ marginTop: '20px', marginBottom: '40px' }}>Edit Coupon Details</h3>
            <CartForm
              data={this.props.location.state}
              ref={(node) => { this.couponDetailsFormRef = node }}
            />
            <RaisedButton
              primary
              disabled={this.state.updatingCoupon}
              label="Save"
              onClick={this.updateCouponDetails}
              style={{ marginTop: '40px' }}
            />
          </React.Fragment>
        }
        {
          this.state.selectedUpdationTypeIdx === 2 && this.state.fetchingProductConstraintDetails &&
          <div>
            Loading Product Constraints...
          </div>
        }
        {
          this.state.selectedUpdationTypeIdx === 2 && !this.state.fetchingProductConstraintDetails &&
          <React.Fragment>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Edit Coupon Details</h3>
              <div>
                <RaisedButton
                  primary
                  onClick={this.handleAddProductConstraint}
                  label="Add"
                />
              </div>
            </div>
            {
              this.state.productConstraints.map((item, index) => {
                return (
                  <ProductConstraintForm
                    key={index}
                    updateProductConstraint={this.updateCouponConstraintDetails}
                    deleteProductConstraint={this.deleteCouponConstraintDetails}
                    data={this.state.productConstraints[index]}
                    disable={this.state.updatingCoupon}
                    ref={(node) => { this.productConstraintFormRef = node }}
                  />
                )
              })
            }
          </React.Fragment>
        }
      </Card>
    )
  }
}
export default EditProductCoupons