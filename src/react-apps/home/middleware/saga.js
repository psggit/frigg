import { takeLatest, delay } from 'redux-saga'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import Notify from '@components/Notification'
import * as Api from './api'
import {skuList} from "./mock-data"

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

function* fetchStateList(action) {
  try {
    const data = yield call(Api.fetchStateList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_STATE_LIST, data })
    action.CB()
  } catch (err) {
    console.log(err)
  }
}

function* fetchCompanyList(action) {
  try {
    const data = yield call(Api.fetchCompanyList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_COMPANY_LIST, data })
    //action.CB()
  } catch (err) {
    console.log(err)
  }
}

function* fetchCompanies(action) {
  try {
    const data = yield call(Api.fetchCompanies, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_COMPANIES, data })
    action.CB()
  } catch (err) {
    console.log(err)
  }
}

function* fetchGenreBasedBrandList(action) {
  try {
    const data = yield call(Api.fetchGenreBasedBrandList, action)
    yield put({ type: ActionTypes.SUCCESS_GENRE_BASED_BRAND_LIST, data })
    action.CB()
  } catch(err) {
    console.log(err)
  }
}

function* fetchGenreList(action) {
  try {
    const data = yield call(Api.fetchGenreList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_GENRE_LIST, data })
    action.CB()
  } catch(err) {
    console.log(err)
  }
}

