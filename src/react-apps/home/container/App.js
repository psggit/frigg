/* eslint-disable lines-between-class-members */
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Api } from '@utils/config'
import "whatwg-fetch"
import { Router } from 'react-router'
import { connect } from 'react-redux'
import { createBrowserHistory as createHistory } from 'history'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './../components/header'
import NavigationBar from './../components/navigation-bar'
import DisplayScreen from './display-screen'
import WelcomeScreen from './welcome-screen'
import ManageStates from './manage-states'
import ManageCities from './manage-cities'
import ManageLocalities from './manage-localities'
import CustomerTransactions from './customer-transactions'
import AddCredits from './add-credits'
import ManageRefund from './manage-refund'
import ViewCredits from '../container/view-credits'
import ManageRetailers from './manage-retailers'
import DeliveryMapManager from './delivery-map-manager'
import LocalityMapManager from './locality-map-manager'
import ViewLocalities from './../components/manage-geofencing/view-locality'
import NotFound from './../../../react-apps/not-found'
import ViewCity from './../components/manage-cities/view-city-details'
import ViewFence from './../components/manage-cities/view-fences'
import ViewState from './../components/manage-states/view-state-details'
import ViewLocality from './../components/manage-localities/view-locality-details'
import ViewDeliverer from './../components/delivery-map-manager/view-deliverer-details'
import ViewLocalityMapDetails from './../components/locality-map-manager/view-locality-map-details'
import CreateCity from './../components/manage-cities/create-city'
import CreateState from './../components/manage-states/create-state'
import CreateAd from './../components/manage-image-ads/create-ad'
import CreateCollectionAd from './../components/manage-collection-ads/create-ad'
import UpdateRetailerContact from './../components/manage-retailers/update-contact'
import CreateLocality from './../components/manage-localities/create-locality'
import ManageImageAds from './manage-image-ads'
import ManageDeepLinkAds from './manage-deep-link-ads'
import CreateDeepLinkAd from './../components/manage-deep-link-ads/create-ad'
import ManageUrlAds from './manage-url-ads'
import CreateUrlAd from './../components/manage-url-ads/create-ad'
import ManageConsumerAds from './manage-consumer-ads'
import CreateConsumerAd from './../components/manage-consumer-ads/create-ad'
import ManageCollectionAds from './manage-collection-ads'
import ManageCollections from './manage-collections'
import UploadSearchData from './upload-search-data'
import UploadGiftCardDetails from './upload-purchased-gift-card-details'
import GeoFenceCheck from './geo-fence-check'
import ManageStories from './manage-stories'
import CreateStory from './../components/manage-stories/create-story'
import UpdateStory from './../components/manage-stories/edit-story'
import ManageMappedStories from './manage-story-city-mapping'
import MapStoryToCity from './../components/manage-mapped-stories/map-stories'
// import DeliveyAgentList from './../components/delivery-management/delivery-agent-list'
// import CreateDeliveryAgent from './../components/delivery-management/create-delivery-agent'
// import ManagePossessionLimits from './../components/delivery-management/manage-possession-limits'
import ManageStatePossessionLimits from "./../container/manage-state-possession-limits"
import CreatePossessionLimit from "./../components/manage-possession-limits/create-possession-limit"
import EditPossessionLimit from "./../components/manage-possession-limits/update-possession-limit"
import ManageCityPossessionLimits from "./../container/manage-city-possession-limits"
import CreateCityPossessionLimit from "./../components/manage-city-possession-limits/create-city-possession-limit"
import UpdateCityPossessionLimit from "./../components/manage-city-possession-limits/update-city-possession-limit"
import CreateCollection from './../components/manage-collections/view-collection-details'
import EditCollection from './../components/manage-collections/edit-collection'
// import ViewCollectionList from './../components/manage-collections/view-collections'
import ViewCollection from './../components/manage-collections/view-collection'
import RollbackTransaction from './rollback-transaction'
import ConfirmCredits from './../components/confirm-credits'
import { getBreadCrumbPath, getUriFromBreadCrumb } from '@utils/url-utils'
import ManageBanking from "../container/manage-netbanking"
import UpdateBanking from "./../components/manage-netbanking/update-bank"
import ManageAds from "./../container/manage-user-specific-ads"
import CreateUserAds from "./../components/manage-user-specific-ads/create-ad"
import UpdateUserAds from "./../components/manage-user-specific-ads/update-ad"
import ManageCityPromos from "./../container/manage-city-specific-promos"
import CreateCityPromos from "./../components/manage-city-specific-promos/create-city-promo"
import UpdateCityPromos from "./../components/manage-city-specific-promos/update-city-promo"
import ManageRetailerPromos from "./../container/manage-retailer-specific-promos"
import CreateRetailerPromos from "./../components/manage-retailer-specific-promos/create-retailer-promo"
import UpdateRetailerPromos from "./../components/manage-retailer-specific-promos/update-retailer-promo"
import ManagePromos from "./../container/manage-user-specific-promos"
import CreateUserPromos from "./../components/manage-user-specific-promos/create-promo"
import UpdateUserPromos from "./../components/manage-user-specific-promos/update-promo"
import ManageCampaign from './../container/manage-campaign'
import CreateCampaign from './../components/manage-campaign/create-campaign'
import UpdateCampaign from './../components/manage-campaign/edit-campaign'
import ViewPromoList from "./../container/manage-cashback-sku"
//import ViewCashbackSkuList from "../components/manage-cashback-sku/mapped-sku"
import MapSkuToPromo from "./../components/manage-cashback-sku/create-cashback-sku"
import ManageSkuPromo from "./../container/manage-sku-promo"
import CreateSkuPromo from "./../components/manage-sku-promo/create-sku-promo"
import UpdateSkuPromo from "./../components/manage-sku-promo/edit-sku-promo"
import MappedCompanyList from "./../container/manage-company-brand-mapping"
import MapCompanyToBrand from "./../components/manage-company-brand-mapping/map-company-to-brand"
import UpdateCompanyToBrand from "./../components/manage-company-brand-mapping/edit-company-to-brand"
import ViewPredictionList from "./../container/manage-prediction"
import ViewAnswer from "./../container/manage-answer-prediction-mapping"
import CreatePrediction from "./../components/manage-prediction/create-prediction"
import UpdatePrediction from "./../components/manage-prediction/update-prediction"
import ViewOptionList from "./../container/manage-option"
import CreateOption from "./../components/manage-option/create-option"
import ViewMappedOptionList from "./../container/manage-option-prediction-mapping"
import MapOptionToPrediction from "./../components/manage-prediction-option-mapping/map-option-to-prediction"
import UpdateOptionToPrediction from "./../components/manage-prediction-option-mapping/update-option-to-prediction"
import ViewMappedCityList from "./../container/manage-city-prediction-mapping"
import MapCityToPrediction from "./../components/manage-city-prediction-mapping/map-city-to-prediction"
import UpdateCityToPrediction from "./../components/manage-city-prediction-mapping/update-city-to-prediction"
import ManageStateTimings from "./../container/manage-state-timings"
import CreateStateTiming from "./../components/manage-state-timings/create-state-timings"
import UpdateStateTiming from "./../components/manage-state-timings/update-state-timings"
import ManageCompany from "./../container/manage-company"
import CreateCompany from "./../components/manage-company/create-company"
import UpdateCompany from "./../components/manage-company/update-company"
import ManageReports from "./../container/reports"
import ManageBrandManager from "./../container/manage-brand-manager"
import CreateBrandManager from "./../components/manage-brand-manager/create-brand-manager"
import EditBrandManager from "./../components/manage-brand-manager/update-brand-manager"
import MapAnswerToPrediction from "./../components/manage-prediction-answer-mapping/map-answer-to-prediction"
import RewardCouponList from "./../container/manage-reward-coupons"
import CreateCoupon from "./../components/manage-reward-coupons/create-coupon"
import UpdateCoupon from "./../components/manage-reward-coupons/update-coupon"
import ManageCartCoupons from "./../container/manage-cart-coupons"
import CreateCartCoupons from "./../components/manage-coupons/create-cart-coupons"
import EditCartCoupons from "./../components/manage-coupons/edit-coupon"
import ManageConsumerSpecificCartCoupons from "./../container/manage-consumer-specific-cart-coupons"
import EditConsumerSpecificCartCoupon from "./../components/manage-consumer-specific-cart-coupons/update-consumer"
import ManageWareHouse from "./../container/manage-warehouse"
import CreateWareHouse from "./../components/manage-warehouse/create-warehouse"
import EditWareHouse from "../components/manage-warehouse/edit-warehouse"
import ManageRetailerWarehouseMapping from "./manage-retailer-warehouse-mapping"
import MapRetailerToWarehouse from "./../components/manage-retailer-warehouse-mapping/map-retailer-to-warehouse"
import ManageProductCoupons from "./../container/manage-product-coupons"
import CreateProductCoupons from "./../components/manage-coupons/manage-product-coupons/create-product-coupon"
import EditProductCoupons from "./../components/manage-coupons/manage-product-coupons/edit-product-form"

