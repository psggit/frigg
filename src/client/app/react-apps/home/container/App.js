import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { withRouter } from 'react-router'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Header from './../components/header'
import NavigationBar from './../components/navigation-bar'
import DisplayScreen from './display-screen'
import CreateLocality from './create-locality'
import ManageStates from './manage-states'
import ManageCities from './manage-cities'
import ManageLocalities from './create-locality'
// import '@sass/components/_heading.scss'

class App extends React.Component {
  constructor() {
    super()
    // const headerTitle = location.href.split('/').slice(4).map(item => item.split('-').join(' ')).join(' > ')
    this.state = {
      isDrawerOpen: false,
      headerTitle: 'Welcome'
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.setHeaderTitle = this.setHeaderTitle.bind(this)
  }
  toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }
  handleCloseDrawer() {
    this.setState({ isDrawerOpen: false })
  }
  setHeaderTitle(headerTitle) {
    this.setState({ headerTitle })
  }
  render() {
    const { isDrawerOpen, headerTitle } = this.state
    return (
    <BrowserRouter>
      <div>
        <MuiThemeProvider>
          <div>
            <Header
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
                  <Route exact path="/home/manage-geofencing" component={CreateLocality} />
                  <Route exact path="/home/manage-states" component={ManageStates} />
                  <Route exact path="/home/manage-cities" component={ManageCities} />
                  <Route exact path="/home/manage-cities/localities/:id" component={ManageLocalities} />
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