function* mapCompanyToBrand(action) {
  try {
    const data = yield call(Api.mapCompanyToBrand, action)
    yield put({ type: ActionTypes.SUCCESS_MAP_COMPANY_TO_BRAND, data })
    Notify("Successfully created company", "success")
    action.CB()
    setTimeout(() => {
      location.href = '/home/manage-company'
    }, 2000)
    //action.CB()
  } catch (err) {
    console.log(err)
    Notify("Something went wrong", "warning")
    action.CB()
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

function* fetchUnmappedRetailersToDp(action) {
  try {
    const data = yield call(Api.fetchUnmappedRetailersToDp, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_UNMAPPED_RETAILERS_TO_DP, data })
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
    action.CB()
    // yield put({ type: ActionTypes.REQUEST_MAP_RETAILER_TO_LOCALITY_AS_PRIME, data: { retailer_id: action.newPrimeRetailerId, locality_id: action.data.locality_id } })
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

function* getFenceDetails(action) {
  try {
    const data = yield call(Api.getFenceDetails, action)
    yield put({ type: ActionTypes.SUCCESS_GET_FENCE_DETAILS, data })
  } catch (err) {
    err.response.json().then((json) => { Notify(json.message, "warning") })
  }
}

function* checkPrimeRetailer(action) {
  try {
    const data = yield call(Api.checkPrimeRetailer, action)
    yield put({ type: ActionTypes.SUCCESS_GEO_FENCE_CHECK, data })
    // Notify("Successfully indexed search data", "success")
  } catch (err) {
    // err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* checkDeliveryAgent(action) {
  try {
    const data = yield call(Api.checkDeliveryAgent, action)
    yield put({ type: ActionTypes.SUCCESS_GEO_FENCE_CHECK, data })
    // Notify("Successfully indexed search data", "success")
  } catch (err) {
    // err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* checkDeliveryAgentRetailer(action) {
  try {
    const data = yield call(Api.checkDeliveryAgentRetailer, action)
    yield put({ type: ActionTypes.SUCCESS_GEO_FENCE_CHECK, data })
    // Notify("Successfully indexed search data", "success")
  } catch (err) {
    // err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* checkDeliveryTimeForLocality(action) {
  try {
    const data = yield call(Api.checkDeliveryTimeForLocality, action)
    yield put({ type: ActionTypes.SUCCESS_GEO_FENCE_CHECK, data })
    // Notify("Successfully indexed search data", "success")
  } catch (err) {
    // err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* checkActiveLocalityWithinCity(action) {
  try {
    const data = yield call(Api.checkActiveLocalityWithinCity, action)
    yield put({ type: ActionTypes.SUCCESS_GEO_FENCE_CHECK, data })
    // Notify("Successfully indexed search data", "success")
  } catch (err) {
    // err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* listRetailerOutsideLocality(action) {
  try {
    const data = yield call(Api.listRetailerOutsideLocality, action)
    yield put({ type: ActionTypes.SUCCESS_GEO_FENCE_CHECK, data })
    // Notify("Successfully indexed search data", "success")
  } catch (err) {
    // err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* checkCityFence(action) {
  try {
    const data = yield call(Api.checkCityFence, action)
    yield put({ type: ActionTypes.SUCCESS_GEO_FENCE_CHECK, data })
    // Notify("Successfully indexed search data", "success")
  } catch (err) {
    // err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* emptyGeoFenceCheckData(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_EMPTY_GEO_FENCE_CHECK_DATA })
    // Notify("Successfully indexed search data", "success")
  } catch (err) {
    // err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchImageAds(action) {
  try {
    const data = yield call(Api.fetchImageAds, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_IMAGE_ADS, data })
  } catch (err) {
    console.log(err)
  }
}

function* createImageAd(action) {
  try {
    const data = yield call(Api.createImageAd, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_IMAGE_AD, data })
    Notify("Successfully created ad", "success")
    action.CB(false)
    setTimeout(() => {
      location.href = '/home/manage-image-ads'
    }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB(false)
  }
}

function* updateImageAdStatus(action) {
  try {
    const data = yield call(Api.updateImageAdStatus, action)
    Notify(`Successfully ${action.data.status === 'Active' ? 'enabled' : 'disabled'} ad`, "success")
    yield put({ type: ActionTypes.SUCCESS_UPDATE_IMAGE_AD_STATUS, data })
    action.CB()
    // setTimeout(() => {
    //   history.pushState(null,null, '/manage-image-ads')
    // }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchConsumerAds(action) {
  try {
    const data = yield call(Api.fetchConsumerAds, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_CONSUMER_ADS, data })
  } catch (err) {
    console.log(err)
  }
}

function* createConsumerAd(action) {
  try {
    const data = yield call(Api.createConsumerAd, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_CONSUMER_AD, data })
    Notify("Successfully created ad", "success")
    action.CB(false)
    setTimeout(() => {
      location.href = '/home/manage-consumer-ads'
    }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB(false)
  }
}

function* updateConsumerAdStatus(action) {
  try {
    const data = yield call(Api.updateConsumerAdStatus, action)
    Notify(`Successfully ${action.data.status === 'Active' ? 'enabled' : 'disabled'} ad`, "success")
    yield put({ type: ActionTypes.SUCCESS_UPDATE_CONSUMER_AD_STATUS, data })
    action.CB()
    // setTimeout(() => {
    //   history.pushState(null,null, '/manage-image-ads')
    // }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}


function* fetchUrlAds(action) {
  try {
    const data = yield call(Api.fetchUrlAds, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_URL_ADS, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchNetBankingList(action) {
  try {
    const data = yield call(Api.fetchNetBankingList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_NETBANKING_LIST, data })
  } catch (err) {
    console.log(err)
  }
}

function* fetchUserSpecificPromos(action) {
  try {
    const data = yield call(Api.fetchUserSpecificPromos, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_USER_SPECIFIC_PROMOS, data})
  } catch (err) {
    console.log(err)
  }
}


function* createUserSpecificPromo(action) {
  try {
    const data = yield call(Api.createUserSpecificPromo, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_USER_SPECIFIC_PROMO, data})
    Notify("Successfully created user specific promo", "success")
    setTimeout(() => {
      location.href = '/home/user-specific-promos'
    }, 2000)
  } catch (err) {
    console.log(err)
  }
}

function* updateUserSpecificPromo(action) {
  try {
    const data = yield call(Api.updateUserSpecificPromo, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_USER_SPECIFIC_PROMO, data})
    Notify("Successfully updated user specific promo", "success")
    setTimeout(() => {
      location.href = '/home/user-specific-promos'
    }, 2000)
  } catch (err) {
    console.log(err)
  }
}

function* fetchUserSpecificAds(action) {
  try {
    const data = yield call(Api.fetchUserSpecificAds, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_USER_SPECIFIC_ADS, data})
  } catch (err) {
    console.log(err)
  }
}

function* createUserSpecificAds(action) {
  try {
    const data = yield call(Api.createUserSpecificAds, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_USER_SPECIFIC_ADS, data})
    Notify("Successfully created user specific ad", "success")
    setTimeout(() => {
      location.href = '/home/user-specific-ads'
    }, 2000)
  } catch (err) {
    console.log(err)
  }
}

function* updateUserSpecificAds(action) {
  try {
    const data = yield call(Api.updateUserSpecificAds, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_USER_SPECIFIC_ADS, data})
    Notify("Successfully updated user specific ad", "success")
    setTimeout(() => {
      location.href = '/home/user-specific-ads'
    }, 2000)
  } catch (err) {
    console.log(err)
  }
}

function* fetchUserSpecificAdIds(action) {
  try {
    const data = yield call(Api.fetchUserSpecificAdIds, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_USER_SPECIFIC_AD_IDS, data})
  } catch (err) {
    console.log(err)
  }
}

function* updatingBankingDetails(action) {
  try {
    const data = yield call(Api.updateBankingDetails, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_BANK_DETAILS, data })
    setTimeout(() => {
      location.href = '/home/manage-banking'
    }, 2000)
  } catch (err) {
    console.log(err)
  }
}

function* createUrlAd(action) {
  try {
    const data = yield call(Api.createUrlAd, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_URL_AD, data })
    Notify("Successfully created ad", "success")
    action.CB(false)
    setTimeout(() => {
      location.href = '/home/manage-url-ads'
    }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB(false)
  }
}

function* updateUrlAdStatus(action) {
  try {
    const data = yield call(Api.updateUrlAdStatus, action)
    Notify(`Successfully ${action.data.status === 'Active' ? 'enabled' : 'disabled'} ad`, "success")
    yield put({ type: ActionTypes.SUCCESS_UPDATE_URL_AD_STATUS, data })
    action.CB()
    // setTimeout(() => {
    //   history.pushState(null,null, '/manage-image-ads')
    // }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchDeepLinkAds(action) {
  try {
    const data = yield call(Api.fetchDeepLinkAds, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_DEEP_LINK_ADS, data })
  } catch (err) {
    console.log(err)
  }
}

function* createDeepLinkAd(action) {
  try {
    const data = yield call(Api.createDeepLinkAd, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_DEEP_LINK_AD, data })
    Notify("Successfully created ad", "success")
    action.CB(false)
    setTimeout(() => {
      location.href = '/home/manage-deep-link-ads'
    }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB(false)
  }
}

function* updateDeepLinkAdStatus(action) {
  try {
    const data = yield call(Api.updateDeepLinkAdStatus, action)
    Notify(`Successfully ${action.data.status === 'Active' ? 'enabled' : 'disabled'} ad`, "success")
    yield put({ type: ActionTypes.SUCCESS_UPDATE_DEEP_LINK_AD_STATUS, data })
    action.CB()
    // setTimeout(() => {
    //   history.pushState(null,null, '/manage-image-ads')
    // }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}


function* fetchCollectionAds(action) {
  try {
    const data = yield call(Api.fetchCollectionAds, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_COLLECTION_ADS, data })
  } catch (err) {
    console.log(err)
  }
}

function* createCollectionAd(action) {
  try {
    const data = yield call(Api.createCollectionAd, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_COLLECTION_AD, data })
    Notify("Successfully created ad", "success")
    action.CB(false)
    setTimeout(() => {
      location.href = '/home/manage-collection-ads'
    }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
    action.CB(false)
  }
}

function* updateCollectionAdStatus(action) {
  try {
    const data = yield call(Api.updateCollectionAdStatus, action)
    Notify(`Successfully ${action.data.status === 'Active' ? 'enabled' : 'disabled'} ad`, "success")
    yield put({ type: ActionTypes.SUCCESS_UPDATE_COLLECTION_AD_STATUS, data })
    action.CB()
    // setTimeout(() => {
    //   history.pushState(null,null, '/manage-image-ads')
    // }, 2000)
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchContactNumbersOfRetailer(action) {
  try {
    const data = yield call(Api.fetchContactNumbersOfRetailer, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_CONTACT_NUMBERS_OF_RETAILER, data })
  } catch (err) {
    console.log(err)
  }
}

function* updateRetailerNumbers(action) {
  try {
    const data = yield call(Api.updateRetailerNumbers, action)
    Notify('Successfully updated retailer contacts', 'success')
    yield put({ type: ActionTypes.REQUEST_FETCH_CONTACT_NUMBERS_OF_RETAILER, data: { retailer_id: action.retailer_id } })
  } catch (err) {
    console.log(err)
  }
}

function* addRetailerNumbers(action) {
  try {
    const data = yield call(Api.addRetailerNumbers, action)
    Notify('Successfully added new contact', 'success')
    yield put({ type: ActionTypes.REQUEST_FETCH_CONTACT_NUMBERS_OF_RETAILER, data: { retailer_id: action.data[0].retailer_id } })
  } catch (err) {
    console.log(err)
  }
}

function* addBrandToCollection(action) {
  try {
    const data = yield call(Api.addBrandToCollection, action)
    Notify('Successfully added brand to the collection', 'success')
    action.CB()
  } catch(err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchTransactionCode() {
  try {
    const data = yield call(Api.fetchTransactionCode)
    //const data = transactionCodes
    yield put({ type: ActionTypes.SUCCESS_TRANSACTION_CODE, data })
  } catch (err) {
    console.log(err)
  }
}

function* removeBrandFromCollection(action) {
  try {
    const data = yield call(Api.removeBrandFromCollection, action)
    Notify('Successfully removed brand from the collection', 'success')
    action.CB()
  } catch(err) {
    console.log(err)
  }
}

function* verifyTransaction(action) {
  try {
    const data = yield call(Api.verifyTransaction, action)
    //const data = verifyTransactions
    yield put({ type: ActionTypes.SUCCESS_VERIFY_TRANSACTION, data })
    setTimeout(() => {
      action.CB()
    }, 500)
  } catch (err) {
    console.log(err)
  }
}

function* createCollection(action) {
  try {
    const data = yield call(Api.createCollection, action)
    Notify('Created collection successfully', 'success')
    setTimeout(() => {
      location.href = '/home/manage-collections'
    }, 2000)
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
    console.log(err)
  }
}

function* createTransaction(action) {
  try {
    const data = yield call(Api.createTransaction, action)
    yield put({ type: ActionTypes.REQUEST_TRIGGER_SMS, data: {transaction: data, CB: action.CB} })
  } catch (err) {
    Notify('Error in creating transaction', 'warning')
    console.log(err)
  }
}

function* fetchCollections(action) {
  try {
    const data = yield call(Api.fetchCollections, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_COLLECTIONS, data })
  } catch (err) {
    console.log(err)
  }
}

function* requestTriggerSMS(action) {
  try {
    const data = yield call(Api.requestTriggerSMS, action)
    Notify('Successfully created the transaction', 'success')
    setTimeout(() => {
      window.location.href = '/home/customer-transactions/view-credits'
    }, 1000)
    setTimeout(() => {
      action.data.CB()
    }, 3000)
  } catch(err) {
    action.data.CB()
    console.log(err)
  }
}

function* fetchBrandsInCollection(action) {
  try {
    const data = yield call(Api.fetchBrandsInCollections, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_BRANDS_IN_COLLECTION, data })
    action.CB()
  } catch (err) {
    console.log(err)
  }
}

function* fetchCredits(action) {
  try {
    const data = yield call(Api.fetchCredits, action)
    //const data = [];
    yield put({ type: ActionTypes.SUCCESS_FETCH_CREDITS, data })
  } catch(err) {
    console.log(err)
  }
}

function* updateTransactionList(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_UPDATE_TRANSACTION_LIST, data: action.data })
  } catch(err) {
    console.log(err)
  }
}

function* updateBrandListingOrder(action) {
  try {
    const data = yield call(Api.updateBrandListingOrder, action)
    Notify('Successfully updated brand listing order', 'success')
    yield put({ type: ActionTypes.SUCCESS_UPDATE_BRAND_LISTING_ORDER, data: action.data })
  } catch(err) {
    console.log(err)
  }
}

function* fetchBrandManagerList(action) {
  try {
    const data = yield call(Api.fetchBrandManagerList, action)
    //Notify('Successfully updated brand listing order', 'success')
    yield put({ type: ActionTypes.SUCCESS_BRAND_MANAGER_LIST, data })
    action.CB()
  } catch(err) {
    console.log(err)
  }
}

function* fetchCampaignStatusList(action) {
  try {
    const data = yield call(Api.fetchCampaignStatusList, action)
    //Notify('Successfully updated brand listing order', 'success')
    yield put({ type: ActionTypes.SUCCESS_FETCH_CAMPAIGN_STATUS_LIST, data })
  } catch(err) {
    console.log(err)
  }
}

function* fetchCashbackSkuList(action) {
  try {
    const data = yield call(Api.fetchCashbackSkuList, action)
    //Notify('Successfully updated brand listing order', 'success')
    yield put({ type: ActionTypes.SUCCESS_FETCH_CASHBACK_SKU_LIST, data })
  } catch(err) {
    console.log(err)
  }
}

function* fetchCampaignList(action) {
  try {
    const data = yield call(Api.fetchCampaignList, action)
    //Notify('Successfully updated brand listing order', 'success')
    yield put({ type: ActionTypes.SUCCESS_FETCH_CAMPAIGN_LIST, data })
    action.CB()
  } catch(err) {
    console.log(err)
  }
}

function* mapSkuToPromo(action) {
  try {
    const data = yield call(Api.mapSkuToPromo, action)
    Notify('Successfully mapped sku to promo', 'success')
    yield put({ type: ActionTypes.SUCCESS_MAP_SKU_TO_PROMO, data })
    action.CB()
    setTimeout(() => {
      window.location.href = '/home/manage-cashback-sku'
    }, 1000)
  } catch(err) {
    console.log(err)
    Notify('Something went wromg', 'warning')
    action.CB()
  }
}

function* createCampaign(action) {
  try {
    const data = yield call(Api.createCampaign, action)
    Notify('Successfully created campaign', 'success')
    yield put({ type: ActionTypes.SUCCESS_CREATE_CAMPAIGN, data })
    setTimeout(() => {
      window.location.href = '/home/manage-campaign'
    }, 1000)
  } catch(err) {
    console.log(err)
  }
}

function* updateCampaign(action) {
  try {
    const data = yield call(Api.updateCampaign, action)
    Notify('Successfully updated campaign', 'success')
    yield put({ type: ActionTypes.SUCCESS_UPDATE_CAMPAIGN, data })
    setTimeout(() => {
      window.location.href = '/home/manage-campaign'
    }, 1000)
  } catch(err) {
    console.log(err)
  }
}

function* fetchSkuPromoList(action) {
  try {
    const data = yield call(Api.fetchSkuPromoList, action)
    //Notify('Successfully updated campaign', 'success')
    yield put({ type: ActionTypes.SUCCESS_FETCH_SKU_PROMO_LIST, data })
  } catch(err) {
    console.log(err)
  }
}

function* fetchPromoList(action) {
  try {
    const data = yield call(Api.fetchPromoList, action)
    //Notify('Successfully updated campaign', 'success')
    yield put({ type: ActionTypes.SUCCESS_FETCH_PROMO_LIST, data })
    action.CB()
  } catch(err) {
    console.log(err)
  }
}

function* fetchSkuList(action) {
  try {
    const data = yield call(Api.fetchSkuList, action)
    //Notify('Successfully updated campaign', 'success')
    //const data = skuList
    yield put({ type: ActionTypes.SUCCESS_FETCH_SKU_LIST, data })
    action.CB()
  } catch(err) {
    console.log(err)
    action.CB()
  }
}

function* createSkuPromo(action) {
  try {
    const data = yield call(Api.createSkuPromo, action)
    Notify('Successfully created promo', 'success')
    yield put({ type: ActionTypes.SUCCESS_CREATE_SKU_PROMO, data })
    setTimeout(() => {
      window.location.href = '/home/manage-sku-promo'
    }, 1000)
  } catch(err) {
    console.log(err)
  }
}

function* updateSkuPromo(action) {
  try {
    const data = yield call(Api.updateSkuPromo, action)
    Notify('Successfully updated promo', 'success')
    yield put({ type: ActionTypes.SUCCESS_UPDATE_SKU_PROMO, data })
    setTimeout(() => {
      window.location.href = '/home/manage-sku-promo'
    }, 1000)
  } catch(err) {
    console.log(err)
  }
}

function* fetchCampaignStatusList(action) {
  try {
    const data = yield call(Api.fetchCampaignStatusList, action)
    //Notify('Successfully updated campaign', 'success')
    yield put({ type: ActionTypes.SUCCESS_FETCH_CAMPAIGN_STATUS_LIST, data })
  } catch(err) {
    console.log(err)
  }
}
// function* verifyTransaction(action) {
//   try {
//     const data = yield call(Api.verifyTransaction, action.data)
//     //const data = transactionCodes
//     yield put({ type: ActionTypes.SUCCESS_VERIFY_TRANSACTION, data })
//   } catch (err) {
//     console.log(err)
//   }
// }

/**
 * Watchers
 */
function* watchFetchStates() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_STATES, fetchStates)
  }
}

function* watchFetchStateList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_STATE_LIST, fetchStateList)
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

