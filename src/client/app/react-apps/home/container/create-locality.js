import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Actions from './../actions'
import DefineLocality from './../components/manage-geofencing/define-locality'
import DefineGeoboundary from './../components/manage-geofencing/define-geoboundary'

class CreateLocality extends React.Component {
  constructor() {
    super()

    this.state = {
      activeMapName: 'geoboundary'
    }

    this.setActiveMapName = this.setActiveMapName.bind(this)
  }

  setActiveMapName(activeMapName) {
    this.setState({ activeMapName })
  }

  getActiveMapComponent() {
    const {
      actions,
      statesData,
      citiesData,
      geoBoundaryData,
      geoLocalitiesData,
      loadingCities,
      loadingStates,
      loadingGeolocalities,
      loadingGeoboundary,
      isGeolocalityUpdated,
      match
    } = this.props

    const { activeMapName } = this.state

    if (activeMapName === 'geoboundary') {
      return (
        <DefineGeoboundary
          setGeolocalityLoadingState={actions.setGeolocalityLoadingState}
          setActiveMapName={this.setActiveMapName}
          viewGeoboundary={actions.viewGeoboundary}
          updateGeoboundary={actions.updateGeoboundary}
          geoBoundaryData={geoBoundaryData}
          loadingGeoboundary={loadingGeoboundary}
          isGeolocalityUpdated={isGeolocalityUpdated}
          cityId={parseInt(match.params.id)}
        />
      )
    }

    return (
      <DefineLocality
        setActiveMapName={this.setActiveMapName}
        viewGeolocalities={actions.fetchLocalities}
        updateGeolocality={actions.updateGeolocality}
        createGeolocality={actions.createGeolocality}
        geoLocalitiesData={geoLocalitiesData}
        loadingGeolocalities={loadingGeolocalities}
        cityId={parseInt(match.params.id)}
      />
    )
  }

  render() {
    const contentStyle = { margin: '0 16px' }

    return (
      <div style={{ width: '100%', maxWidth: 1000, margin: 'auto' }}>
        <div style={contentStyle}>
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
