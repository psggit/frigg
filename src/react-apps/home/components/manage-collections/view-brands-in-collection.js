// import React from 'react'

// class ViewBrandsInCollection extends React.Component {
//   render() {
//     return (
//       <div></div>
//     )
//   }
// }

// export default ViewBrandsInCollection


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
  'SHORT_NAME',
  // ''
]

const styles = [
  { width: '38px' },
  { width: '60px' },
  { width: '120px' },
]

function ViewBrandsInCollection(data) {
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
          // data.brandList.length > 0
          // ? (
            data.brandList.map(item => (
              <TableRow key={item.brand_id}>
                <TableRowColumn style={styles[0]}>
                  {/* <NavLink
                    // target="_blank"
                    // exact
                    // to={`/home/manage-cities/${item.name}?id=${item.id}`}
                    to={`/home/manage-cities/${item.name}?id=${item.id}&stateShortName=${item.state_short_name}`}
                  >
                    <FlatButton primary label="View" />
                  </NavLink> */}
                  <button onClick={() => data.removeBrand({brand_id: item.brand_id, short_name: item.short_name})}> delete </button>
                </TableRowColumn>
                <TableRowColumn style={styles[1]}>{item.brand_id}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.short_name}</TableRowColumn>
      
              </TableRow>
            ))
          // )
          // : (
          //   [1, 2, 3, 4, 5].map(() => (
          //     <TableLoadingShell />
          //   ))
          // )
        }
      </TableBody>
    </Table>
  )
}

export default ViewBrandsInCollection
