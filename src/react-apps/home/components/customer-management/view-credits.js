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
  'NAME',
  'EMAIL',
  'AMOUNT',
  'TRANSACTION ID',
  'BATCH NO'
]

const styles = [
  { width: '120px', textAlign: 'left' },
  { width: '100px', textAlign: 'left' },
  { width: '38px', textAlign: 'left' },
  { width: '60px', textAlign: 'left' },
  { width: '38px', textAlign: 'left' }
]

function ViewCredits(data) {
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
          !data.loadingCredits
          ? (
            data.creditsData.map(item => (
              <TableRow key={item.id}>
                <TableRowColumn style={styles[0]}>
                  {item.consumer_name}
                </TableRowColumn>
                <TableRowColumn style={styles[1]}>{item.email}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.amount}</TableRowColumn>
                <TableRowColumn style={styles[3]}>{item.transaction_id}</TableRowColumn>
                <TableRowColumn style={styles[4]}>{item.batch_number}</TableRowColumn>
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

export default ViewCredits
