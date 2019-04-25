import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import CreateConsumerAdForm from './create-ad-form'
import '@sass/components/_form.scss'
import { Card } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import { getQueryObj } from '@utils/url-utils'
import '@sass/animations.scss'

class CreateAd extends React.Component {
  constructor(props) {
    super(props)
    this.statesForWhichDataIsFetched = []
    this.shouldInitializeActiveCitiesArr = true
    this.state = {
      cityId: null,
      isDisabled: false,
      localityErr: false,
      selectedState: null,
      citiesStateMap: {},
      isDisabled: false,
      activeCitiesStateMap: {}
    }
    this.submit = this.submit.bind(this)
    this.setCityName = this.setCityName.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
    this.removeLocalityErr = this.removeLocalityErr.bind(this)
    this.handleFetchCities = this.handleFetchCities.bind(this)
    this.handleAddActiveCities = this.handleAddActiveCities.bind(this)
    this.initializeActiveCitiesArray = this.initializeActiveCitiesArray.bind(this)
    this.handleSetListingOrder = this.handleSetListingOrder.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState()
    this.props.actions.fetchStates()
    this.props.actions.fetchCollections({ limit: 1000, offset: 0 })
    //this.props.actions.fetchCollections({ limit: 1000, offset: 0 })
  }

  removeLocalityErr() {
    this.setState({ localityErr: false })
  }

  setCityName(cityName) {
    this.setState({ cityName })
  }

  callbackUpdate(status) {
    if (status) {
      this.setState({ isDisabled: false })
    }
    this.localityData.callbackUpdate()
  }

  handleAddActiveCities(e, id) {
    const { selectedState } = this.state
    const updatedActiveCitiesStateMap = Object.assign({}, this.state.activeCitiesStateMap)
    updatedActiveCitiesStateMap[selectedState] = updatedActiveCitiesStateMap[selectedState].map((item) => {
      if (item.city_id === id) {
        if (e.target.checked) {
          item.listing_order = 1
        } else {
          item.listing_order = 0
        }
        item.checked = e.target.checked
      }
      return item
    })

    this.setState({ activeCitiesStateMap: updatedActiveCitiesStateMap })
  }

  handleSetListingOrder(e, id) {
    const { selectedState } = this.state
    const updatedActiveCitiesStateMap = Object.assign({}, this.state.activeCitiesStateMap)
    updatedActiveCitiesStateMap[selectedState] = updatedActiveCitiesStateMap[selectedState].map((item) => {
      if (item.city_id === id) {
        if (!parseInt(e.target.value)) {
          item.checked = false
        }
        item.listing_order = parseInt(e.target.value)
      }
      return item
    })

    this.setState({ activeCitiesStateMap: updatedActiveCitiesStateMap })
  }

  handleFetchCities(short_name, id) {
    this.setState({ selectedState: id })
    if(this.statesForWhichDataIsFetched.indexOf(id) === -1) {
      this.shouldInitializeActiveCitiesArr = true
      this.props.actions.setLoadingState('loadingCities')
      this.props.actions.fetchCities({
        state_short_name: short_name,
        is_available: false,
        offset: 0,
        limit: 10,
        deliverable_city: true,
        no_filter: false
      })
      this.statesForWhichDataIsFetched.push(id)
    }
  }

  initializeActiveCitiesArray(citiesData) {
    const activeCities = []
    const updateCitiesStateMap = Object.assign({}, this.state.citiesStateMap)
    updateCitiesStateMap[this.state.selectedState] = citiesData
    // this.citiesStateMap[this.selectedState] = citiesData
    citiesData.forEach((item) => {
      activeCities.push({
        city_id: item.id,
        listing_order: 0,
        checked: false
      })
    })

    const updatedActiveCitiesStateMap = Object.assign({}, this.state.activeCitiesStateMap)
    updatedActiveCitiesStateMap[this.state.selectedState] = activeCities
    // this.activeCitiesStateMap[this.selectedState] = activeCities
    this.setState({
      activeCitiesStateMap: updatedActiveCitiesStateMap,
      citiesStateMap: updateCitiesStateMap
    })
  }

