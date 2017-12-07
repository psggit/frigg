import React from 'react'
import { Gmaps } from 'react-gmaps'
import RaisedButton from 'material-ui/RaisedButton'
// import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// import '@sass/components/_selectField.scss'
import '@sass/components/gmap/infoWindow.scss'
import Dialog from 'material-ui/Dialog'
import CreateNewLocality from './create-new-locality'
import EditLocality from './edit-locality'

import {
  getCoordinatesInObjects,
  getCoordinatesInString,
  displayPolygonOnMap,
  createPolygonFromCoordinates,
  configureDrawingManager,
  setupEventListeners,
  getPolygonPoints,
  labelPolygon
} from './gmap-utils'

const params = { v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso' }

class DefineLocality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lng: null,
      gmapKey: 0,
      stateIdx: 0,
      geoLocalities: [],
      isGeolocalityExist: false,
      shouldMountCreateNewLocality: false,
      shouldMountEditLocality: false,
      isEdit: false,
      isCreate: true
    }

    this.drawingManager = null
    this.handleMapCreation = this.handleMapCreation.bind(this)
    this.updateGeolocality = this.updateGeolocality.bind(this)
    this.setGeoLocality = this.setGeoLocality.bind(this)
    this.clearSelection = this.clearSelection.bind(this)
    this.unmountCreateNewLocalityDialog = this.unmountCreateNewLocalityDialog.bind(this)
    this.unmountEditLocalityDialog = this.unmountEditLocalityDialog.bind(this)
    this.mountEditLocalityDialog = this.mountEditLocalityDialog.bind(this)
    this.changeGmapKey = this.changeGmapKey.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.createNewLocality = this.createNewLocality.bind(this)
    this.submitNewLocality = this.submitNewLocality.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
    this.displayRetailers = this.displayRetailers.bind(this)
  }

  componentDidMount() {
    this.props.viewGeolocalities({
      city_id: this.props.cityId
    })
  }

  updateGeolocality(data) {
    const { stateIdx } = this.state
    const polygonPoints = getPolygonPoints(this.geolocality)
    const coordinatesInString = getCoordinatesInString(polygonPoints)

    this.props.updateGeolocality({
      id: this.props.geoLocalitiesData.fences[stateIdx - 1].id,
      city_id: this.props.cityId,
      coordinates: coordinatesInString,
      name: data.localityName,
      is_active: data.isLocalityActive
    }, this.callbackUpdate)
  }

  handleStateChange(e, k) {
    const { geoLocalitiesData } = this.props
    const stateIdx = k + 1
    this.setState({ stateIdx, isEdit: true })
    if (this.geolocality) {
      this.geolocality.setEditable(false)
    }
    this.geolocality = this.geoLocalities[k]
    this.geolocality.setEditable(true)
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
    this.setState({ shouldMountCreateNewLocality: false })
    this.setState({ shouldMountEditLocality: false })
  }

  changeGmapKey() {
    // To call handleMapCreation method again and set new props
    let x = this.state.gmapKey
    x += 1
    this.setState({ gmapKey: x })
  }

  clearSelection() {
    this.changeGmapKey()
    this.geoboundary.setEditable(false)
  }

  setGeoBoundary(map, geoboundary) {
    const polygonCoordiantes = {
      coordinates: getCoordinatesInObjects(geoboundary),
      color: '#333',
      stroke: 'blue'
    }
    const polygon = createPolygonFromCoordinates(polygonCoordiantes)
    displayPolygonOnMap(map, polygon)
  }

  setGeoLocality(shape) {
    this.newLocality = shape
    this.setState({ shouldMountCreateNewLocality: true })
  }

  mountEditLocalityDialog() {
    this.setState({ shouldMountEditLocality: true })
  }

  createNewLocality() {
    this.drawingManager.setOptions({
      drawingControl: true,
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    })
    if (this.geolocality) {
      this.geolocality.setEditable(false)
      this.geolocality = null
    }
  }

  displayRetailers(map) {
    const { geoLocalitiesData } = this.props
    geoLocalitiesData.retailers.forEach((retailer) => {
      const infoWindow = new google.maps.InfoWindow
      const lat = parseFloat(retailer.gps.split(',')[0])
      const lng = parseFloat(retailer.gps.split(',')[1])
      infoWindow.setContent(`<div style='background-color: #333;color:#fff;padding: 10px'>${retailer.org_name}</div>`)
      infoWindow.setPosition(new google.maps.LatLng(lat, lng))
      infoWindow.open(map)
    })
  }

  unmountCreateNewLocalityDialog() {
    this.setState({ shouldMountCreateNewLocality: false })
  }

  unmountEditLocalityDialog() {
    this.setState({ shouldMountEditLocality: false })
  }

  submitNewLocality(localityName) {
    // debugger;
    const polygonPoints = getPolygonPoints(this.newLocality)
    const coordinatesInString = getCoordinatesInString(polygonPoints)
    this.props.createGeolocality({
      city_id: this.props.cityId,
      coordinates: coordinatesInString,
      name: localityName,
      is_active: true
    }, this.callbackUpdate)
  }

  // getSubmitOrCreate() {
  //   if (this.state.isCreate) {
  //     return (
  //
  //     )
  //   }
  //   return (
  //     <RaisedButton
  //       onClick={this.submitNewLocality}
  //       label="Submit"
  //       style={{ marginRight: 12 }}
  //     />
  //   )
  // }

  // getEditOrCancelButton() {
  //   const { geoLocalitiesData } = this.props
  //   if (this.state.isEdit) {
  //     return (
  //
  //     )
  //   }
  //   return (
  //     <RaisedButton
  //       onClick={this.clearSelection}
  //       label="Cancel edit"
  //       style={{ marginRight: 12 }}
  //     />
  //   )
  // }

  handleMapCreation(map) {
    console.log('handleMapCreation called');
    const colorMap = ['red', 'green', 'blue', 'yellow']
    const { geoLocalitiesData } = this.props
    const lat = geoLocalitiesData.city.gps.split(',')[0]
    const lng = geoLocalitiesData.city.gps.split(',')[1]
    //
    this.setState({ lat, lng })

    // this.displayRetailers(map)

    if (geoLocalitiesData.fences.length) {
      this.setGeoBoundary(map, geoLocalitiesData.city.geoboundary)
      const polygonsCoordiantes = geoLocalitiesData.fences.map((geoLocalityData, i) => ({
        coordinates: getCoordinatesInObjects(geoLocalityData.coordinates),
        color: !geoLocalityData.is_active ? colorMap[i % colorMap.length] : '#9b9b9b',
        stroke: 'transparent',
        name: geoLocalityData.name
      }))

      const polygons =  polygonsCoordiantes.map(polygonCoordiantes => (
        createPolygonFromCoordinates(polygonCoordiantes)
      ))

      this.geoLocalities = polygons
      this.setState({ isGeolocalityExist: true })
      polygons.forEach((polygon) => {
        displayPolygonOnMap(map, polygon)
        // labelPolygon(map, polygon)
      })
      const drawingManager = configureDrawingManager(map)
      this.drawingManager = drawingManager
      setupEventListeners(drawingManager, map, {
        setSelection: this.setGeoLocality
      })
    }

    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true
    })
  }

  render() {
    const { lat, lng, stateIdx } = this.state
    // console.log('render called');
    return (
      <div>
        {
          !this.props.loadingGeolocalities
          ? (
            <div>
              <h3>City localities</h3>
              <Gmaps
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

              <RaisedButton
                disabled={!this.state.isEdit}
                onClick={this.mountEditLocalityDialog}
                label="Edit locality"
                style={{ marginRight: 12 }}
              />

              <RaisedButton
                onClick={this.createNewLocality}
                label="Create new"
                style={{ marginRight: 12 }}
              />

              <SelectField
                style={{ verticalAlign: 'middle', margin: '0 20px' }}
                floatingLabelText="Choose state"
                value={this.state.stateIdx}
                onChange={this.handleStateChange}
              >
                {
                  this.props.geoLocalitiesData.fences.map((locality, i) => (
                    <MenuItem
                      value={i + 1}
                      key={locality.id}
                      primaryText={locality.name}
                    />
                  ))
                }
              </SelectField>

              <RaisedButton
                primary
                onClick={() => { this.props.setActiveMapName('geoboundary') }}
                label="Go to city boundary"
                style={{ marginRight: 12 }}
              />

              {
                this.state.shouldMountCreateNewLocality
                ? (
                  <CreateNewLocality
                    submitNewLocality={this.submitNewLocality}
                    changeGmapKey={this.changeGmapKey}
                    unmountCreateNewLocalityDialog={this.unmountCreateNewLocalityDialog}
                  />
                )
                : ''
              }
              {
                this.state.shouldMountEditLocality
                ? (
                  <EditLocality
                    localityName={this.props.geoLocalitiesData.fences[stateIdx - 1].name}
                    isActive={this.props.geoLocalitiesData.fences[stateIdx - 1].is_active}
                    updateGeolocality={this.updateGeolocality}
                    changeGmapKey={this.changeGmapKey}
                    unmountEditLocalityDialog={this.unmountEditLocalityDialog}
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

export default DefineLocality
