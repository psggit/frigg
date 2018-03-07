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

function* fetchUnmappedRetailersToLocality(action) {
  try {
    const data = yield call(Api.fetchUnmappedRetailersToLocality, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_UNMAPPED_RETAILERS_TO_LOCALITY, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchUnmappedDpToLocality(action) {
  try {
    const data = yield call(Api.fetchUnmappedDpToLocality, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_UNMAPPED_DP_TO_LOCALITY, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchUnmappedLocalitiesToDp(action) {
  try {
    const data = yield call(Api.fetchUnmappedLocalitiesToDp, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_UNMAPPED_LOCALITIES_TO_DP, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchDPRetailerMap(action) {
  try {
    const data = yield call(Api.fetchDPRetailerMap, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_DP_RETAILER_MAP, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchDPLocalityMap(action) {
  try {
    const data = yield call(Api.fetchDPLocalityMap, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_DP_LOCALITY_MAP, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchDpByLocality(action) {
  try {
    const data = yield call(Api.fetchDpByLocality, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_DP_BY_LOCALITY, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchLocalityRetailersMap(action) {
  try {
    const data = yield call(Api.fetchLocalityRetailersMap, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_LOCALITY_RETAILERS_MAP, data })
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
    action.CB(false)
    setTimeout(() => {
      location.href = '/home/manage-states'
    }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB(true)
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
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* createCity(action) {
  try {
    action.data.updated_at = (new Date()).toISOString()
    const data = yield call(Api.createCity, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_CITY, data })
    Notify("Successfully created city", "success")
    action.CB(false)
    setTimeout(() => {
      location.href = '/home/manage-cities'
    }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB(true)
  }
}

function* updateCity(action) {
  try {
    action.data.updated_at = (new Date()).toISOString()
    const data = yield call(Api.updateCity, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_CITY_DETAILS, data: { id: action.data.id }, CB: action.CB })
    Notify("Successfully updated city", "success")
    setTimeout(() => {
      location.href = '/home/manage-cities'
    }, 2000)
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* updateGeoboundary(action) {
  try {
    const data = yield call(Api.updateGeoboundary, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_CITY_DETAILS, data: { id: action.data.id }, CB: action.CB })
    Notify("Successfully updated geoboundary", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* updateDPLocalityMap(action) {
  try {
    const data = yield call(Api.updateDPLocalityMap, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_DP_LOCALITY_MAP, data: { dp_id: action.data.dp_id } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* addDpToLocalityMap(action) {
  try {
    const data = yield call(Api.addDpToLocalityMap, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_DP_BY_LOCALITY, data: { locality_id: action.data.locality_id } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* deleteDpFromLocalityMap(action) {
  try {
    const data = yield call(Api.deleteDpFromLocalityMap, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_DP_BY_LOCALITY, data: { locality_id: action.data.locality_id } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* updateDPRetailerMap(action) {
  console.log(action);
  try {
    const data = yield call(Api.updateDPRetailerMap, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_DP_RETAILER_MAP, data: { dp_id: action.data.dp_id } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* addRetailerToLocalityMap(action) {
  console.log(action);
  try {
    const data = yield call(Api.addRetailerToLocalityMap, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_LOCALITY_RETAILERS_MAP, data: { locality_id: action.data.locality_id } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* deleteRetailerFromDpMap(action) {
  console.log(action);
  try {
    const data = yield call(Api.deleteRetailerFromDpMap, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_DP_RETAILER_MAP, data: { dp_id: action.data.dp_id } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* deleteRetailerFromLocalityMap(action) {
  console.log(action);
  try {
    const data = yield call(Api.deleteRetailerFromLocalityMap, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_LOCALITY_RETAILERS_MAP, data: { locality_id: action.data.locality_id } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* deleteLocalityFromDpMap(action) {
  console.log(action);
  try {
    const data = yield call(Api.deleteLocalityFromDpMap, action)
    yield put({ type: ActionTypes.REQUEST_UPDATE_DP_LOCALITY_MAP, data: { dp_id: action.data.dp_id, locality_id: action.newLocalityId } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* mapRetailerToLocalityAsPrime(action) {
  console.log(action);
  try {
    const data = yield call(Api.mapRetailerToLocalityAsPrime, action)
  yield put({ type: ActionTypes.REQUEST_FETCH_LOCALITY_RETAILERS_MAP, data: { locality_id: action.data.locality_id } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* unmapRetailerToLocalityAsPrime(action) {
  console.log(action);
  try {
    const data = yield call(Api.unmapRetailerToLocalityAsPrime, action)
  yield put({ type: ActionTypes.REQUEST_MAP_RETAILER_TO_LOCALITY_AS_PRIME, data: { retailer_id: action.newPrimeRetailerId, locality_id: action.data.locality_id } })
    Notify("Successfully updated", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* fetchLocalities(action) {
  console.log(action);
  try {
    const data = yield call(Api.fetchLocalities, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_LOCALITIES, data })
    if (action.CB) {
      action.CB(false)
    }
  } catch (err) {
    console.log(err)
  }
}

function* createGeolocality(action) {
  console.log(action);
  try {
    action.data.updated_at = (new Date()).toISOString()
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
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB(true)
  }
}

function* updateGeolocality(action) {
  try {
    action.data.updated_at = (new Date()).toISOString()
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
    err.response.json().then(json => { Notify(json.message, "warning") })
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
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* indexSearchData(action) {
  try {
    const data = yield call(Api.indexSearchData, action)
    yield put({ type: ActionTypes.SUCCESS_INDEX_SEARCH_DATA, data })
    Notify("Successfully indexed search data", "success")
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
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

function* watchFetchUnmappedRetailersToLocality() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_UNMAPPED_RETAILERS_TO_LOCALITY, fetchUnmappedRetailersToLocality)
  }
}

function* watchFetchUnmappedDpToLocality() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_UNMAPPED_DP_TO_LOCALITY, fetchUnmappedDpToLocality)
  }
}

function* watchFetchUnmappedLocalitiesToDp() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_UNMAPPED_LOCALITIES_TO_DP, fetchUnmappedLocalitiesToDp)
  }
}

function* watchFetchDPRetailerMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_DP_RETAILER_MAP, fetchDPRetailerMap)
  }
}

function* watchFetchDPLocalityMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_DP_LOCALITY_MAP, fetchDPLocalityMap)
  }
}

function* watchFetchDpByLocality() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_DP_BY_LOCALITY, fetchDpByLocality)
  }
}

function* watchFetchLocalityRetailersMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_LOCALITY_RETAILERS_MAP, fetchLocalityRetailersMap)
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

function* watchUpdateDPLocalityMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_DP_LOCALITY_MAP, updateDPLocalityMap)
  }
}

function* watchAddDpToLocalityMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_ADD_DP_TO_LOCALITY_MAP, addDpToLocalityMap)
  }
}

function* watchDeleteDpFromLocalityMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_DELETE_DP_FROM_LOCALITY_MAP, deleteDpFromLocalityMap)
  }
}

function* watchUpdateDPRetailerMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_DP_RETAILER_MAP, updateDPRetailerMap)
  }
}

function* watchDeleteRetailerFromDpMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_DELETE_RETAILER_FROM_DP_MAP, deleteRetailerFromDpMap)
  }
}

function* watchDeleteRetailerFromLocalityMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_DELETE_RETAILER_FROM_LOCALITY_MAP, deleteRetailerFromLocalityMap)
  }
}

function* watchDeleteLocalityFromDpMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_DELETE_LOCALITY_FROM_DP_MAP, deleteLocalityFromDpMap)
  }
}

function* watchAddRetailerToLocalityMap() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_ADD_RETAILER_TO_LOCALITY_MAP, addRetailerToLocalityMap)
  }
}

function* watchMapRetailerToLocalityAsPrime() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_MAP_RETAILER_TO_LOCALITY_AS_PRIME, mapRetailerToLocalityAsPrime)
  }
}

function* watchUnMapRetailerToLocalityAsPrime() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UNMAP_RETAILER_TO_LOCALITY_AS_PRIME, unmapRetailerToLocalityAsPrime)
  }
}

function* watchIndexSearchData() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_INDEX_SEARCH_DATA, indexSearchData)
  }
}

export default function* rootSaga() {
  yield [
    fork(watchFetchStates),
    fork(watchFetchCities),
    fork(watchFetchDeliverers),
    fork(watchFetchRetailers),
    fork(watchFetchDPRetailerMap),
    fork(watchFetchDPLocalityMap),
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
    fork(watchUploadSearchData),
    fork(watchUpdateDPLocalityMap),
    fork(watchUpdateDPRetailerMap),
    fork(watchDeleteRetailerFromDpMap),
    fork(watchDeleteLocalityFromDpMap),
    fork(watchFetchLocalityRetailersMap),
    fork(watchDeleteRetailerFromLocalityMap),
    fork(watchFetchUnmappedRetailersToLocality),
    fork(watchAddRetailerToLocalityMap),
    fork(watchMapRetailerToLocalityAsPrime),
    fork(watchUnMapRetailerToLocalityAsPrime),
    fork(watchFetchDpByLocality),
    fork(watchAddDpToLocalityMap),
    fork(watchDeleteDpFromLocalityMap),
    fork(watchFetchUnmappedDpToLocality),
    fork(watchFetchUnmappedLocalitiesToDp),
    fork(watchIndexSearchData)
  ]
}
