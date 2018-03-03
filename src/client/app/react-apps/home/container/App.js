import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { withRouter } from 'react-router'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Header from './../components/header'
import NavigationBar from './../components/navigation-bar'
import DisplayScreen from './display-screen'
// import CreateLocality from './create-locality'
import WelcomeScreen from './welcome-screen'
import ManageStates from './manage-states'
import ManageCities from './manage-cities'
import ManageLocalities from './manage-localities'
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
import CreateLocality from './../components/manage-localities/create-locality'
import UploadSearchData from './upload-search-data'
import GeoFenceCheck from './geo-fence-check'
import { getBreadCrumbPath } from '@utils/url-utils'
// import '@sass/components/_heading.scss'

class App extends React.Component {
  constructor() {
    super()
    // console.log(getBreadCrumbPath());
    this.state = {
      isDrawerOpen: false,
      headerTitle: getBreadCrumbPath().length ? getBreadCrumbPath() : 'Welcome'
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.setHeaderTitle = this.setHeaderTitle.bind(this)
  }
  componentWillMount() {
    // if (!localStorage.getItem('_hipbaru'))
    // location.href = '/login'
  }
  toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }
  handleCloseDrawer() {
    this.setState({ isDrawerOpen: false })
  }
  setHeaderTitle() {
    this.setState({ headerTitle: getBreadCrumbPath() })
  }
  handleLogout() {
    localStorage.clear()
    location.href = '/login'
  }
  render() {
    const { isDrawerOpen, headerTitle } = this.state
    return (
    <BrowserRouter>
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
            <DisplayScreen>
                <Switch>
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

                  <Route exact path="/home/delivery-map-manager/" component={DeliveryMapManager} />
                  <Route exact path="/home/delivery-map-manager/:delivererSlug" component={ViewDeliverer} />

                  <Route exact path="/home/locality-map-manager/" component={LocalityMapManager} />
                  <Route exact path="/home/locality-map-manager/:localitySlug" component={ViewLocalityMapDetails} />

                  <Route exact path="/home/upload-search-data" component={UploadSearchData} />
                  <Route exact path="/home/geo-fence-check" component={GeoFenceCheck} />
                </Switch>
            </DisplayScreen>
          </div>
        </MuiThemeProvider>
      </div>
    </BrowserRouter>
    )
  }
}

export default App
