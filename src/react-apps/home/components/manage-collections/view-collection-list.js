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
  'SHORT NAME',
  'DISPLAY NAME',
  'ACTIVE',
]

const styles = [
  { width: '120px', textAlign: 'left' },
  { width: '100px', textAlign: 'left' },
  { width: '38px', textAlign: 'left' },
  { width: '60px', textAlign: 'left' },
]

function ViewCollectionList(data) {
  console.log("col list", data)
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
                {/* <TableRowColumn style={styles[0]}>
                  {item.consumer_name}
                </TableRowColumn> */}
                 {/* <TableRowColumn style={styles[0]}>
                  <NavLink
                    // target="_blank"
                    // exact
                    // to={`/home/manage-states/${item.state_name}?id=${item.id}`}
                    to={`/home/manage-collections/${item.state_name}?id=${item.id}&stateName=${item.state_name}&stateShortName=${item.short_name}`}
                  >
                    <FlatButton primary label="View" />
                  </NavLink>

                </TableRowColumn> */}
                <TableRowColumn style={styles[0]}>{item.name}</TableRowColumn>
                <TableRowColumn style={styles[1]}>{item.short_name}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.display_name}</TableRowColumn>
                <TableRowColumn style={styles[3]}>{`${item.is_active}`}</TableRowColumn>
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
