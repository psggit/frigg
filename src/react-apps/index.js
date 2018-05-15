import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Redirect } from 'react-router'
import asyncComponent from './asyncComponent'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Login = asyncComponent(() => import("./login").then(module => module.default),{ name: "Page 1" })
const Home = asyncComponent(() => import("./home/container/Root").then(module => module.default),{ name: "Page 1" })
const loggedIn = localStorage.getItem('_hipbaru') ? true : false

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            loggedIn ? (
              <Redirect to="/home"/>
            ) : (
              <Login/>
            )
          )}/>
          <Route path='/login' component={Login} />
          <Route path='/home' component={Home} />
        </div>
      </Router>
    )
  }
}

render(<App />, document.getElementById('root'))

export default App
