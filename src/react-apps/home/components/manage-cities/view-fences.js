import React from 'react';
import * as Api from './../../middleware/api';
import { Gmaps } from 'react-gmaps';

import {
  getCoordinatesInObjects,
  displayPolygonOnMap,
  createPolygonFromCoordinates,
  configureDrawingManager,
  setupEventListeners,
  attachBlurEventOnPolygon,
  attachClickEventOnPolygon,
  removeLabelFromPolygon,
  labelPolygon,
} from './../manage-geofencing/gmap-utils'

const params = { v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso' }

class ViewFences extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loadingFences: true,
      zoomLevel: 14,
      lat: null,
      lng: null,
      gmapKey: 0,
      geoLocalitiesData: []
    }

    this.handleMapCreation = this.handleMapCreation.bind(this)
    this.setGeoBoundary = this.setGeoBoundary.bind(this)
    this.colorMap = ['#e04e73', '#6ecc80', '#4d9fbc', '#c3ce63']
  }

  componentDidMount() {
    this.fetchFences()
  }

  setGeoBoundary(map, geoboundary) {
    const polygonCoordiantes = {
      coordinates: getCoordinatesInObjects(geoboundary),
      color: 'transparent',
      stroke: 'blue'
    }
    const polygon = createPolygonFromCoordinates(polygonCoordiantes)
    displayPolygonOnMap(map, polygon)
  }

  setGeoLocality(shape) {
    this.newLocality = shape
  }

  handleMapCreation(map) {
    let localities = this.state.geoLocalitiesData.delivery_fences
    const cityId = this.props.match.params.cityId

    if (cityId && !this.state.loadingFences) {
     
      const drawingManager = configureDrawingManager(map)
      this.drawingManager = drawingManager

      const lat = this.state.geoLocalitiesData.gps.split(',')[0]
      const lng = this.state.geoLocalitiesData.gps.split(',')[1]

      this.setState({ lat, lng })
      this.setGeoBoundary(map, this.state.geoLocalitiesData.geoboundary)
      setupEventListeners(drawingManager, map, {
        setSelection: this.setGeoLocality
      })

      localities = this.state.geoLocalitiesData.delivery_fences
    
      const polygonsCoordiantes = localities.map((geoLocalityData, i) => ({
        coordinates: getCoordinatesInObjects(geoLocalityData.coordinates),
        color: geoLocalityData.is_available ? this.colorMap[i % this.colorMap.length] : '#9b9b9b',
        stroke: geoLocalityData.is_available ? this.colorMap[i % this.colorMap.length] : '#9b9b9b',
        name: geoLocalityData.name
      }))

      const polygons = polygonsCoordiantes.map(polygonCoordiantes => (
        createPolygonFromCoordinates(polygonCoordiantes)
      ))

      this.geoLocalities = polygons
      polygons.forEach((polygon) => {
        displayPolygonOnMap(map, polygon)
        attachClickEventOnPolygon(polygon, () => {
          labelPolygon(map, polygon)
        })
        attachBlurEventOnPolygon(polygon, () => {
          removeLabelFromPolygon(map, polygon)
        })
      })
    }
  }

  fetchFences() {
    Api.fetchFenceList({
      city_id: this.props.match.params.cityId
    })
    .then((response) => {
      this.setState({
        loadingFences: false,
        geoLocalitiesData: response.city_details
      })
    })
    .catch((error) => {
      this.setState({
        loadingFences: false
      })
    })
  }

  render() {
    return (
      <div>
        {
          !this.state.loadingFences && Object.keys(this.state.geoLocalitiesData).length > 0 &&
          <React.Fragment>
            <h3>Localities in {this.state.geoLocalitiesData.name}</h3>
            <Gmaps
              height="600px"
              lat={this.state.lat}
              lng={this.state.lng}
              zoom={this.state.zoomLevel}
              key={this.state.gmapKey}
              params={params}
              onMapCreated={this.handleMapCreation}
            />
          </React.Fragment>
        }
      </div>
    )
  }
}

export default ViewFences;