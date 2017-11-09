const login = (username, password) => {
  if (username === 'madhur' && password === 'madhur') {
    console.log('Logged in');
    return true
  }
  return false
}

login('madhur', 'madhur')

import React from 'react'
import { render } from 'react-dom'

function App() {
  return <h1>login page</h1>
}

render(<App />, document.getElementById('app'))
