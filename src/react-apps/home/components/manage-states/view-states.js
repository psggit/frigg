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

const TableHeaderItems = [
  '',
  'ID',
  'NAME',
  'SHORT_NAME',
  'PRICE_TYPE'
]

const styles = [
  { width: '38px' },
  { width: '60px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' },
  { width: '100px' }
]

function ViewCities(data) {
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
          !data.loadingStates
          ? (
            data.statesData.map(item => (
              <TableRow key={item.id}>
                <TableRowColumn style={styles[0]}>
                  <NavLink
                    // target="_blank"
                    // exact
                    // to={`/home/manage-states/${item.state_name}?id=${item.id}`}
                    to={`/home/manage-states/${item.state_name}?id=${item.id}&stateName=${item.state_name}&stateShortName=${item.short_name}&priceType=${item.price_type}`}
                  >
                    <FlatButton primary label="View" />
                  </NavLink>

                </TableRowColumn>
                <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.state_name}</TableRowColumn>
                <TableRowColumn style={styles[3]}>{item.short_name}</TableRowColumn>
                <TableRowColumn style={styles[4]}>{item.price_type}</TableRowColumn>
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