import CreateDeliveryagent from "../components/manage-delivery-agent/create-delivery-agent"
import ManageDeliveryagent from './../container/manage-delivery-agent'
import EditDeliveryagent from '../components/manage-delivery-agent/edit-delivery-agent'
import ManageCitiesFee from '../container/manage-city-fee'
import CreateCityFee from '../components/manage-city-fee/create-city-fee'
import EditCityFee from '../components/manage-city-fee/edit-city-fee'
import ManageCityPayment from "../container/manage-city-payment"
import CreateCityPayment from "../components/manage-city-payment/create-city-payment"
import UpdateCityPayment from "../components/manage-city-payment/edit-city-payment"
import ManageLocalityFee from "../container/manage-locality-fee"
import CreateLocalityFee from "../components/manage-locality-fee/create-locality-fee"
import UpdateLocalityFee from "../components/manage-locality-fee/edit-locality-fee"
import DeliveryagentWarehouseMapping from "../container/manage-deliveryagent-warehouse-mapping"
import MapDeliveryAgentToWarehouse from "./../components/manage-deliveryagent-warehouse-mapping/map-deliveryagent-to-warehouse"
import DeliveryAgentLocalityMapping from "../container/manage-deliveryagent-locality-mapping"
import MapDeliveryAgentToLocality from "../components/manage-deliveryagent-locality-mapping/map-deliveryagent-to-locality"
import DSPCityMapping from "../container/manage-dsp-city-mapping"
import MapDSPToCity from '../components/manage-dsp-city-mapping/map-dsp-to-city'
//import EditDSPMappedToCity from "../components/manage-dsp-city-mapping/edit-dsp-city-mapping"
import EditDSPMappedToCity from "../components/manage-dsp-city-mapping/edit-dsp-city-mapping"
// import CreateDSPMapping from "../components/manage-dsp-city-mapping/create-dsp-city-mapping"
// import EditDSPMapping from "../components/manage-dsp-city-mapping/edit-dsp-city-mapping"
import DeliveryServiceProvider from "./../container/manage-delivery-service-provider"
import CreateDeliveryServiceProvider from "../components/manage-delivery-service-provider/create-delivery-service-provider"
import EditDeliveryServiceProvider from "../components/manage-delivery-service-provider/edit-delivery-service-provider"
import ManageDenominations from "./../container/manage-denominations"
import CreateDenominations from "./../components/manage-denominations/create-denominations"
import EditDenominations from "../components/manage-denominations/edit-denominations"

