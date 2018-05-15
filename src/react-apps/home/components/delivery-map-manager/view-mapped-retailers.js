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
  'ID',
  'NAME',
  ''
]

const styles = [
  { width: '38px' },
  { width: '60px' },
  { width: '38px' },
  { width: '100px' }
]

function ViewMappedRetailers(props) {
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
            !props.loadingMappedRetailers
          ? (
            props.mappedRetailers.map(item => (
              <TableRow key={item.employee_id}>
                <TableRowColumn style={styles[0]}>{item.id}</TableRowColumn>
                <TableRowColumn style={styles[1]}>{item.org_name}</TableRowColumn>
                <TableRowColumn style={styles[2]}>
                  <FlatButton
                    label="delete"
                    secondary
                    onClick={() => {
                      props.mountConfirmDeleteRetailerFromDpMap(item.id)
                    }}
                  />
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

export default ViewMappedRetailers
