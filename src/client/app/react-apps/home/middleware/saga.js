import { takeLatest, delay } from 'redux-saga'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
// import * as utils from './utils'

/**
 * Handlers
 */
function* fetchStates(action) {
  console.log('ioehfiuwhoiu');
  try {
    // const { data, meta } = yield call(utils.getData, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_STATES })
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

export default function* rootSaga() {
  yield [
    fork(watchFetchStates)
  ]
}
