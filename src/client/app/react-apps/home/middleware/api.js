import { GET, POST } from '@utils/fetch'

export const fetchStates = action => (
  POST({
    api: '/stateManagement/listStates',
    apiBase: 'odin',
    handleError: true
  })
    .then(json => json)
)

export const fetchCities = action => (
  POST({
    api: '/cityManagement/listCities',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchDeliverers = action => (
  POST({
    api: '/dp/allDps',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchRetailers = action => (
  POST({
    api: '/retailer/allRetailers',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchDPRetailerMap = action => (
  POST({
    api: '/retailer/retailersByDp',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)


export const fetchDPLocalityMap = action => (
  POST({
    api: '/dp/localitiesByDp',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const createState = action => (
  POST({
    api: '/stateManagement/addState',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateState = action => (
  POST({
    api: '/stateManagement/updateState',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createCity = action => (
  POST({
    api: '/cityManagement/addCity',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateCity = action => (
  POST({
    api: '/cityManagement/updateCity',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchCityDetails = action => (
  POST({
    api: '/cityManagement/cityDetails',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateGeoboundary = action => (
  POST({
    api: '/cityManagement/updateGeoboundary',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchLocalities = action => (
  POST({
    api: '/fenceManagement/listFences',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateGeolocality = action => (
  POST({
    api: '/fenceManagement/updateFence',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const uploadSearchData = action => (
  POST({
    api: '/index/uploadChennaiSkuData',
    apiBase: 'gremlinUrl',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)
