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
  'MOBILE NUMBER',
  'QR CODE'
]

const styles = [
  { width: '38px' },
  { width: '60px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

function ViewRetailers(data) {
  return (
    <Table
      className="bordered--table"
      selectable={false}
      fixedHeader
    >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn style={styles[0]}></TableHeaderColumn>
          <TableHeaderColumn style={styles[1]}>ID</TableHeaderColumn>
          <TableHeaderColumn style={styles[2]}>NAME</TableHeaderColumn>
          <TableHeaderColumn style={styles[2]}>MOBILE NUMBER</TableHeaderColumn>
          <TableHeaderColumn style={styles[2]}>QR CODE</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        showRowHover
      >
        {
          !data.loadingRetailers
          ? (
            data.retailersData.map(item => (
              <TableRow key={item.id}>
                <TableRowColumn style={styles[0]}>
                  <NavLink
                    to={`/home/manage-retailers/update-retailer-contact/${item.retailer_name}?id=${item.id}`}
                  >
                    <FlatButton primary label="View" />
                  </NavLink>

                </TableRowColumn>
                <TableRowColumn style={styles[0]}>{item.id}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.retailer_name}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.mobile_number}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.qr_code}</TableRowColumn>
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

export default ViewRetailers
