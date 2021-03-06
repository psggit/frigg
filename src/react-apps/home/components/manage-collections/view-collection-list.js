import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import FlatButton from 'material-ui/FlatButton'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  '',
  'NAME',
  'SHORT NAME',
  'DISPLAY NAME',
  'STATUS',
]

const styles = [
  { width: '38px', textAlign: 'left' },
  { width: '120px', textAlign: 'left' },
  { width: '120px', textAlign: 'left' },
  { width: '120px', textAlign: 'left' },
  { width: '120px', textAlign: 'left' },
]

function ViewCollectionList(data) {
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
          !data.loadingAllCollections
          ? (
            data.collectionsList.map(item => (
              <TableRow key={item.short_name}>
                <TableRowColumn style={styles[0]}>
                  <NavLink
                    to={`/home/manage-collections/view-collection/${item.short_name}?collectionName=${item.short_name}&collectionDisplayName=${item.display_name}`}
                  >
                    <FlatButton primary label="View" />
                  </NavLink>

                </TableRowColumn>
                <TableRowColumn style={styles[1]}>{item.name}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.short_name}</TableRowColumn>
                <TableRowColumn style={styles[3]}>{item.display_name}</TableRowColumn>
                <TableRowColumn style={styles[4]}>{ item.is_active ? 'ACTIVE' : 'INACTIVE' }</TableRowColumn>
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

export default ViewCollectionList
