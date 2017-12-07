import React from 'react'

class RoleBasedComponent extends React.Component {
  render() {
    const hasuraRole = 'admin'
    return (
      <div>
        {
          this.props.supportedRoles.indexOf(hasuraRole) > -1
          ? this.props.children
          : <h2>Access Denied</h2>
        }
      </div>
    )
  }
}

export default RoleBasedComponent
