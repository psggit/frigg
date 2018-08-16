import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingStates: true,
  loadingCities: true,
  loadingCityDetails: true,
  loadingFenceDetails: true,
  loadingGeolocalities: true,
  loadingMappedLocalities: true,
  loadingMappedRetailers: true,
  loadingRetailers: true,
  loadingUnmappedRetailersToDp: true,
  loadingDeliverers: true,
  loadingMappedRetailersToLocality: true,
  loadingUnmappedRetailersToLocality: true,
  loadingUnmappedDpToLocality: true,
  loadingUnmappedLocalitiesToDp: true,
  loadingMappedDpToLocality: true,
  loadingImageAds: true,
  loadingContactNumbersOfRetailer: true,
  loadingTransactionCode: true,
  verifyingTransaction: true,
  contactNumbersOfRetailer: [],
  imageAdsData: [],
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
  cityDetails: {},
  transactionCodes: [],
  addCreditsFormDetails: {},
  customerDetails: [],
  validCredits: []
}

const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_STATES]: (state, action) => {
    return Object.assign({}, state, {
      loadingStates: false,
      statesData: action.data.states
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

  [ActionTypes.SUCCESS_FETCH_CITY_DETAILS]: (state, action) => {
    return Object.assign({}, state, {
      loadingCityDetails: false,
      cityDetails: action.data.states
    })
  },

  [ActionTypes.SUCCESS_SET_LOADING_STATE]: (state, action) => {
    return Object.assign({}, state, {
      loadingStates: true,
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
      loadingImageAds: true
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

  [ActionTypes.SUCCESS_TRANSACTION_CODE]: (state, action) => {
    return Object.assign({}, state, {
      loadingTransactionCode: false,
      transactionCodes: action.data
    })
  },

  [ActionTypes.SUCCESS_VIEW_CREDITS]: (state, action) => {
    return Object.assign({}, state, {
      //loadingTransactionCode: false,
      validCredits: action.data
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
      verifyingTransaction: false,
      customerDetails: transactions
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
