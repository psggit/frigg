import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {  Api } from '@utils/config'
import "whatwg-fetch"
import { Router } from 'react-router'
import { connect } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './../components/header'
import NavigationBar from './../components/navigation-bar'
import DisplayScreen from './display-screen'
import WelcomeScreen from './welcome-screen'
import ManageStates from './manage-states'
import ManageCities from './manage-cities'
import ManageLocalities from './manage-localities'
import ManageRetailers from './manage-retailers'
import DeliveryMapManager from './delivery-map-manager'
import LocalityMapManager from './locality-map-manager'
import ViewLocalities from './../components/manage-geofencing/view-locality'
import NotFound from './../../../react-apps/not-found'
import ViewCity from './../components/manage-cities/view-city-details'
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
import ManageCollectionAds from './manage-collection-ads'
import ManageCollections from './manage-collections'
import UploadSearchData from './upload-search-data'
import GeoFenceCheck from './geo-fence-check'
import DeliveyAgentList from './../components/delivery-management/delivery-agent-list'
import CreateDeliveryAgent from './../components/delivery-management/create-delivery-agent'
import ManagePossessionLimits from './../components/delivery-management/manage-possession-limits'
import CreateCollection from './../components/manage-collections/view-collection-details'
import EditCollection from './../components/manage-collections/edit-collection'
// import ViewCollectionList from './../components/manage-collections/view-collections'
import ViewCollection from './../components/manage-collections/view-collection'
import RollbackTransaction from './rollback-transaction'
import { getBreadCrumbPath, getUriFromBreadCrumb } from '@utils/url-utils'
// import '@sass/components/_heading.scss'

import asyncComponent from './../../asyncComponent'

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
                      <Route exact path="/home/manage-states/create-new-state" component={CreateState} />
                      <Route exact path="/home/manage-states/:stateSlug" component={ViewState} />

                      <Route exact path="/home/manage-cities" component={ManageCities} />
                      <Route exact path="/home/manage-cities/create-new-city" component={CreateCity} />
                      <Route exact path="/home/manage-cities/:citySlug/localities" component={CreateLocality} />
                      <Route exact path="/home/manage-cities/:citySlug/boundary" component={ManageLocalities} />
                      <Route exact path="/home/manage-cities/:citySlug/create-boundary" component={ManageLocalities} />
                      <Route exact path="/home/manage-cities/localities/edit/:id" component={ViewLocalities} />
                      <Route exact path="/home/manage-cities/:citySlug" component={ViewCity} />

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

                      <Route exact path="/home/manage-collection-ads" component={ManageCollectionAds} />
                      <Route exact path="/home/manage-collection-ads/create-new-ad" component={CreateCollectionAd} />

                      <Route exact path="/home/delivery-agents" component={DeliveyAgentList} />
                      <Route exact path="/home/delivery-agents/create-new-delivery-agent" component={CreateDeliveryAgent} />
                      <Route exact path="/home/manage-possession-limits" component={ManagePossessionLimits} />

                      <Route exact path="/home/manage-retailers/retailers" component={ManageRetailers} />
                      <Route exact path="/home/manage-retailers/update-retailer-contact/:retailerSlug" component={UpdateRetailerContact} />

                      <Route exact path="/home/hipbar-pay/rollback-transaction" component={RollbackTransaction} />

                      <Route exact path="/home/manage-collections" component={ManageCollections} />
                      <Route exact path="/home/manage-collections/create-new" component={CreateCollection} />
                      <Route exact path="/home/manage-collections/edit-collection/:collectionShortName" component={EditCollection} />
                      <Route exact path="/home/manage-collections/view-collection/:collectionShortName" component={ViewCollection} />
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
