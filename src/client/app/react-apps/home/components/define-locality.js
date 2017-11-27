import React from 'react'
import { Gmaps } from 'react-gmaps'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import '@sass/components/_selectField.scss'

const params = {v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'}

class DefineLocality extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: props.center.lat,
      lng: props.center.lng,
      polygonName: '',
      polygonIdx: null
    }
    this.colorMap = ['#FF3B30', '#0083ff', '#020500', 'yellow']
    this.polygonPoints = []
    this.selectedShape = null
    this.selectedColor = null
    this.handleMapCreation = this.handleMapCreation.bind(this)
    this.clearSelection = this.clearSelection.bind(this)
    this.setSelection = this.setSelection.bind(this)
    this.deleteSelectedShape = this.deleteSelectedShape.bind(this)
    this.editPolygon = this.editPolygon.bind(this)
    this.setPolygonName = this.setPolygonName.bind(this)
    this.configureDrawingManager = this.configureDrawingManager.bind(this)
    this.getGmap = this.getGmap.bind(this)
    this.sendMarkerGPS = this.sendMarkerGPS.bind(this)
    this.handleLocalityChange = this.handleLocalityChange.bind(this)
  }

  componentDidMount() {
    if (this.props.fetchLocalities) {
      this.props.fetchLocalities({
        city_id: this.props.city.id
      })
    }
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
      this.selectedShape.setEditable(false)
      this.selectedShape = null
    }
  }

  setSelection(shape) {
    // this.clearSelection()
    this.selectedShape = shape
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

  setPolygonName(e) {
    this.setState({ polygonName: e.target.value })
  }

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
      drawingMode: null,
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
    const polygons = polygonsCoordiantes.map((polygonCoordiantes, i) =>
      new google.maps.Polygon({
        polygonId: i + 1,
        path: polygonCoordiantes,
        geodesic: true,
        strokeColor: '#007FFF',
        strokeOpacity: 1.0,
        fillColor: 'transparent',
        strokeWeight: 2,
        editable: false
      }))

    return polygons
  }

  getCoordinatesInObjects(coordinatesInString) {
    const points = coordinatesInString.split('~')
    const coordinatesInObjects = points.map((point) => {
      const lat = parseFloat(point.split(',')[0])
      const lng = parseFloat(point.split(',')[1])
      return { lat, lng }
    })

    return coordinatesInObjects
  }

  displayPolygonsOnMap(map, polygons) {
    polygons.forEach((polygon, i) => {
      polygon.setMap(map)
      polygon.setOptions({ strokeColor: this.colorMap[i % this.colorMap.length] })
    })
  }

  handleLocalityChange(e, k) {
    if (this.selectedShape) {
      this.selectedShape.setEditable(false)
    }
    this.selectedShape = this.polygons[k]
    this.selectedShape.setEditable(true)
    this.setState({ polygonIdx: k + 1 })
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

    // TODO:
    // 1. City boundary
    // Set this.selectedShape = cityboundary if cityboundary is there
    // 2. this.selectedShape = select locality from dropdown

    /**
     * 1. Get coordinates of polygons from backend and create polygons out of it.
     * 2. Configure drwaing manager for creating new polygons.
     * 3. Setup event listeners for creating polygons.
     */
    const { isLocality, city, localities } = this.props

    // const polygonsCoordiantes = [
    //   [
    //     { lat: 13.025631437728348, lng: 77.53944396972656 },
    //     { lat: 12.964077856934454, lng: 77.50476837158203 },
    //     { lat: 12.902174394671018, lng: 77.63763427734375 }
    //   ],
    //   [
    //     { lat: 12.974783923203109, lng: 77.73719787597656 },
    //     { lat: 13.06075027268141, lng: 77.68810272216797 },
    //     { lat: 13.033993517307401, lng: 77.53189086914062 }
    //   ]
    // ]

    const lat = city.gps.split(',')[0]
    const lng = city.gps.split(',')[1]
    const center = { lat, lng }
    this.props.setCityCenter(center)
    if (isLocality) {
      // calculate center of city boundary and set as map center for locality
      // const bounds = new google.maps.LatLngBounds()
      // for (let i = 0; i < polygonsCoordiantes[0].length; i += 1) {
      //   bounds.extend(polygonsCoordiantes[0][i])
      // }
      //
      // const cityCenterLat = bounds.getCenter().lat()
      // const cityCenterLng = bounds.getCenter().lng()
      const polygonsCoordiantes = localities.map(locality => (
        this.getCoordinatesInObjects(locality.coordinates)
      ))

      const polygons = this.createPolygonsFromGPSData(polygonsCoordiantes)
      this.polygons = polygons
      this.displayPolygonsOnMap(map, polygons)
    }

    // enable drawing only if it's a locality or city boundary doesn't exist
    if (isLocality || (!isLocality && !city.geoboundary)) {
      this.configureDrawingManager(map)
      this.setupEventListeners(map)
    }

    const geocoder = new google.maps.Geocoder()

    // geocoder for locating city on map
    geocoder.geocode({
      address: city.name
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

  getGmap() {
    const { lat, lng } = this.state
    const { zoomLevel } = this.props
    const { isLocality, loadingLocalites, localities } = this.props
    const Gmap = (
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
        {
          this.props.isLocality
          ? (
            <TextField
              onChange={this.setPolygonName}
              value={this.state.polygonName}
              style={{ marginRight: 12 }}
              hintText='Enter locality name'
            />
          )
          : ''
        }

        {
          this.props.isLocality
          ? (
            <SelectField
              value={this.state.polygonIdx}
              className="select-locality"
              style={{ marginRight: 12 }}
              floatingLabelText="Select locality"
              onChange={this.handleLocalityChange}
            >
              {
                localities.map((locality, i) => {
                  return (
                    <MenuItem
                      value={i + 1}
                      key={`state-${i}`}
                      primaryText={locality.name}
                    />
                  )
                })
              }
            </SelectField>
          )
          : ''
        }
        <br />
        {/* <RaisedButton
          disabled={!canEditPolygon}
          label="Edit city boundary"
          onClick={this.editPolygon}
          style={{ marginRight: 12, marginTop: 12 }}
        /> */}
        <RaisedButton
          label="Update"
          style={{ marginRight: 12 }}
        />
      </div>
    )

    if (!isLocality) {
      return Gmap
    } else {
      if (!loadingLocalites) {
        return Gmap
      }
      return <h2>Loading</h2>
    }
  }

  render() {
    return (
      this.getGmap()
    )
  }
}

export default DefineLocality
