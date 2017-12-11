export function getQueryUri(queryObj) {
  const queryUri = Object.entries(queryObj).map(obj => obj.join('=')).join('&')
  return queryUri
}

export function getQueryObj(queryUri) {
  const queryObj = queryUri.split('&').reduce((a, b) => {
    a[b.split("=")[0]] = b.split("=")[1]
    return a
  }, {})

  return queryObj
}
