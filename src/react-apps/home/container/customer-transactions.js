import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { NavLink } from 'react-router-dom'

class CustomerTransactions extends React.Component {

  render() {
    return (
      <NavLink to={`${location.pathname}/add-credits`}>
        <RaisedButton
          label="Add Credits"
          primary
        />
      </NavLink>
    )
  }
}

export default CustomerTransactions