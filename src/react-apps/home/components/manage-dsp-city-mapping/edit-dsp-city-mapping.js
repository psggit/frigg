import React from "react"
import MapDSPToCityForm from "./dsp-city-form"
import * as Api from "./../../middleware/api"
import Notify from "@components/Notification"

class EditDSPMapping extends React.Component {
  constructor() {
    super()
    this.state = {
      updatingDSPMapping: false,
    }
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    const DSPMAppingFormData = this.DSPForm.getData()
    console.log("dsp mapping form data", DSPMAppingFormData)
    this.setState({ updatingDSPMapping: true })
    Api.updateMapDeliveryServiceProviderToCity({
      delivery_service_provider_id: DSPMAppingFormData.selectedDspIdx,
      city_id: DSPMAppingFormData.selectedCityIdx,
      priority: parseInt(DSPMAppingFormData.priority),
      turnaround_duration: parseInt(DSPMAppingFormData.turnaroundDuration)
    })
      .then((response) => {
        Notify(response.message, 'success')
        this.props.history.push("/home/dsp-city-mapping")
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <MapDSPToCityForm
          ref={(node) => { this.DSPForm = node }}
          disableSave={this.state.updatingDSPMapping}
          data={this.props.location.state}
          handleSave={this.handleSave}
        />
      </React.Fragment>
    )
  }
}

export default EditDSPMapping
