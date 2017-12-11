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

  componentDidMount() {
    window.onpopstate = e => e
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
        zoomLevel={11}
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
