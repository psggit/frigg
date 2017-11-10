import React from 'react'
import PropTypes from 'prop-types'

class Link extends React.Component {
  handleClick(e, url) {
    history.pushState(null, null, `/home${url}`)
    e.preventDefault()
  }
  render() {
    const { url } = this.props
    return (
      <a
        href={url}
        onClick={e => this.handleClick(e, url)}
      >
        { this.props.children }
      </a>
    )
  }
}

Link.propTypes = {
  url: PropTypes.string
}

export default Link
