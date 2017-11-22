import React from 'react'
import { Gmaps } from 'react-gmaps'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import indiaStates from './../constants/india-states'
import '@sass/components/_selectField.scss'

const params = {v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'}

class DefineLocality extends React.Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.state = {
      deleteShapeState: true,
      cityboundary: false,
      lat: props.center.lat,
      lng: props.center.lng,
      polygonName: null,
      localityValue: undefined
    }
    this.polygonPoints = []
    this.selectedShape = null
    this.selectedColor = null
    this.handleMapCreation = this.handleMapCreation.bind(this)
    this.clearSelection = this.clearSelection.bind(this)
    this.setSelection = this.setSelection.bind(this)
    this.deleteSelectedShape = this.deleteSelectedShape.bind(this)
    this.editPolygon = this.editPolygon.bind(this)
    this.configureDrawingManager = this.configureDrawingManager.bind(this)
  }
  setupEventListeners(map) {
    // google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
    //   if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
    //     const radius = event.overlay.getRadius()
    //   }
    // })
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (e) => {
      this.drawingManager.setDrawingMode(null)
      this.drawingManager.setOptions({ drawingControl: false })
      const newShape = e.overlay
      newShape.type = e.type
      this.setSelection(newShape)
      google.maps.event.addListener(newShape, 'click', () => {
        this.setSelection(newShape)
      })
    })
    google.maps.event.addListener(this.drawingManager, 'drawingmode_changed', this.clearSelection)
    google.maps.event.addListener(map, 'click', this.clearSelection)
  }

  clearSelection() {
    if (this.selectedShape) {
      // this.polygonPoints = this.getPolygonPoints(this.selectedShape)]
      this.setState({ deleteShapeState: true })
      this.selectedShape.setEditable(false)
      this.selectedShape = null
    }
  }

  setSelection(shape) {
    // this.clearSelection()
    this.selectedShape = shape
    this.setState({ deleteShapeState: false })
    shape.setEditable(true)
  }

  deleteSelectedShape() {
    this.polygonPoints = []
    if (this.selectedShape) {
      this.selectedShape.setMap(null)
      // To show:
      this.setState({ deleteShapeState: true })
      this.drawingManager.setOptions({
        drawingControl: true
      })
    }
  }

  editPolygon() {
    this.selectedShape.setEditable(true)
  }

  // selectColor(color) {
  //   this.selectedColor = color
  //   console.log(this);
  //   let polygonOptions = this.drawingManager.get('polygonOptions')
  //   polygonOptions.fillColor = color
  //   this.drawingManager.set('polygonOptions', polygonOptions)
  // }

  // setSelectedShapeColor(color) {
  //   if (this.selectedShape) {
  //     if (this.selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
  //       this.selectedShape.set('strokeColor', color)
  //     } else {
  //       this.selectedShape.set('fillColor', color)
  //     }
  //   }
  // }

  getPolygonPoints(polygon) {
    let polygonPoints = []
    for (let i = 0; i < polygon.getPath().getLength(); i += 1) {
      let gps = polygon.getPath().getAt(i)
      polygonPoints.push({ lat: gps.lat(), lng: gps.lng() })
    }
    this.polygonPoints = polygonPoints
    return polygonPoints
  }

  configureDrawingManager(map) {
    const { isLocality } = this.props
    const polyOptions = {
      strokeWeight: 2,
      strokeColor: !isLocality ? '#FF0000' : '#007FFF',
      strokeOpacity: 1.0,
      fillColor: !isLocality ? '#FF0000' : '#007FFF',
      fillOpacity: 0.45,
      editable: true
    }
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      },
      polylineOptions: {
        editable: true
      },
      // rectangleOptions: polyOptions,
      // circleOptions: polyOptions,
      polygonOptions: polyOptions,
      map
    })

    drawingManager.setMap(map)
    this.drawingManager = drawingManager
  }

  createPolygonsFromGPSData(polygonsCoordiantes) {
    const polygons = polygonsCoordiantes.map(polygonCoordiantes =>
      new google.maps.Polygon({
        path: polygonCoordiantes,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        fillColor: 'transparent',
        strokeWeight: 2,
        editable: false
      }))

    return polygons
  }

  displayPolygonsOnMap(map, polygons) {
    polygons.forEach((polygon) => {
      polygon.setMap(map)
    })
  }

  update() {
    const polygonData = {
      name: null,
      gps: {},
      fence: []
    }
  }

  // handleMouseMove(mouseObj) {
  //   const lat = mouseObj.latLng.lat()
  //   const lng = mouseObj.latLng.lng()
  //   const { cityboundary } = this.state
  //   if (lat <= cityboundary.lat && lng <= cityboundary.lng) {
  //     console.log('inside boundary')
  //   } else {
  //     console.log('outside boundary')
  //   }
  // }

  handleMapCreation(map) {

    /**
     * 1. Get coordinates of polygons from backend and create polygons out of it.
     * 2. Configure drwaing manager for creating new polygons.
     * 3. Setup event listeners for creating polygons.
     */
    const { isLocality } = this.props
    const polygonsCoordiantes = [
      [
        { lat: 13.025631437728348, lng: 77.53944396972656 },
        { lat: 12.964077856934454, lng: 77.50476837158203 },
        { lat: 12.902174394671018, lng: 77.63763427734375 }
      ],
      // [
      //   { lat: 12.974783923203109, lng: 77.73719787597656 },
      //   { lat: 13.06075027268141, lng: 77.68810272216797 },
      //   { lat: 13.033993517307401, lng: 77.53189086914062 }
      // ]
    ]

    if (!isLocality) {
      const bounds = new google.maps.LatLngBounds()
      for (let i = 0; i < polygonsCoordiantes[0].length; i += 1) {
        bounds.extend(polygonsCoordiantes[0][i])
      }

      const cityCenterLat = bounds.getCenter().lat()
      const cityCenterLng = bounds.getCenter().lng()

      this.props.setCityCenter({ lat: cityCenterLat, lng: cityCenterLng })
    }

    if (polygonsCoordiantes.length) {
      const polygons = this.createPolygonsFromGPSData(polygonsCoordiantes)
      this.displayPolygonsOnMap(map, polygons)
    }

    // enable drawing only if it's a locality or city boundary doesn't exist
    if (isLocality || (!isLocality && !polygonsCoordiantes.length)) {
      this.configureDrawingManager(map)
      this.setupEventListeners(map)
    }

    const { city } = this.props
    const geocoder = new google.maps.Geocoder()

    geocoder.geocode({
      address: 'Bangalore'
    }, (res, status) => {
      if (status === google.maps.GeocoderStatus.OK && !isLocality) {
        const lat = res[0].geometry.location.lat()
        const lng = res[0].geometry.location.lng()
        this.setState({ lat, lng })
      }
    })

    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true
    })
  }


  render() {
    const { lat, lng } = this.state
    const { zoomLevel } = this.props

    return (
      <div>
        <Gmaps
          width="100%"
          height="600px"
          lat={lat}
          lng={lng}
          zoom={zoomLevel}
          params={params}
          onMapCreated={this.handleMapCreation}
        />
        {/* </Gmaps> */}
        <TextField
          value={this.state.polygonName}
          style={{ marginRight: 12 }}
          hintText={this.props.isLocality ? 'Enter locality name' : 'Enter city boundary name'}
        />
        {
          this.props.isLocality && indiaStates.length
          ? (
            <SelectField
              className="select-locality"
              style={{ marginRight: 12 }}
              floatingLabelText="Select locality"
              value={this.state.localityValue}
              onChange={this.handleChange}
            >
              {
                indiaStates.map((state, i) => {
                  return (
                    <MenuItem
                      value={i + 1}
                      key={`state-${i}`}
                      primaryText={state.name}
                    />
                  )
                })
              }
            </SelectField>
          )
          : ''
        }
        <RaisedButton
          label="Edit city boundary"
          onClick={this.editPolygon}
          style={{ marginRight: 12 }}
        />
        <RaisedButton
          label="Update"
          onClick={() => { console.log(this.getPolygonPoints(this.state.cityboundaryPath)); }}
          style={{ marginRight: 12 }}
        />
      </div>
    )
  }
}

export default DefineLocality
