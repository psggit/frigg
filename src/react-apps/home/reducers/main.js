import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingStates: true,
  loadingStateTimings: true,
  loadingCities: true,
  loadingCityDetails: true,
  loadingFenceDetails: true,
  loadingGeolocalities: true,
  loadingMappedLocalities: true,
  loadingMappedRetailers: true,
  loadingBrandManagerList: true,
  loadingRetailers: true,
  loadingUnmappedRetailersToDp: true,
  loadingDeliverers: true,
  loadingMappedRetailersToLocality: true,
  loadingUnmappedRetailersToLocality: true,
  loadingUnmappedDpToLocality: true,
  loadingUnmappedLocalitiesToDp: true,
  loadingMappedDpToLocality: true,
  loadingImageAds: true,
  loadingCollectionAds: true,
  loadingPossessionLimits: true,
  loadingCityPossessionLimits: true,
  loadingUrlAds: true,
  loadingConsumerAds: true,
  loadingDeepLinkingAds: true,
  loadingContactNumbersOfRetailer: true,
  loadingAllCollections: true,
  loadingBrandsInCollection: true,
  loadingTransactionCode: true,
  updatingListingOrder: true,
  creatingUserSpecificAd: true,
  updatingUserSpecificAd: true,
  creatingUserSpecificPromo: true,
  creatingPossessionLimit: true,
  creatingRetailerSpecificPromo: true,
  updatingUserSpecificPromo: true,
  updatingRetailerSpecificPromo: true,
  updatingPossessionLimit: true,
  updatingStateTiming: true,
  loadingUserSpecificPromos: true,
  loadingRetailerSpecificPromos: true,
  loadingCitySpecificPromos: true,
  creatingCitySpecificPromo: true,
  mappingBrandToCompany: true,
  loadingGenres: true,
  loadingCompanies: true,
  //verifyingTransaction: true,
  loadingCredits: true,
  loadingNetBankingList: true,
  updatingBankDetails: true,
  loadingUserSpecificAds: true,
  loadingUserSpecificAdIds: true,
  loadingSkuList: true,
  loadingCampaignList: true,
  loadingCompanyList: true,
  loadingGenreBasedBrandList: true,
  creatingCampaign: true,
  updatingCampaign: true,
  loadingBrandManagerList: true,
  loadingCampaignStatusList: true,
  loadingCashbackSkuList: true,
  loadingSkuPromoList: true,
  loadingPromoList: true,
  creatingSkuPromo: true,
  updatingSkuPromo: true,
  loadingStateList: true,
  creatingStateTiming: true,
  creatingCityPossessionLimit: true,
  updatingCityPossessionLimit: true,
  updatingCitySpecificPromo: true,
  loadingMappedCompanyList: true,
  stateList: [],
  stateTimings: [],
  skuList: [],
  companies: [],
  companyList: [],
  mappedCompanyList: [],
  genres: [],
  genreBasedBrandList: [],
  cashbackSkuList: [],
  skuPromoList: [],
  promoList: [],
  campaignStatusList: [],
  possessionLimits: [],
  campaignList: [],
  cityPossessionLimits: [],
  brandManagerList: [],
  contactNumbersOfRetailer: [],
  userSpecificAdIds: [],
  userSpecificAds: [],
  imageAdsData: [],
  collectionAdsData: [],
  brandManagerList: [],
  deepLinkAdsData: [],
  urlAdsData: [],
  consumerAdsData: [],
  geoFenceCheckData: [],
  unmappedRetailersToLocality: [],
  unmappedRetailersToDp: [],
  unmappedLocalitiesToDp: [],
  unmappedDpToLocality: [],
  mappedRetailersToLocality: [],
  mappedDpToLocality: [],
  retailers: [],
  mappedRetailers: [],
  mappedLocalities: [],
  statesData: [],
  citiesData: [],
  deliverers: [],
  geoLocalitiesData: [],
  collectionsList: {},
  brandList: {},
  cityDetails: {},
  collectionsCount: 0,
  brandCount: 0,
  cityDetails: {},
  transactionCodes: [],
  addCreditsFormDetails: {},
  customerDetails: [],
  validCreditsData: [],
  netBankingList: [],
  validCreditsCount: 0,
  userSpecificAdsCount: 0,
  userSpecificPromos: [],
  retailerSpecificPromos: [],
  citySpecificPromos: [],
  userSpecificPromosCount: 0,
  retailerSpecificPromosCount: 0,
  citySpecificPromosCount: 0,
  campaignCount: 0,
  cashbackSkuCount: 0,
  brandManagerCount: 0,
  skuPromoCount: 0,
  companyCount: 0,
  mappedCompanyCount: 0
}

