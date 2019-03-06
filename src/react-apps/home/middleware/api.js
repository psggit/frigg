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
    api: '/retailer/fetch',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchContactNumbersOfRetailer = action => (
  /**
   *  Request Payload:
   *  { retailer_id <int> }
   */
  POST({
    api: '/retailer/getAssociatedNumbers',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const addRetailerNumbers = action => (
  /**
   * Request Payload:
   * [{
   *  retailer_id <int>
   *  mobile_number: <string>
   *  is_active: <boolean>
   * }]
   */
  POST({
    api: '/retailer/addRetailerNumbers',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateRetailerNumbers = action => (
  /**
   * Request Payload:
   * [{
   *  id <int>
   *  mobile_number: <string>
   *  is_active: <boolean>
   * }]
   */
  POST({
    api: '/retailer/updateRetailerNumbers',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUnmappedRetailersToDp = action => (
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

export const getFenceDetails = action => (
  POST({
    api: '/fenceManagement/getFenceDetails',
    apiBase: 'odin',
    data: action.data,
    handleError: true
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
    api: `/admin/locality/LocalityCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkCityFence = action => (
  GET({
    api: `/admin/city/checkfence/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const createImageAd = action => (
  POST({
    api: '/marketing/ads/create/image_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchImageAds = action => (
  POST({
    api: '/marketing/ads/view_all',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateImageAdStatus = action => (
  POST({
    api: '/marketing/ads/status/image_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createUrlAd = action => (
  POST({
    api: '/marketing/ads/create/url_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchConsumerAds = action => (
  POST({
    api: '/marketing/v2/ads/view_all',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createConsumerAd = action => (
  POST({
    api: '/marketing/v2/ads/create',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchNetBankingList = () => (
  GET({
    api: '/juspay/netBankingDetails',
    apiBase: 'odin',
    handleError: true
  })
)

export const fetchUserSpecificAds = action => (
  POST({
    api: '/userads/listAds',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateBankingDetails = (action) => (
  POST({
    api: '/juspay/updateNetBankingDetails',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateConsumerAdStatus = action => (
  POST({
    api: '/marketing/v2/ads/status',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchUrlAds = action => (
  POST({
    api: '/marketing/ads/view/url_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateUrlAdStatus = action => (
  POST({
    api: '/marketing/ads/status/url_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createDeepLinkAd = action => (
  POST({
    api: '/marketing/ads/create/deepLink_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchDeepLinkAds = action => (
  POST({
    api: '/marketing/ads/view/deepLink_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateDeepLinkAdStatus = action => {

  console.log("action", action.data)
  return POST({
    api: '/marketing/ads/status/deepLink_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
}

export const createCollectionAd = action => (
  POST({
    api: '/marketing/ads/collection/create/collection_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchCollectionAds = action => (
  POST({
    api: '/marketing/ads/collection/view_all',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateCollectionAdStatus = action => (
  POST({
    api: '/marketing/ads/collection/status/image_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)


export const addBrandToCollection = action => (
  POST({
    api: '/collection/add',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchTransactionCode = () => (
  GET({
    api: '/consumer/list/transaction_code',
    apiBase: 'odin',
    handleError: true
  })
)

export const removeBrandFromCollection = action => (
  POST({
    api: '/collection/remove',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const verifyTransaction = action => (
  POST({
    api: '/consumer/verify/transaction',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createCollection = action => (
  POST({
    api: '/collection/create',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createTransaction = action => (
  POST({
    api: '/consumer/create/transaction',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchCollections = action => (
  POST({
    api: '/collection/view_all',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchBrandsInCollections = (action) => {
  return POST({
    api: `/collection/list/${action.data.collectionShortName}`,
    apiBase: 'odin',
    data: action.data.data,
    handleError: true
  })
}

export const requestTriggerSMS = (action) => (
  POST({
    api: '/admin/transaction/consumer/trigger',
    apiBase: 'blogicUrl',
    data:  action.data.transaction,
    handleError: true
  })
)

export const fetchCredits = (action) => (
  POST({
    api: '/consumer/view/credits',
    apiBase: 'odin',
    data:  action.data,
    handleError: true
  })
)

export const updateBrandListingOrder = action => (
  POST({
    api: '/collection/update',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)
