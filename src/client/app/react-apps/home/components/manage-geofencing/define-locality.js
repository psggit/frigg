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
      isEdit: false,
      isCreate: true
    }

    this.colorMap = ['#e04e73', '#6ecc80', '#4d9fbc', '#c3ce63']
    this.drawingManager = null
    this.handleMapCreation = this.handleMapCreation.bind(this)
    this.updateFence = this.updateFence.bind(this)
    this.setGeoLocality = this.setGeoLocality.bind(this)
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
    this.editGeoboundary = this.editGeoboundary.bind(this)
    // this.highLightLegend = this.highLightLegend.bind(this)
  }

  componentDidMount() {
    this.props.viewGeolocalities({
      city_id: this.props.cityId
    })
  }

  updateFence(data) {
    const { stateIdx, fenceIdx } = this.state
    const { geoLocalitiesData } = this.props
    const polygonPoints = getPolygonPoints(this.geolocality)
    const coordinatesInString = getCoordinatesInString(polygonPoints)

    this.props.updateGeolocality({
      id: geoLocalitiesData.fences[fenceIdx].id,
      city_id: this.props.cityId,
      coordinates: coordinatesInString,
      name: geoLocalitiesData.fences[fenceIdx].name,
      is_active: geoLocalitiesData.fences[fenceIdx].is_active
    }, this.callbackUpdate)
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

  editGeoboundary(fenceIdx) {
    this.setState({ isEdit: true, fenceIdx })
    if (this.geolocality) {
      this.geolocality.setEditable(false)
    }
    this.geolocality = this.geoLocalities[fenceIdx]
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

  handleMapCreation(map) {
    console.log('handleMapCreation called');
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
        color: geoLocalityData.is_active ? this.colorMap[i % this.colorMap.length] : '#9b9b9b',
        stroke: 'transparent',
        name: geoLocalityData.name
      }))

      const polygons =  polygonsCoordiantes.map(polygonCoordiantes => (
        createPolygonFromCoordinates(polygonCoordiantes)
      ))

      this.geoLocalities = polygons
      this.setState({ isGeolocalityExist: true })
      polygons.forEach((polygon, i) => {
        displayPolygonOnMap(map, polygon)
        attachClickEventOnPolygon(polygon, () => {
          labelPolygon(map, polygon)
        })
        attachBlurEventOnPolygon(polygon, () => {
          removeLabelFromPolygon(map, polygon)
        })
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
              <LocalityLegends
                colors={this.colorMap}
                focusFence={this.focusFence}
                unHighlightFence={this.unHighlightFence}
                highlightFence={this.highlightFence}
                editGeoboundary={this.editGeoboundary}
                legends={this.props.geoLocalitiesData.fences}
              />
              <h3 style={{marginLeft: '100px'}}>City localities</h3>
              <Gmaps
                style={{right: '-100px'}}
                height="600px"
                lat={lat}
                lng={lng}
                zoom={this.state.zoomLevel}
                key={this.state.gmapKey}
                params={params}
                onMapCreated={this.handleMapCreation}
              />

              <br />

              <div style={{marginLeft: '100px'}}>
                <RaisedButton
                  disabled={!this.state.isEdit}
                  onClick={this.updateFence}
                  label="Update changes"
                  style={{ marginRight: 12 }}
                />

                <RaisedButton
                  onClick={this.createNewLocality}
                  label="Create new"
                  style={{ marginRight: 12 }}
                />

                {/* <SelectField
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
                </SelectField> */}

                <RaisedButton
                  primary
                  onClick={() => { this.props.setActiveMapName('geoboundary') }}
                  label="Go to city boundary"
                  style={{ marginRight: 12 }}
                />
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