function* watchFetchSkuList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_SKU_LIST, fetchSkuList)
  }
}

function* watchFetchUnmappedRetailersToDp() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_UNMAPPED_RETAILERS_TO_DP, fetchUnmappedRetailersToDp)
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

function* WatchGetFenceDetails() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_GET_FENCE_DETAILS, getFenceDetails)
  }
}

function* watchCheckPrimeRetailer() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CHECK_PRIME_RETAILER, checkPrimeRetailer)
  }
}

function* watchCheckDeliveryAgent() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CHECK_DELIVERY_AGENT, checkDeliveryAgent)
  }
}

function* watchCheckDeliveryAgentRetailer() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CHECK_DELIVERY_AGENT_RETAILER, checkDeliveryAgentRetailer)
  }
}

function* watchCheckDeliveryTimeForLocality() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CHECK_DELIVERY_TIME_FOR_LOCALITY, checkDeliveryTimeForLocality)
  }
}

function* watchCheckActiveLocalityWithinCity() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CHECK_ACTIVE_LOCALITY_WITHIN_CITY, checkActiveLocalityWithinCity)
  }
}

function* watchEmptyGeoFenceCheckData() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_EMPTY_GEO_FENCE_CHECK_DATA, emptyGeoFenceCheckData)
  }
}

