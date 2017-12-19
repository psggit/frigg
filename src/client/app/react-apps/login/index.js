import React from 'react'
import Form from './form'

class Login extends React.Component {
  constructor() {
    super()
  }

  componentWillMount() {
    if (!location.href.split('/')[3].length) history.pushState(null, null, '/login')
  }

  render() {
    return (
      <div>
        <Form />
      </div>
    )
  }
}

export default Login
