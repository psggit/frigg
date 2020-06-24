import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import { NavLink } from 'react-router-dom'
import { getQueryObj } from '@utils/url-utils'
import '@sass/components/_form.scss'
import LocalityDetailsForm from './locality-details-form'
import DefineLocality from './../manage-geofencing/define-locality'
import IfElse from '@components/declarative-if-else'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

class ViewCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      isDisabled: false
    }

    this.enableEditMode = this.enableEditMode.bind(this)
    this.disableEditMode = this.disableEditMode.bind(this)
    this.update = this.update.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
    this.clearGeoLocality = this.clearGeoLocality.bind(this)
  }

  componentDidMount() {
    const { actions, match } = this.props
    const queryObj = getQueryObj(location.search.slice(1))

    this.props.actions.setLoadingState()
    this.setState({ queryObj })

    actions.fetchLocalities({
      city_id: parseInt(queryObj.cityId),
      is_available: false,
      offset: 0,
      limit: 50,
      no_filter: false
    })
    actions.fetchStates()
    actions.fetchCityDetails({
      id: parseInt(queryObj.cityId)
    })
  }

  update() {
    const { cityDetails } = this.props
    const { isCityActive, cityName, queryObj } = this.state
    const data = this.localityDetailsForm.getData()
    const localityData = this.localityData.getData()

    this.props.actions.updateGeolocality({
      id: parseInt(queryObj.id),
      city_id: parseInt(queryObj.cityId),
      coordinates: localityData || this.localityCoordinates,
      name: data.localityName || this.localityName,
      is_available: data.isLocalityActive,
      max_dorders_per_batch: parseInt(data.maxDeliveryOrderPerBatch) || this.maxDeliveryOrderPerBatch,
      consider_locality_order_limit: data.considerLocalityOrderlimit
    }, this.callbackUpdate)
  }

  clearGeoLocality() {
    this.localityData.clearGeoLocality()
  }

  callbackUpdate(status) {
    this.disableEditMode()
    this.localityData.callbackUpdate()
  }

  enableEditMode() {
    this.setState({ isEdit: true })
    this.localityData.editGeolocality()
  }

  disableEditMode() {
    this.localityDetailsForm.resetState()
    this.setState({ isEdit: false })
    this.localityData.clearSelection()
  }

  render() {
    const {
      actions,
      statesData,
      citiesData,
      cityDetails,
      geoLocalitiesData,
      loadingCities,
      loadingStates,
      loadingCityDetails,
      loadingGeoboundary,
      loadingGeolocalities,
      isGeolocalityUpdated,
      match
    } = this.props

    const queryObj = getQueryObj(location.search.slice(1))
    let localityName
    let selectedLocality

    if (!loadingGeolocalities) {
      selectedLocality = geoLocalitiesData.fences.filter(locality => locality.id === parseInt(queryObj.id))[0]
      if (selectedLocality) {
        this.localityName = selectedLocality.name
        this.isLocalityActive = selectedLocality.is_available
        this.localityCoordinates = selectedLocality.coordinates
        this.considerLocalityOrderlimit = selectedLocality.consider_locality_order_limit
        this.maxDeliveryOrderPerBatch = selectedLocality.max_dorders_per_batch
      }
    }

    return (
      <div style={{
        position: 'relative',
        width: '100%'
      }}
      >

        <IfElse conditionMet={!loadingCityDetails}>
          <div>
            <IfElse conditionMet={!this.state.isEdit}>
              <RaisedButton
                primary
                label="Edit"
                onClick={this.enableEditMode}
                style={{ marginBottom: '40px' }}
              />
              <RaisedButton
                primary
                label="Cancel"
                onClick={this.disableEditMode}
                style={{ marginBottom: '40px' }}
              />

            </IfElse>
            <div
              style={{
                width: '30%',
                position: 'relative',
                display: 'block',
                verticalAlign: 'top',
                marginRight: '20px'
              }}
            >
              <Card style={{
                padding: '20px',
                width: '100%'
              }}
              >
                <LocalityDetailsForm
                  ref={(node) => { this.localityDetailsForm = node }}
                  isDisabled={!this.state.isEdit}
                  localityName={this.localityName}
                  isLocalityActive={this.isLocalityActive}
                  maxDeliveryOrderPerBatch={this.maxDeliveryOrderPerBatch}
                  considerLocalityOrderlimit={this.considerLocalityOrderlimit}
                />
              </Card>
            </div>
            <Card style={{
              padding: '20px',
              paddingTop: '0',
              marginTop: '40px',
              width: '100%',
              position: 'relative',
              display: 'inline-block',
              verticalAlign: 'top'
            }}
            >
              <div id="gmap-container" style={{ position: 'relative' }}>
                <div style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
                  {
                    !loadingGeolocalities &&
                    <DefineLocality
                      ref={(node) => this.localityData = node}
                      viewGeolocalities={actions.fetchLocalities}
                      updateGeolocality={actions.updateGeolocality}
                      createGeolocality={actions.createGeolocality}
                      geoLocalitiesData={geoLocalitiesData}
                      loadingGeolocalities={loadingGeolocalities}
                      cityId={parseInt(queryObj.cityId)}
                      localityId={parseInt(queryObj.id)}
                      zoomLevel={11}
                    />
                  }
                </div>
              </div>
            </Card>
            <IfElse conditionMet={!this.state.isEdit}>
              <RaisedButton
                primary
                label="Edit"
                onClick={this.enableEditMode}
                style={{ marginBottom: '40px', marginRight: '20px', marginTop: '40px' }}
              />
              <RaisedButton
                primary
                label="Cancel"
                onClick={this.disableEditMode}
                style={{ marginBottom: '40px', marginRight: '20px' }}
              />
            </IfElse>
            {
              this.state.isEdit &&
              <Fragment>
                <RaisedButton
                  disabled={this.state.isDisabled}
                  primary
                  label="Save changes"
                  onClick={this.update}
                  style={{ marginTop: '40px', marginRight: '20px' }}
                />
                <RaisedButton
                  primary
                  label="Create from scratch"
                  onClick={this.clearGeoLocality}
                  style={{ marginTop: '40px' }}
                />
              </Fragment>
            }
          </div>
          <div>loading..</div>
        </IfElse>
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
)(ViewCity)
