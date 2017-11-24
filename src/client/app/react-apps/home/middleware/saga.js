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

function* fetchLocalities(action) {
  try {
    const data = yield call(Api.fetchLocalities, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_LOCALITIES, data })
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

export default function* rootSaga() {
  yield [
    fork(watchFetchStates),
    fork(watchFetchCities),
    fork(watchFetchLocalities)
  ]
}
