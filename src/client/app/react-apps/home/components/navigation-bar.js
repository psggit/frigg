import React from 'react'
import Drawer from 'material-ui/Drawer'
import { NavLink } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import '@sass/components/_menu-item.scss'
import '@sass/components/_drawer.scss'
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
      {
        name: 'State management',
        nestedItems: [
          { name: 'Manage states', path: '/home/manage-states' },
          { name: 'Manage Cities', path: '/home/manage-cities' },
          { name: 'Manage Localities', path: '/home/manage-localities' },
        ]
      },
      { name: 'Manage Deliverers', path: '/home/manage-deliverers', nestedItems: [] }
    ]
    return (
      <Drawer
        className="drawer"
        docked={true}
        label="Default"
        open={true}
        onRequestChange={this.props.toggleDrawer}
      >
        <div>
          <a href="/home"><MenuItem className="menu-item-heading">Super admin-v2</MenuItem></a>
        </div>
        {
          // navigationItems.map((item, i) => (
          //   <a href={item.path} key={`nav-item-${i}`}>
          //     <MenuItem className="menu-item" onClick={() => { this.handleClick(item.name) }}>{item.name}</MenuItem>
          //   </a>
          // ))
          <List>
            {
              navigationItems.map((item) => {
                const nestedItems = []
                item.nestedItems.forEach((nestedItem, i) => {
                  const nestedItemJSX = <ListItem onClick={() => location.href = nestedItem.path} primaryText={nestedItem.name} />
                  nestedItems.push(nestedItemJSX)
                })

                return (
                  <ListItem
                    primaryText={item.name}
                    initiallyOpen={true}
                    primaryTogglesNestedList={true}
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
