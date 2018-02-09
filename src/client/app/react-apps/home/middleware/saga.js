import { takeLatest, delay } from 'redux-saga'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import Notify from '@components/Notification'
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

function* fetchDeliverers(action) {
  try {
    const data = yield call(Api.fetchDeliverers, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_DELIVERERS, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchRetailers(action) {
  try {
    const data = yield call(Api.fetchRetailers, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_RETAILERS, data })
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

function* fetchCityDetails(action) {
  try {
    const data = yield call(Api.fetchCityDetails, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_CITY_DETAILS, data })
    if (action.CB) {
      action.CB()
    }
  } catch (err) {
    console.log(err)
  }
}

function* createState(action) {
  try {
    const data = yield call(Api.createState, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_STATE, data })
    Notify("Successfully created state", "success")
    setTimeout(() => {
      location.href = '/home/manage-states'
    }, 2000)
  } catch (err) {
    console.log(err)
  }
}

function* updateState(action) {
  try {
    const data = yield call(Api.updateState, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_STATES })
    Notify("Successfully updated state", "success")
    setTimeout(() => {
      location.href = '/home/manage-states'
    }, 2000)
  } catch (err) {
    console.log(err)
  }
}

function* createCity(action) {
  try {
    const data = yield call(Api.createCity, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_CITY, data })
    Notify("Successfully created city", "success")
    setTimeout(() => {
      location.href = '/home/manage-cities'
    }, 2000)
  } catch (err) {
    console.log(err)
    // Notify("Successfully updated city", "success")
  }
}

function* updateCity(action) {
  try {
    const data = yield call(Api.updateCity, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_CITY_DETAILS, data: { id: action.data.id }, CB: action.CB })
    Notify("Successfully updated city", "success")
    setTimeout(() => {
      location.href = '/home/manage-cities'
    }, 2000)
  } catch (err) {
    console.log(err)
  }
}

function* updateGeoboundary(action) {
  try {
    const data = yield call(Api.updateGeoboundary, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_CITY_DETAILS, data: { id: action.data.id }, CB: action.CB })
    Notify("Successfully updated geoboundary", "success")
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
    yield put({
      type: ActionTypes.REQUEST_FETCH_LOCALITIES,
      data: {
        city_id: action.data.city_id,
        is_available: action.data.is_available,
        offset: 0,
        limit: 50,
        no_filter: false
      },
      CB: action.CB
    })
    Notify("Successfully created locality", "success")
    setTimeout(() => {
      location.href = '/home/manage-localities'
    }, 2000)
  } catch (err) {
    console.log(err)
  }
}

function* updateGeolocality(action) {
  try {
    const data = yield call(Api.updateGeolocality, action)
    yield put({
      type: ActionTypes.REQUEST_FETCH_LOCALITIES,
      data: {
        city_id: action.data.city_id,
        is_available: action.data.is_available,
        offset: 0,
        limit: 50,
        no_filter: false
      },
      CB: action.CB
    })
    Notify("Successfully updated locality", "success")
    setTimeout(() => {
      location.href = '/home/manage-localities'
    }, 2000)
  } catch (err) {
    Notify("Couldn't update locality", "warning")
    console.log(err)
  }
}

function* setLoadingState(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_LOADING_STATE, data: action.data })
  } catch (err) {
    console.log(err)
  }
}

function* uploadSearchData(action) {
  try {
    const data = yield call(Api.uploadSearchData, action)
    yield put({ type: ActionTypes.SUCCESS_UPLOAD_SEARCH_DATA, data })
    Notify("Successfully uploaded search data", "success")
    setTimeout(() => {
      location.href = '/home/upload-search-data'
    }, 2000)
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

function* watchFetchDeliverers() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_DELIVERERS, fetchDeliverers)
  }
}

function* watchFetchRetailers() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_RETAILERS, fetchRetailers)
  }
}

function* watchFetchLocalities() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_LOCALITIES, fetchLocalities)
  }
}

function* watchFetchCityDetails() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CITY_DETAILS, fetchCityDetails)
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

function* watchSetLoadingState() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SET_LOADING_STATE, setLoadingState)
  }
}

function* watchUploadSearchData() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPLOAD_SEARCH_DATA, uploadSearchData)
  }
}

export default function* rootSaga() {
  yield [
    fork(watchFetchStates),
    fork(watchFetchCities),
    fork(watchFetchDeliverers),
    fork(watchFetchRetailers),
    fork(watchFetchLocalities),
    fork(watchFetchCityDetails),
    fork(watchCreateState),
    fork(watchUpdateState),
    fork(watchCreateCity),
    fork(watchUpdateCity),
    fork(watchUpdateGeoboundary),
    fork(watchCreateGeolocality),
    fork(watchUpdateGeolocality),
    fork(watchSetLoadingState),
    fork(watchUploadSearchData)
  ]
}
