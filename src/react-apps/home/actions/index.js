import * as ActionTypes from './../constants/actions'

export const fetchStates = () => ({
  type: ActionTypes.REQUEST_FETCH_STATES
})

export const fetchStateList = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_STATE_LIST,
  data,
  CB
})

export const fetchCities = data => ({
  type: ActionTypes.REQUEST_FETCH_CITIES,
  data
})

export const createState = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_STATE,
  data,
  CB
})

export const updateState = data => ({
  type: ActionTypes.REQUEST_UPDATE_STATE,
  data
})

export const createCity = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_CITY,
  data,
  CB
})

export const updateCity = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_CITY,
  data,
  CB
})

export const fetchCityDetails = data => ({
  type: ActionTypes.REQUEST_FETCH_CITY_DETAILS,
  data
})

export const updateGeoboundary = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_GEOBOUNDARY,
  data,
  CB
})

export const fetchLocalities = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_LOCALITIES,
  data,
  CB
})

export const createGeolocality = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_GEOLOCALITY,
  data,
  CB
})

export const updateGeolocality = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_GEOLOCALITY,
  data,
  CB
})

export const setLoadingState = data => ({
  type: ActionTypes.REQUEST_SET_LOADING_STATE,
  data
})

export const fetchCampaignList = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_CAMPAIGN_LIST,
  data,
  CB
})

export const fetchPromoList = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_PROMO_LIST,
  CB
})

export const createCampaign = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_CAMPAIGN,
  data,
  CB
})

export const updateSkuPromo = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_SKU_PROMO,
  data,
  CB
})

export const fetchBrandManagerList = (data, CB) => ({
  type: ActionTypes.REQUEST_BRAND_MANAGER_LIST,
  data, 
  CB
})

export const updateCampaign = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_CAMPAIGN,
  data,
  CB
})

export const fetchCampaignStatus = (data) => ({
  type: ActionTypes.REQUEST_FETCH_CAMPAIGN_STATUS_LIST,
  data
})

export const fetchSkuPromoList = data => ({
  type: ActionTypes.REQUEST_FETCH_SKU_PROMO_LIST,
  data
})

export const createSkuPromo = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_SKU_PROMO,
  data,
  CB
})

export const fetchCashbackSkuList = data => ({
  type: ActionTypes.REQUEST_FETCH_CASHBACK_SKU_LIST,
  data
})

export const createCashbackSku = data => ({
  type: ActionTypes.REQUEST_CREATE_CASHBACK_SKU,
  data
})

export const updateCashbackSku = data => ({
  type: ActionTypes.REQUEST_UPDATE_CASHBACK_SKU,
  data
})

export const setLoadingAll = data => ({
  type: ActionTypes.REQUEST_SET_LOADING_ALL,
  data
})

export const fetchDeliverers = data => ({
  type: ActionTypes.REQUEST_FETCH_DELIVERERS,
  data
})

export const fetchRetailers = data => ({
  type: ActionTypes.REQUEST_FETCH_RETAILERS,
  data
})

export const fetchUnmappedRetailersToDp = data => ({
  type: ActionTypes.REQUEST_FETCH_UNMAPPED_RETAILERS_TO_DP,
  data
})

export const fetchUnmappedRetailersToLocality = data => ({
  type: ActionTypes.REQUEST_FETCH_UNMAPPED_RETAILERS_TO_LOCALITY,
  data
})

export const fetchUnmappedDpToLocality = data => ({
  type: ActionTypes.REQUEST_FETCH_UNMAPPED_DP_TO_LOCALITY,
  data
})

export const fetchUnmappedLocalitiesToDp = data => ({
  type: ActionTypes.REQUEST_FETCH_UNMAPPED_LOCALITIES_TO_DP,
  data
})

export const uploadSearchData = data => ({
  type: ActionTypes.REQUEST_UPLOAD_SEARCH_DATA,
  data
})

export const fetchDPRetailerMap = data => ({
  type: ActionTypes.REQUEST_FETCH_DP_RETAILER_MAP,
  data
})

