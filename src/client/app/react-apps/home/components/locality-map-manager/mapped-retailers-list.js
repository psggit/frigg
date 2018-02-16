import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table'

import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'
import MappedRetailersListItem from './mapped-retailers-listitem'

const MappedRetailersList = ({
  mappedRetailers,
  loadingMappedRetailers,
  mountConfirmDeleteRetailer,
  mountConfirmMakePrimeRetailer
}) => (
  <Table
    className="bordered--table"
    selectable={false}
    fixedHeader
  >
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>NAME</TableHeaderColumn>
        <TableHeaderColumn />
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      showRowHover
    >
      {
        !loadingMappedRetailers
        ? mappedRetailers.map(mappedRetailer => (
          <MappedRetailersListItem
            key={mappedRetailer.id}
            mappedRetailer={mappedRetailer}
            mountConfirmDeleteRetailer={mountConfirmDeleteRetailer}
            mountConfirmMakePrimeRetailer={mountConfirmMakePrimeRetailer}
          />
        ))
        : [1, 2, 3, 4].map(i => (
          <TableLoadingShell key={i} />
        ))
      }
    </TableBody>
  </Table>
)

MappedRetailersList.propTypes = {
  mappedRetailers: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingMappedRetailers: PropTypes.bool.isRequired,
  mountConfirmDeleteRetailer: PropTypes.func.isRequired,
  mountConfirmMakePrimeRetailer: PropTypes.func.isRequired
}

export default MappedRetailersList
