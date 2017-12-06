import React from 'react'
import { Gmaps } from 'react-gmaps'
import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'
// import SelectField from 'material-ui/SelectField'
// import MenuItem from 'material-ui/MenuItem'
// import '@sass/components/_selectField.scss'
import '@sass/components/gmap/infoWindow.scss'

import {
  getCoordinatesInObjects,
  getCoordinatesInString,
  displayPolygonOnMap,
  createPolygonFromCoordinates,
  configureDrawingManager,
  setupEventListeners,
  getPolygonPoints
} from './gmap-utils'

const params = { v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso' }

class DefineLocality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lng: null,
      gmapKey: 0,
      isGeoBoundaryExist: false,
      isEdit: true
    }

    this.drawingManager = null
    this.infoWindow = new google.maps.InfoWindow
    this.handleMapCreation = this.handleMapCreation.bind(this)
    this.handleUpdateGeoboundary = this.handleUpdateGeoboundary.bind(this)
    this.setGeoBoundary = this.setGeoBoundary.bind(this)
    this.editGeoboundary = this.editGeoboundary.bind(this)
    this.clearSelection = this.clearSelection.bind(this)
    this.getEditOrCancelButton = this.getEditOrCancelButton.bind(this)
    this.changeGmapKey = this.changeGmapKey.bind(this)
  }

  componentDidMount() {
    this.props.viewGeoboundary({
      city_id: this.props.city.id
    })
  }

  handleUpdateGeolocality() {
    const { city } = this.props
    const polygonPoints = getPolygonPoints(this.geoboundary)
    const coordinatesInString = getCoordinatesInString(polygonPoints)

    this.props.updateGeoboundary({
      id: city.id,
      geoboundary: coordinatesInString,
    }, this.changeGmapKey)
  }

  // enableViewMode() {
  //   this.geoboundary.setEditable(false)
  //   if (this.drawingManager) {
  //     this.drawingManager.setOptions({
  //       drawingControl: false
  //     })
  //   }
  // }

  changeGmapKey() {
    // To call handleMapCreation method again and set new props
    let x = this.state.gmapKey
    x += 1
    this.setState({ gmapKey: x, isEdit: true })
  }

  clearSelection() {
    this.changeGmapKey()
    this.geoboundary.setEditable(false)
  }

  editGeoboundary() {
    this.geoboundary.setEditable(true)
    this.setState({ isEdit: false })
  }

  setGeoLocality(shape) {
    this.geoboundary = shape
  }

  getEditOrCancelButton() {
    if (this.state.isEdit) {
      return (
        <RaisedButton
          onClick={this.editGeoboundary}
          label="Edit geoboundary"
          style={{ marginRight: 12 }}
        />
      )
    }
    return (
      <RaisedButton
        onClick={this.clearSelection}
        label="Cancel edit"
        style={{ marginRight: 12 }}
      />
    )
  }

  handleMapCreation(map) {
    console.log('handleMapCreation called');
    const { geoLocalitiesData } = this.props
    const lat = geoLocalitiesData.gps.split(',')[0]
    const lng = geoLocalitiesData.gps.split(',')[1]

    this.setState({ lat, lng })

    // if (geoLocalitiesData.coordinates.length) {
      // show geoboundary
      const polygonsCoordiantes = geoLocalitiesData.map(geoLocalityData => (
        getCoordinatesInObjects(geoLocalityData.coordinates)
      ))
      const polygons =  polygonsCoordiantes.map(polygonCoordiantes => (
        createPolygonFromCoordinates(polygonCoordiantes)
      ))
      // this.geoboundary = polygon
      // this.setState({ isGeoExist: true })
      polygons.forEach(polygon => (
        displayPolygonOnMap(map, polygon)
      ))
      const drawingManager = configureDrawingManager(map)
      this.drawingManager = drawingManager
      setupEventListeners(drawingManager, map, this.setGeoLocality)
    // } else {
    //   //  create new geoboundary
    //   const drawingManager = configureDrawingManager(map)
    //   this.drawingManager = drawingManager
    //   setupEventListeners(drawingManager, map, this.setGeoBoundary)
    // }

    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true
    })
  }

  render() {
    const { lat, lng } = this.state
    // console.log('render called');
    return (
      <div>
        {
          !this.props.loadingGeolocalities
          ? (
            <div>
              <Gmaps
                width="100%"
                height="600px"
                lat={lat}
                lng={lng}
                zoom={13}
                key={this.state.gmapKey}
                params={params}
                onMapCreated={this.handleMapCreation}
              />

              <br />

              <RaisedButton
                onClick={this.handleUpdateGeolocality}
                label="Update"
                style={{ marginRight: 12 }}
              />

              {
                this.state.isGeoBoundaryExist
                ? this.getEditOrCancelButton()
                : ''
              }

              <RaisedButton
                primary
                onClick={() => { this.props.setActiveMapName('geoboundary') }}
                label="Go to Geoboundary"
                style={{ marginRight: 12 }}
              />
            </div>
          )
          : 'loading..'
        }
      </div>
    )
  }
}

export default DefineLocality
