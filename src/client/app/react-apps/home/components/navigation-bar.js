import React from 'react'
import Drawer from 'material-ui/Drawer'
import { NavLink } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import '@sass/components/_menu-item.scss'
import '@sass/components/_drawer.scss'
import  { getIcon } from '@utils/icons-utils'

class NavigationBar extends  React.Component {
  handleClick(title) {
    this.props.setHeaderTitle(title)
  }

  handleMenuItemClick(path) {
    if (path) {
      location.href = path
    }
  }

  render() {
    const navigationItems = [
      {
        name: 'State management',
        nestedItems: [
          { name: 'Manage states', path: '/home/manage-states' },
          { name: 'Manage Cities', path: '/home/manage-cities' },
          { name: 'Manage Localities', path: '/home/manage-localities' },
        ]
      },
      { name: 'Manage Deliverers', path: '/home/manage-deliverers', nestedItems: [] },
      { name: 'Upload search data', path: '/home/upload-search-data', nestedItems: [] }
    ]
    return (
      <Drawer
        className="drawer"
        docked
        label="Default"
        open
        onRequestChange={this.props.toggleDrawer}
      >
        <div>
          <a href="/home"><MenuItem className="menu-item-heading">Super admin-v2</MenuItem></a>
        </div>
        {
          <List>
            {
              navigationItems.map((item) => {
                const nestedItems = []
                item.nestedItems.forEach((nestedItem, i) => {
                  const nestedItemJSX = (
                    <ListItem
                      onClick={() => { this.handleMenuItemClick(nestedItem.path) }}
                      primaryText={nestedItem.name}
                    />
                  )
                  nestedItems.push(nestedItemJSX)
                })

                return (
                  <ListItem
                    onClick={() => { this.handleMenuItemClick(item.path) }}
                    primaryText={item.name}
                    initiallyOpen
                    primaryTogglesNestedList
                    nestedItems={nestedItems}
                  />
                )
              })
            }
          </List>
        }
      </Drawer>
    )
  }
}

export default NavigationBar