function* watchListRetailerOutsideLocality() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_LIST_RETAILER_OUTSIDE_LOCALITY, listRetailerOutsideLocality)
  }
}

function* watchCheckCityFence() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CHECK_CITY_FENCE, checkCityFence)
  }
}

function* watchFetchImageAds() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_IMAGE_ADS, fetchImageAds)
  }
}

function* watchCreateImageAd() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_IMAGE_AD, createImageAd)
  }
}

function* watchUpdateImageAdStatus() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_IMAGE_AD_STATUS, updateImageAdStatus)
  }
}

function* watchFetchConsumerAds() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CONSUMER_ADS, fetchConsumerAds)
  }
}

function* watchUpdateConsumerAdStatus() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_CONSUMER_AD_STATUS, updateConsumerAdStatus)
  }
}

function* watchCreateConsumerAd() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_CONSUMER_AD, createConsumerAd)
  }
}

function* watchFetchUrlAds() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_URL_ADS, fetchUrlAds)
  }
}

function* watchCreateUrlAd() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_URL_AD, createUrlAd)
  }
}

function* watchUpdateUrlAdStatus() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_URL_AD_STATUS, updateUrlAdStatus)
  }
}

function* watchFetchDeepLinkAds() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_DEEP_LINK_ADS, fetchDeepLinkAds)
  }
}

