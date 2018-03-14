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
    api: '/retailer/unmappedRetailersToDp',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUnmappedRetailersToLocality = action => (
  POST({
    api: '/retailer/unmappedRetailersToLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUnmappedDpToLocality = action => (
  POST({
    api: '/dp/unmappedDpByLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUnmappedLocalitiesToDp = action => (
  POST({
    api: '/dp/unmappedLocalitiesByDp',
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

export const fetchDpByLocality = action => (
  POST({
    api: '/dp/dpByLocality',
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

export const createGeolocality = action => (
  POST({
    api: '/fenceManagement/addFence',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const uploadSearchData = action => (
  POST({
    api: '/index/uploadLocalSkuData',
    apiBase: 'gremlinUrl',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const updateDPLocalityMap = action => (
  POST({
    api: '/dp/mapDpToLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateDPRetailerMap = action => (
  POST({
    api: '/retailer/mapRetailerToDp',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const deleteRetailerFromDpMap = action => (
  POST({
    api: '/retailer/removeRetailerDpMap',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const deleteRetailerFromLocalityMap = action => (
  POST({
    api: '/retailer/removeRetailerLocalityMap',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const deleteLocalityFromDpMap = action => (
  POST({
    api: '/dp/removeDpLocalityMap',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchLocalityRetailersMap = action => (
  POST({
    api: '/retailer/retailersByLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const addRetailerToLocalityMap = action => (
  POST({
    api: '/retailer/mapRetailerToLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const addDpToLocalityMap = action => (
  POST({
    api: '/dp/mapDpToLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const deleteDpFromLocalityMap = action => (
  POST({
    api: '/dp/removeDpLocalityMap',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const mapRetailerToLocalityAsPrime = action => (
  POST({
    api: '/retailer/mapRetailerToLocalityAsPrime',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const unmapRetailerToLocalityAsPrime = action => (
  POST({
    api: '/retailer/unmapRetailerToLocalityAsPrime',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const indexSearchData = action => (
  POST({
    api: '/index/localSearch',
    apiBase: 'gremlinUrl',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

// Geofence check endpoints

export const checkPrimeRetailer = action => (
  GET({
    api: `/admin/locality/primeCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkDeliveryAgent = action => (
  GET({
    api: `/admin/locality/daCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkDeliveryAgentRetailer = action => (
  GET({
    api: `/admin/locality/daretailerCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkDeliveryTimeForLocality = action => (
  GET({
    api: `/admin/locality/timeCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const listRetailerOutsideLocality = action => (
  GET({
    api: `/admin/locality/retaileroutside/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkLocalityWithinCity = action => (
  GET({
    api: `/admin/locality/outsideLocality/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkActiveLocalityWithinCity = action => (
  GET({
    api: `/admin/locality/LocalityCheck`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)
