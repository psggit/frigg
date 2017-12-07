import { takeLatest, delay } from 'redux-saga'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import * as Api from './api'

/**
 * Handlers
 */
function* fetchStates(action) {
  try {
    const data = yield call(Api.fetchStates, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_STATES, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchCities(action) {
  try {
    const data = yield call(Api.fetchCities, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_CITIES, data })
  } catch (err) {
    console.log(err)
  }
}

function* createState(action) {
  try {
    const data = yield call(Api.createState, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_STATE, data })
  } catch (err) {
    console.log(err)
  }
}

function* updateState(action) {
  try {
    const data = yield call(Api.updateState, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_STATES })
  } catch (err) {
    console.log(err)
  }
}

function* createCity(action) {
  try {
    const data = yield call(Api.createCity, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_CITY, data })
  } catch (err) {
    console.log(err)
  }
}

function* updateCity(action) {
  try {
    const data = yield call(Api.updateCity, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_CITIES })
  } catch (err) {
    console.log(err)
  }
}

function* updateGeoboundary(action) {
  try {
    const data = yield call(Api.updateGeoboundary, action)
    yield put({ type: ActionTypes.REQUEST_VIEW_GEOBOUNDARY, data: { id: action.data.id }, CB: action.CB })
  } catch (err) {
    console.log(err)
  }
}

function* viewGeoboundary(action) {
  try {
    const data = yield call(Api.viewGeoboundary, action)
    yield put({ type: ActionTypes.SUCCESS_VIEW_GEOBOUNDARY, data })
    if (action.CB) {
      action.CB()
    }
  } catch (err) {
    console.log(err)
  }
}

function* fetchLocalities(action) {
  console.log(action);
  try {
    const data = yield call(Api.fetchLocalities, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_LOCALITIES, data })
    if (action.CB) {
      action.CB()
    }
  } catch (err) {
    console.log(err)
  }
}

function* createGeolocality(action) {
  console.log(action);
  try {
    const data = yield call(Api.createGeolocality, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_LOCALITIES, data: { city_id: action.data.city_id }, CB: action.CB })
  } catch (err) {
    console.log(err)
  }
}

function* updateGeolocality(action) {
  try {
    const data = yield call(Api.updateGeolocality, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_LOCALITIES, data: { city_id: action.data.city_id }, CB: action.CB })
  } catch (err) {
    console.log(err)
  }
}

function* setGeoboundaryLoadingState(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_GEOBOUNDARY_LOADING_STATE })
  } catch (err) {
    console.log(err)
  }
}

function* setGeolocalityLoadingState(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_GEOLOCALITY_LOADING_STATE, data: action.data })
  } catch (err) {
    console.log(err)
  }
}


/**
 * Watchers
 */
function* watchFetchStates() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_STATES, fetchStates)
  }
}

function* watchFetchCities() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CITIES, fetchCities)
  }
}

function* watchFetchLocalities() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_LOCALITIES, fetchLocalities)
  }
}

function* watchCreateState() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_STATE, createState)
  }
}

function* watchUpdateState() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_STATE, updateState)
  }
}

function* watchCreateCity() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_CITY, createCity)
  }
}

function* watchUpdateCity() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_CITY, updateCity)
  }
}

function* watchUpdateGeoboundary() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_GEOBOUNDARY, updateGeoboundary)
  }
}

function* watchViewGeoboundary() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_VIEW_GEOBOUNDARY, viewGeoboundary)
  }
}

function* watchCreateGeolocality() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_GEOLOCALITY, createGeolocality)
  }
}

function* watchUpdateGeolocality() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_GEOLOCALITY, updateGeolocality)
  }
}

function* watchSetGeoboundaryLoadingState() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SET_GEOBOUNDARY_LOADING_STATE, setGeoboundaryLoadingState)
  }
}

function* watchSetGeolocalityLoadingState() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SET_GEOLOCALITY_LOADING_STATE, setGeolocalityLoadingState)
  }
}

export default function* rootSaga() {
  yield [
    fork(watchFetchStates),
    fork(watchFetchCities),
    fork(watchFetchLocalities),
    fork(watchCreateState),
    fork(watchUpdateState),
    fork(watchCreateCity),
    fork(watchUpdateCity),
    fork(watchUpdateGeoboundary),
    fork(watchViewGeoboundary),
    fork(watchCreateGeolocality),
    fork(watchUpdateGeolocality),
    fork(watchSetGeoboundaryLoadingState),
    fork(watchSetGeolocalityLoadingState)
  ]
}