function* watchCreateDeepLinkAd() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_DEEP_LINK_AD, createDeepLinkAd)
  }
}

function* watchUpdateDeepLinkAdStatus() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_DEEP_LINK_AD_STATUS, updateDeepLinkAdStatus)
  }
}

function* watchFetchCollectionAds() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_COLLECTION_ADS, fetchCollectionAds)
  }
}

function* watchCreateCollectionAd() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_COLLECTION_AD, createCollectionAd)
  }
}

function* watchUpdateCollectionAdStatus() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_COLLECTION_AD_STATUS, updateCollectionAdStatus)
  }
}

function* watchFetchContactNumbersOfRetailer() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CONTACT_NUMBERS_OF_RETAILER, fetchContactNumbersOfRetailer)
  }
}

function* watchUpdateRetailerNumbers() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_RETAILER_CONTACT_NUMBERS, updateRetailerNumbers)
  }
}

function* watchAddRetailerNumbers() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_NEW_RETAILER_CONTACT, addRetailerNumbers)
  }
}

function* watchRequestAddBrandToCollection() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_ADD_BRAND_TO_COLLECTION , addBrandToCollection)
  }
}

function* watchRequestRemoveBrandFromCollection() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_REMOVE_BRAND_FROM_COLLECTION , removeBrandFromCollection)
  }
}

