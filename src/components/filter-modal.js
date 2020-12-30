import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

class FilterModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      isLocalityAvailable: false,
      isCityAvailable: false,
      statusIdx: props.activityStatus ? props.activityStatus : -1,
      selectedFieldIdx: -1,
      selectedFieldValue: "",
      brandName: "",
      warehouseId: "",
      adId: props.adId || "",
      daId: props.daId || "",
      stateIdx: props.stateId ? this.props.statesData.findIndex(item => item.id === parseInt(props.stateId)) + 1 : null,
      selectedWarehouseIdx: props.selectedWarehouseIdx ? this.props.warehouseData.findIndex(item => item.id === parseInt(props.selectedWarehouseIdx)) + 1 : null,
      cityIdx: props.cityId ? this.props.citiesData.findIndex(item => item.id === parseInt(props.cityId)) + 1 : null,
      predictionIdx: null
    }

    this.activityStatus = [
      { text: 'Active', value: 1 },
      { text: 'Inactive', value: 2 },
    ]

    this.filterOptions = [
      { text: 'City', value: 1 },
      { text: 'Delivery Agent', value: 2 },
    ]

    this.daLocalityListFilterOptions = [
      { text: 'Locality', value: 1 },
      { text: 'Delivery Agent', value: 2 },
    ]

    this.handleClose = this.handleClose.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.unmountModal = this.unmountModal.bind(this)
    this.handleApplyFilter = this.handleApplyFilter.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleWareHouseCityChange = this.handleWareHouseCityChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handlePredictionChange = this.handlePredictionChange.bind(this)
    this.handleChangeIsLocalityAvailable = this.handleChangeIsLocalityAvailable.bind(this)
    this.handleChangeIsCityAvailable = this.handleChangeIsCityAvailable.bind(this)
    this.handleWarehouseChange = this.handleWarehouseChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountFilterModal()
    }, 500)
  }

  // handleApplyFilter(stateIdx, isLocalityAvailable) {
  //   this.props.applyFilter(stateIdx, isLocalityAvailable)
  //   this.setState({ open: false })
  //   setTimeout(() => {
  //     this.props.unmountFilterModal()
  //   }, 500)
  // }

  handleStateChange(e, k) {
    const stateIdx = k + 1
    this.setState({ stateIdx, cityIdx: null })
    this.props.handleStateChange(k)
  }

  handleStatusChange (e, k) {
    const statusIdx = k + 1
    console.log("status", statusIdx)
    this.setState({ statusIdx, couponName: "" })
    //this.props.handleStatusChange(k)
  }

  handleCityChange(e, k) {
    const cityIdx = k + 1
    this.setState({ cityIdx })
    this.props.handleCityChange ? this.props.handleCityChange(k) : {}
  }

  handleWareHouseCityChange(e,k) {
    const cityIdx = k + 1
    this.setState({ cityIdx })
  }

  handleWarehouseChange (e, k) {
    const selectedWarehouseIdx = k + 1
    console.log("warehouse", k)
    this.setState({ selectedWarehouseIdx })
    // this.props.handleWarehouseChange(k)
  }

  handlePredictionChange(e, k) {
    const predictionIdx = k + 1
    this.setState({ predictionIdx })
    this.props.handlePredictionChange(k)
  }

  handleSelectChange(e, k) {
    this.setState({ selectedFieldIdx: k + 1, selectedFieldValue: "" })
  }

  handleChangeIsLocalityAvailable(e) {
    this.setState({ isLocalityAvailable: e.target.checked })
  }

  handleChangeIsCityAvailable(e) {
    this.setState({ isCityAvailable: e.target.checked })
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleApplyFilter() {
    if (this.props.filterWarehouse) {
      this.props.applyFilter(this.state.selectedWarehouseIdx)
    } else if (this.props.filter === "filterDeliveryAgentWarehouseMapped") {
      this.props.applyFilter(this.props.dropdownOptions.find(item => item.id === this.state.selectedFieldIdx).name, this.state.selectedFieldValue)
    } else if (this.props.filter === "filterDeliveryAgentLocalityMapped") {
      this.props.applyFilter(this.props.dropdownOptions.find(item => item.id === this.state.selectedFieldIdx).name, this.state.selectedFieldValue)
    } else if (this.props.filter === "filterDSPCityMapped") {
      this.props.applyFilter(this.props.dropdownOptions.find(item => item.id === this.state.selectedFieldIdx).name, this.state.selectedFieldValue)
    } else if (this.props.filter === "brandName") {
      this.props.applyFilter(this.state.brandName)
    } else if (this.props.filter === "storyFilter") {
      console.log("index", this.state.statusIdx)
      this.props.applyFilter(this.state.statusIdx)
    } else if (this.props.filter === "cartCouponFilter" || this.props.filter === "productCouponFilter") {
      const isActive = this.state.statusIdx === 1 ? true : false
      this.props.applyFilter(this.state.couponName, isActive)
    } else if (this.props.filter === "daFilter") {
      const fieldName = this.state.selectedFieldIdx === 1 ? "city_id" : "da_id"
      const fieldValue = this.state.selectedFieldIdx === 1 ? this.state.cityIdx : this.state.daId
      this.props.applyFilter(fieldName, fieldValue)
    } else if (this.props.filterStateAndCity) {
      this.props.applyFilter(this.state.stateIdx, this.state.isLocalityAvailable)
    } else if (!this.props.filterStateAndCity && !this.props.filterCity) {
      this.props.applyFilter(this.state.adId)
    } else if (this.props.filterCity) {
      this.props.applyFilter(this.state.cityIdx)
    } else if (this.props.warehouseFilter) {
      this.props.applyFilter(this.state.cityIdx)
    } else {
      this.props.applyFilter(this.state.predictionIdx)
    }
    this.unmountModal()
  }

  unmountModal() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountFilterModal()
    }, 500)
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleClose}
      />,

      <RaisedButton
        primary
        label="Apply filter"
        onClick={this.handleApplyFilter}
      />
    ]
    return (
      <div>
        <Dialog
          autoScrollBodyContent
          title={this.props.title}
          contentStyle={{ width: '100%', maxWidth: '500px' }}
          modal={false}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
        >
          {
            this.props.filter === "stateAndCityWithIsAvailableCheck" &&
            <div>
              <div className="form-group">
                <label>State</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.stateIdx)}
                  onChange={this.handleStateChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    !this.props.loadingStates
                      ? (
                        this.props.statesData.map((state, i) => (
                          <MenuItem
                            value={i + 1}
                            key={state.id}
                            primaryText={state.state_name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
                   <div className="form-group">
                <label>City</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText="Choose city"
                  disabled={this.props.loadingCities || !this.props.citiesData.length}
                  value={parseInt(this.state.cityIdx)}
                  onChange={this.handleCityChange}
                >
                  {
                    !this.props.loadingCities && this.props.citiesData.length
                      ? (
                        this.props.citiesData.map((city, i) => (
                          <MenuItem
                            value={i + 1}
                            key={city.id}
                            primaryText={city.name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
              <div className="form-group">
                <Checkbox
                  style={{ marginTop: '10px' }}
                  // disabled={this.props.isDisabled}
                  checked={this.state.isLocalityAvailable}
                  onCheck={this.handleChangeIsLocalityAvailable}
                  name="isLocalityAvailable"
                  label="is_available"
                />
              </div>
            </div>
          }
          {
            this.props.filter === "brandName" &&
            <div>
              <div className="form-group">
                <label>Brand Name</label><br />
                <TextField
                  style={{ width: '100%' }}
                  onChange={this.handleTextFields}
                  name="brandName"
                  value={this.state.brandName}
                />
              </div>
            </div>
          }
          {
            this.props.filter === "filterDeliveryAgentWarehouseMapped" &&
            <div>
              <div className="form-group">
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.selectedFieldIdx)}
                  onChange={this.handleSelectChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    this.props.dropdownOptions.map((item, i) => (
                      <MenuItem
                        value={i + 1}
                        key={item.id}
                        primaryText={item.name}
                      />
                    ))
                  }
                </SelectField>
              </div>
              <div className="form-group">
                <label>{ this.state.selectedFieldIdx === 1 ? "Warehouse Id" : "Delivery Agent Id" }</label><br />
                <TextField
                  style={{ width: '100%' }}
                  onChange={this.handleTextFields}
                  name="selectedFieldValue"
                  value={this.state.selectedFieldValue}
                />
              </div>
            </div>
          }
          {
            this.props.filter === "filterDeliveryAgentLocalityMapped" &&
            <div>
              <div className="form-group">
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.selectedFieldIdx)}
                  onChange={this.handleSelectChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    this.props.dropdownOptions.map((item, i) => (
                      <MenuItem
                        value={i + 1}
                        key={item.id}
                        primaryText={item.name}
                      />
                    ))
                  }
                </SelectField>
              </div>
              {
                this.state.selectedFieldIdx !== -1 &&
                <div className="form-group">
                  <label>{this.state.selectedFieldIdx === 1 ? "Locality Id" : "Delivery Agent Id"}</label><br />
                  <TextField
                    style={{ width: '100%' }}
                    onChange={this.handleTextFields}
                    name="selectedFieldValue"
                    value={this.state.selectedFieldValue}
                  />
                </div>
              }
            </div>
          }
          {
            this.props.filter === "filterDSPCityMapped" &&
            <div>
              <div className="form-group">
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.selectedFieldIdx)}
                  onChange={this.handleSelectChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    this.props.dropdownOptions.map((item, i) => (
                      <MenuItem
                        value={i + 1}
                        key={item.id}
                        primaryText={item.name}
                      />
                    ))
                  }
                </SelectField>
              </div>
              {
                this.state.selectedFieldIdx !== -1 &&
                <div className="form-group">
                  <label>{this.state.selectedFieldIdx === 1 ? "City Id" : this.state.selectedFieldIdx === 2 ? "Delivery Service Provider Id": "Is Active" }</label><br />
                  <TextField
                    style={{ width: '100%' }}
                    onChange={this.handleTextFields}
                    name="selectedFieldValue"
                    value={this.state.selectedFieldValue}
                  />
                </div>
              }
            </div>
          }
          {
            this.props.filter === "cartCouponFilter" &&
            <div>
              <div className="form-group">
                <label>Coupon Name</label><br />
                <TextField
                  style={{ width: '100%' }}
                  onChange={this.handleTextFields}
                  name="couponName"
                  value={this.state.couponName}
                />
              </div>
              <div className="form-group">
                <label>Activity Status</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText="Choose status"
                  value={parseInt(this.state.statusIdx)}
                  onChange={this.handleStatusChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    this.activityStatus.map((item, i) => {
                      return (
                        <MenuItem
                          value={item.value}
                          key={item.value}
                          primaryText={item.text}
                        />
                      )
                    })
                  }
                </SelectField>
              </div>
            </div>
          }
          {
            this.props.filter === "storyFilter" &&
            <div>
              <div className="form-group">
                <label>Status</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText="Choose status"
                  value={parseInt(this.state.statusIdx)}
                  onChange={this.handleStatusChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    this.activityStatus.map((item, i) => {
                      return (
                        <MenuItem
                          value={item.value}
                          key={item.value}
                          primaryText={item.text}
                        />
                      )
                    })
                  }
                </SelectField>
              </div>
            </div>
          } 
          {
            this.props.filter === "productCouponFilter" &&
            <div>
              <div className="form-group">
                <label>Coupon Name</label><br />
                <TextField
                  style={{ width: '100%' }}
                  onChange={this.handleTextFields}
                  name="couponName"
                  value={this.state.couponName}
                />
              </div>
              <div className="form-group">
                <label>Activity Status</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText="Choose status"
                  value={parseInt(this.state.statusIdx)}
                  onChange={this.handleStatusChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    this.activityStatus.map((item, i) => {
                      return (
                        <MenuItem
                          value={item.value}
                          key={item.value}
                          primaryText={item.text}
                        />
                      )
                    })
                  }
                </SelectField>
              </div>
            </div>
          }
          {
            this.props.filter === "stateAndCityWithoutIsAvailableCheck" &&
            <div>
              <div className="form-group">
                <label>Ad ID</label><br />
                <TextField
                  style={{ width: '100%' }}
                  onChange={this.handleTextFields}
                  name="adId"
                  value={this.state.adId}
                />
              </div>
              <div className="form-group">
                <label>State</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText="Choose state"
                  value={parseInt(this.state.stateIdx)}
                  onChange={this.handleStateChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    !this.props.loadingStates
                      ? (
                        this.props.statesData.map((state, i) => (
                          <MenuItem
                            value={i + 1}
                            key={state.id}
                            primaryText={state.state_name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
              <div className="form-group">
                <label>City</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText="Choose city"
                  disabled={this.props.loadingCities || !this.props.citiesData.length}
                  value={parseInt(this.state.cityIdx)}
                  onChange={this.handleWareHouseCityChange}
                >
                  {
                    !this.props.loadingCities && this.props.citiesData.length
                      ? (
                        this.props.citiesData.map((city, i) => (
                          <MenuItem
                            value={i + 1}
                            key={city.id}
                            primaryText={city.name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
            </div>
          }
          {
            this.props.filter === "cityWithIsAvailableCheck" &&
            <div>
              <div className="form-group">
                <label>State</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.stateIdx)}
                  onChange={this.handleStateChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    !this.props.loadingStates
                      ? (
                        this.props.statesData.map((state, i) => (
                          <MenuItem
                            value={i + 1}
                            key={state.id}
                            primaryText={state.state_name}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
              <div className="form-group">
                <Checkbox
                  style={{ marginTop: '10px' }}
                  // disabled={this.props.isDisabled}
                  checked={this.state.isCityAvailable}
                  onCheck={this.handleChangeIsCityAvailable}
                  name="isCityActive"
                  label="is_available"
                />
              </div>
            </div>
          }
          {
            this.props.filter === "cityFilter" &&
            <div>
              <div className="form-group">
                <label>City</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.cityIdx)}
                  onChange={this.handleCityChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    !this.props.loadingCities
                      ? (
                        this.props.citiesData.map((city, i) => (
                          <MenuItem
                            value={i + 1}
                            key={city.value}
                            primaryText={city.text}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
            </div>
          }
          {
            this.props.filter === "daFilter" &&
            <div>
              <div className="form-group">
                <label>Select Option</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.selectedFieldIdx)}
                  onChange={this.handleSelectChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    this.filterOptions.map((item, i) => (
                      <MenuItem
                        value={i + 1}
                        key={item.value}
                        primaryText={item.text}
                      />
                    ))
                  }
                </SelectField>
              </div>
              {
                this.state.selectedFieldIdx === 1 &&
                <div className="form-group">
                  <label>City Id</label><br />
                  <SelectField
                    style={{ width: '100%' }}
                    floatingLabelText={this.props.floatingLabelText}
                    value={parseInt(this.state.cityIdx)}
                    onChange={this.handleCityChange}
                    iconStyle={{ fill: '#9b9b9b' }}
                  >
                    {
                      !this.props.loadingCities
                        ? (
                          this.props.citiesData.map((city, i) => (
                            <MenuItem
                              value={i + 1}
                              key={city.value}
                              primaryText={city.text}
                            />
                          ))
                        )
                        : ''
                    }
                  </SelectField>
                </div>
              }
              {
                this.state.selectedFieldIdx === 2 &&
                <div className="form-group">
                  <label>DA Id</label><br />
                  <TextField
                    style={{ width: '100%' }}
                    onChange={this.handleTextFields}
                    name="daId"
                    value={this.state.daId}
                  />
                </div>
              }
            </div>
          }
          {
            this.props.filter === "predictionFilter" &&
            <div>
              <div className="form-group">
                <label>Prediction</label><br />
                <SelectField
                  style={{ width: '100%' }}
                  floatingLabelText={this.props.floatingLabelText}
                  value={parseInt(this.state.predictionIdx)}
                  onChange={this.handlePredictionChange}
                  iconStyle={{ fill: '#9b9b9b' }}
                >
                  {
                    !this.props.loadingPredictionList
                      ? (
                        this.props.predictionList.map((prediction, i) => (
                          <MenuItem
                            value={i + 1}
                            key={prediction.value}
                            primaryText={prediction.text}
                          />
                        ))
                      )
                      : ''
                  }
                </SelectField>
              </div>
            </div>
          }
        </Dialog>
      </div>
    )
  }
}

export default FilterModal
