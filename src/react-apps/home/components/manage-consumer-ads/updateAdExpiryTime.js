import React from "react"
import TitleAndSave from "@components/ModalBox2/TitleAndSave"
import { POST } from "@utils/fetch"
import Notify from '@components/Notification'
import { unmountModal } from "@components/ModalBox2/api"

export default function UpdateAdTime(props) {
  return class UpdateAdTime extends React.Component {
    constructor() {
      super()
      this.state = {
        showErr: false,
        ad_time: props.fieldNameToUpdate.indexOf("to") !== -1 ? (props.active_to).slice(0, 16) : (props.active_from).slice(0, 16)
      }
      this.handleDateChange = this.handleDateChange.bind(this)
      this.handleSave = this.handleSave.bind(this)
    }

    handleSave() {
      const { ad_time } = this.state
      const activeTo = new Date(props.fieldNameToUpdate.indexOf("to") !== -1 ? ad_time :  props.active_to)
      const activeFrom = new Date(props.fieldNameToUpdate.indexOf("from") !== -1 ? ad_time : props.active_from)
     
      if(activeFrom < activeTo) {
        const updateAdExpiryReq = {
          ad_id: props.ad_id,
          city_id: props.city_id,
          active_from: activeFrom,
          active_to: activeTo
        }
        console.log("req", updateAdExpiryReq)
        unmountModal()
        const promise = POST({
          api: "/marketing/v2/ads/update",
          apiBase: "odin",
          data: updateAdExpiryReq
        })
          .then((json) => {
            Notify(json.message, "success")
            props.fetchConsumerAds()
          })

        promise.catch((err) => {
          err.response.json().then((json) => {
            Notify(json.message, "error")
          })
        })
      } else {
        this.setState({
          showErr: true
        })
      }
    }
    
    handleDateChange(e) {
      const d = new Date(e.target.value)
      this.setState({ ad_time: d.toISOString(), showErr: false })
    }
    
    render() {
      return (
        <TitleAndSave
          handleSave={this.handleSave}
          title={`Update Ad (${props.fieldNameToUpdate}) time (City: ${props.city_name}, Ad ID: ${props.ad_id})`}
        >
          <div style={{ display: "flex", justifyContent: "Center", flexDirection: 'column' }}>
            <input
              type='datetime-local'
              onChange={this.handleDateChange}
              defaultValue={this.state.ad_time}
            />
            {
              this.state.showErr &&
              <p className="error-message">Please enter valid date</p>
            }
          </div>
        </TitleAndSave>
      )
    }
  }
}
