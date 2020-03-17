import React from 'react'
import Drawer from 'material-ui/Drawer'
import { NavLink, withRouter } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem } from 'material-ui/List'
import '@sass/components/_menu-item.scss'
import '@sass/components/_drawer.scss'
import { getIcon } from '@utils/icons-utils'

class NavigationBar extends React.Component {
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
          { name: 'Manage States', path: '/home/manage-states', id: 1 },
          { name: 'Manage State Timings', path: '/home/manage-state-timings', id: 30 },
          { name: 'Manage Cities', path: '/home/manage-cities', id: 2 },
          { name: 'Manage City Possession Limit', path: '/home/manage-cities/possession-limit', id: 31 },
          // { name: 'Manage Localities', path: '/home/manage-localities', id: 3 },
        ]
      },
      {
        name: 'Company Management',
        nestedItems: [
          { name: 'Company list', path: '/home/manage-company', id: 29 },
          { name: 'Company brand mapping', path: '/home/manage-company-brand-mapping', id: 24 }
        ]
      },
      { name: 'Brand Manager', path: '/home/manage-brand-manager', id: 32, nestedItems: [] },
      {
        name: 'Brand offers and promos',
        nestedItems: [
          { name: 'Manage campaign', path: '/home/manage-campaign', id: 21 },
          { name: 'Manage sku promo', path: '/home/manage-sku-promo', id: 22 },
          { name: 'Manage cashback sku', path: '/home/manage-cashback-sku', id: 23 },
        ]
      },
      // {
      //   name: 'Map manager',
      //   nestedItems: [
      //     { name: 'Delivery agent mapping', path: '/home/delivery-agent-mapping', id: 4 },
      //     { name: 'Locality mapping', path: '/home/locality-mapping', id: 5 },
      //   ]
      // },
      // { name: 'Upload search data', path: '/home/upload-search-data', id: 6, nestedItems: [] },
      // { name: 'Delivery system check', path: '/home/delivery-system-check', id: 7, nestedItems: [] },
      {
        name: 'Ads management',
        nestedItems: [
          { name: 'Manage consumer ads', path: '/home/manage-consumer-ads', id: 17 }
        ]
      },
      // {
      //   name: 'Delivery management',
      //   nestedItems: [
      //     { name: 'Delivery person list', path: '/home/delivery-agents', id: 9 },
      //     { name: 'Manage possession limits', path: '/home/manage-possession-limits', id: 10 }
      //   ]
      // },
      {
        name: 'Manage retailers',
        nestedItems: [
          { name: 'Retailers list', path: '/home/manage-retailers/retailers', id: 11 }
        ]
      },
      {
        name: 'Jus pay',
        nestedItems: [
          { name: 'Netbanking List', path: '/home/manage-banking', id: 18 }
        ]
      },
      // {
      //   name: 'HipBar Pay',
      //   nestedItems: [
      //     { name: 'Rollback transaction', path: '/home/hipbar-pay/rollback-transaction', id: 12 }
      //   ]
      // },
      // {
      //   name: 'Customer management',
      //   nestedItems: [
      //     { name: 'Customer Transactions', path: '/home/customer-transactions', id: 14 },
      //   ]
      // },
      // {
      //   name: 'Manage Collections',
      //   path: '/home/manage-collections',
      //   id: 15,
      //   nestedItems: []
      // },
      {
        name: 'User Specific',
        nestedItems: [
          { name: 'Ads', path: '/home/user-specific-ads', id: 19 },
          // { name: 'Promos', path: '/home/user-specific-promos', id: 20 },
        ]
      },
      // {
      //   name: 'Retailer Specific',
      //   nestedItems: [
      //     { name: 'Promos', path: '/home/retailer-specific-promos', id: 29 },
      //   ]
      // },
      // {
      //   name: 'City Specific',
      //   nestedItems: [
      //     { name: 'Promos', path: '/home/city-specific-promos', id: 33 },
      //   ]
      // },
      {
        name: 'Prediction Management',
        nestedItems: [
          { name: 'Manage Prediction', path: '/home/manage-prediction', id: 25 },
          { name: 'Manage Option', path: '/home/manage-option', id: 26 },
          { name: 'Map City To Prediction', path: '/home/manage-city-mapping', id: 27 },
          { name: 'Map Option To Prediction', path: '/home/manage-option-mapping', id: 28 },
          { name: 'Map Answer To Prediction', path: '/home/manage-answer-mapping', id: 30 },
        ]
      },
      { name: 'Reports', path: '/home/manage-reports', id: 34, nestedItems: [] },

      { name: 'Gift Reconciliation', path: '/home/manage-gift-reconciliation', id: 36, nestedItems: [] },

      { name: 'Reward Coupons', path: '/home/manage-reward-coupons', id: 35, nestedItems: [] }
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
