import * as ActionTypes from './../constants/actions'

export const fetchStates = () => ({
  type: ActionTypes.REQUEST_FETCH_STATES
})

export const fetchCities = data => ({
  type: ActionTypes.REQUEST_FETCH_CITIES,
  data
})

export const createState = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_STATE,
  data,
  CB
})

export const updateState = data => ({
  type: ActionTypes.REQUEST_UPDATE_STATE,
  data
})

export const createCity = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_CITY,
  data,
  CB
})

export const updateCity = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_CITY,
  data,
  CB
})

export const fetchCityDetails = data => ({
  type: ActionTypes.REQUEST_FETCH_CITY_DETAILS,
  data
})

export const updateGeoboundary = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_GEOBOUNDARY,
  data,
  CB
})

export const fetchLocalities = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_LOCALITIES,
  data,
  CB
})

export const createGeolocality = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_GEOLOCALITY,
  data,
  CB
})

export const updateGeolocality = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_GEOLOCALITY,
  data,
  CB
})

export const setLoadingState = data => ({
  type: ActionTypes.REQUEST_SET_LOADING_STATE,
  data
})

export const fetchDeliverers = data => ({
  type: ActionTypes.REQUEST_FETCH_DELIVERERS,
  data
})

export const fetchRetailers = data => ({
  type: ActionTypes.REQUEST_FETCH_RETAILERS,
  data
})

export const fetchUnmappedRetailersToDp = data => ({
  type: ActionTypes.REQUEST_FETCH_UNMAPPED_RETAILERS_TO_DP,
  data
})

export const fetchUnmappedRetailersToLocality = data => ({
  type: ActionTypes.REQUEST_FETCH_UNMAPPED_RETAILERS_TO_LOCALITY,
  data
})

export const fetchUnmappedDpToLocality = data => ({
  type: ActionTypes.REQUEST_FETCH_UNMAPPED_DP_TO_LOCALITY,
  data
})

export const fetchUnmappedLocalitiesToDp = data => ({
  type: ActionTypes.REQUEST_FETCH_UNMAPPED_LOCALITIES_TO_DP,
  data
})

export const uploadSearchData = data => ({
  type: ActionTypes.REQUEST_UPLOAD_SEARCH_DATA,
  data
})

export const fetchDPRetailerMap = data => ({
  type: ActionTypes.REQUEST_FETCH_DP_RETAILER_MAP,
  data
})

export const fetchDPLocalityMap = data => ({
  type: ActionTypes.REQUEST_FETCH_DP_LOCALITY_MAP,
  data
})

export const deleteRetailerFromDpMap = data => ({
  type: ActionTypes.REQUEST_DELETE_RETAILER_FROM_DP_MAP,
  data
})

export const updateDPLocalityMap = data => ({
  type: ActionTypes.REQUEST_UPDATE_DP_LOCALITY_MAP,
  data
})

export const updateDPRetailerMap = data => ({
  type: ActionTypes.REQUEST_UPDATE_DP_RETAILER_MAP,
  data
})

export const deleteLocalityFromDpMap = (data, newLocalityId) => ({
  type: ActionTypes.REQUEST_DELETE_LOCALITY_FROM_DP_MAP,
  data,
  newLocalityId
})

export const fetchLocalityRetailersMap = data => ({
  type: ActionTypes.REQUEST_FETCH_LOCALITY_RETAILERS_MAP,
  data
})

export const deleteRetailerFromLocalityMap = data => ({
  type: ActionTypes.REQUEST_DELETE_RETAILER_FROM_LOCALITY_MAP,
  data
})


export const addRetailerToLocalityMap = data => ({
  type: ActionTypes.REQUEST_ADD_RETAILER_TO_LOCALITY_MAP,
  data
})

export const mapRetailerToLocalityAsPrime = data => ({
  type: ActionTypes.REQUEST_MAP_RETAILER_TO_LOCALITY_AS_PRIME,
  data
})

export const unmapRetailerToLocalityAsPrime = (data, CB) => ({
  type: ActionTypes.REQUEST_UNMAP_RETAILER_TO_LOCALITY_AS_PRIME,
  data,
  CB
})

export const fetchDpByLocality = data => ({
  type: ActionTypes.REQUEST_FETCH_DP_BY_LOCALITY,
  data
})

export const addDpToLocalityMap = data => ({
  type: ActionTypes.REQUEST_ADD_DP_TO_LOCALITY_MAP,
  data
})

export const deleteDpFromLocalityMap = data => ({
  type: ActionTypes.REQUEST_DELETE_DP_FROM_LOCALITY_MAP,
  data
})

export const indexSearchData = data => ({
  type: ActionTypes.REQUEST_INDEX_SEARCH_DATA,
  data
})

export const getFenceDetails = data => ({
  type: ActionTypes.REQUEST_GET_FENCE_DETAILS,
  data
})

export const checkPrimeRetailer = data => ({
  type: ActionTypes.REQUEST_CHECK_PRIME_RETAILER,
  data
})

export const checkDeliveryAgent = data => ({
  type: ActionTypes.REQUEST_CHECK_DELIVERY_AGENT,
  data
})

export const checkDeliveryAgentRetailer = data => ({
  type: ActionTypes.REQUEST_CHECK_DELIVERY_AGENT_RETAILER,
  data
})

export const checkDeliveryTimeForLocality = data => ({
  type: ActionTypes.REQUEST_CHECK_DELIVERY_TIME_FOR_LOCALITY,
  data
})

export const checkActiveLocalityWithinCity = data => ({
  type: ActionTypes.REQUEST_CHECK_ACTIVE_LOCALITY_WITHIN_CITY,
  data
})

export const listRetailerOutsideLocality = data => ({
  type: ActionTypes.REQUEST_LIST_RETAILER_OUTSIDE_LOCALITY,
  data
})

export const checkCityFence = data => ({
  type: ActionTypes.REQUEST_CHECK_CITY_FENCE,
  data
})

export const emptyGeoFenceCheckData = () => ({
  type: ActionTypes.REQUEST_EMPTY_GEO_FENCE_CHECK_DATA
})

export const fetchImageAds = data => ({
  type: ActionTypes.REQUEST_FETCH_IMAGE_ADS,
  data
})

export const createImageAd = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_IMAGE_AD,
  data,
  CB
})

export const updateImageAdStatus = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_IMAGE_AD_STATUS,
  data,
  CB
})

export const fetchContactNumbersOfRetailer = data => ({
  type: ActionTypes.REQUEST_FETCH_CONTACT_NUMBERS_OF_RETAILER,
  data
})

export const updateRetailerNumbers = (data, retailer_id) => ({
  type: ActionTypes.REQUEST_UPDATE_RETAILER_CONTACT_NUMBERS,
  data,
  retailer_id
})

export const addRetailerNumbers = (data, retailer_id) => ({
  type: ActionTypes.REQUEST_CREATE_NEW_RETAILER_CONTACT,
  data
})

export const addBrandToCollection = (data) => ({
  type: ActionTypes.REQUEST_ADD_BRAND_TO_COLLECTION,
  data
})

export const removeBrandFromCollection = (data) => ({
  type: ActionTypes.REQUEST_REMOVE_BRAND_FROM_COLLECTION,
  data
})

export const createCollection = (data) => ({
  type: ActionTypes.REQUEST_CREATE_COLLECTION,
  data
})

export const fetchCollections = (data) => ({
  type: ActionTypes.REQUEST_FETCH_COLLECTIONS,
  data
})

export const fetchBrandsInCollection = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_BRANDS_IN_COLLECTION,
  data,
  CB
})