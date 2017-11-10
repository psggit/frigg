import React from 'react'

class DisplayScreen extends React.Component {
  render() {
    const displayScreenStyle = {
      padding: '20px'
    }
    return (
      <div style={displayScreenStyle}>
        {
          this.props.children
          ? this.props.children
          : 'Welcome to hipbar super admin'
        }
      </div>
    )
  }
}

export default DisplayScreen