  submit() {
    const adData = this.createConsumerAdForm.getData()
    console.log(adData);
    let activeCitiesPayload = []
    const activeCitiesMatrix = Object.entries(this.state.activeCitiesStateMap).map(item => item[1])
    activeCitiesPayload = [].concat.apply([], activeCitiesMatrix)
      .filter(item => item.listing_order > 0)
      .map(item => ({ city_id: item.city_id, listing_order: item.listing_order }))
    if (
      activeCitiesPayload.length
      && adData.title.length
      && adData.ad_type.length 
      && adData.app_type.length
      && adData.active_to
      && adData.active_from
      //&& adData.url
      //&& adData.deep_link_url
      //&& adData.collectionName
      //&& adData.high_res_image
      //&& adData.low_res_image
    ) {
      if(adData.ad_type === "collection" && adData.collectionName.length && (adData.high_res_image.length || adData.low_res_image.length)) {
        const payload = {
          ad_data: {
            ad_title: adData.title,
            ad_type: adData.ad_type,
            app_type: adData.app_type,
            active_from: adData.active_from,
            active_to: adData.active_to,
            status: adData.status ? 'Active' : 'Inactive',
            url: "",
            high_res_image: adData.high_res_image,
            low_res_image: adData.low_res_image,
            is_critical: adData.is_critical,
            // city_id: 
            // CityName: 
            // listing_order: 
            collection_name: adData.collectionName,
          },
          city_data: activeCitiesPayload
        }
        this.setState({ isDisabled: true })
        this.props.actions.createConsumerAd(payload, (isDisabled) => {
          // console.log("deep", payload)
          this.setState({ isDisabled })
        })
      } else if(!adData.ad_type.includes("image") && adData.url.length) {
        const payload = {
          ad_data: {
            ad_title: adData.title,
            ad_type: adData.ad_type,
            app_type: adData.app_type,
            active_from: adData.active_from,
            active_to: adData.active_to,
            status: adData.status ? 'Active' : 'Inactive',
            is_critical: adData.is_critical,
            //image_url: adData.image_url,
            url: adData.url,
            //deep_link_url: adData.deep_link_url,
            high_res_image: adData.high_res_image,
            low_res_image: adData.low_res_image,
            // city_id: 
            // CityName: 
            // listing_order: 
            collection_name: "",
          },
          city_data: activeCitiesPayload
        }
        this.setState({ isDisabled: true })
        // console.log("deep, ", payload, activeCitiesPayload)
        this.props.actions.createConsumerAd(payload, (isDisabled) => {
          // console.log("deep", payload)
          this.setState({ isDisabled })
        })
      } else if (adData.ad_type.includes("image") && (adData.high_res_image.length || adData.low_res_image.length)) {
        console.log("image ad creating......")
        const payload = {
          ad_data: {
            ad_title: adData.title,
            ad_type: adData.ad_type,
            app_type: adData.app_type,
            active_from: adData.active_from,
            active_to: adData.active_to,
            is_critical: adData.is_critical,
            status: adData.status ? 'Active' : 'Inactive',
            //image_url: adData.image_url,
            url: "",
            //deep_link_url: adData.deep_link_url,
            high_res_image: adData.high_res_image,
            low_res_image: adData.low_res_image,
            // city_id: 
            // CityName: 
            // listing_order: 
            collection_name: "",
          },
          city_data: activeCitiesPayload
        }
        this.setState({ isDisabled: true })
        // console.log("deep, ", payload, activeCitiesPayload)
        this.props.actions.createConsumerAd(payload, (isDisabled) => {
          // console.log("deep", payload)
          this.setState({ isDisabled })
        })
      }
    }
  }

  render() {
    const {
      actions,
      statesData,
      citiesData,
      loadingCities,
      loadingStates,
      match
    } = this.props

    if (this.shouldInitializeActiveCitiesArr) {
      if (!loadingCities && citiesData.length) {
        this.initializeActiveCitiesArray(citiesData)
        this.shouldInitializeActiveCitiesArr = false
      }
    }

    const queryObj = getQueryObj(location.search.slice(1))
    return (
      <div style={{
        position: 'relative',
        width: '100%'
      }}
      >

        <div
          style={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            // justifyContent: 'space-between',
            verticalAlign: 'top',
            marginRight: '20px'
          }}
        >
          <Card
            className={this.state.localityErr ? 'animated shake' : ''}
            style={{
              padding: '20px',
              width: '370px',
              height: '100%',
              marginRight: '20px'
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Enter ad details</h3>
              <CreateConsumerAdForm
                ref={(node) => this.createConsumerAdForm = node}
                status={false}
                loadingCollections={this.props.loadingAllCollections}
                collectionsData={this.props.collectionsList}
              />
          </Card>

          <Card
            style={{
              padding: '20px',
              width: '240px',
              height: '100%',
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: '0px' }}>Add active cities</h3>
            <p style={{ color: '#9b9b9b', fontStyle: 'italic' }}>(Choose state to populate cities)</p>
            <div>
              <List style={{ height: '240px', overflow: 'auto' }}>
                {
                  statesData.map((state, i) => (
                    <ListItem onClick={() => { this.handleFetchCities(state.short_name, state.id) }} primaryText={state.state_name} />
                  ))
                }
              </List>
            </div>
          </Card>

          {
            !loadingCities &&
            <Card
              style={{
                padding: '20px',
                width: '300px',
                height: '100%',
                marginLeft: '20px'
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Select listing order</h3>
              <div>
                {
                  this.state.citiesStateMap[this.state.selectedState]
                  ? this.state.citiesStateMap[this.state.selectedState].map((item, i) => (
                      <div key={i} style={{ display: 'flex' }}>
                        <Checkbox
                          className="mui-checkbox-sm"
                          key={item.id}
                          onCheck={(e) => { this.handleAddActiveCities(e, item.id) }}
                          name={item.name}
                          label={item.name}
                          checked={
                            this.state.activeCitiesStateMap[this.state.selectedState].length
                            ? this.state.activeCitiesStateMap[this.state.selectedState][i].checked
                            : false
                          }
                        />
                        <input
                          disabled={
                            this.state.activeCitiesStateMap[this.state.selectedState].length
                            ? !this.state.activeCitiesStateMap[this.state.selectedState][i].checked
                            : true
                          }
                          value={
                            this.state.activeCitiesStateMap[this.state.selectedState].length
                            ? this.state.activeCitiesStateMap[this.state.selectedState][i].listing_order
                            : 0
                          }
                          type='number'
                          onChange={(e) => { this.handleSetListingOrder(e, item.id) }}
                          style={{ width: '40px', textAlign: 'center', height: '20px', borderRadius: '0' }}
                        />
                      </div>
                  ))
                  : 'No cities found'
                }
              </div>
            </Card>
          }
        </div>

          <RaisedButton
            primary
            disabled={this.state.isDisabled}
            label="Save"
            onClick={this.submit}
            style={{ marginTop: '40px' }}
          />
        </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAd)
