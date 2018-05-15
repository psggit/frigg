const infoWindow = new google.maps.InfoWindow

export function removeLabelFromPolygon(map) {
  infoWindow.close(map)
}

// const defaultPolygonOptions
export function labelPolygon(map, polygon) {
  infoWindow.setContent(polygon.content)
  infoWindow.setPosition(getPolygonCenter(polygon))
  infoWindow.open(map)
}

export function setupEventListeners(drawingManager, map, methods) {
  google.maps.event.addListener(drawingManager, 'overlaycomplete', (e) => {
    drawingManager.setDrawingMode(null)
    drawingManager.setOptions({ drawingControl: false })
    const newShape = e.overlay
    newShape.type = e.type
    methods.setSelection(newShape)
    google.maps.event.addListener(newShape, 'click', () => {
      methods.setSelection(newShape)
    })
  })
  // google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection)
  google.maps.event.addListener(map, 'click', removeLabelFromPolygon)
}

export function attachClickEventOnPolygon(polygon, listener) {
  google.maps.event.addListener(polygon, 'click', listener)
}

export function attachBlurEventOnPolygon(polygon, listener) {
  google.maps.event.addListener(polygon, 'mouseout', listener)
}


export function clearSelection() {
  if (this.selectedShape) {
    this.selectedShape.setEditable(false)
    this.selectedShape = null
  }
}

// export function setSelection(shape) {
//   this.selectedShape = shape
//   shape.setEditable(true)
// }

export function deleteSelectedShape() {
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

export function getPolygonPoints(polygon) {
  let polygonPoints = []
  for (let i = 0; i < polygon.getPath().getLength(); i += 1) {
    let gps = polygon.getPath().getAt(i)
    polygonPoints.push({ lat: gps.lat(), lng: gps.lng() })
  }

  return polygonPoints
}

export function configureDrawingManager(map) {
  const defaultPolyOptions = {
    strokeWeight: 2,
    strokeColor: '#007FFF',
    strokeOpacity: 1.0,
    fillColor: '#007FFF',
    fillOpacity: 0.45,
    editable: true
  }
  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: null,
    drawingControl: false,
    drawingControlOptions: {
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON
      ]
    },
    polylineOptions: {
      editable: true
    },
    polygonOptions: defaultPolyOptions,
    map
  })

  drawingManager.setMap(map)
  return drawingManager
}


export function getPolygonCenter(poly, format = 'latLngObj') {
  let lowx
  let highx
  let lowy
  let highy
  const lats = []
  const lngs = []
  const vertices = poly.getPath()

  for (let i = 0; i < vertices.length; i += 1) {
    lngs.push(vertices.getAt(i).lng());
    lats.push(vertices.getAt(i).lat());
  }

  lats.sort()
  lngs.sort()
  lowx = lats[0]
  highx = lats[vertices.length - 1]
  lowy = lngs[0]
  highy = lngs[vertices.length - 1]
  const center_x = lowx + ((highx - lowx) / 2)
  const center_y = lowy + ((highy - lowy) / 2)
  if (format === 'json') {
    return {
      lat: center_x,
      lng: center_y
    }
  }
  return (new google.maps.LatLng(center_x, center_y))
}

export function createPolygonFromCoordinates(polygonCoordiantes) {
  console.log(polygonCoordiantes.color);
  return new google.maps.Polygon({
    path: polygonCoordiantes.coordinates,
    geodesic: true,
    strokeColor: polygonCoordiantes.stroke,
    strokeOpacity: 1.0,
    fillColor: polygonCoordiantes.color,
    fillOpacity: 0.3,
    strokeWeight: 2,
    content: polygonCoordiantes.name || '',
    editable: false
  })
}

export function getCoordinatesInObjects(coordinatesInString) {
  const points = coordinatesInString.split('~')
  const coordinatesInObjects = points.map((point) => {
    const lat = parseFloat(point.split(',')[0])
    const lng = parseFloat(point.split(',')[1])
    return { lat, lng }
  })

  return coordinatesInObjects
}

export function getCoordinatesInString(coordinatesInObjects) {
  return coordinatesInObjects.map((point) => {
    const pointString = `${point.lat},${point.lng}`
    return pointString
  }).join('~')
}

export function clearPolygonOnMap(map, polygon) {
  polygon.setMap(null)
}

export function displayPolygonOnMap(map, polygon) {
  // polygon.setOptions(options)
  polygon.setMap(map)
}