import ManageConversionRate from "./../container/manage-conversion-rate"
// import asyncComponent from './../../asyncComponent'
/**
 * Dynamic imports
 */

// const ManageStates = asyncComponent(() => import("./manage-states").then(module => module.default),{ name: "Page 1" })
// const ManageCities = asyncComponent(() => import("./manage-cities").then(module => module.default),{ name: "Page 1" })
// const ManageLocalities = asyncComponent(() => import("./manage-localities").then(module => module.default),{ name: "Page 1" })
// const DeliveryMapManager = asyncComponent(() => import("./delivery-map-manager").then(module => module.default),{ name: "Page 1" })
// const LocalityMapManager = asyncComponent(() => import("./locality-map-manager").then(module => module.default),{ name: "Page 1" })
// const ManageImageAds = asyncComponent(() => import("./manage-image-ads").then(module => module.default),{ name: "Page 1" })
// const UploadSearchData = asyncComponent(() => import("./upload-search-data").then(module => module.default),{ name: "Page 1" })
// const GeoFenceCheck = asyncComponent(() => import("./geo-fence-check").then(module => module.default),{ name: "Page 1" })

const history = createHistory()

class App extends React.Component {
  constructor() {
    super()
    // console.log(getBreadCrumbPath());
    this.state = {
      key: 0,
      isDrawerOpen: false,
      headerTitle: getBreadCrumbPath().length ? getBreadCrumbPath() : 'Welcome'
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    // this.setHeaderTitle = this.setHeaderTitle.bind(this)
  }

  componentDidMount() {
    /**
     * Listening for route changes to set breadcrumb.
     * Please keep url and breadcrumb path same e.g.
     * "/manage-cities/create-city" => "Manage Cities / Create City"
     */
    const breadCrumbUri = getUriFromBreadCrumb(this.state.headerTitle)
    history.listen((location) => {
      const { key } = this.state
      this.setState({ key: key + 1 })
      if (location.pathname !== breadCrumbUri) {
        this.setState({ headerTitle: getBreadCrumbPath(breadCrumbUri) })
      }
    })
  }

  toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }
  handleCloseDrawer() {
    this.setState({ isDrawerOpen: false })
  }
  // setHeaderTitle() {
  //   let x = this.state.key
  //   x = x + 1
  //   this.setState({ headerTitle: getBreadCrumbPath(), key: x })
  // }
  handleLogout() {
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }

