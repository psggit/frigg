import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import { withRouter } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './../components/header'
import NavigationBar from './../components/navigation-bar'
import DisplayScreen from './display-screen'
import CreateLocality from './create-locality'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isDrawerOpen: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
  }
  toggleDrawer() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen })
  }
  handleCloseDrawer() {
    this.setState({ isDrawerOpen: false })
  }
  render() {
    const { isDrawerOpen } = this.state
    return (
    <BrowserRouter>
      <div>
        <MuiThemeProvider>
          <div>
            <Header
              isDrawerOpen={isDrawerOpen}
              toggleDrawer={this.toggleDrawer}
            />
            <NavigationBar
              isDrawerOpen={isDrawerOpen}
              toggleDrawer={this.toggleDrawer}
              handleCloseDrawer={this.handleCloseDrawer}
            />
            <DisplayScreen>
                <Switch>
                  <Route exact path="/home/manage-geofencing" component={CreateLocality} />
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
