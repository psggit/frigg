import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import CartForm from './cart-coupon-form'
import CartConstraintForm from './cart-constraint-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class EditCartCoupons extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedUpdationTypeIdx: -1,
      fetchingCartConstraintDetails: false,
      cartConstraints: []
    }

    this.updationType = [
      { text: 'Cart Coupon', value: 1 },
      { text:'Cart Constraint', value: 2 }
    ]
    this.handleUpdationTypeChange = this.handleUpdationTypeChange.bind(this)
    this.updateCouponDetails = this.updateCouponDetails.bind(this)
    this.handleAddCartConstraint = this.handleAddCartConstraint.bind(this)
    this.updateCouponConstraintDetails = this.updateCouponConstraintDetails.bind(this)
    this.deleteCouponConstraintDetails = this.deleteCouponConstraintDetails.bind(this)
  }

  handleUpdationTypeChange (e, k) {
    this.setState({
      selectedUpdationTypeIdx: (this.updationType[k].value)
    })
    if(this.updationType[k].value === 2) {
      this.fetchConstraintDetails()
    }
  }

  updateCouponDetails () {
    this.setState({updatingCoupon: true})
    const couponDetails = this.couponDetailsFormRef.getData()
    Api.updateCouponDetails({
      id: this.props.location.state.id,
      name: couponDetails.couponName,
      start_time: new Date(couponDetails.startTime),
      end_time: new Date(couponDetails.endTime),
      max_count: !couponDetails.isUnlimited ? parseInt(couponDetails.maxCount) : 0,
      limit_per_user: parseInt(couponDetails.limitPerUser),
      //available_count: couponDetails.availableCount,
      frequency: couponDetails.frequency,
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
      constraint_type: "cart",
      long_html_desc: couponDetails.longHtmlDesc,
      city_list: couponDetails.cityList ? couponDetails.cityList.trim().split(",").map((city) => parseInt(city)) : []
    })
      .then((response) => {
        this.setState({
          updatingCoupon: false
        })
        Notify("Updated Coupon Details Successfully", "success")
        this.props.history.push(`/home/manage-cart-coupons`)
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
    this.setState({ fetchingCartConstraintDetails: true })
    Api.fetchCouponConstraintDetails({
      coupon_id: this.props.location.state.id,
      constraint_type: "cart"
    })
    .then((response) => {
      this.setState({
        fetchingCartConstraintDetails: false,
        cartConstraints: response.message.CC
      })
    })
    .catch((error) => {
      this.setState({ fetchingCartConstraintDetails: false })
      console.log("Error in fetching cart constraint details", error)
    })
  }

  updateCouponConstraintDetails (payload) {
    this.setState({updatingCoupon: true})
    Api.updateCartConstraintDetails(payload)
      .then((response) => {
        this.setState({
          updatingCoupon: false
        })
        Notify("Updated Cart Constraint Details Successfully", "success")
        this.props.history.push(`/home/manage-cart-coupons`)
      })
      .catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({
          updatingCoupon: false
        })
        console.log("Error in updating cart constraint details", err)
      })
  }

  deleteCouponConstraintDetails () {
    this.setState({ updatingCoupon: true })
    const cartConstraintDetails = this.cartConstraintFormRef.getData()
    Api.deleteConstraintDetails({
      constraint_id: cartConstraintDetails.constraint_id,
      coupon_id: cartConstraintDetails.coupon_id,
      constraint_type:"cart"
    })
      .then((response) => {
        this.setState({
          updatingCoupon: false
        })
        Notify("Deleted Cart Constraint Details Successfully", "success")
        this.props.history.push(`/home/manage-cart-coupons`)
      })
      .catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({
          updatingCoupon: false
        })
        console.log("Error in deleting cart constraint details", err)
      })
  }

  handleAddCartConstraint () {
    const defaultConstraint = {
      min_value: 0.0,
      max_value: 0.0,
      flat_discount: 0.0,
      percentage_discount: 0.0,
      constraint_id: 0,
      coupon_id: this.props.location.state.id,
      disable: false
    }

    this.setState({
      cartConstraints: [...this.state.cartConstraints, defaultConstraint]
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
          <label className="label">Select Cart Updation Type</label><br />
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
          this.state.selectedUpdationTypeIdx === 2 && this.state.fetchingCartConstraintDetails &&
          <div>
            Loading Cart Constraints...
          </div>
        }
        {
          this.state.selectedUpdationTypeIdx === 2 && !this.state.fetchingCartConstraintDetails &&
            <React.Fragment>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Edit Coupon Details</h3>
                <div>
                  <RaisedButton
                    primary
                    onClick={this.handleAddCartConstraint}
                    label="Add"
                  />
                </div>
              </div>
              {
                this.state.cartConstraints.map((item, index) => {
                  return (
                    <CartConstraintForm 
                      key={index}
                      updateCartConstraint={this.updateCouponConstraintDetails}
                      deleteCartConstraint={this.deleteCouponConstraintDetails}
                      data={this.state.cartConstraints[index]}
                      disable={this.state.updatingCoupon}
                      ref={(node) => { this.cartConstraintFormRef = node }}
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
export default EditCartCoupons