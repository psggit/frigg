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
  getPolygonPoints,
  clearPolygonOnMap
} from './gmap-utils'

const params = { v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso' }

class DefineGeoboundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lat: props.lat || 20.7685215,
      lng: props.lng || 73.7225677,
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
    this.clearGeoboundary = this.clearGeoboundary.bind(this)
    this.setCenter = this.setCenter.bind(this)
    this.getCenter = this.getCenter.bind(this)
  }

  // componentDidMount() {
  //   if (this.props.cityId) {
  //     this.props.fetchCityDetails({
  //       id: this.props.cityId
  //     })
  //     this.props.setLoadingState('loadingGeoboundary')
  //   }
  // }

  getCoordinates() {
    if (this.geoboundary) {
      const polygonPoints = getPolygonPoints(this.geoboundary)
      const coordinatesInString = getCoordinatesInString(polygonPoints)
      return coordinatesInString
    }
    return null
  }

  getCenter() {
    return `${this.state.lat},${this.state.lng}`
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

  setCenter(gps) {
    this.setState({ lat: gps.lat, lng: gps.lng, zoomLevel: 12 })
    const cityGPS = new google.maps.LatLng(parseFloat(gps.lat), parseFloat(gps.lng))
    this.map.setCenter(cityGPS)
    this.marker.setPosition(cityGPS)
    this.marker.setMap(this.map)
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
    if (this.geoboundary) {
      this.geoboundary.setEditable(false)
      this.geoboundary = null
    }
  }

  clearGeoboundary() {
    clearPolygonOnMap(this.map, this.geoboundary)
    this.createNewBoundary()
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
    // this.setState({ isSubmit: true })
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
    const drawingManager = configureDrawingManager(map)
    this.drawingManager = drawingManager

    this.marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP
    })

    google.maps.event.addListener(this.marker, 'dragend', () => {
      const newCityGPS = {
        lat: this.marker.getPosition().lat().toFixed(6),
        lng: this.marker.getPosition().lng().toFixed(6)
      }
      this.setState(newCityGPS)
      this.props.setCityGPSInputFromMarker(newCityGPS)
    })

    if (cityId) {
      // show geoboundary
      const lat = cityDetails.gps.split(',')[0]
      const lng = cityDetails.gps.split(',')[1]
      // console.log();
      this.setCenter({ lat, lng })

      const cityGPS = new google.maps.LatLng(parseFloat(lat), parseFloat(lng))
      // this.map.setCenter(cityGPS)
      this.marker.setPosition(cityGPS)
      this.marker.setMap(this.map)
      this.marker.setDraggable(false)
      const polygonCoordiantes = {
        coordinates: cityDetails.geoboundary ? getCoordinatesInObjects(cityDetails.geoboundary) : [],
        color: '#333',
        stroke: 'blue'
      }
      const polygon = createPolygonFromCoordinates(polygonCoordiantes)
      this.geoboundary = polygon
      setupEventListeners(drawingManager, map, {
        setSelection: this.setGeoBoundary
      })
      // this.setState({ isGeoBoundaryExist: true })
      displayPolygonOnMap(map, polygon)
    } else {
      const defaultCityGPS = new google.maps.LatLng(20.7685215, 73.7225677)
      this.marker.setPosition(defaultCityGPS)
      this.marker.setMap(this.map)
      setupEventListeners(drawingManager, map, {
        setSelection: this.setGeoBoundary
      })
      this.createNewBoundary()
    }
  }

  render() {
    const { lat, lng } = this.state
    console.log(this.props.cityId);
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
              />

              <br />

              {/* {
                this.props.cityId
                ? this.getEditOrCancelButton()
                : ''
              } */}

              {/* {
                !this.props.cityId
                ? (
                  <RaisedButton
                    onClick={this.clearSelection}
                    label="Cancel"
                    style={{ marginRight: 12 }}
                  />
                )
                : ''
              } */}


            </div>
          )
          : 'loading..'
        }
      </div>
    )
  }
}

export default DefineGeoboundary