function* watchRequestCreateCollection() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_COLLECTION , createCollection)
  }
}

function* watchRequestFetchCollections() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_COLLECTIONS , fetchCollections)
  }
}

function* watchRequestFetchBrandsInCollection() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_BRANDS_IN_COLLECTION , fetchBrandsInCollection)
  }
}

function* watchFetchTransactionCode() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_TRANSACTION_CODE, fetchTransactionCode)
  }
}

function* watchVerifyTransaction() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_VERIFY_TRANSACTION, verifyTransaction)
  }
}

function* watchCreateTransaction() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_TRANSACTION, createTransaction)
  }
}

function* watchRequestTriggerSMS() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_TRIGGER_SMS, requestTriggerSMS)
  }
}

function* watchRequestFetchCredits() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CREDITS, fetchCredits)
  }
}

function* watchRequestMapSkuToPromo() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_MAP_SKU_TO_PROMO, mapSkuToPromo)
  }
}

function* watchRequestUpdateTransactionList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_TRANSACTION_LIST, updateTransactionList)
  }
}

function* watchRequestUpdateBrandListingOrder() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_BRAND_LISTING_ORDER, updateBrandListingOrder)
  }
}

function* watchRequestFetchNetBankingList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_NETBANKING_LIST, fetchNetBankingList)
  }
}

