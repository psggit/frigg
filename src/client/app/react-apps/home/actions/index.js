import * as ActionTypes from './../constants/actions'

export const fetchStates = () => ({
  type: ActionTypes.REQUEST_FETCH_STATES
})

export const fetchCities = data => ({
  type: ActionTypes.REQUEST_FETCH_CITIES,
  data
})

export const createState = data => ({
  type: ActionTypes.REQUEST_CREATE_STATE,
  data
})

export const updateState = data => ({
  type: ActionTypes.REQUEST_UPDATE_STATE,
  data
})

export const createCity = data => ({
  type: ActionTypes.REQUEST_CREATE_CITY,
  data
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

export const fetchLocalities = data => ({
  type: ActionTypes.REQUEST_FETCH_LOCALITIES,
  data
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

export const addRetailerToDpMap = data => ({
  type: ActionTypes.REQUEST_ADD_RETAILER_TO_DP_MAP,
  data
})

export const deleteRetailerFromDpMap = data => ({
  type: ActionTypes.REQUEST_DELETE_RETAILER_FROM_DP_MAP,
  data
})

export const changeLocalityOfDpMap = data => ({
  type: ActionTypes.REQUEST_CHANGE_LOCALITY_OF_DP_MAP,
  data
})