    fetch(`${Api.authUrl}/user/logout`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          localStorage.clear()
          location.href = '/login'
          return
        }
        response.json().then((data) => {
          localStorage.clear()
          location.href = '/login'
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        localStorage.clear()
        location.href = '/login'
      })
  }
  render() {
    const { isDrawerOpen, headerTitle } = this.state
    return (
      <Router history={history}>
        <div>
          <MuiThemeProvider>
            <div>
              <Header
                logout={this.handleLogout}
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={this.toggleDrawer}
                headerTitle={headerTitle}
              />
              <NavigationBar
                setHeaderTitle={this.setHeaderTitle}
                isDrawerOpen={isDrawerOpen}
                toggleDrawer={this.toggleDrawer}
                handleCloseDrawer={this.handleCloseDrawer}
              />
              <DisplayScreen key={this.state.key}>
                <Switch>
                  <Route exact path="/" component={WelcomeScreen} />
                  <Route exact path="/home" component={WelcomeScreen} />
                  <Route exact path="/home/manage-localities" component={ManageLocalities} />
                  <Route exact path="/home/manage-states" component={ManageStates} />
                  <Route exact path="/home/manage-states/possession-limits/:stateShortName" component={ManageStatePossessionLimits} />
                  <Route exact path="/home/manage-states/possession-limit/create/:stateShortName" component={CreatePossessionLimit} />
                  <Route exact path="/home/manage-states/possession-limit/edit/:stateShortName" component={EditPossessionLimit} />
                  <Route exact path="/home/manage-states/create-new-state" component={CreateState} />
                  <Route exact path="/home/manage-states/:stateSlug" component={ViewState} />

                  <Route exact path="/home/manage-brand-manager" component={ManageBrandManager} />
                  <Route exact path="/home/manage-brand-manager/create" component={CreateBrandManager} />
                  <Route exact path="/home/manage-brand-manager/edit/:managerId" component={EditBrandManager} />

                  <Route exact path="/home/manage-state-timings" component={ManageStateTimings} />
                  <Route exact path="/home/manage-state-timings/create" component={CreateStateTiming} />
                  <Route exact path="/home/manage-state-timings/edit" component={UpdateStateTiming} />

                  <Route exact path="/home/manage-cities/possession-limit" component={ManageCityPossessionLimits} />
                  <Route exact path="/home/manage-cities/possession-limit/create" component={CreateCityPossessionLimit} />
                  <Route exact path="/home/manage-cities/possession-limit/edit" component={UpdateCityPossessionLimit} />

                  <Route exact path="/home/customer-transactions" component={CustomerTransactions} />
                  <Route exact path="/home/customer-transactions/add-credits" component={AddCredits} />
                  <Route exact path="/home/customer-transactions/view-credits" component={ViewCredits} />

                  <Route exact path="/home/manage-refund" component={ManageRefund} />

                  <Route exact path="/home/manage-cities" component={ManageCities} />
                  <Route exact path="/home/manage-cities/create-new-city" component={CreateCity} />
                  <Route exact path="/home/manage-cities/:citySlug/localities" component={CreateLocality} />
                  <Route exact path="/home/manage-cities/:citySlug/boundary" component={ManageLocalities} />
                  <Route exact path="/home/manage-cities/:citySlug/create-boundary" component={ManageLocalities} />
                  <Route exact path="/home/manage-cities/localities/edit/:id" component={ViewLocalities} />
                  <Route exact path="/home/manage-cities/:citySlug" component={ViewCity} />
                  <Route exact path="/home/manage-city-fee/:cityId" component={ManageCitiesFee} />
                  <Route exact path="/home/manage-city-fee/:cityId/create" component={CreateCityFee} />
                  <Route exact path="/home/manage-city-fee/:cityId/edit" component={EditCityFee} />

                  <Route exact path="/home/manage-city-payment/:cityId" component={ManageCityPayment} />
                  <Route exact path="/home/manage-city-payment/:cityId/create" component={CreateCityPayment} />
                  <Route exact path="/home/manage-city-payment/:cityId/edit" component={UpdateCityPayment} />

                  <Route exact path="/home/manage-locality-fee/:localityId" component={ManageLocalityFee} />
                  <Route exact path="/home/manage-locality-fee/:localityId/create" component={CreateLocalityFee} />
                  <Route exact path="/home/manage-locality-fee/:localityId/edit" component={UpdateLocalityFee} />

                  <Route exact path="/home/manage-localities/create-new-locality" component={CreateLocality} />
                  <Route exact path="/home/manage-localities/:localitySlug" component={ViewLocality} />

                  <Route exact path="/home/delivery-agent-mapping/" component={DeliveryMapManager} />
                  <Route exact path="/home/delivery-agent-mapping/:delivererSlug" component={ViewDeliverer} />

                  <Route exact path="/home/locality-mapping/" component={LocalityMapManager} />
                  <Route exact path="/home/locality-mapping/:localitySlug" component={ViewLocalityMapDetails} />

                  <Route exact path="/home/upload-search-data" component={UploadSearchData} />
                  <Route exact path="/home/delivery-system-check" component={GeoFenceCheck} />
                  <Route exact path="/home/manage-image-ads" component={ManageImageAds} />
                  <Route exact path="/home/manage-image-ads/create-new-ad" component={CreateAd} />

                  <Route exact path="/home/manage-stories" component={ManageStories} />
                  <Route exact path="/home/manage-stories/create" component={CreateStory} />
                  <Route exact path="/home/manage-stories/edit/:storyId" component={UpdateStory} />
                  <Route exact path="/home/manage-mapped-stories" component={ManageMappedStories} />
                  <Route exact path="/home/map-story-to-city" component={MapStoryToCity} />

                  <Route exact path="/home/manage-deep-link-ads" component={ManageDeepLinkAds} />
                  <Route exact path="/home/manage-deep-link-ads/create-new-deep-link-ad" component={CreateDeepLinkAd} />

                  <Route exact path="/home/manage-url-ads" component={ManageUrlAds} />
                  <Route exact path="/home/manage-url-ads/create-new-url-ad" component={CreateUrlAd} />

                  <Route exact path="/home/manage-consumer-ads" component={ManageConsumerAds} />
                  <Route exact path="/home/manage-consumer-ads/create-new-consumer-ad" component={CreateConsumerAd} />

                  <Route exact path="/home/manage-banking" component={ManageBanking} />
                  <Route exact path="/home/manage-banking/edit/:bankName" component={UpdateBanking} />

                  <Route exact path="/home/manage-collection-ads" component={ManageCollectionAds} />
                  <Route exact path="/home/manage-collection-ads/create-new-ad" component={CreateCollectionAd} />

                  {/* <Route exact path="/home/delivery-agents" component={DeliveyAgentList} />
                  <Route exact path="/home/delivery-agents/create-new-delivery-agent" component={CreateDeliveryAgent} />
                  <Route exact path="/home/manage-possession-limits" component={ManagePossessionLimits} /> */}

                  <Route exact path="/home/manage-retailers/retailers" component={ManageRetailers} />
                  <Route exact path="/home/manage-retailers/update-retailer-contact/:retailerSlug" component={UpdateRetailerContact} />

                  <Route exact path="/home/hipbar-pay/rollback-transaction" component={RollbackTransaction} />
                  <Route exact path="/home/manage-collections" component={ManageCollections} />
                  <Route exact path="/home/manage-collections/create-new" component={CreateCollection} />
                  <Route exact path="/home/manage-collections/edit-collection/:collectionShortName" component={EditCollection} />
                  <Route exact path="/home/manage-collections/view-collection/:collectionShortName" component={ViewCollection} />

                  <Route exact path="/home/customer-transactions/confirm-credits" component={ConfirmCredits} />

                  <Route exact path="/home/user-specific-ads" component={ManageAds} />
                  <Route exact path="/home/user-specific-ads/create" component={CreateUserAds} />
                  <Route exact path="/home/user-specific-ads/edit/:AdId" component={UpdateUserAds} />

                  <Route exact path="/home/user-specific-promos" component={ManagePromos} />
                  <Route exact path="/home/user-specific-promos/create" component={CreateUserPromos} />
                  <Route exact path="/home/user-specific-promos/edit/:promoCode" component={UpdateUserPromos} />

                  <Route exact path="/home/retailer-specific-promos" component={ManageRetailerPromos} />
                  <Route exact path="/home/retailer-specific-promos/create" component={CreateRetailerPromos} />
                  <Route exact path="/home/retailer-specific-promos/edit/:promoCode" component={UpdateRetailerPromos} />

                  <Route exact path="/home/city-specific-promos" component={ManageCityPromos} />
                  <Route exact path="/home/city-specific-promos/create" component={CreateCityPromos} />
                  <Route exact path="/home/city-specific-promos/edit/:promoCode" component={UpdateCityPromos} />

                  <Route exact path="/home/manage-company-brand-mapping" component={MappedCompanyList} />
                  <Route exact path="/home/manage-company-brand-mapping/create" component={MapCompanyToBrand} />
                  <Route exact path="/home/manage-company-brand-mapping/edit/:brandId" component={UpdateCompanyToBrand} />

                  <Route exact path="/home/manage-company" component={ManageCompany} />
                  <Route exact path="/home/manage-company/create" component={CreateCompany} />
                  <Route exact path="/home/manage-company/edit/:companyId" component={UpdateCompany} />

                  <Route exact path="/home/manage-campaign" component={ManageCampaign} />
                  <Route exact path="/home/manage-campaign/create" component={CreateCampaign} />
                  <Route exact path="/home/manage-campaign/edit/:campaignId" component={UpdateCampaign} />

                  <Route exact path="/home/manage-fences/:cityId" component={ViewFence} />

                  <Route exact path="/home/manage-sku-promo" component={ManageSkuPromo} />
                  <Route exact path="/home/manage-sku-promo/create" component={CreateSkuPromo} />
                  <Route exact path="/home/manage-sku-promo/edit/:promoId" component={UpdateSkuPromo} />

                  <Route exact path="/home/manage-cashback-sku" component={ViewPromoList} />
                  <Route exact path="/home/manage-cashback-sku/map-sku-to-promo" component={MapSkuToPromo} />

                  <Route exact path="/home/manage-prediction" component={ViewPredictionList} />
                  <Route exact path="/home/manage-prediction/create" component={CreatePrediction} />
                  <Route exact path="/home/manage-prediction/edit/:predictionId" component={UpdatePrediction} />

                  <Route exact path="/home/manage-option" component={ViewOptionList} />
                  <Route exact path="/home/manage-option/create" component={CreateOption} />

                  <Route exact path="/home/manage-answer-mapping" component={ViewAnswer} />
                  <Route exact path="/home/manage-answer-mapping/create" component={MapAnswerToPrediction} />

                  <Route exact path="/home/manage-option-mapping" component={ViewMappedOptionList} />
                  <Route exact path="/home/manage-option-mapping/create" component={MapOptionToPrediction} />
                  {/* <Route exact path="/home/manage-option-mapping/edit/:predictionId" component={UpdateOptionToPrediction} /> */}

                  <Route exact path="/home/manage-city-mapping" component={ViewMappedCityList} />
                  <Route exact path="/home/manage-city-mapping/create" component={MapCityToPrediction} />
                  <Route exact path="/home/manage-city-mapping/edit/:predictionId" component={UpdateCityToPrediction} />

                  <Route exact path="/home/manage-reports" component={ManageReports} />

                  <Route exact path="/home/manage-gift-reconciliation" component={UploadGiftCardDetails} />
manage-delivery-service-provider
                  <Route exact path="/home/manage-cart-coupons" component={ManageCartCoupons} />
                  <Route exact path="/home/manage-product-coupons" component={ManageProductCoupons} />
                  <Route exact path="/home/manage-cart-coupons/create" component={CreateCartCoupons} />
                  <Route exact path="/home/manage-product-coupons/create" component={CreateProductCoupons} />
                  <Route exact path="/home/manage-cart-coupons/edit" component={EditCartCoupons}/>
                  <Route exact path="/home/manage-product-coupons/edit" component={EditProductCoupons} />

                  <Route exact path="/home/manage-consumer-specific-cart-coupons/" component={ManageConsumerSpecificCartCoupons} />
                  <Route exact path="/home/manage-consumer-specific-cart-coupons/edit/:couponId" component={EditConsumerSpecificCartCoupon} />

                  <Route exact path="/home/manage-warehouse" component={ManageWareHouse} />
                  <Route exact path="/home/manage-warehouse/create" component={CreateWareHouse} />
                  <Route exact path="/home/manage-warehouse/edit/:id" component={EditWareHouse} />
      
                  <Route exact path="/home/delivery-agent/" component={ManageDeliveryagent} />
                  <Route exact path="/home/delivery-agent/create" component={CreateDeliveryagent} />
                  <Route exact path="/home/delivery-agent/edit/:id" component={EditDeliveryagent} />
      
                  <Route exact path="/home/retailer-warehouse-mapping" component={ManageRetailerWarehouseMapping} />
                  <Route exact path="/home/map-retailer-to-warehouse" component={MapRetailerToWarehouse} />

                  <Route exact path="/home/delivery-agent-warehouse-mapping" component={DeliveryagentWarehouseMapping} />
                  <Route exact path="/home/map-deliveryagent-to-warehouse" component={MapDeliveryAgentToWarehouse} />

                  <Route exact path="/home/delivery-agent-locality-mapping" component={DeliveryAgentLocalityMapping} />
                  <Route exact path="/home/map-deliveryagent-to-locality" component={MapDeliveryAgentToLocality} />
      
                  <Route exact path="/home/dsp-city-mapping" component={DSPCityMapping} />
                  <Route exact path="/home/dsp-city-mapping/edit/:id" component={EditDSPMappedToCity} />  
                  {/* <Route exact path="/home/dsp-city-mapping/edit/:id" component={EditDSPMappedToCity} />                   */}
                  <Route exact path="/home/map-dsp-to-city" component={MapDSPToCity} />
                  <Route exact path="/home/dsp-city-mapping/edit/:id" component={EditDSPMappedToCity} />
                  
                  <Route exact path="/home/manage-delivery-service-provider" component={DeliveryServiceProvider} />
                  <Route exact path="/home/manage-delivery-service-provider/create" component={CreateDeliveryServiceProvider} />
                  <Route exact path="/home/manage-delivery-service-provider/edit/:id" component={EditDeliveryServiceProvider} />
                
                  <Route exact path="/home/manage-denominations" component={ManageDenominations} />
                  <Route exact path="/home/manage-denominations/create" component={CreateDenominations} />
                  <Route exact path="/home/manage-denominations/edit/:id" component={EditDenominations} />
                
                  <Route exact path="/home/manage-conversion-rate" component={ManageConversionRate} />
                </Switch>
              </DisplayScreen>
            </div>
          </MuiThemeProvider>
        </div>
      </Router>
    )
  }
}

// const mapStateToProps = state => state.main

export default App
