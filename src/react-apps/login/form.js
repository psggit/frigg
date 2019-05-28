import React, { Fragment } from 'react'
import { createSession } from './utils'
import { Api } from '@utils/config'
import "whatwg-fetch"
import '@sass/components/_input.scss'
import '@sass/components/_form.scss'
import '@sass/components/_button.scss'

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      isSubmitting: false,
      showError: false,
      error: false,
      username: '',
      password: '',
      errorMessage: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value, error: false })
  }

  handlePress(e) {
    if (e.keyCode === 13) this.handleSubmit()
  }


  handleSubmit() {
    const { username, password } = this.state
    if (!(username.length && password.length)) {
      console.log('poiuytyuio');
      return;
    }
    const formData = {
      username,
      password
    }

    const fetchOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(formData)
    }

    this.setState({ isSubmitting: true })

    fetch(`${Api.authUrl}/login`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          response.json().then(json => {
            this.setState({ isSubmitting: false, error: true, errorMessage: json.message })
          })
          return
        }
        response.json().then((data) => {
          // localStorage.setItem('_hipbaru', JSON.stringify(data))
          createSession(data)
          location.href = '/home'
          // if (document.referrer) {
          //   location.href = document.referrer
          // } else {
          //   location.href = '/home'
          // }
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        this.setState({ isSubmitting: false })
      })
  }

  render() {
    return (
      <div style={{ marginTop: '40px' }}>
        <div className="form-group">
          <input
            placeholder="username"
            type="text"
            name="username"
            onChange={this.handleChange}
            onKeyDown={this.handlePress}
          />
        </div>
        <div className="form-group">
          <input
            autoComplete="fwefwf"
            placeholder="password"
            type="password"
            name="password"
            onChange={this.handleChange}
            onKeyDown={this.handlePress}
          />
        </div>
        <button
          disabled={this.state.isSubmitting}
          onClick={this.handleSubmit}
          style={{ marginTop: '20px', cursor: this.state.isSubmitting ? 'progress' : '' }}
          className="btn btn--primary"
        >
          Login
        </button>
        {this.state.error ? <p style={{ color: '#ff3b30' }}>{this.state.errorMessage}</p> : ''}
      </div>
    )
  }
}

export default Form
