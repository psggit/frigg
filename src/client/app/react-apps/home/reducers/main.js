import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingStates: true
}

const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_STATES]: (state, action) => (
    Object.assign({}, state, {
      loadingStates: false
    })
  )
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
