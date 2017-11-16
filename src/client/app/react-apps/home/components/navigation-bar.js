import React from 'react'
import Drawer from 'material-ui/Drawer'
import { NavLink } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'

class NavigationBar extends  React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Drawer
        docked={false}
        label="Default"
        open={this.props.isDrawerOpen}
        onRequestChange={this.props.toggleDrawer}
      >
        <NavLink exact to="/home/manage-geofencing">
          <MenuItem onClick={this.props.handleCloseDrawer}>Manage Geofencing</MenuItem>
        </NavLink>
      </Drawer>
    )
  }
}

export default NavigationBar
