import React from "react"
import DenominationsForm from "./denominations-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class CreateDenominations extends React.Component {
  constructor() {
    super()
    this.state = {
      creatingDenominations: false
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    const denominationsFormData = this.denominationsForm.getData()
    this.setState({ creatingDenominations: true })
    Api.createDenomination({
      product_id: denominationsFormData.productName,
      denomination: parseInt(denominationsFormData.denominations),
      hipcoin_limit_percentage: parseFloat(denominationsFormData.hipcoinLimitPercent),
      hipcoin_limit_flat: parseFloat(denominationsFormData.hipcoinLimitFlat),
      listing_order: parseInt(denominationsFormData.listingOrder),
      is_active: denominationsFormData.selectedIsActiveIdx === 1 ? true : false,
    })
      .then((response) => {
        this.setState({ creatingDenominations: false })
        this.props.history.push("/home/manage-denominations")
        Notify(response.message, "success")
      })
      .catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ creatingDenominations: false })
      })
  }

  render() {
    return (
      <React.Fragment>
        <DenominationsForm
          ref={(node) => { this.denominationsForm = node }}
          disableSave={this.state.creatingDenominations}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default CreateDenominations