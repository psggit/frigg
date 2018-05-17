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

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/login' component={Login} />
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} />
        </div>
      </Router>
    )
  }
}

render(<App />, document.getElementById('root'))

export default App
