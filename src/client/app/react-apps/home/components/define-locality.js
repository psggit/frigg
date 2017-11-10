import React from 'react'
import { Gmaps } from 'react-gmaps'

class DefineLocality extends React.Component {
  constructor() {
    super()
    this.polygonPoints = []
    this.selectedShape = null
    this.selectedColor = null
    this.handleMapCreation = this.handleMapCreation.bind(this)
    this.clearSelection = this.clearSelection.bind(this)
  }
  setupEventListeners(map) {
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
      if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
        const radius = event.overlay.getRadius()
      }
    })
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (e) => {
      if (e.type != google.maps.drawing.OverlayType.MARKER) {
        // Switch back to non-drawing mode after drawing a shape.
        this.drawingManager.setDrawingMode(null)
        // To hide:
        this.drawingManager.setOptions({
          drawingControl: false
        })
        // Add an event listener that selects the newly-drawn shape when the user
        // mouses down on it.
        let newShape = e.overlay
        newShape.type = e.type
        google.maps.event.addListener(newShape, 'click', () => {
          this.setSelection(newShape)
        })
        this.setSelection(newShape)
      }
    })
  // Clear the current selection when the drawing mode is changed, or when the
  // map is clicked.
    google.maps.event.addListener(this.drawingManager, 'drawingmode_changed', this.clearSelection)
    google.maps.event.addListener(map, 'click', this.clearSelection)
    // google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', this.deleteSelectedShape)
  // buildColorPalette()
  }
  clearSelection() {
    console.log(this);
    if (this.selectedShape) {
      this.polygonPoints = this.getPolygonPoints(this.selectedShape)
      console.log("Polygonpoints", this.polygonPoints)
      // send polygonpoints to server here
      this.selectedShape.setEditable(false)
      this.selectedShape = null
    }
  }

  setSelection(shape) {
    this.clearSelection()
    this.selectedShape = shape
    // console.log(this);
    shape.setEditable(true)
    this.selectColor('#333')
  }

  deleteSelectedShape() {
    this.polygonPoints = []
    if (this.selectedShape) {
      this.selectedShape.setMap(null)
      // To show:
      this.drawingManager.setOptions({
        drawingControl: true
      })
    }
  }

  selectColor(color) {
    this.selectedColor = color
    console.log(this);
    let polygonOptions = this.drawingManager.get('polygonOptions')
    polygonOptions.fillColor = color
    this.drawingManager.set('polygonOptions', polygonOptions)
  }

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
    const polyOptions = {
      strokeWeight: 0,
      fillOpacity: 0.45,
      editable: true
    }
    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControlOptions: {
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      },
      polylineOptions: {
        editable: true
      },
      rectangleOptions: polyOptions,
      circleOptions: polyOptions,
      polygonOptions: polyOptions,
      map
    })
    drawingManager.setMap(map)
    this.drawingManager = drawingManager
    this.setupEventListeners(map)
  }

  handleMapCreation(map) {
    console.log(map)
    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true
    })
    this.configureDrawingManager(map)
  }

  render() {
    const coords = {
      lat: 25.774,
      lng: -80.190
    }
    return (
      <Gmaps
        width={'100%'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={14}
        onMapCreated={this.handleMapCreation}
      >

      </Gmaps>
    )
  }
}

export default DefineLocality