export const fetchDPLocalityMap = data => ({
  type: ActionTypes.REQUEST_FETCH_DP_LOCALITY_MAP,
  data
})

export const fetchSkuList = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_SKU_LIST,
  data,
  CB
})

export const mapSkuToPromo = (data, CB) => ({
  type: ActionTypes.REQUEST_MAP_SKU_TO_PROMO,
  data,
  CB
})

export const fetchGenreList = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_GENRE_LIST,
  data,
  CB
})

export const fetchMappedCompanyList = (data) => ({
  type: ActionTypes.REQUEST_FETCH_MAPPED_COMPANY_LIST,
  data
})

export const fetchCompanyList = (data) => ({
  type: ActionTypes.REQUEST_FETCH_COMPANY_LIST,
  data
})

export const downloadReport = (data, CB) => ({
  type: ActionTypes.REQUEST_DOWNLOAD_REPORT,
  data,
  CB
})

export const createCompany = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_COMPANY,
  data,
  CB
})

export const updateCompany = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_COMPANY,
  data,
  CB
})

export const fetchCompanies = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_COMPANIES,
  CB
})

export const mapCompanyToBrand = (data, CB) => ({
  type: ActionTypes.REQUEST_MAP_COMPANY_TO_BRAND,
  data,
  CB
})

export const fetchGenreBasedBrandList = (data, CB) => ({
  type: ActionTypes.REQUEST_GENRE_BASED_BRAND_LIST,
  data,
  CB
})

export const deleteRetailerFromDpMap = data => ({
  type: ActionTypes.REQUEST_DELETE_RETAILER_FROM_DP_MAP,
  data
})

export const updateDPLocalityMap = data => ({
  type: ActionTypes.REQUEST_UPDATE_DP_LOCALITY_MAP,
  data
})

export const updateDPRetailerMap = data => ({
  type: ActionTypes.REQUEST_UPDATE_DP_RETAILER_MAP,
  data
})

export const deleteLocalityFromDpMap = (data, newLocalityId) => ({
  type: ActionTypes.REQUEST_DELETE_LOCALITY_FROM_DP_MAP,
  data,
  newLocalityId
})

export const fetchLocalityRetailersMap = data => ({
  type: ActionTypes.REQUEST_FETCH_LOCALITY_RETAILERS_MAP,
  data
})

export const deleteRetailerFromLocalityMap = data => ({
  type: ActionTypes.REQUEST_DELETE_RETAILER_FROM_LOCALITY_MAP,
  data
})


export const addRetailerToLocalityMap = data => ({
  type: ActionTypes.REQUEST_ADD_RETAILER_TO_LOCALITY_MAP,
  data
})

export const mapRetailerToLocalityAsPrime = data => ({
  type: ActionTypes.REQUEST_MAP_RETAILER_TO_LOCALITY_AS_PRIME,
  data
})

export const unmapRetailerToLocalityAsPrime = (data, CB) => ({
  type: ActionTypes.REQUEST_UNMAP_RETAILER_TO_LOCALITY_AS_PRIME,
  data,
  CB
})

export const fetchDpByLocality = data => ({
  type: ActionTypes.REQUEST_FETCH_DP_BY_LOCALITY,
  data
})

export const addDpToLocalityMap = data => ({
  type: ActionTypes.REQUEST_ADD_DP_TO_LOCALITY_MAP,
  data
})

export const deleteDpFromLocalityMap = data => ({
  type: ActionTypes.REQUEST_DELETE_DP_FROM_LOCALITY_MAP,
  data
})

export const fetchPossessionLimits = data => ({
  type: ActionTypes.REQUEST_FETCH_POSSESSION_LIMITS,
  data
})

export const fetchCityPossessionLimits = () => ({
  type: ActionTypes.REQUEST_FETCH_CITY_POSSESSION_LIMITS
})

export const createCityPossessionLimit = data => ({
  type: ActionTypes.REQUEST_CREATE_CITY_POSSESSION_LIMIT,
  data
})

