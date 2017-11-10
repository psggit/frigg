import React from 'react'
import Drawer from 'material-ui/Drawer'
import Link from './../../../components/link'
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
        <Link url="/manage-geofencing">
          <MenuItem onClick={this.props.handleCloseDrawer}>Manage Geofencing</MenuItem>
        </Link>
      </Drawer>
    )
  }
}

export default NavigationBar
