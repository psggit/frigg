import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import CircularProgress from 'material-ui/CircularProgress'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  '',
  'ID',
  'NAME',
  'SHORT_NAME'
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
            TableHeaderItems.map((item, i) => <TableHeaderColumn key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
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
                <TableRowColumn >
                  <button
                    className="btn--icon"
                    onClick={() => { data.mountEditStateDialog(item) }}
                  >
                    <img
                      src="/images/pencil.svg"
                      alt="edit"
                    />
                  </button>
                </TableRowColumn>
                <TableRowColumn>{item.id}</TableRowColumn>
                <TableRowColumn>{item.state_name}</TableRowColumn>
                <TableRowColumn>{item.short_name}</TableRowColumn>
              </TableRow>
            ))
          )
          : <CircularProgress />
        }
      </TableBody>
    </Table>
  )
}

export default ViewCities
