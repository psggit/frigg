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
import TableLoadingShell from './table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  '',
  'ID'
]

const styles = [
  { width: '38px' },
  { width: '60px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

function TableView(props) {
  return (
    <Table
      className="bordered--table"
      selectable={false}
      fixedHeader
    >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          {
            props.theadData.map((item, i) => (
              <TableHeaderColumn
                style={styles[i]}
              >
                {item}
              </TableHeaderColumn>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        showRowHover
      >
        {
          !props.isLoading
          ? (
            props.tbodyData.map(item => (
              <TableRow key={item.key}>
                {
                  item.cols.map((col, i) =>(
                    <TableRowColumn style={styles[1]}>{col}</TableRowColumn>
                  ))
                }
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

export default TableView
