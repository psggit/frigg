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
  'NAME'
]

const styles = [
  { width: '38px' },
  { width: '60px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

function ViewMappedLocalities(props) {
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
            !props.loadingMappedLocalities
          ? (
            props.mappedLocalities.map(item => (
              <TableRow key={item.employee_id}>
                <TableRowColumn style={styles[0]}>
                  <a
                    // target="_blank"
                    // exact
                    // to={`/home/manage-cities/${item.name}?id=${item.id}`}
                    href={`/home/manage-deliverers/${item.name}?id=${item.employee_id}`}
                  >
                    <FlatButton primary label="View" />
                  </a>

                </TableRowColumn>
                <TableRowColumn style={styles[1]}>{item.employee_id}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
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

export default ViewMappedLocalities
