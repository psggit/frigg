import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingStates: true,
  loadingCities: true,
  loadingCityDetails: true,
  loadingGeolocalities: true,
  loadingMappedLocalities: true,
  loadingMappedRetailers: true,
  loadingRetailers: true,
  loadingMappedRetailersToLocality: true,
  loadingUnmappedRetailersToLocality: true,
  loadingUnmappedDpToLocality: true,
  loadingUnmappedLocalitiesToDp: true,
  loadingMappedDpToLocality: true,
  unmappedRetailersToLocality: [],
  unmappedLocalitiesToDp: [],
  unmappedDpToLocality: [],
  mappedRetailersToLocality: [],
  mappedDpToLocality: [],
  retailers: [],
  mappedRetailers: [],
  mappedLocalities: [],
  statesData: [],
  citiesData: [],
  deliverers: [],
  geoLocalitiesData: [],
  cityDetails: {}
}

const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_STATES]: (state, action) => {
    return Object.assign({}, state, {
      loadingStates: false,
      statesData: action.data.states
    })
  },

  [ActionTypes.SUCCESS_FETCH_CITIES]: (state, action) => {
    return Object.assign({}, state, {
      loadingCities: false,
      citiesData: action.data.cities,
      citiesCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_LOCALITIES]: (state, action) => {
    return Object.assign({}, state, {
      loadingGeolocalities: false,
      geoLocalitiesData: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_CITY_DETAILS]: (state, action) => {
    return Object.assign({}, state, {
      loadingCityDetails: false,
      cityDetails: action.data.states
    })
  },

  [ActionTypes.SUCCESS_SET_LOADING_STATE]: (state, action) => {
    return Object.assign({}, state, {
      [action.data]: true,
    })
  },

  [ActionTypes.SUCCESS_FETCH_DELIVERERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingDeliverers: false,
      deliverers: action.data.dp
    })
  },

  [ActionTypes.SUCCESS_FETCH_RETAILERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingRetailers: false,
      retailers: action.data.retailers
    })
  },

  [ActionTypes.SUCCESS_FETCH_DP_RETAILER_MAP]: (state, action) => {
    return Object.assign({}, state, {
      loadingMappedRetailers: false,
      mappedRetailers: action.data.retailers
    })
  },

  [ActionTypes.SUCCESS_FETCH_DP_LOCALITY_MAP]: (state, action) => {
    return Object.assign({}, state, {
      loadingMappedLocalities: false,
      mappedLocalities: action.data.localities
    })
  },

  [ActionTypes.SUCCESS_FETCH_LOCALITY_RETAILERS_MAP]: (state, action) => {
    return Object.assign({}, state, {
      loadingMappedRetailersToLocality: false,
      mappedRetailersToLocality: action.data.retailers
    })
  },

  [ActionTypes.SUCCESS_FETCH_UNMAPPED_RETAILERS_TO_LOCALITY]: (state, action) => {
    return Object.assign({}, state, {
      loadingUnmappedRetailersToLocality: false,
      unmappedRetailersToLocality: action.data.retailers
    })
  },

  [ActionTypes.SUCCESS_FETCH_UNMAPPED_DP_TO_LOCALITY]: (state, action) => {
    return Object.assign({}, state, {
      loadingUnmappedDpToLocality: false,
      unmappedDpToLocality: action.data.dp
    })
  },

  [ActionTypes.SUCCESS_FETCH_UNMAPPED_LOCALITIES_TO_DP]: (state, action) => {
    return Object.assign({}, state, {
      loadingUnmappedLocalitiesToDp: false,
      unmappedLocalitiesToDp: action.data.localities
    })
  },

  [ActionTypes.SUCCESS_FETCH_DP_BY_LOCALITY]: (state, action) => {
    return Object.assign({}, state, {
      loadingMappedDpToLocality: false,
      mappedDpToLocality: action.data.dp
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
