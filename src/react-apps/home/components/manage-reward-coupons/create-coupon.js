import React from 'react'
import CouponForm from "./coupon-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class CreateCoupon extends React.Component {

  constructor() {
    super()
    this.state = {
      cityList: [],
      loadingCityList: true,
      creatingCoupon: false
    }
    this.successCityListCallback = this.successCityListCallback.bind(this)
    this.createCouponAndMapCities = this.createCouponAndMapCities.bind(this)
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

  createCouponAndMapCities() {
    const couponForm = this.couponFormRef.getData()
    this.setState({ creatingCoupon: true })
    Api.createCouponAndMapCities({
      coupon_name: couponForm.couponName,
      min_amount: parseFloat(couponForm.minAmount),
      max_amount: parseFloat(couponForm.maxAmount),
      start_time: couponForm.startDate,
      end_time: couponForm.endDate,
      batch_id: couponForm.batchId,
      campaign_id: parseInt(couponForm.campaignId),
      count: parseInt(couponForm.count),
      order_type: couponForm.selectedOrderTypeIdx === 1 ? "Pickup" : "PayByWallet",
      activity_status: couponForm.selectedStatusIdx === 1 ? true : false,
      city_list: couponForm.mappedCityList
    })
      .then((response) => {
        Notify('Successfully created coupon', 'success')
        this.setState({ creatingCoupon: false })
        this.props.history.push("/home/manage-reward-coupons")
      })
      .catch((err) => {
        console.log("Error in creating coupon and mapping cities", err)
        this.setState({ creatingCoupon: false })
      })
  }

  render() {
    const { cityList, loadingCityList, creatingCoupon } = this.state
    return (
      <CouponForm
        ref={(node) => { this.couponFormRef = node }}
        cityList={cityList}
        loadingCityList={loadingCityList}
        disableSave={creatingCoupon}
        handleSave={this.createCouponAndMapCities}
      />
    )
  }
}

export default CreateCoupon