function* watchRequestFetchUserSpecificAds() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_USER_SPECIFIC_ADS, fetchUserSpecificAds)
  }
}

function* watchRequestCreateUserSpecificAds() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_USER_SPECIFIC_ADS, createUserSpecificAds)
  }
}

function* watchRequestFetchUserSpecificAdIds() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_USER_SPECIFIC_AD_IDS, fetchUserSpecificAdIds)
  }
}

function* watchRequestUpdateUserSpecificAdIds() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_USER_SPECIFIC_ADS, updateUserSpecificAds)
  }
}

function* watchRequestFetchUserSpecificPromos() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_USER_SPECIFIC_PROMOS, fetchUserSpecificPromos)
  }
}

function* watchRequestFetchCashbackSkuList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CASHBACK_SKU_LIST, fetchCashbackSkuList)
  }
}

function* watchRequestCreateSkuPromo() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_SKU_PROMO, createSkuPromo)
  }
}

function* watchRequestUpdateSkuPromo() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_SKU_PROMO, updateSkuPromo)
  }
}

function* watchRequestFetchSkuPromoList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_SKU_PROMO_LIST, fetchSkuPromoList)
  }
}

function* watchRequestFetchPromoList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_PROMO_LIST, fetchPromoList)
  }
}

// function* watchRequestCreateCashbackSku() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_CREATE_CASHBACK_SKU, createCashbackSku)
//   }
// }

// function* watchRequestUpdateCashbackSku() {
//   while (true) {
//     yield* takeLatest(ActionTypes.REQUEST_UPDATE_CASHBACK_SKU, updateCashbackSku)
//   }
// }

function* watchRequestFetchCampaignList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CAMPAIGN_LIST, fetchCampaignList)
  }
}

function* watchRequestFetchCompanyList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_COMPANY_LIST, fetchCompanyList)
  }
}

function* watchRequestFetchCompanies() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_COMPANIES, fetchCompanies)
  }
}

function* watchRequestMapCompanyToBrand() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_MAP_COMPANY_TO_BRAND, mapCompanyToBrand)
  }
}

function* watchRequestFetchGenreBasedBrandList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_GENRE_BASED_BRAND_LIST, fetchGenreBasedBrandList)
  }
}

function* watchRequestFetchGenreList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_GENRE_LIST, fetchGenreList)
  }
}

function* watchRequestCreateCampaign() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_CAMPAIGN, createCampaign)
  }
}

function* watchRequestUpdateCampaign() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_CAMPAIGN, updateCampaign)
  }
}