const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_STATES]: (state, action) => {
    return Object.assign({}, state, {
      loadingStates: false,
      statesData: action.data.states
    })
  },

  [ActionTypes.SUCCESS_FETCH_STATE_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingStateList: false,
      stateList: action.data.states
    })
  },

  [ActionTypes.SUCCESS_FETCH_CITIES]: (state, action) => {
    return Object.assign({}, state, {
      loadingCities: false,
      citiesData: action.data.cities,
      citiesCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_LOCALITIES]: (state, action) => {
    return Object.assign({}, state, {
      loadingGeolocalities: false,
      geoLocalitiesData: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_POSSESSION_LIMITS]: (state, action) => {
    return Object.assign({}, state, {
      loadingPossessionLimits: false,
      possessionLimits: action.data.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_CITY_POSSESSION_LIMITS]: (state, action) => {
    return Object.assign({}, state, {
      loadingCityPossessionLimits: false,
      cityPossessionLimits: action.data.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_BRAND_MANAGER_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingBrandManagerList: false,
      brandManagerList: action.data.data,
      brandManagerCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_CREATE_CITY_POSSESSION_LIMIT]: (state, action) => {
    return Object.assign({}, state, {
      creatingCityPossessionLimit: false
    })
  },

  [ActionTypes.SUCCESS_UPDATE_CITY_POSSESSION_LIMIT]: (state, action) => {
    return Object.assign({}, state, {
      updatingCityPossessionLimit: false
    })
  },

  [ActionTypes.SUCCESS_CREATE_POSSESSION_LIMIT]: (state, action) => {
    return Object.assign({}, state, {
      creatingPossessionLimit: false
    })
  },

  [ActionTypes.SUCCESS_UPDATE_POSSESSION_LIMIT]: (state, action) => {
    return Object.assign({}, state, {
      updatingPossessionLimit: false
    })
  },

  [ActionTypes.SUCCESS_FETCH_CITY_DETAILS]: (state, action) => {
    return Object.assign({}, state, {
      loadingCityDetails: false,
      cityDetails: action.data.states
    })
  },

  [ActionTypes.SUCCESS_FETCH_STATE_TIMINGS]: (state, action) => {
    return Object.assign({}, state, {
      loadingStateTimings: false,
      stateTimings: action.data.data
    })
  },

  [ActionTypes.SUCCESS_CREATE_STATE_TIMING]: (state, action) => {
    return Object.assign({}, state, {
      creatingStateTiming: false
    })
  },

  [ActionTypes.SUCCESS_UPDATE_STATE_TIMING]: (state, action) => {
    return Object.assign({}, state, {
      updatingStateTiming: false
    })
  },

  [ActionTypes.SUCCESS_SET_LOADING_STATE]: (state, action) => {
    if (action.data) {
      return Object.assign({}, state, {
        [action.data]: true
      })
    }
    return Object.assign({}, state, {
      loadingStates: true,
      loadingStateTimings: true,
      loadingCities: true,
      loadingCityDetails: true,
      loadingFenceDetails: true,
      loadingGeolocalities: true,
      loadingMappedLocalities: true,
      loadingMappedRetailers: true,
      loadingRetailers: true,
      loadingMappedRetailersToLocality: true,
      loadingUnmappedRetailersToLocality: true,
      loadingUnmappedDpToLocality: true,
      loadingUnmappedLocalitiesToDp: true,
      loadingMappedDpToLocality: true,
      loadingImageAds: true,
      loadingAllCollections: true,
      loadingUrlAds: true,
      loadingDeepLinkingAds: true,
      loadingBrandsInCollection: true,
      updatingListingOrder: true,
      creatingUserSpecificAd: true,
      updatingUserSpecificAd: true,
      creatingUserSpecificPromo: true,
      creatingStateTiming: true,
      creatingPossessionLimit: true,
      creatingRetailerSpecificPromo: true,
      updatingUserSpecificPromo: true,
      updatingPossessionLimit: true,
      updatingStateTiming: true,
      updatingRetailerSpecificPromo: true,
      creatingCityPossessionLimit: true,
      updatingCityPossessionLimit: true,
      updatingCitySpecificPromo: true,
      creatingCitySpecificPromo: true
    })
  },
  
  [ActionTypes.SUCCESS_FETCH_DELIVERERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingDeliverers: false,
      deliverers: action.data.dp
    })
  },

  [ActionTypes.SUCCESS_FETCH_RETAILERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingRetailers: false,
      retailers: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_DP_RETAILER_MAP]: (state, action) => {
    return Object.assign({}, state, {
      loadingMappedRetailers: false,
      mappedRetailers: action.data.retailers
    })
  },

  [ActionTypes.SUCCESS_FETCH_DP_LOCALITY_MAP]: (state, action) => {
    return Object.assign({}, state, {
      loadingMappedLocalities: false,
      mappedLocalities: action.data.localities
    })
  },

  [ActionTypes.SUCCESS_FETCH_LOCALITY_RETAILERS_MAP]: (state, action) => {
    return Object.assign({}, state, {
      loadingMappedRetailersToLocality: false,
      mappedRetailersToLocality: action.data.retailers
    })
  },

  [ActionTypes.SUCCESS_FETCH_UNMAPPED_RETAILERS_TO_LOCALITY]: (state, action) => {
    return Object.assign({}, state, {
      loadingUnmappedRetailersToLocality: false,
      unmappedRetailersToLocality: action.data.retailers
    })
  },

  [ActionTypes.SUCCESS_FETCH_UNMAPPED_DP_TO_LOCALITY]: (state, action) => {
    return Object.assign({}, state, {
      loadingUnmappedDpToLocality: false,
      unmappedDpToLocality: action.data.dp
    })
  },

  [ActionTypes.SUCCESS_FETCH_UNMAPPED_LOCALITIES_TO_DP]: (state, action) => {
    return Object.assign({}, state, {
      loadingUnmappedLocalitiesToDp: false,
      unmappedLocalitiesToDp: action.data.localities
    })
  },

  [ActionTypes.SUCCESS_FETCH_UNMAPPED_RETAILERS_TO_DP]: (state, action) => {
    return Object.assign({}, state, {
      loadingUnmappedRetailersToDp: false,
      unmappedRetailersToDp: action.data.retailers
    })
  },

  [ActionTypes.SUCCESS_FETCH_DP_BY_LOCALITY]: (state, action) => {
    return Object.assign({}, state, {
      loadingMappedDpToLocality: false,
      mappedDpToLocality: action.data.dp
    })
  },

  [ActionTypes.SUCCESS_GET_FENCE_DETAILS]: (state, action) => {
    return Object.assign({}, state, {
      loadingFenceDetails: false,
      fenceDetails: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_IMAGE_ADS]: (state, action) => {
    return Object.assign({}, state, {
      loadingImageAds: false,
      imageAdsData: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_URL_ADS]: (state, action) => {
    return Object.assign({}, state, {
      loadingUrlAds: false,
      urlAdsData: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_CONSUMER_ADS]: (state, action) => {
    console.log("action",  action.data)
    return Object.assign({}, state, {
      loadingConsumerAds: false,
      consumerAdsData: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_DEEP_LINK_ADS]: (state, action) => {
    return Object.assign({}, state, {
      loadingDeepLinkingAds: false,
      deepLinkAdsData: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_COLLECTION_ADS]: (state, action) => {
    return Object.assign({}, state, {
      loadingCollectionAds: false,
      collectionAdsData: action.data
    })
  },

  [ActionTypes.SUCCESS_GEO_FENCE_CHECK]: (state, action) => {
    const geoFenceCheckData = state.geoFenceCheckData.slice()
    if (action.data.title === 'Retailer outside Locality') {
      action.data.status = 'warning'
    }
    geoFenceCheckData.push(action.data)
    return Object.assign({}, state, {
      geoFenceCheckData
    })
  },

  [ActionTypes.SUCCESS_EMPTY_GEO_FENCE_CHECK_DATA]: (state) => {
    return Object.assign({}, state, {
      geoFenceCheckData: []
    })
  },

  [ActionTypes.SUCCESS_FETCH_CONTACT_NUMBERS_OF_RETAILER]: (state, action) => {
    return Object.assign({}, state, {
      loadingContactNumbersOfRetailer: false,
      contactNumbersOfRetailer: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_COLLECTIONS]: (state, action) => {
    return Object.assign({}, state, {
      loadingAllCollections: false,
      collectionsList: action.data.ads_data,
      collectionsCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_BRANDS_IN_COLLECTION]: (state, action) => {
    return Object.assign({}, state, {
      loadingBrandsInCollection: false,
      brandList: action.data.bucket,
      brandCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_TRANSACTION_CODE]: (state, action) => {
    return Object.assign({}, state, {
      loadingTransactionCode: false,
      transactionCodes: action.data
    })
  },

  [ActionTypes.SUCCESS_UPDATE_TRANSACTION_LIST]: (state, action) => {
    let customerDetails = state.customerDetails.filter((item) => {
      if(item.email !== action.data.data) {
        return item
      }
    })

    return Object.assign({}, state, {
      customerDetails: customerDetails,
    })
  },

  [ActionTypes.SUCCESS_FETCH_CREDITS]: (state, action) => {
    return Object.assign({}, state, {
      loadingCredits: false,
      validCreditsData: action.data.data,
      validCreditsCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_UPDATE_BRAND_LISTING_ORDER]: (state, action) => {
    return Object.assign({}, state, {
      updatingListingOrder: false
    })
  },

  [ActionTypes.SUCCESS_FETCH_NETBANKING_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingNetBankingList: false,
      netBankingList: action.data
    })
  },
  
  [ActionTypes.SUCCESS_FETCH_USER_SPECIFIC_PROMOS]: (state, action) => {
    return Object.assign({}, state, {
      loadingUserSpecificPromos: false,
      userSpecificPromos: action.data.data,
      userSpecificPromosCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_CITY_SPECIFIC_PROMOS]: (state, action) => {
    return Object.assign({}, state, {
      loadingCitySpecificPromos: false,
      citySpecificPromos: action.data.data,
      citySpecificPromosCount: action.data.count
    })
  },
  
  [ActionTypes.SUCCESS_CREATE_CITY_SPECIFIC_PROMO]: (state, action) => {
    return Object.assign({}, state, {
      creatingCitySpecificPromo: false
    })
  },

  [ActionTypes.SUCCESS_UPDATE_CITY_SPECIFIC_PROMO]: (state, action) => {
    return Object.assign({}, state, {
      updatingCitySpecificPromo: false
    })
  },

  [ActionTypes.SUCCESS_FETCH_RETAILER_SPECIFIC_PROMOS]: (state, action) => {
    return Object.assign({}, state, {
      loadingRetailerSpecificPromos: false,
      retailerSpecificPromos: action.data.data,
      retailerSpecificPromosCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_CREATE_USER_SPECIFIC_PROMO]: (state, action) => {
    return Object.assign({}, state, {
      creatingUserSpecificPromo: false
    })
  },

  [ActionTypes.SUCCESS_CREATE_RETAILER_SPECIFIC_PROMO]: (state, action) => {
    return Object.assign({}, state, {
      creatingRetailerSpecificPromo: false
    })
  },

  [ActionTypes.SUCCESS_UPDATE_RETAILER_SPECIFIC_PROMO]: (state, action) => {
    return Object.assign({}, state, {
      updatingRetailerSpecificPromo: false
    })
  },

  [ActionTypes.SUCCESS_UPDATE_USER_SPECIFIC_PROMO]: (state, action) => {
    return Object.assign({}, state, {
      updatingUserSpecificPromo: false
    })
  },

  [ActionTypes.SUCCESS_FETCH_USER_SPECIFIC_ADS]: (state, action) => {
    return Object.assign({}, state, {
      loadingUserSpecificAds: false,
      userSpecificAds: action.data.data,
      userSpecificAdsCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_CREATE_USER_SPECIFIC_ADS]: (state, action) => {
    return Object.assign({}, state, {
      creatingUserSpecificAd: false
    })
  },

  [ActionTypes.SUCCESS_UPDATE_USER_SPECIFIC_ADS]: (state, action) => {
    return Object.assign({}, state, {
      updatingUserSpecificAd: false
    })
  },

  [ActionTypes.SUCCESS_FETCH_SKU_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingSkuList: false,
      skuList: action.data.Skupricelistdetails
    })
  },

  [ActionTypes.SUCCESS_FETCH_GENRE_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingGenres: false,
      genres:  action.data.genreDetail,
      //genreCount: action.data.count
    })
  },

  [ActionTypes. SUCCESS_FETCH_MAPPED_COMPANY_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingMappedCompanyList: false,
      mappedCompanyList: action.data.list,
      mappedCompanyCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_COMPANIES]: (state, action) => {
    return Object.assign({}, state, {
      loadingCompanies: false,
      companies: action.data.companies,
      //companyCount: 
    })
  },

  [ActionTypes.SUCCESS_FETCH_COMPANY_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingCompanyList: false,
      companyList: action.data.companies,
      companyCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_MAP_COMPANY_TO_BRAND]: (state, action) => {
    return Object.assign({}, state, {
      mappingBrandToCompany: false 
    })
  },

  [ActionTypes.SUCCESS_GENRE_BASED_BRAND_LIST]: (state, action) => {
    return Object.assign({}, state, {
      genreBasedBrandList: action.data.brand_list,
      loadingGenreBasedBrandList: false,
    })
  },

  [ActionTypes.SUCCESS_FETCH_CASHBACK_SKU_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingCashbackSkuList: false,
      cashbackSkuList: action.data.data,
      cashbackSkuCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_CREATE_SKU_PROMO]: (state, action) => {
    return Object.assign({}, state, {
      creatingSkuPromo: false
    })
  },
  
  [ActionTypes.SUCCESS_FETCH_SKU_PROMO_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingSkuPromoList: false,
      skuPromoList: action.data.data,
      skuPromoCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_PROMO_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingPromoList: false,
      promoList: action.data.data,
      //skuPromoCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_CAMPAIGN_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingCampaignList: false,
      campaignList: action.data.data,
      campaignCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_CREATE_CAMPAIGN]: (state, action) => {
    return Object.assign({}, state, {
      creatingCampaign: false
    })
  },

  [ActionTypes.SUCCESS_BRAND_MANAGER_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingBrandManagerList: false,
      brandManagerList: action.data.data
    })
  },

  [ActionTypes.SUCCESS_UPDATE_CAMPAIGN]: (state, action) => {
    return Object.assign({}, state, {
      updatingCampaign: false,
    })
  },

  [ActionTypes.SUCCESS_UPDATE_SKU_PROMO]: (state, action) => {
    return Object.assign({}, state, {
      updatingSkuPromo: false,
    })
  },

  [ActionTypes.SUCCESS_FETCH_CAMPAIGN_STATUS_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingCampaignStatusList: false,
      campaignStatusList: action.data.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_USER_SPECIFIC_AD_IDS]: (state, action) => {
    return Object.assign({}, state, {
      loadingUserSpecificAdIds: false,
      userSpecificAdIds: action.data.data
    })
  },
  
  [ActionTypes.SUCCESS_UPDATE_BANK_DETAILS]: (state, action) => {
    return Object.assign({}, state, {
      updatingBankDetails: false,
    })
  },

  [ActionTypes.SUCCESS_VERIFY_TRANSACTION]: (state, action) => {

    let transactions = [];

    transactions = state.addCreditsFormDetails.emailIds.map((email, i) => {
      let transactionDetail = {
        id : '',
        fullname : ''
      }
      transactionDetail = action.data.filter((transaction) => {
        if(transaction.email === email) {
          return transaction
        }
      })

      return {
        id : transactionDetail.length > 0 ? transactionDetail[0].id : '',
        name: transactionDetail.length > 0 ? transactionDetail[0].full_name : 'NOT FOUND',
        email,
        transactionId: state.addCreditsFormDetails.transactionId,
        transactionCode: state.addCreditsFormDetails.transactionCode,
        amount: state.addCreditsFormDetails.amount,
        batchNo: state.addCreditsFormDetails.batchNo,
        reason: state.addCreditsFormDetails.comment,
        valid: transactionDetail.length > 0 && transactionDetail[0].id > 0 ? true : false
      }
    })

    return Object.assign({}, state, {
      //verifyingTransaction: false,
      customerDetails: transactions
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