export const updateCityPossessionLimit = data => ({
  type: ActionTypes.REQUEST_UPDATE_CITY_POSSESSION_LIMIT,
  data
})

export const createStateTiming = (data) => ({
  type: ActionTypes.REQUEST_CREATE_STATE_TIMING,
  data
})

export const updateStateTiming = (data) => ({
  type: ActionTypes.REQUEST_UPDATE_STATE_TIMING,
  data
})

export const fetchStateTimings = () => ({
  type: ActionTypes.REQUEST_FETCH_STATE_TIMINGS
})

export const createPossessionLimit = data => ({
  type: ActionTypes.REQUEST_CREATE_POSSESSION_LIMIT,
  data
})

export const updatePossessionLimit = data => ({
  type: ActionTypes.REQUEST_UPDATE_POSSESSION_LIMIT,
  data
})

export const indexSearchData = data => ({
  type: ActionTypes.REQUEST_INDEX_SEARCH_DATA,
  data
})

export const getFenceDetails = data => ({
  type: ActionTypes.REQUEST_GET_FENCE_DETAILS,
  data
})

export const checkPrimeRetailer = data => ({
  type: ActionTypes.REQUEST_CHECK_PRIME_RETAILER,
  data
})

export const checkDeliveryAgent = data => ({
  type: ActionTypes.REQUEST_CHECK_DELIVERY_AGENT,
  data
})

export const checkDeliveryAgentRetailer = data => ({
  type: ActionTypes.REQUEST_CHECK_DELIVERY_AGENT_RETAILER,
  data
})

export const checkDeliveryTimeForLocality = data => ({
  type: ActionTypes.REQUEST_CHECK_DELIVERY_TIME_FOR_LOCALITY,
  data
})

export const checkActiveLocalityWithinCity = data => ({
  type: ActionTypes.REQUEST_CHECK_ACTIVE_LOCALITY_WITHIN_CITY,
  data
})

export const listRetailerOutsideLocality = data => ({
  type: ActionTypes.REQUEST_LIST_RETAILER_OUTSIDE_LOCALITY,
  data
})

export const checkCityFence = data => ({
  type: ActionTypes.REQUEST_CHECK_CITY_FENCE,
  data
})

export const emptyGeoFenceCheckData = () => ({
  type: ActionTypes.REQUEST_EMPTY_GEO_FENCE_CHECK_DATA
})

export const fetchImageAds = data => ({
  type: ActionTypes.REQUEST_FETCH_IMAGE_ADS,
  data
})

export const createImageAd = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_IMAGE_AD,
  data,
  CB
})

export const updateImageAdStatus = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_IMAGE_AD_STATUS,
  data,
  CB
})

export const updateBankDetails = (data) => ({
  type: ActionTypes.REQUEST_UPDATE_BANK_DETAILS,
  data
})

export const createConsumerAd = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_CONSUMER_AD,
  data,
  CB
})
export const fetchConsumerAds = data => ({
  type: ActionTypes.REQUEST_FETCH_CONSUMER_ADS,
  data
})

export const updateConsumerAdStatus = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_CONSUMER_AD_STATUS,
  data,
  CB
})

export const fetchUrlAds = data => ({
  type: ActionTypes.REQUEST_FETCH_URL_ADS,
  data
})

export const createUrlAd = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_URL_AD,
  data,
  CB
})

export const updateUrlAdStatus = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_URL_AD_STATUS,
  data,
  CB
})

export const fetchDeepLinkAds = data => ({
  type: ActionTypes.REQUEST_FETCH_DEEP_LINK_ADS,
  data
})

export const createDeepLinkAd = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_DEEP_LINK_AD,
  data,
  CB
})

export const updateDeepLinkAdStatus = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_DEEP_LINK_AD_STATUS,
  data,
  CB
})

export const fetchCollectionAds = data => ({
  type: ActionTypes.REQUEST_FETCH_COLLECTION_ADS,
  data
})

export const createCollectionAd = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_COLLECTION_AD,
  data,
  CB
})

export const updateCollectionAdStatus = (data, CB) => ({
  type: ActionTypes.REQUEST_UPDATE_COLLECTION_AD_STATUS,
  data,
  CB
})

