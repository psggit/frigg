import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'

const Header = (props) => {
  return (
    <AppBar
      title="Super admin"
      onLeftIconButtonTouchTap={props.toggleDrawer}
      iconElementRight={<FlatButton label="Logout" />}
    />
  )
}

Header.propTypes = {
  toggleDrawer: PropTypes.func
}

export default Header