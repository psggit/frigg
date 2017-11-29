import React from 'react'

class RoleBasedComponent extends React.Component {
  render() {
    const hasuraRole = 'support'
    return (
      <div>
        {
          this.props.supportedRoles.indexOf(hasuraRole) > -1 ? this.props.children : ''
        }
      </div>
    )
  }
}

export default RoleBasedComponent
