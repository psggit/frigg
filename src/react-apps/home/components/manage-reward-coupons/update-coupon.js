import React from 'react'
import CouponForm from "./coupon-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class EditCoupon extends React.Component {
  constructor() {
    super()
    this.state = {
      cityList: [],
      loadingCityList: true,
      updatingCoupon: false
    }
    this.successCityListCallback = this.successCityListCallback.bind(this)
    this.updateCouponAndMapCities = this.updateCouponAndMapCities.bind(this)
  }

  componentDidMount() {
    Api.fetchCityList({
      available: true,
      delivery_available: false,
      wallet_available: false
    }, this.successCityListCallback)
  }

  successCityListCallback(response) {
    let cityList = []
    if (response.availableCities) {
      cityList = response.availableCities.map((item, i) => {
        return {
          text: item.name,
          value: item.id
        }
      })
    }
    this.setState({ cityList, loadingCityList: false })
  }

  updateCouponAndMapCities() {
    const couponForm = this.couponFormRef.getData()
    this.setState({ updatingCoupon: true })
    Api.updateCouponAndMapCities({
      id: this.props.location.state.id,
      coupon_name: couponForm.couponName,
      min_amount: parseFloat(couponForm.minAmount),
      max_amount: parseFloat(couponForm.maxAmount),
      start_time: couponForm.startDate,
      batch_id: couponForm.batchId,
      campaign_id: parseInt(couponForm.campaignId),
      count: parseInt(couponForm.count),
      end_time: couponForm.endDate,
      order_type: couponForm.selectedOrderTypeIdx === 1 ? "Pickup" : "PayByWallet",
      activity_status: couponForm.selectedStatusIdx === 1 ? true : false,
      city_list: couponForm.mappedCityList
    })
      .then((response) => {
        Notify('Successfully updated coupon', 'success')
        this.setState({ updatingCoupon: false })
        this.props.history.push("/home/manage-reward-coupons")
      })
      .catch((err) => {
        console.log("Error in updating coupon and mapping cities", err)
        this.setState({ updatingCoupon: false })
      })
  }

  render() {
    const { cityList, loadingCityList, updatingCoupon } = this.state
    return (
      <CouponForm
        ref={(node) => { this.couponFormRef = node }}
        cityList={cityList}
        loadingCityList={loadingCityList}
        disableSave={updatingCoupon}
        data={this.props.location.state}
        handleSave={this.updateCouponAndMapCities}
      />
    )
  }
}

export default EditCoupon