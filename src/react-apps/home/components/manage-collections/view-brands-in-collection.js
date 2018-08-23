
import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import '@sass/components/_table.scss'

const TableHeaderItemsWithButton = [
  '',
  'ID',
  'BRAND_NAME',
  'BRAND_SHORT_NAME',
]

const TableHeaderItems = [
  'ID',
  'BRAND_NAME',
  'BRAND_SHORT_NAME',
]

const styles = [
  { width: '60px'},
  { width: '120px'},
  { width: '120px'},
]

const headerStyles = [
  { width: '38px'},
  { width: '60px'},
  { width: '120px'},
  { width: '120px'},
]

function ViewBrandsInCollection(data) {
  console.log("view brands", data)
  return (
    <Table
      className="bordered--table"
      selectable={false}
      fixedHeader
    >
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          {
            data.showDelete ?
            TableHeaderItemsWithButton.map((item, i) => <TableHeaderColumn style={headerStyles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>) :
            TableHeaderItems.map((item, i) => <TableHeaderColumn style={styles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
            
          }
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        showRowHover
      >
        {
          data.showDelete
          ? (
            data.brandList.map(item => (
              <TableRow key={item.brand_id}>
                <TableRowColumn style={headerStyles[0]}>
                  <button onClick={() => data.removeBrand({brand_id: item.brand_id, short_name: item.short_name}) } style={{fontSize: '13px', textTransform: 'none'}}> delete </button>
                </TableRowColumn>
                <TableRowColumn style={headerStyles[1]}>{item.brand_id}</TableRowColumn>
                <TableRowColumn style={headerStyles[2]}>{item.brand}</TableRowColumn>
                <TableRowColumn style={headerStyles[3]}>{item.short_name}</TableRowColumn>
      
              </TableRow>
            ))
          )
          : (
            data.brandList.map(item => (
              <TableRow key={item.brand_id}>
                <TableRowColumn style={styles[0]}>{item.brand_id}</TableRowColumn>
                <TableRowColumn style={styles[1]}>{item.brand_name}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{item.brand_short_name}</TableRowColumn>
              </TableRow>
            ))
          )
        }
      </TableBody>
    </Table>
  )
}

export default ViewBrandsInCollection
