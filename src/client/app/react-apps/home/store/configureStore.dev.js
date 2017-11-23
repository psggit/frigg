import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./../reducers"

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  if (module.hot) {
    console.log(module);
    // enable webpack hot module replacement for reducers
    module.hot.accept("./../reducers", () => {
      const nextRootReducer = require("./../reducers").default
      store.replaceReducer(nextRootReducer)
    })
  }

  const storeClone = Object.assign({}, store)

  return {
    store: storeClone,
    runSaga: sagaMiddleware.run
  }
}
