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

class DefineGeoboundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 13.278709268693333,
      lng: 77.80792236328125,
      gmapKey: 0,
      isEdit: true,
      isSubmit: false,
      zoomLevel: props.zoomLevel || 7
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
    this.createNewBoundary = this.createNewBoundary.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
    this.setGPSUsingGeocoder = this.setGPSUsingGeocoder.bind(this)
    this.handleZoomChange = this.handleZoomChange.bind(this)
    this.handleCenterChange = this.handleCenterChange.bind(this)
  }

  componentDidMount() {
    if (this.props.cityId) {
      this.props.fetchCityDetails({
        id: this.props.cityId
      })
      this.props.setLoadingState('loadingGeoboundary')
    }
  }

  getData() {
    if (this.geoboundary) {
      const polygonPoints = getPolygonPoints(this.geoboundary)
      const coordinatesInString = getCoordinatesInString(polygonPoints)
      return coordinatesInString
    }
    return null
  }

  handleUpdateGeoboundary() {
    const polygonPoints = getPolygonPoints(this.geoboundary)
    const coordinatesInString = getCoordinatesInString(polygonPoints)
    // this.setState({ goToButtonDisabled: true })
    // this.props.setLoadingState('loadingGeoboundary')
    // this.props.updateGeoboundary({
    //   id: this.props.cityId,
    //   geoboundary: coordinatesInString,
    // }, this.callbackUpdate)
  }

  // enableViewMode() {
  //   this.geoboundary.setEditable(false)
  //   if (this.drawingManager) {
  //     this.drawingManager.setOptions({
  //       drawingControl: false
  //     })
  //   }
  // }

  callbackUpdate() {
    this.changeGmapKey()
    // setTimeout(() => {
    //   location.href = '/home/manage-cities'
    // })
  }

  changeGmapKey() {
    // To call handleMapCreation method again and set new props
    let x = this.state.gmapKey
    x += 1
    this.setState({ gmapKey: x, isEdit: true })
  }

  createNewBoundary() {
    this.drawingManager.setOptions({
      drawingControl: true,
      drawingMode: null
    })
    if (this.geolocality) {
      this.geolocality.setEditable(false)
      this.geolocality = null
    }
  }

  clearSelection() {
    this.changeGmapKey()
    this.setState({ isSubmit: false })
    this.geoboundary.setEditable(false)
  }

  editGeoboundary() {
    this.geoboundary.setEditable(true)
    this.setState({ isEdit: false })
  }

  setGeoBoundary(shape) {
    this.geoboundary = shape
    this.setState({ isSubmit: true })
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

  setGPSUsingGeocoder(address) {
    console.log('fefef');
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ address }, (res, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const lat = res[0].geometry.location.lat()
        const lng = res[0].geometry.location.lng()
        this.setState({ lat, lng })
      }
    })
  }

  handleZoomChange() {
    const { zoomLevel } = this.state
    const newZoome = this.map.getZoom()
    // console.log(newZoome, zoom)
    if (zoomLevel !== newZoome) {
      // console.log('changed')
      this.setState({ zoomLevel: newZoome })
    }
  }

  handleCenterChange() {
    const { lat, lng } = this.state
    const center = this.map.getCenter()

    if (lat !== center.lat() || lng !== center.lng()) {
      this.setState({ lat: center.lat(), lng: center.lng() })
    }
  }

  handleMapCreation(map) {
    console.log('handleMapCreation called');
    const { cityDetails, cityId, cityName } = this.props
    this.map = map
    // this.setGPSUsingGeocoder(cityName)

    if (cityId) {
      // show geoboundary
      const lat = cityDetails.gps.split(',')[0]
      const lng = cityDetails.gps.split(',')[1]

      this.setState({ lat, lng })

      const polygonCoordiantes = {
        coordinates: cityDetails.geoboundary ? getCoordinatesInObjects(cityDetails.geoboundary) : [],
        color: '#333',
        stroke: 'blue'
      }
      const polygon = createPolygonFromCoordinates(polygonCoordiantes)
      this.geoboundary = polygon
      // this.setState({ isGeoBoundaryExist: true })
      displayPolygonOnMap(map, polygon)
    } else {
      //  create new geoboundary
      // this.setState({ newBoundaryPrompt: true })
      const drawingManager = configureDrawingManager(map)
      this.drawingManager = drawingManager
      setupEventListeners(drawingManager, map, {
        setSelection: this.setGeoBoundary
      })
      this.createNewBoundary()
    }
  }

  render() {
    const { lat, lng } = this.state
    // console.log('render called');
    return (
      <div>
        {
          !this.props.loadingCityDetails || !this.props.cityId
          ? (
            <div>
              <h3>City boundary</h3>
              <Gmaps
                style={{ position: 'relative' }}
                width="100%"
                height="600px"
                lat={lat}
                lng={lng}
                zoom={this.state.zoomLevel}
                key={this.state.gmapKey}
                params={params}
                onMapCreated={this.handleMapCreation}
                onZoomChanged={this.handleZoomChange}
                onCenterChanged={this.handleCenterChange}
              />

              <br />

              {/* {
                !this.props.cityId
                ? (
                  <RaisedButton
                    disabled={!this.state.isSubmit}
                    onClick={this.props.update}
                    label="Submit"
                    style={{ marginRight: 12 }}
                  />
                )
                : ''
              }

              {
                this.props.cityId
                ? (
                  <RaisedButton
                    onClick={this.props.update}
                    label="Update"
                    style={{ marginRight: 12 }}
                  />
                )
                : ''
              } */}


              {
                this.props.cityId
                ? this.getEditOrCancelButton()
                : ''
              }

              {
                !this.props.cityId
                ? (
                  <RaisedButton
                    onClick={this.clearSelection}
                    label="Cancel"
                    style={{ marginRight: 12 }}
                  />
                )
                : ''
              }


            </div>
          )
          : 'loading..'
        }
      </div>
    )
  }
}

export default DefineGeoboundary
