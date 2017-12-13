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
      lat: null,
      lng: null,
      gmapKey: 0,
      // isGeoBoundaryExist: false,
      isEdit: true,
      isSubmit: false
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
  }

  componentDidMount() {
    this.props.fetchCityDetails({
      id: this.props.cityId
    })
    this.props.setLoadingState('loadingGeoboundary')
  }

  handleUpdateGeoboundary() {
    const polygonPoints = getPolygonPoints(this.geoboundary)
    const coordinatesInString = getCoordinatesInString(polygonPoints)
    // this.setState({ goToButtonDisabled: true })
    this.props.setLoadingState('loadingGeoboundary')
    this.props.updateGeoboundary({
      id: this.props.cityId,
      geoboundary: coordinatesInString,
    }, this.callbackUpdate)
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
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    })
    if (this.geolocality) {
      this.geolocality.setEditable(false)
      this.geolocality = null
    }
  }

  clearSelection() {
    this.changeGmapKey()
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

  handleMapCreation(map) {
    console.log('handleMapCreation called');
    const { cityDetails, mode } = this.props
    // console.log(geoBoundaryData);
    const lat = cityDetails.gps.split(',')[0]
    const lng = cityDetails.gps.split(',')[1]

    this.setState({ lat, lng })

    if (mode === 'edit') {
      // show geoboundary
      const polygonCoordiantes = {
        coordinates: getCoordinatesInObjects(cityDetails.geoboundary),
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
          !this.props.loadingCityDetails
          ? (
            <div>
              <h3>City boundary</h3>
              <Gmaps
                style={{ position: 'relative' }}
                width="100%"
                height="600px"
                lat={lat}
                lng={lng}
                zoom={11}
                key={this.state.gmapKey}
                params={params}
                onMapCreated={this.handleMapCreation}
              />

              <br />

              {
                this.props.mode === 'create'
                ? (
                  <RaisedButton
                    disabled={!this.state.isSubmit}
                    onClick={this.handleUpdateGeoboundary}
                    label="Submit"
                    style={{ marginRight: 12 }}
                  />
                )
                : ''
              }

              {
                this.props.mode === 'edit'
                ? (
                  <RaisedButton
                    onClick={this.handleUpdateGeoboundary}
                    label="Update"
                    style={{ marginRight: 12 }}
                  />
                )
                : ''
              }


              {
                this.props.mode === 'edit'
                ? this.getEditOrCancelButton()
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
