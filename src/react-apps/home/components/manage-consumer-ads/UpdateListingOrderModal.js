import React from "react"
import TitleAndSave from "@components/ModalBox2/TitleAndSave"
import { POST } from "@utils/fetch"
import Notify from '@components/Notification'
import { unmountModal } from "@components/ModalBox2/api"

export default function UpdateListingOrderModal(props) {
  return class UpdateListingOrderModalBox extends React.Component {
    constructor() {
      super()
      this.state = {
        listing_order: props.listing_order
      }
      this.handleListingOrderChange = this.handleListingOrderChange.bind(this)
      this.handleSave = this.handleSave.bind(this)
    }
    handleSave() {
      const { listing_order } = this.state
      const updateListingOrderReq = {
        ad_id: props.ad_id,
        city_id: props.city_id,
        listing_order: parseInt(listing_order)
      }
      const promise = POST({
        api: "/marketing/v2/ads/listing_order",
        apiBase: "odin",
        data: updateListingOrderReq
      })
        .then((json) => {
          unmountModal()
          Notify(json.message, "success")
          props.fetchConsumerAds({
            limit: 10,
            offset: 0
          })
        })

      promise.catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "error")
        })
      })
    }
    handleListingOrderChange(e) {
      this.setState({ listing_order: e.target.value })
    }
    render() {
      return (
        <TitleAndSave
          handleSave={this.handleSave}
          title={`Update listing order (City: ${props.city_name}, Ad ID: ${props.ad_id})`}
        >
          <div style={{ display: "flex", justifyContent: "Center" }}>
            <input onChange={this.handleListingOrderChange} value={this.state.listing_order} />
          </div>
        </TitleAndSave>
      )
    }
  }
}
