import React from "react"
import { Card } from 'material-ui/Card'
import * as Api from "../../middleware/api"
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Notify from "@components/Notification"
import RaisedButton from 'material-ui/RaisedButton'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'

class MapDeliveryServiceProviderToCityForm extends React.Component {

  constructor() {
    super()

    this.state = {
      priority: "",
      turnaroundDuration: "",
      disableSave: false,
      disableDelete: true,
      // showConfirmDialog: false,
      message: "",
      cityList: [],
      dspList: [],
      selectedDspIdx:"",
      selectedCityIdx: "",
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    // this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    // this.mountConfirmDialog = this.mountConfirmDialog.bind(this)
    // this.unmountConfirmDialog = this.unmountConfirmDialog.bind(this)
    this.mapDeliveryServiceProviderToCity = this.mapDeliveryServiceProviderToCity.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleDspChange = this.handleDspChange.bind(this)
  }

  componentDidMount () {
    this.fetchCityList()
    this.fetchDspList()
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCityChange(e, k) {
    this.setState({
      selectedCityIdx: (this.state.cityList[k].id),
    })
  }

  handleDspChange(e, k) {
    this.setState({
      selectedDspIdx: (this.state.dspList[k].delivery_service_provider_id),
    })
  }

  fetchCityList() {
    Api.fetchCities({
      data: {
        state_short_name: null,
        is_available: false,
        offset: 0,
        limit: 1000,
        deliverable_city: true,
        no_filter: true
      }
    })
      .then((response) => {
        this.setState({
          cityList: response.cities,
          loadingCityList: false,
          selectedCityIdx: !this.state.selectedCityIdx ? response.cities[0].id : this.state.selectedCityIdx
        })
      })
      .catch((error) => {
        this.setState({ loadingCityList: false })
        console.log("Error in fetching city list", error)
      })
  }

  fetchDspList() {
    Api.fetchDeliveryServiceProvider({
        offset: 0,
        limit: 1000,
    })
      .then((response) => {
        this.setState({
          dspList: response.message,
          selectedDspIdx: !this.state.selectedDspIdx ? response.message[0].delivery_service_provider_id : this.state.selectedDspIdx
        })
        console.log("[fetchDspList]",response)
      })
      .catch((error) => {
        console.log("Error in fetching dsp list", error)
      })
  }


  handleDelete() {
    Api.deleteDeliveryServiceProviderMappedToCity({
      delivery_service_provider_id: this.state.selectedDspIdx,
      city_id: this.state.selectedCityIdx,
    })
      .then((response) => {
        Notify('Deleted Succesfully', 'success')
        setTimeout(() => {
          location.reload()
        }, 3000)
        this.setState({ disableSave: false, disableDelete: true })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ mappingDAToLocality: false })
      })
  }

  // handleSave() {
  //   Api.fetchLocalityCount({
  //     delivery_agent_id: parseInt(this.state.deliveryAgentId),
  //   })
  //     .then((response) => {
  //       console.log("response", response)
  //       if (!response.is_mapped) this.mapDeliveryServiceProviderToCity()
  //       else {
  //         this.setState({ message: response.message })
  //         this.mountConfirmDialog()
  //       }
  //     })
  //     .catch((error) => {
  //       error.response.json().then((json) => {
  //         Notify(json.message, "warning")
  //       })
  //       console.log("Error fetching warehouse count", error)
  //     })
  // }

  // mountConfirmDialog() {
  //   this.setState({ showConfirmDialog: true })
  // }

  // unmountConfirmDialog() {
  //   this.setState({ showConfirmDialog: false })
  // }

  mapDeliveryServiceProviderToCity() {
    // this.setState({ mappingDAToLocality: true, showConfirmDialog: false })
    Api.mapDeliveryServiceProviderToCity({
      delivery_service_provider_id: this.state.selectedDspIdx,
      city_id: this.state.selectedCityIdx,
      priority: parseInt(this.state.priority),
      turnaround_duration: parseInt(this.state.turnaroundDuration)
    })
      .then((response) => {
        Notify(response.message, 'success')
        this.setState({  disableSave: true, disableDelete: false })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
      })
  }

  render() {
    return (
      <Card style={{
        padding: '20px',
        width: '300px',
        position: 'relative',
        display: 'block',
        verticalAlign: 'top',
        marginRight: '30px',
        marginBottom: "30px",
        zIndex: "auto"
      }}
      >

        <div className="form-group">
          <label className="label">City ID</label><br />
          <SelectField
            value={this.state.selectedCityIdx}
            onChange={this.handleCityChange}
          >
            {
              this.state.cityList.map((item, i) => (
                <MenuItem
                  value={item.id}
                  key={item.id}
                  primaryText={item.name}
                />
              ))
            }
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">Delivery Service Provider</label><br />
          <SelectField
            value={this.state.selectedDspIdx}
            onChange={this.handleDspChange}
          >
            {
              this.state.dspList.map((item, i) => (
                <MenuItem
                  value={item.delivery_service_provider_id}
                  key={item.delivery_service_provider_id}
                  primaryText={item.delivery_service_provider_name}
                />
              ))
            }
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">Priority</label><br />
          <TextField
            disabled={false}
            name="priority"
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
        </div>
        <div className="form-group">
          <label className="label">Turnaround Duration</label><br />
          <TextField
            disabled={false}
            name="turnaroundDuration"
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
        </div>
        
        <div className="form-group">
          <RaisedButton
            label="Save"
            primary
            disabled={this.state.mappingDAToLocality || this.state.disableSave}
            onClick={this.mapDeliveryServiceProviderToCity}
          />
          <RaisedButton
            label="Delete"
            primary
            disabled={this.state.mappingDAToLocality || this.state.disableDelete}
            onClick={this.handleDelete}
            style={{ marginLeft: "50px" }}
          />
        </div>
        {
          this.state.showConfirmDialog &&
          <ModalBox>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalBody>{this.state.message}</ModalBody>
            <ModalFooter>
              <button className="btn btn-secondary" onClick={() => this.unmountConfirmDialog()}> Cancel </button>
              <button className="btn btn-secondary" onClick={() => this.mapDeliveryServiceProviderToCity()}> Confirm </button>
            </ModalFooter>
          </ModalBox>
        }
      </Card>
    )
  }
}

export default MapDeliveryServiceProviderToCityForm