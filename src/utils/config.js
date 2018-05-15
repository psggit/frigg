
function getAPIObj() {
  if (window.location.href.split(':')[1] === '//localhost') {
    let scheme = 'https'
    let baseHost = '.hipbar-dev.com'
    let appName = 'hipbar-dev'

    return {
      authUrl: 'https://auth.' + appName + '.com',
      blogicUrl: 'https://api1.' + appName + '.com',
      gremlinUrl: scheme + '://gremlin' + baseHost,
      odin: scheme + '://odin' + baseHost,
      orderman: scheme + '://orderman' + baseHost,
      socketUrl: 'https://livered' + baseHost
    }
  } else {
    let scheme = window.location.href.split(':')[0]
    let baseHost = window.location.hostname.match(/.*?(\..*)/)[1]
    let subdomain = window.location.hostname.split('.')[0]
    // let authUrl = subdomain === 'support' || subdomain === 'delivery'
    //               ? scheme + '://auth' + baseHost
    //               : scheme + '://gremlin' + baseHost
    let authUrl =  scheme + '://auth' + baseHost

    return {
      authUrl: authUrl,
      blogicUrl: scheme + '://api1' + baseHost,
      gremlinUrl: scheme + '://gremlin' + baseHost,
      odin: scheme + '://odin' + baseHost,
      orderman: scheme + '://orderman' + baseHost,
      socketUrl: scheme + '://livered' + baseHost
    }
  }
}

// export const api_base_url = getApiBaseUrl()
// export const host_server = getHostServer()

export const Api = getAPIObj()
