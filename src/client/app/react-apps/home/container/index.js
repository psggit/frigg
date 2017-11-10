import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './../components/header'
import NavigationBar from './../components/navigation-bar'
import DisplayScreen from './../components/display-screen'
import CreateLocality from './../components/create-locality'

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
              <CreateLocality />
            </DisplayScreen>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
