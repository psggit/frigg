import React from "react"
import LocalityFeeForm from "./../manage-locality-fee/locality-fee-form"
import * as Api from "../../middleware/api"
import Notify from "@components/Notification"

class CreateLocalityFee extends React.Component {
  constructor() {
    super()
    this.state = {
      creatingLocalityFee: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    const localityFeeForm = this.localityFeeForm.getData()
    this.setState({ creatingLocalityFee: true })
    Api.createLocalityFee({
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
        Notify('Successfully created Locality Fee', 'success')
        this.setState({ creatingLocalityFee: false })
        this.props.history.push(`/home/manage-locality-fee/${this.props.match.params.localityId}`)
      })
      .catch((err) => {
        console.log("Error in creating Locality Fee", err)
        this.setState({ creatingLocalityFee: false })
      })
  }

  render() {
    return (
      <React.Fragment>
        <LocalityFeeForm
          ref={(node) => { this.localityFeeForm = node }}
          localityId={this.props.match.params.localityId}
          disableSave={this.state.creatingLocalityFee}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default CreateLocalityFee