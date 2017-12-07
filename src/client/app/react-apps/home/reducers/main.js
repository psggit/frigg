import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingStates: true,
  loadingCities: true,
  loadingGeolocalities: true,
  loadingGeoboundary: true,
  statesData: [],
  citiesData: [],
  geoLocalitiesData: [],
  geoBoundaryData: {}
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
      citiesData: action.data.cities
    })
  },

  [ActionTypes.SUCCESS_FETCH_LOCALITIES]: (state, action) => {
    return Object.assign({}, state, {
      loadingGeolocalities: false,
      geoLocalitiesData: action.data
    })
  },

  [ActionTypes.SUCCESS_VIEW_GEOBOUNDARY]: (state, action) => {
    return Object.assign({}, state, {
      loadingGeoboundary: false,
      geoBoundaryData: action.data.states
    })
  },

  [ActionTypes.SUCCESS_SET_GEOBOUNDARY_LOADING_STATE]: (state, action) => {
    return Object.assign({}, state, {
      loadingGeoboundary: true,
    })
  },

  [ActionTypes.SUCCESS_SET_GEOLOCALITY_LOADING_STATE]: (state, action) => {
    return Object.assign({}, state, {
      loadingGeolocalities: true,
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
