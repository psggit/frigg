import React from 'react'
import Drawer from 'material-ui/Drawer'
import { NavLink } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'

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
      { name: 'Manage Cities', path: '/home/manage-cities' }
    ]
    return (
      <Drawer
        docked={false}
        label="Default"
        open={this.props.isDrawerOpen}
        onRequestChange={this.props.toggleDrawer}
      >
        {
          navigationItems.map((item, i) => (
            <a href={item.path} key={`nav-item-${i}`}>
              <MenuItem onClick={() => { this.handleClick(item.name) }}>{item.name}</MenuItem>
            </a>
          ))
        }
      </Drawer>
    )
  }
}

export default NavigationBar
