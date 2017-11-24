import { GET, POST } from '@utils/fetch'

export const fetchStates = action => (
  POST({
    api: '/stateManagement/listState',
    apiBase: 'odin',
    type: 'Public'
  })
    .then(json => json)
)

export const fetchCities = action => (
  POST({
    api: '/stateManagement/listCities',
    apiBase: 'odin',
    type: 'Public',
    data: action.data
  })
    .then(json => json)
)

export const fetchLocalities = action => (
  POST({
    api: '/stateManagement/listFence',
    apiBase: 'odin',
    type: 'Public',
    data: action.data
  })
    .then(json => json)
)
