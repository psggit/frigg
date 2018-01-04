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
import LocalityLegends from './locality-legends'

import {
  getCoordinatesInObjects,
  getCoordinatesInString,
  displayPolygonOnMap,
  createPolygonFromCoordinates,
  configureDrawingManager,
  setupEventListeners,
  getPolygonPoints,
  getPolygonCenter,
  attachBlurEventOnPolygon,
  attachClickEventOnPolygon,
  removeLabelFromPolygon,
  labelPolygon
} from './gmap-utils'

const params = { v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso' }

class DefineLocality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lng: null,
      zoomLevel: props.zoomLevel,
      gmapKey: 0,
      // selectedLegend: -1,
      stateIdx: 0,
      geoLocalities: [],
      isGeolocalityExist: false,
      shouldMountCreateNewLocality: false,
      shouldMountEditLocality: false,
      isEdit: true,
      isCreate: true
    }

    this.colorMap = ['#e04e73', '#6ecc80', '#4d9fbc', '#c3ce63']
    this.drawingManager = null
    this.handleMapCreation = this.handleMapCreation.bind(this)
    this.updateFence = this.updateFence.bind(this)
    this.setGeoLocality = this.setGeoLocality.bind(this)
    this.setGeoBoundary = this.setGeoBoundary.bind(this)
    this.clearSelection = this.clearSelection.bind(this)
    this.unmountCreateNewLocalityDialog = this.unmountCreateNewLocalityDialog.bind(this)
    this.unmountEditLocalityDialog = this.unmountEditLocalityDialog.bind(this)
    this.mountEditLocalityDialog = this.mountEditLocalityDialog.bind(this)
    this.changeGmapKey = this.changeGmapKey.bind(this)
    // this.handleStateChange = this.handleStateChange.bind(this)
    this.createNewLocality = this.createNewLocality.bind(this)
    this.submitNewLocality = this.submitNewLocality.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
    this.displayRetailers = this.displayRetailers.bind(this)
    this.highlightFence = this.highlightFence.bind(this)
    this.unHighlightFence = this.unHighlightFence.bind(this)
    this.focusFence = this.focusFence.bind(this)
    this.editGeolocality = this.editGeolocality.bind(this)
    this.getEditOrCancelButton = this.getEditOrCancelButton.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    if (this.props.cityId) {
      this.props.viewGeolocalities({
        city_id: this.props.cityId,
        offset: 0,
        limit: 50,
        is_available: false,
        no_filter: false
      })
    }
  }

  updateFence(data) {
    const { stateIdx, fenceIdx } = this.state
    const { geoLocalitiesData } = this.props
    const polygonPoints = getPolygonPoints(this.geoLocalities[0])
    const coordinatesInString = getCoordinatesInString(polygonPoints)

    this.props.updateGeolocality({
      id: geoLocalitiesData.fences[fenceIdx].id,
      city_id: this.props.cityId,
      coordinates: coordinatesInString,
      name: geoLocalitiesData.fences[fenceIdx].name,
      is_available: geoLocalitiesData.fences[fenceIdx].is_active
    }, this.callbackUpdate)
  }

  getData() {
    if (this.geoLocalities[0]) {
      const polygonPoints = getPolygonPoints(this.geoLocalities[0])
      const coordinatesInString = getCoordinatesInString(polygonPoints)
      return coordinatesInString
    }
    return null
  }

  // handleStateChange(e, k) {
  //   const stateIdx = k + 1
  //   this.setState({ stateIdx, isEdit: true })
  //   if (this.geolocality) {
  //     this.geolocality.setEditable(false)
  //   }
  //   this.geolocality = this.geoLocalities[k]
  //   this.geolocality.setEditable(true)
  // }

  editGeolocality() {
    this.geoLocalities[0].setEditable(true)
    this.setState({ isEdit: false })
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
    this.setState({ isEdit: false })
  }

  changeGmapKey() {
    // To call handleMapCreation method again and set new props
    let x = this.state.gmapKey
    x += 1
    this.setState({ gmapKey: x })
  }

  clearSelection() {
    this.setState({ isEdit: true })
    this.changeGmapKey()
    this.geoLocalities[0].setEditable(false)
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
    this.setState({ shouldMountCreateNewLocality: true })
  }

  mountEditLocalityDialog() {
    this.setState({ shouldMountEditLocality: true })
  }

  createNewLocality() {
    this.drawingManager.setOptions({
      drawingControl: true,
      drawingMode: null
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

  highlightFence(fenceIdx) {
    this.geoLocalities[fenceIdx].setOptions({
      strokeColor: '#FF3B30'
    })
  }

  // highLightLegend(i) {
  //   this.setState({ selectedLegend: i })
  // }

  focusFence(fenceIdx) {
    const gps = getPolygonCenter(this.geoLocalities[fenceIdx], 'json')
    const { lat, lng } = gps
    if (this.geolocality) {
      this.geolocality.setEditable(false)
    }
    this.setState({
      lat,
      lng,
      zoomLevel: 14,
      isEdit: false
    })
  }

  unHighlightFence(fenceIdx) {
    this.geoLocalities[fenceIdx].setOptions({
      strokeColor: 'transparent'
    })
  }

  submitNewLocality(data) {
    // debugger;
    const polygonPoints = getPolygonPoints(this.newLocality)
    const coordinatesInString = getCoordinatesInString(polygonPoints)
    this.props.createGeolocality({
      city_id: this.props.cityId,
      coordinates: coordinatesInString,
      name: data.localityName,
      is_available: data.isLocalityActive
    }, this.callbackUpdate)

    this.unmountCreateNewLocalityDialog()
  }

  getEditOrCancelButton() {
    if (this.state.isEdit) {
      return (
        <RaisedButton
          onClick={this.editGeolocality}
          label="Edit locality"
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
    const { geoLocalitiesData, localityId } = this.props
    let localities = geoLocalitiesData.fences
    const lat = geoLocalitiesData.city.gps.split(',')[0]
    const lng = geoLocalitiesData.city.gps.split(',')[1]
    //
    this.setState({ lat, lng })

    if (localityId) {
      localities = localities.filter(locality => locality.id === localityId)
    } else {
      const drawingManager = configureDrawingManager(map)
      this.drawingManager = drawingManager

      setupEventListeners(drawingManager, map, {
        setSelection: this.setGeoLocality
      })
      this.createNewLocality()
    }

    if (geoLocalitiesData.city.geoboundary) {
      this.setGeoBoundary(map, geoLocalitiesData.city.geoboundary)
    }

    if (geoLocalitiesData.fences.length) {
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

  render() {
    const { lat, lng, stateIdx } = this.state

    const { geoLocalitiesData } = this.props
    return (
      <div>
        {
          !this.props.loadingGeolocalities || !this.props.cityId
          ? (
            <div>
              {/* <LocalityLegends
                colors={this.colorMap}
                focusFence={this.focusFence}
                unHighlightFence={this.unHighlightFence}
                highlightFence={this.highlightFence}
                editGeoboundary={this.editGeoboundary}
                legends={this.props.geoLocalitiesData.fences}
              /> */}
              <h3>Localities in {geoLocalitiesData.city.name}</h3>
              <Gmaps
                // style={{right: '-100px'}}
                height="600px"
                lat={lat}
                lng={lng}
                zoom={this.state.zoomLevel}
                key={this.state.gmapKey}
                params={params}
                onMapCreated={this.handleMapCreation}
              />

              <br />

              <div /* style={{marginLeft: '100px'}} */>
                {
                  this.props.localityId
                  ? this.getEditOrCancelButton()
                  : ''
                }


              </div>

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
