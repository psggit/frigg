import React from 'react'

class DisplayScreen extends React.Component {
  render() {
    const displayScreenStyle = {
      padding: '20px',
      marginTop: '70px'
    }
    return (
      <div style={displayScreenStyle}>
        {
          this.props.children
        }
      </div>
    )
  }
}

export default DisplayScreen
