import { GET, POST } from '@utils/fetch'

export const fetchStates = action => (
  POST({
    api: '/stateManagement/listStates',
    apiBase: 'odin',
    type: 'Public'
  })
    .then(json => json)
)

export const fetchCities = action => (
  POST({
    api: '/cityManagement/listCities',
    apiBase: 'odin',
    type: 'Public',
    data: action.data
  })
    .then(json => json)
)

export const createState = action => (
  POST({
    api: '/stateManagement/createState',
    apiBase: 'odin',
    type: 'Public',
    data: action.data
  })
    .then(json => json)
)

export const updateState = action => (
  POST({
    api: '/stateManagement/updateState',
    apiBase: 'odin',
    type: 'Public',
    data: action.data,
    handleError: true
  })
)

export const createCity = action => (
  POST({
    api: '/cityManagement/createCity',
    apiBase: 'odin',
    type: 'Public',
    data: action.data
  })
    .then(json => json)
)

export const updateCity = action => (
  POST({
    api: '/cityManagement/updateCity',
    apiBase: 'odin',
    type: 'Public',
    data: action.data,
    handleError: true
  })
)

export const viewGeoboundary = action => (
  POST({
    api: '/cityManagement/cityDetails',
    apiBase: 'odin',
    type: 'Public',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateGeoboundary = action => (
  POST({
    api: '/cityManagement/updateGeoboundary',
    apiBase: 'odin',
    type: 'Public',
    data: action.data,
    handleError: true
  })
)

export const fetchLocalities = action => (
  POST({
    api: '/fenceManagement/listFences',
    apiBase: 'odin',
    type: 'Public',
    data: action.data
  })
    .then(json => json)
)

export const updateGeolocality = action => (
  POST({
    api: '/fenceManagement/updateFence',
    apiBase: 'odin',
    type: 'Public',
    data: action.data,
    handleError: true
  })
)

export const createGeolocality = action => (
  POST({
    api: '/fenceManagement/addFence',
    apiBase: 'odin',
    type: 'Public',
    data: action.data,
    handleError: true
  })
)
