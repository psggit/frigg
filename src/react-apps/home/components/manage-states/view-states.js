import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants'

const TableHeaderItems = [
  '',
  'ID',
  'NAME',
  'SHORT_NAME',
  'PRICE_TYPE',
  'UPI',
  'GIFT WALLET',
  'HIPBAR WALLET',
  ''
]

const styles = [
  { width: '38px' },
  { width: '60px' },
  { width: '120px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '100px' },
  { width: '' }
]

function ViewCities(props) {
  console.log("props", props)
  const handleView = (item) => {
    console.log("handle view")
    
    const queryParams = {
      id: item.id,
      stateName: item.state_name,
      stateShortName: item.short_name,
      priceType: item.price_type,
      isUPIEnabled: item.upi_enabled,
      isGiftWalletEnabled: item.gift_wallet_enabled,
      isHipbarWalletEnabled: item.hbwallet_enabled,
      //isCatalogEnabled: item.catalog_enabled
    }
    //console.log("histry", props.history.location)
    props.history.push(`/home/manage-states/${item.state_name}`, queryParams)
  }

  return (
    <Table
      className="bordered--table"
      selectable={false}
      fixedHeader
    >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          {
            TableHeaderItems.map((item, i) => <TableHeaderColumn style={styles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
          }
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        showRowHover
      >
        {
          !props.loadingStates
          ? (
            props.statesData.map(item => (
              <TableRow key={item.id}>
                <TableRowColumn style={styles[0]}>
                  <FlatButton
                    primary
                    label="View"
                    onClick={() => handleView(item)}
                  />
                </TableRowColumn>
                <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.state_name}</TableRowColumn>
                <TableRowColumn style={styles[3]}>{item.short_name}</TableRowColumn>
                <TableRowColumn style={styles[4]}>{item.price_type}</TableRowColumn>
                <TableRowColumn style={styles[5]}>{item.upi_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                <TableRowColumn style={styles[6]}>{item.gift_wallet_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                <TableRowColumn style={styles[7]}>{item.hbwallet_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                <TableRowColumn style={styles[8]}>
                    <NavLink to={`/home/manage-states/possession-limits/${item.short_name}`}>Possession Limits</NavLink>
                </TableRowColumn>
              </TableRow>
            ))
          )
          : (
            [1, 2, 3, 4, 5].map(() => (
              <TableLoadingShell />
            ))
          )
        }
      </TableBody>
    </Table>
  )
}

export default ViewCities
