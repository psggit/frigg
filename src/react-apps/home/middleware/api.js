import { GET, POST } from '@utils/fetch'
import Notify from '@components/Notification'

export const fetchStates = action => (
  POST({
    api: '/stateManagement/listStates',
    apiBase: 'odin',
    handleError: true
  })
    .then(json => json)
)

export const fetchStateList = action => (
  POST({
    api: '/Api/listStates',
    apiBase: 'retailer',
    handleError: true
  })
    .then(json => json)
)

export const fetchCities = action => (
  POST({
    api: '/cityManagement/listCities',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchDeliverers = action => (
  POST({
    api: '/dp/allDps',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchRetailers = action => (
  POST({
    api: '/retailer/fetch',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchContactNumbersOfRetailer = action => (
  /**
   *  Request Payload:
   *  { retailer_id <int> }
   */
  POST({
    api: '/retailer/getAssociatedNumbers',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const addRetailerNumbers = action => (
  /**
   * Request Payload:
   * [{
   *  retailer_id <int>
   *  mobile_number: <string>
   *  is_active: <boolean>
   * }]
   */
  POST({
    api: '/retailer/addRetailerNumbers',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateRetailerNumbers = action => (
  /**
   * Request Payload:
   * [{
   *  id <int>
   *  mobile_number: <string>
   *  is_active: <boolean>
   * }]
   */
  POST({
    api: '/retailer/updateRetailerNumbers',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUnmappedRetailersToDp = action => (
  POST({
    api: '/retailer/unmappedRetailersToDp',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUnmappedRetailersToLocality = action => (
  POST({
    api: '/retailer/unmappedRetailersToLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUnmappedDpToLocality = action => (
  POST({
    api: '/dp/unmappedDpByLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUnmappedLocalitiesToDp = action => (
  POST({
    api: '/dp/unmappedLocalitiesByDp',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchDPRetailerMap = action => (
  POST({
    api: '/retailer/retailersByDp',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)


export const fetchDPLocalityMap = action => (
  POST({
    api: '/dp/localitiesByDp',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchDpByLocality = action => (
  POST({
    api: '/dp/dpByLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const createState = action => (
  POST({
    api: '/stateManagement/addState',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateState = action => (
  POST({
    api: '/stateManagement/updateState',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createCity = action => (
  POST({
    api: '/cityManagement/addCity',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateCity = action => (
  POST({
    api: '/cityManagement/updateCity',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchCityDetails = action => (
  POST({
    api: '/cityManagement/cityDetails',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateGeoboundary = action => (
  POST({
    api: '/cityManagement/updateGeoboundary',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchLocalities = action => (
  POST({
    api: '/fenceManagement/listFences',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateGeolocality = action => (
  POST({
    api: '/fenceManagement/updateFence',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createGeolocality = action => (
  POST({
    api: '/fenceManagement/addFence',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const uploadSearchData = action => (
  POST({
    api: '/index/uploadLocalSkuData',
    apiBase: 'gremlinUrl',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const updateDPLocalityMap = action => (
  POST({
    api: '/dp/mapDpToLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateDPRetailerMap = action => (
  POST({
    api: '/retailer/mapRetailerToDp',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const deleteRetailerFromDpMap = action => (
  POST({
    api: '/retailer/removeRetailerDpMap',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const deleteRetailerFromLocalityMap = action => (
  POST({
    api: '/retailer/removeRetailerLocalityMap',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const deleteLocalityFromDpMap = action => (
  POST({
    api: '/dp/removeDpLocalityMap',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchLocalityRetailersMap = action => (
  POST({
    api: '/retailer/retailersByLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const addRetailerToLocalityMap = action => (
  POST({
    api: '/retailer/mapRetailerToLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const addDpToLocalityMap = action => (
  POST({
    api: '/dp/mapDpToLocality',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const deleteDpFromLocalityMap = action => (
  POST({
    api: '/dp/removeDpLocalityMap',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const mapRetailerToLocalityAsPrime = action => (
  POST({
    api: '/retailer/mapRetailerToLocalityAsPrime',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const unmapRetailerToLocalityAsPrime = action => (
  POST({
    api: '/retailer/unmapRetailerToLocalityAsPrime',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const indexSearchData = action => (
  POST({
    api: '/index/localSearch',
    apiBase: 'gremlinUrl',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const getFenceDetails = action => (
  POST({
    api: '/fenceManagement/getFenceDetails',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

// Geofence check endpoints

export const checkPrimeRetailer = action => (
  GET({
    api: `/admin/locality/primeCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkDeliveryAgent = action => (
  GET({
    api: `/admin/locality/daCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkDeliveryAgentRetailer = action => (
  GET({
    api: `/admin/locality/daretailerCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkDeliveryTimeForLocality = action => (
  GET({
    api: `/admin/locality/timeCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const listRetailerOutsideLocality = action => (
  GET({
    api: `/admin/locality/retaileroutside/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkLocalityWithinCity = action => (
  GET({
    api: `/admin/locality/outsideLocality/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkActiveLocalityWithinCity = action => (
  GET({
    api: `/admin/locality/LocalityCheck/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const checkCityFence = action => (
  GET({
    api: `/admin/city/checkfence/${action.data.cityId}`,
    apiBase: 'orderman',
    data: action.data,
    handleError: true,
    type: 'FormData'
  })
)

export const createImageAd = action => (
  POST({
    api: '/marketing/ads/create/image_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchImageAds = action => (
  POST({
    api: '/marketing/ads/view_all',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateImageAdStatus = action => (
  POST({
    api: '/marketing/ads/status/image_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createUrlAd = action => (
  POST({
    api: '/marketing/ads/create/url_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchConsumerAds = action => (
  POST({
    api: '/marketing/v2/ads/view_all',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createConsumerAd = action => (
  POST({
    api: '/marketing/v2/ads/create',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchNetBankingList = () => (
  GET({
    api: '/juspay/netBankingDetails',
    apiBase: 'odin',
    handleError: true
  })
)

export const fetchUserSpecificAds = action => (
  POST({
    api: '/userads/listAds',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const createUserSpecificAds = action => (
  POST({
    api: '/userads/createAds',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateUserSpecificAds = action => (
  POST({
    api: '/userads/updateAds',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUserSpecificPromos = action => (
  POST({
    api: '/userpromo/listPromo',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const createUserSpecificPromo = action => (
  POST({
    api: '/userpromo/createPromo',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateUserSpecificPromo = action => (
  POST({
    api: '/userpromo/updatePromo',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchSkuList = action => (
  POST({
    api: '/cashbackOfferSku/listskupricewithstateId',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const mapSkuToPromo = action => (
  POST({
    api: '/cashbackOfferSku/createListSku',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const mapCompanyToBrand = action => (
  POST({
    api: '/companymap/createmap',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchCompanyList = action => (
  POST({
    api: '/companymap/list',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchCompanies = action => (
  GET({
    api: '/companies/list',
    apiBase: 'odin',
    //data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchGenreList = action => (
  POST({
    api: '/Api/getGenreMap',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
) 

export const fetchGenreBasedBrandList = action => (
  POST({
    api: '/Api/getBrandforGenre',
    apiBase: 'catalog',
    data: action.data,
    handleError: true
  })
  .then(json => json)
)

export const fetchCashbackSkuList = action => (
  POST({
    api: '/cashbackOfferSku/listSku',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const createSkuPromo = action => (
  POST({
    api: '/cashback/createCashbackOffer',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)


export const updateSkuPromo = action => (
  POST({
    api: '/cashback/updateCashbackOffer',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchSkuPromoList = action => (
  POST({
    api: '/cashback/listCashbackOffer',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchPromoList = action => (
  GET({
    api: '/cashback/listOffer',
    apiBase: 'odin',
    //data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchCampaignList = action => (
  POST({
    api: '/campaign/listCampaign',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchOptionList = (payloadObj, successCallback) => {
  return GET({
      api: '/prediction/list_options',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      //Notify('Successfully mapped team to prediction', 'success')
      // setTimeout(() => {
      //     location.href = `/home/manage-team-mapped-to-prediction`
      // }, 500)
  })
  .catch(err => {
      console.log("Error in fetching option list", err)
      err.response.json().then(json => { Notify("danger", json.message) })
      //failureCallback()
  })
}

export function createOption (payloadObj, successCallback, failureCallback) {
  return POST({
      api: '/prediction/create_option',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      Notify('Successfully created option', 'success')
      setTimeout(() => {
          location.href = `/home/manage-option`
      }, 500)
  })
  .catch(err => {
      console.log("Error in creating option", err)
      err.response.json().then(json => { Notify("danger", json.message) })
      failureCallback()
  })
}

export const fetchPredictionList = (payloadObj, successCallback) => {
  return POST({
      api: '/prediction/list',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      //Notify('Successfully mapped team to prediction', 'success')
      // setTimeout(() => {
      //     location.href = `/home/manage-team-mapped-to-prediction`
      // }, 500)
  })
  .catch(err => {
      console.log("Error in fetching prediction list", err)
      err.response.json().then(json => { Notify("danger", json.message) })
      //failureCallback()
  })
}

export function createPrediction (payloadObj, successCallback, failureCallback) {
  return POST({
      api: '/prediction/create',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      Notify('Successfully created prediction', 'success')
      setTimeout(() => {
          location.href = `/home/manage-prediction`
      }, 500)
  })
  .catch(err => {
      console.log("Error in creating prediction", err)
      err.response.json().then(json => { Notify("danger", json.message) })
      failureCallback()
  })
}

export function updatePrediction (payloadObj, successCallback, failureCallback) {
  return POST({
      api: '/prediction/update',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      Notify('Successfully updated prediction', 'success')
      setTimeout(() => {
          location.href = `/home/manage-prediction`
      }, 500)
  })
  .catch(err => {
      console.log("Error in updating prediction", err)
      err.response.json().then(json => { Notify("danger", json.message) })
      failureCallback()
  })
}

export function fetchCityList (payloadObj, successCallback) {
  return POST({
      api: '/city/availableCities',
      apiBase: 'loki',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      // Notify('Successfully mapped team to prediction', 'success')
      // setTimeout(() => {
      //     location.href = `/home/manage-team-mapped-to-prediction`
      // }, 500)
  })
  .catch(err => {
      console.log("Error in fetching city", err)
      //err.response.json().then(json => { Notify("danger", json.message) })
      //failureCallback()
  })
}


export function fetchCityMappedToPrediction (payloadObj, successCallback) {
  return POST({
      api: '/prediction/list_city',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      // Notify('Successfully mapped team to prediction', 'success')
      // setTimeout(() => {
      //     location.href = `/home/manage-team-mapped-to-prediction`
      // }, 500)
  })
  .catch(err => {
      console.log("Error in fetching city mapped to prediction", err)
      //err.response.json().then(json => { Notify("danger", json.message) })
      //failureCallback()
  })
}

export function mapCityToPrediction (payloadObj, successCallback, failureCallback) {
  return POST({
      api: '/prediction/map',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      Notify('Successfully mapped city to prediction', 'success')
      setTimeout(() => {
          location.href = `/home/manage-city-mapping`
      }, 500)
  })
  .catch(err => {
      console.log("Error in mapping city to prediction", err)
      err.response.json().then(json => { Notify("danger", json.message) })
      failureCallback()
  })
}

export function updateCityToPrediction (payloadObj, successCallback, failureCallback) {
  return POST({
      api: '/prediction/status',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      Notify('Successfully updated city mapped to prediction', 'success')
      setTimeout(() => {
          location.href = `/home/manage-city-mapping`
      }, 500)
  })
  .catch(err => {
      console.log("Error in updating city mapped to prediction", err)
      err.response.json().then(json => { Notify("danger", json.message) })
      failureCallback()
  })
}

export function mapOptionToPrediction (payloadObj, successCallback, failureCallback) {
  return POST({
      api: '/prediction/map_option',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      Notify('Successfully mapped option to prediction', 'success')
      setTimeout(() => {
          location.href = `/home/manage-option-mapping`
      }, 500)
  })
  .catch(err => {
      console.log("Error in mapping option to prediction", err)
      err.response.json().then(json => { Notify("danger", json.message) })
      failureCallback()
  })
}

export function updateOptionToPrediction (payloadObj, successCallback, failureCallback) {
  return POST({
      api: '/prediction/update_option_map',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      Notify('Successfully updated option mapped to prediction', 'success')
      setTimeout(() => {
          location.href = `/home/manage-option-mapping`
      }, 500)
  })
  .catch(err => {
      console.log("Error in updating option mapped to prediction", err)
      err.response.json().then(json => { Notify("danger", json.message) })
      failureCallback()
  })
}

export function fetchOptionMappedToPredictionList (payloadObj, successCallback) {
  return POST({
      api: '/prediction/list_option_maps',
      apiBase: 'odin',
      data: payloadObj,
      handleError: true
  })
  .then((json) => {
      successCallback(json)
      // Notify('Successfully mapped team to prediction', 'success')
      // setTimeout(() => {
      //     location.href = `/home/manage-team-mapped-to-prediction`
      // }, 500)
  })
  .catch(err => {
      console.log("Error in fetching option to prediction", err)
      //err.response.json().then(json => { Notify("danger", json.message) })
      //failureCallback()
  })
}

export const createCampaign = action => (
  POST({
    api: '/campaign/createCampaign',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateCampaign = action => (
  POST({
    api: '/campaign/updateCampaign',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchCampaignStatusList = action => (
  POST({
    //api: '/campaign/createCampaign',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchBrandManagerList = action => (
  GET({
    api: '/campaign/listBrandManager',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const fetchUserSpecificAdIds = action => (
  GET({
    api: '/userads/adIds',
    apiBase: 'odin',
    //data: action.data,
    handleError: true
  })
    .then(json => json)
)

export const updateBankingDetails = (action) => (
  POST({
    api: '/juspay/updateNetBankingDetails',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateConsumerAdStatus = action => (
  POST({
    api: '/marketing/v2/ads/status',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchUrlAds = action => (
  POST({
    api: '/marketing/ads/view/url_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateUrlAdStatus = action => (
  POST({
    api: '/marketing/ads/status/url_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createDeepLinkAd = action => (
  POST({
    api: '/marketing/ads/create/deepLink_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchDeepLinkAds = action => (
  POST({
    api: '/marketing/ads/view/deepLink_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateDeepLinkAdStatus = action => {

  console.log("action", action.data)
  return POST({
    api: '/marketing/ads/status/deepLink_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
}

export const createCollectionAd = action => (
  POST({
    api: '/marketing/ads/collection/create/collection_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchCollectionAds = action => (
  POST({
    api: '/marketing/ads/collection/view_all',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const updateCollectionAdStatus = action => (
  POST({
    api: '/marketing/ads/collection/status/image_ads',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)


export const addBrandToCollection = action => (
  POST({
    api: '/collection/add',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchTransactionCode = () => (
  GET({
    api: '/consumer/list/transaction_code',
    apiBase: 'odin',
    handleError: true
  })
)

export const removeBrandFromCollection = action => (
  POST({
    api: '/collection/remove',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const verifyTransaction = action => (
  POST({
    api: '/consumer/verify/transaction',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createCollection = action => (
  POST({
    api: '/collection/create',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const createTransaction = action => (
  POST({
    api: '/consumer/create/transaction',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchCollections = action => (
  POST({
    api: '/collection/view_all',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)

export const fetchBrandsInCollections = (action) => {
  return POST({
    api: `/collection/list/${action.data.collectionShortName}`,
    apiBase: 'odin',
    data: action.data.data,
    handleError: true
  })
}

export const requestTriggerSMS = (action) => (
  POST({
    api: '/admin/transaction/consumer/trigger',
    apiBase: 'blogicUrl',
    data:  action.data.transaction,
    handleError: true
  })
)

export const fetchCredits = (action) => (
  POST({
    api: '/consumer/view/credits',
    apiBase: 'odin',
    data:  action.data,
    handleError: true
  })
)

export const updateBrandListingOrder = action => (
  POST({
    api: '/collection/update',
    apiBase: 'odin',
    data: action.data,
    handleError: true
  })
)