export const fetchContactNumbersOfRetailer = data => ({
  type: ActionTypes.REQUEST_FETCH_CONTACT_NUMBERS_OF_RETAILER,
  data
})

export const updateRetailerNumbers = (data, retailer_id) => ({
  type: ActionTypes.REQUEST_UPDATE_RETAILER_CONTACT_NUMBERS,
  data,
  retailer_id
})

export const addRetailerNumbers = (data, retailer_id) => ({
  type: ActionTypes.REQUEST_CREATE_NEW_RETAILER_CONTACT,
  data
})

export const addBrandToCollection = (data, CB) => ({
  type: ActionTypes.REQUEST_ADD_BRAND_TO_COLLECTION,
  data,
  CB
})

export const removeBrandFromCollection = (data, CB) => ({
  type: ActionTypes.REQUEST_REMOVE_BRAND_FROM_COLLECTION,
  data,
  CB
})

export const createCollection = (data) => ({
  type: ActionTypes.REQUEST_CREATE_COLLECTION,
  data
})

export const fetchCollections = (data) => ({
  type: ActionTypes.REQUEST_FETCH_COLLECTIONS,
  data
})

export const fetchBrandsInCollection = (data, CB) => ({
  type: ActionTypes.REQUEST_FETCH_BRANDS_IN_COLLECTION,
  data,
  CB
})

export const fetchTrasactionCode = () => ({
  type: ActionTypes.REQUEST_TRANSACTION_CODE
})

export const verifyTransaction = (data, CB) => ({
  type: ActionTypes.REQUEST_VERIFY_TRANSACTION,
  data,
  CB
})

export const createTransaction = (data, CB) => ({
  type: ActionTypes.REQUEST_CREATE_TRANSACTION,
  data,
  CB
})

export const fetchCredits = (data) => ({
  type: ActionTypes.REQUEST_FETCH_CREDITS,
  data
})

export const updateAddCreditTrasactionList = (data) => ({
  type: ActionTypes.REQUEST_UPDATE_TRANSACTION_LIST,
  data
})

export const updateBrandListingOrder = (data) => ({
  type: ActionTypes.REQUEST_UPDATE_BRAND_LISTING_ORDER,
  data
})

export const fetchNetBankingList = () => ({
  type: ActionTypes.REQUEST_FETCH_NETBANKING_LIST,
})

export const fetchUserSpecificAds = (data) => ({
  type: ActionTypes.REQUEST_FETCH_USER_SPECIFIC_ADS,
  data
})

export const createUserSpecificAd = (data) => ({
  type: ActionTypes.REQUEST_CREATE_USER_SPECIFIC_ADS,
  data
})

export const updateUserSpecificAd = (data) => ({
  type: ActionTypes.REQUEST_UPDATE_USER_SPECIFIC_ADS,
  data
})

export const fetchAdIds = (data) => ({
  type: ActionTypes.REQUEST_FETCH_USER_SPECIFIC_AD_IDS,
  data
})

export const fetchRetailerSpecificPromos = (data) => ({
  type: ActionTypes.REQUEST_FETCH_RETAILER_SPECIFIC_PROMOS,
  data
})

export const createRetailerSpecificPromo = (data) => ({
  type: ActionTypes.REQUEST_CREATE_RETAILER_SPECIFIC_PROMO,
  data
})

export const updateRetailerSpecificPromo = (data) => ({
  type: ActionTypes.REQUEST_UPDATE_RETAILER_SPECIFIC_PROMO,
  data
})


export const fetchUserSpecificPromos = (data) => ({
  type: ActionTypes.REQUEST_FETCH_USER_SPECIFIC_PROMOS,
  data
})

export const createUserSpecificPromo = (data) => ({
  type: ActionTypes.REQUEST_CREATE_USER_SPECIFIC_PROMO,
  data
})

export const updateUserSpecificPromo = (data) => ({
  type: ActionTypes.REQUEST_UPDATE_USER_SPECIFIC_PROMO,
  data
})
