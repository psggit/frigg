import React from 'react'
import Drawer from 'material-ui/Drawer'
import { NavLink, withRouter } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import '@sass/components/_menu-item.scss'
import '@sass/components/_drawer.scss'
import  { getIcon } from '@utils/icons-utils'

class NavigationBar extends  React.Component {
  constructor() {
    super()
    this.state = {
      activeItem: 0
    }
  }
  handleClick(title) {
    this.props.setHeaderTitle(title)
  }

  handleMenuItemClick(id, path) {
    if (path) {
      this.setState({ activeItem: id })
      this.props.history.push(path)
      this.props.setHeaderTitle()
    }
  }

  render() {
    const activeItemStyle = {
      backgroundColor: '#dfdfdf'
    }
    const navigationItems = [
      {
        name: 'State management',
        nestedItems: [
          { name: 'Manage states', path: '/home/manage-states', id: 1 },
          { name: 'Manage Cities', path: '/home/manage-cities', id: 2 },
          { name: 'Manage Localities', path: '/home/manage-localities', id: 3 },
        ]
      },
      {
        name: 'Map manager',
        nestedItems: [
          { name: 'Delivery agent mapping', path: '/home/delivery-agent-mapping', id: 4 },
          { name: 'Locality mapping', path: '/home/locality-mapping', id: 5 },
        ]
      },
      { name: 'Upload search data', path: '/home/upload-search-data', id: 6, nestedItems: [] },
      { name: 'Delivery system check', path: '/home/delivery-system-check', id: 7, nestedItems: [] },
      {
        name: 'Ads management',
        nestedItems: [
          { name: 'Manage image ads', path: '/home/manage-image-ads', id: 8 }
        ]
      }
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
                item.nestedItems.forEach((nestedItem) => {
                  const nestedItemJSX = (
                    <ListItem
                      style={nestedItem.id === this.state.activeItem ? activeItemStyle : {}}
                      value={nestedItem.id}
                      onClick={() => { this.handleMenuItemClick(nestedItem.id, nestedItem.path) }}
                      primaryText={nestedItem.name}
                    />
                  )
                  nestedItems.push(nestedItemJSX)
                })

                return (
                  <ListItem
                    style={item.id === this.state.activeItem ? activeItemStyle : {}}
                    onClick={() => { this.handleMenuItemClick(item.id, item.path) }}
                    primaryText={item.name}
                    initiallyOpen={true}
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

export default withRouter(NavigationBar)
