import React from 'react'
import Drawer from 'material-ui/Drawer'
import { NavLink } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import '@sass/components/_menu-item.scss'
import  { getIcon } from '@utils/icons-utils'

class NavigationBar extends  React.Component {
  constructor() {
    super()
  }
  handleClick(title) {
    this.props.setHeaderTitle(title)
    // this.props.handleCloseDrawer()
  }
  render() {
    const navigationItems = [
      { name: 'Manage States', path: '/home/manage-states' },
      { name: 'Manage Cities', path: '/home/manage-cities' },
      { name: 'Manage Localities', path: '/home/manage-localities' },
      { name: 'Manage Deliverers', path: '/home/manage-deliverers' }
    ]
    return (
      <Drawer
        className="drawer"
        docked={false}
        label="Default"
        open={this.props.isDrawerOpen}
        onRequestChange={this.props.toggleDrawer}
      >
        <div>
          <a href="/home"><MenuItem className="menu-item-heading">Super admin-v2</MenuItem></a>
        </div>
        {
          navigationItems.map((item, i) => (
            <a href={item.path} key={`nav-item-${i}`}>
              <MenuItem className="menu-item" onClick={() => { this.handleClick(item.name) }}>{item.name}</MenuItem>
            </a>
          ))
        }
      </Drawer>
    )
  }
}

export default NavigationBar
