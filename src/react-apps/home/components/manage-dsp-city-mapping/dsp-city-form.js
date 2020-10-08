import React from "react"
import { Card } from 'material-ui/Card'
import * as Api from "../../middleware/api"
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Notify from "@components/Notification"
import RaisedButton from 'material-ui/RaisedButton'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBox from '@components/ModalBox'

class MapDSPToCityForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      priority: props.data ? props.data.priority : "",
      turnaroundDuration: props.data ? props.data.turnaround_duration : 0,
      disableSave: false,
      disableDelete: true,
      message: "",
      cityList: [],
      dspList: [],
      selectedDspIdx: props.data ? props.data.delivery_service_provider_id : 0,
      selectedCityIdx: props.data ? props.data.city_id : 0,
      mountDialog: false,
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.mapDSPToCity = this.mapDSPToCity.bind(this)
    //this.updateMapDSPToCity = this.updateMapDSPToCity.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleDspChange = this.handleDspChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.getData = this.getData.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
    //this.handleTurnaroundChange = this.handleTurnaroundChange.bind(this)
    this.handleMountSubmit = this.handleMountSubmit.bind(this)
  }

  componentDidMount() {
    this.fetchCityList()
    this.fetchDspList()
  }

  getData(){
    return this.state
  }

  unmountDialog(){
    this.setState({
      mountDialog: false
    })
  }

   handleMountSubmit() {
    this.unmountDialog()
    if (location.pathname.includes(`/edit`)) {
      this.props.handleSave()
    } else {
      this.mapDSPToCity()
    }
   }

  handleSave() {
    if(this.state.turnaroundDuration.toString() === '0') {
      this.setState({
        mountDialog: true
      })
    } else if (this.state.turnaroundDuration) {
      this.handleMountSubmit()
    }
  }

  // handleTurnaroundChange(e) {
  //   if (e.target.value === '0') {
  //     this.setState({ mountDialog: true })
  //   }
  //     this.setState({ [e.target.name]: e.target.value })
  // }

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
        console.log("[fetchDspList]", response)
      })
      .catch((error) => {
        console.log("Error in fetching dsp list", error)
      })
  }


  handleDelete() {
    Api.deleteDSPMappedToCity({
      delivery_service_provider_id: this.state.selectedDspIdx,
      city_id: this.state.selectedCityIdx,
    })
      .then((response) => {
        Notify(response.message, 'success')
        this.setState({ disableSave: true, disableDelete: true })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ disableSave: false })
      })
  }

  mapDSPToCity() {
    this.setState({ disableSave: true })
    Api.mapDeliveryServiceProviderToCity({
      delivery_service_provider_id: this.state.selectedDspIdx,
      city_id: this.state.selectedCityIdx,
      priority: parseInt(this.state.priority),
      turnaround_duration: parseInt(this.state.turnaroundDuration)
    })
      .then((response) => {
        Notify(response.message, 'success')
        this.setState({ disableSave: false, disableDelete: false })
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
        this.setState({ disableSave: false })
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
            disabled={location.pathname.includes("edit")}
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
            disabled={location.pathname.includes("edit")}
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
            value={this.state.priority}
            disabled={false}
            name="priority"
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
        </div>
        <div className="form-group">
          <label className="label">Turnaround Duration</label><br />
          <TextField
            value={this.state.turnaroundDuration}
            disabled={false}
            name="turnaroundDuration"
            placeholder="Enter in seconds"
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
        </div>

        <div className="form-group">
          <RaisedButton
            label="Save"
            primary
            disabled={this.state.disableSave}
            onClick={this.handleSave}
            data={this.props.location}
          />
          {
            !location.pathname.includes(`/edit`) &&
            <RaisedButton
              label="Delete"
              primary
              disabled={this.state.disableDelete}
              onClick={this.handleDelete}
              style={{ marginLeft: "50px" }}
            />
          }
        </div>
        {
          this.state.mountDialog &&
          <ModalBox>
            <ModalBody height="60px">
              <table className="table--hovered">
                <tbody>
                  Empty or 0 will immediately assign the selected delivery service provider, are you sure ?
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                <button className="btn btn-primary" onClick={this.handleMountSubmit}> Yes </button>
                <button className="btn btn-secondary" onClick={this.unmountDialog}> Cancel </button>
              </div>
            </ModalFooter>
          </ModalBox>

        }
      </Card>
    )
  }
}

export default MapDSPToCityForm