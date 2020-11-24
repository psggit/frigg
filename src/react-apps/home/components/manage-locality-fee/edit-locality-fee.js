import React from "react"
import EditLocalityFeeForm from "./locality-fee-form"
import * as Api from "../../middleware/api"
import Notify from "@components/Notification"

class EditLocalityFee extends React.Component {
  constructor() {
    super()
    this.state = {
      updatingLocalityFee: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    const localityFeeForm = this.localityFeeForm.getData()
    this.setState({ updatingCityFee: true })
    Api.updateLocalityFee({
      id: parseInt(localityFeeForm.id),
      locality_id: parseInt(this.props.match.params.localityId),
      order_type: localityFeeForm.selectedOrderTypeIdx,
      charge_type: localityFeeForm.selectedChargeTypeIdx,
      title: localityFeeForm.title,
      txn_fee_flat: parseFloat(localityFeeForm.flat),
      txn_fee_percentage: parseFloat(localityFeeForm.percentage),
      min_value: parseFloat(localityFeeForm.min),
      max_value: parseFloat(localityFeeForm.max),
      platform: localityFeeForm.selectedPlatformIdx === 1 ? "hb" : "fk-web",
      cart_min: parseInt(localityFeeForm.minCartValue),
      cart_max: parseInt(localityFeeForm.maxCartValue),
      start_time: localityFeeForm.startTime + ":00+05:30",
      end_time: localityFeeForm.endTime + ":00+05:30"
    })
      .then((response) => {
        Notify('Successfully updated Locality Fee', 'success')
        this.setState({ updatingCityFee: false })
        this.props.history.push(`/home/manage-locality-fee/${this.props.match.params.localityId}`)
      })
      .catch((err) => {
        console.log("Error in Updating Locality Fee", err)
        err.response.json().then((json) => {
          Notify(json.message, "error")
        })
        this.setState({ updatingLocalityFee: false })
      })
  }

  render() {
    return (
      <React.Fragment>
        <EditLocalityFeeForm
          ref={(node) => { this.localityFeeForm = node }}
          data={this.props.location.state}
          localityId={this.props.match.params.localityId}
          disableSave={this.state.updatingLocalityFee}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default EditLocalityFee