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

export const updateCity = data => ({
  type: ActionTypes.REQUEST_UPDATE_CITY,
  data
})

export const viewGeoboundary = data => ({
  type: ActionTypes.REQUEST_VIEW_GEOBOUNDARY,
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

export const setGeoboundaryLoadingState = () => ({
  type: ActionTypes.REQUEST_SET_GEOBOUNDARY_LOADING_STATE
})

export const setGeolocalityLoadingState = () => ({
  type: ActionTypes.REQUEST_SET_GEOLOCALITY_LOADING_STATE
})

export const setLoadingState = data => ({
  type: ActionTypes.REQUEST_SET_LOADING_STATE,
  data
})
