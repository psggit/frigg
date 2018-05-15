import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as Actions from './../actions'
import DefineLocality from './../components/manage-geofencing/define-locality'
import DefineGeoboundary from './../components/manage-geofencing/define-geoboundary'
import { getQueryObj } from '@utils/url-utils'

class CreateLocality extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.actions.setLoadingState('loadingCities')
    this.props.actions.setLoadingState('loadingStates')
    window.onpopstate = e => e
  }

  getActiveMapComponent() {
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
    let mode = ''
    const localitySlug = location.pathname.split('/')[4]

    if (localitySlug == 'create-boundary') {
      mode = 'create'
    } else {
      mode = 'edit'
    }

    if (localitySlug === 'localities') {
      return (
        <DefineLocality
          viewGeolocalities={actions.fetchLocalities}
          updateGeolocality={actions.updateGeolocality}
          createGeolocality={actions.createGeolocality}
          geoLocalitiesData={geoLocalitiesData}
          loadingGeolocalities={loadingGeolocalities}
          cityId={parseInt(queryObj.id)}
          zoomLevel={11}
        />
      )
    }

    return (
      <DefineGeoboundary
        setLoadingState={actions.setLoadingState}
        fetchCityDetails={actions.fetchCityDetails}
        updateGeoboundary={actions.updateGeoboundary}
        cityDetails={cityDetails}
        loadingCityDetails={loadingCityDetails}
        isGeolocalityUpdated={isGeolocalityUpdated}
        cityId={parseInt(queryObj.id)}
        mode={mode}
      />
    )
  }

  render() {
    const contentStyle = { position: 'relative' }
    return (
      <div id="gmap-container" style={contentStyle}>
        <div style={{ width: '100%', maxWidth: '1000px', margin: 'auto' }}>
          {this.getActiveMapComponent()}
        </div>
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
)(CreateLocality)
