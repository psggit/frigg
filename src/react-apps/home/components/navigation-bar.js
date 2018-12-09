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
  // handleClick(title) {
  //   this.props.setHeaderTitle(title)
  // }

  handleMenuItemClick(id, path) {
    if (path) {
      this.setState({ activeItem: id })
      this.props.history.push(path)
      // this.props.setHeaderTitle()
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
          { name: 'Manage image ads', path: '/home/manage-image-ads', id: 8 },
          { name: 'Manage collection ads', path: '/home/manage-collection-ads', id: 13 },
          { name: 'Manage deep link ads', path: '/home/manage-deep-link-ads', id: 15 },
          { name: 'Manage url ads', path: '/home/manage-url-ads', id: 16 }
        ]
      },
      {
        name: 'Delivery management',
        nestedItems: [
          { name: 'Delivery person list', path: '/home/delivery-agents', id: 9 },
          { name: 'Manage possession limits', path: '/home/manage-possession-limits', id: 10 }
        ]
      },
      {
        name: 'Manage retailers',
        nestedItems: [
          { name: 'Retailers list', path: '/home/manage-retailers/retailers', id: 11 }
        ]
      },
      {
        name: 'HipBar Pay',
        nestedItems: [
          { name: 'Rollback transaction', path: '/home/hipbar-pay/rollback-transaction', id: 12 }
        ]
      },
      {
        name: 'Customer management',
        nestedItems: [
          { name: 'Customer Transactions', path: '/home/customer-transactions', id: 14 },
        ]
      },
      {
        name: 'Manage Collections',
        path: '/home/manage-collections',
        id: 15,
        nestedItems: []
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
              navigationItems.map((item, i) => {
                const nestedItems = []
                item.nestedItems.forEach((nestedItem) => {
                  const nestedItemJSX = (
                    <ListItem
                      key={nestedItem.id}
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
                    key={i}
                    style={item.id === this.state.activeItem ? activeItemStyle : {}}
                    onClick={() => { this.handleMenuItemClick(item.id, item.path) }}
                    primaryText={item.name}
                    initiallyOpen={false}
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
