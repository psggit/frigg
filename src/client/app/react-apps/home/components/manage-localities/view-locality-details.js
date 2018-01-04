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
      isEdit: false
    }

    this.enableEditMode = this.enableEditMode.bind(this)
    this.disableEditMode = this.disableEditMode.bind(this)
    this.update = this.update.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  componentDidMount() {
    const { actions, match } = this.props
    const queryObj = getQueryObj(location.search.slice(1))

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
      coordinates: localityData,
      name: data.localityName || this.localityName,
      is_available: data.isLocalityActive || this.isLocalityActive
    }, this.callbackUpdate)
  }

  callbackUpdate() {
    this.disableEditMode()
    this.localityData.callbackUpdate()
  }

  enableEditMode() {
    this.setState({ isEdit: true })
  }

  disableEditMode() {
    this.setState({ isEdit: false })
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
      this.localityName = selectedLocality.name
      this.isLocalityActive = selectedLocality.is_available
    }

    return (
      <div style={{
        position: 'relative',
        width: '100%'
      }}
      >

        <IfElse conditionMet={!loadingCityDetails}>
          <div>
            <div
              style={{
                width: '30%',
                position: 'relative',
                display: 'inline-block',
                verticalAlign: 'top',
                marginRight: '20px'
              }}
            >
              <Card style={{
                padding: '20px',
                width: '100%'
              }}
              >
                <IfElse conditionMet={!this.state.isEdit}>
                  <button
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                    className="btn--icon"
                    onClick={this.enableEditMode}
                  >
                    <img src="/images/pencil.svg" />
                  </button>
                  <button
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                    className="btn--icon"
                    onClick={this.disableEditMode}
                  >
                    <img src="/images/cross-blue.svg" />
                  </button>

                </IfElse>
                <LocalityDetailsForm
                  ref={(node) => { this.localityDetailsForm = node }}
                  isDisabled={!this.state.isEdit}
                  localityName={this.localityName}
                  isLocalityActive={this.isLocalityActive}
                />
              </Card>
              <RaisedButton
                primary
                label="Update changes"
                onClick={this.update}
                style={{ marginTop: '40px' }}
              />
            </div>
            <Card style={{
              padding: '20px',
              paddingTop: '0',
              width: 'calc(70% - 20px)',
              position: 'relative',
              display: 'inline-block',
              verticalAlign: 'top'
            }}
            >
              <div id="gmap-container" style={{ position: 'relative' }}>
                <div style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
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
                </div>
              </div>
            </Card>
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