function* watchRequestFetchCampaignStatusList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CAMPAIGN_STATUS_LIST, fetchCampaignStatusList)
  }
}

function* watchRequestFetchBrandManagerList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_BRAND_MANAGER_LIST, fetchBrandManagerList)
  }
}

function* watchRequestCreateUserSpecificPromo() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_USER_SPECIFIC_PROMO, createUserSpecificPromo)
  }
}

function* watchRequestUpdateUserSpecificPromo() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_USER_SPECIFIC_PROMO, updateUserSpecificPromo)
  }
}

function* watchRequestUpdateBankingDetails() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_BANK_DETAILS, updatingBankingDetails)
  }
}

export default function* rootSaga() {
  yield [
    fork(watchFetchStates),
    fork(watchFetchCities),
    fork(watchFetchDeliverers),
    fork(watchFetchRetailers),
    fork(watchUpdateRetailerNumbers),
    fork(watchAddRetailerNumbers),
    fork(watchFetchUnmappedRetailersToDp),
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
    fork(watchIndexSearchData),
    fork(WatchGetFenceDetails),
    fork(watchCheckPrimeRetailer),
    fork(watchCheckDeliveryAgent),
    fork(watchCheckDeliveryAgentRetailer),
    fork(watchCheckDeliveryTimeForLocality),
    fork(watchCheckActiveLocalityWithinCity),
    fork(watchEmptyGeoFenceCheckData),
    fork(watchListRetailerOutsideLocality),
    fork(watchCheckCityFence),
    fork(watchFetchImageAds),
    fork(watchCreateImageAd),
    fork(watchUpdateImageAdStatus),
    fork(watchFetchUrlAds),
    fork(watchCreateUrlAd),
    fork(watchUpdateUrlAdStatus),
    fork(watchFetchConsumerAds),
    fork(watchUpdateConsumerAdStatus),
    fork(watchCreateConsumerAd),
    fork(watchFetchDeepLinkAds),
    fork(watchCreateDeepLinkAd),
    fork(watchUpdateDeepLinkAdStatus),
    fork(watchFetchCollectionAds),
    fork(watchCreateCollectionAd),
    fork(watchUpdateCollectionAdStatus),
    fork(watchFetchContactNumbersOfRetailer),
    fork(watchRequestAddBrandToCollection),
    fork(watchRequestRemoveBrandFromCollection),
    fork(watchRequestCreateCollection),
    fork(watchRequestFetchCollections),
    fork(watchRequestFetchBrandsInCollection),
    fork(watchFetchContactNumbersOfRetailer),
    fork(watchFetchTransactionCode),
    fork(watchVerifyTransaction),
    fork(watchCreateTransaction),
    fork(watchRequestTriggerSMS),
    fork(watchRequestFetchCredits),
    fork(watchRequestUpdateTransactionList),
    fork(watchRequestUpdateBrandListingOrder),
    fork(watchRequestFetchNetBankingList),
    fork(watchRequestUpdateBankingDetails),
    fork(watchRequestFetchUserSpecificAds),
    fork(watchRequestCreateUserSpecificAds),
    fork(watchRequestFetchUserSpecificAdIds),
    fork(watchRequestUpdateUserSpecificAdIds),
    fork(watchRequestFetchUserSpecificPromos),
    fork(watchRequestCreateUserSpecificPromo),
    fork(watchRequestUpdateUserSpecificPromo),
    fork(watchRequestFetchCampaignList),
    fork(watchRequestCreateCampaign),
    fork(watchRequestFetchBrandManagerList),
    fork(watchRequestUpdateCampaign),
    fork(watchRequestFetchCampaignStatusList),
    fork(watchRequestFetchCashbackSkuList),
    fork(watchRequestFetchSkuPromoList),
    fork(watchRequestFetchPromoList),
    fork(watchRequestCreateSkuPromo),
    fork(watchRequestUpdateSkuPromo),
    fork(watchFetchStateList),
    fork(watchFetchSkuList),
    fork(watchRequestFetchCompanyList),
    fork(watchRequestMapCompanyToBrand),
    fork(watchRequestFetchCompanies),
    fork(watchRequestFetchGenreBasedBrandList),
    fork(watchRequestFetchGenreList),
    fork(watchRequestMapSkuToPromo)
  ]
}
