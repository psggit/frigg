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
import MappedDeliveryAgentListItem from './mapped-delivery-agent-listitem'

const MappedDeliveryAgentList = ({
  mappedDpToLocality,
  loadingMappedDpToLocality,
  mountConfirmDeleteDp
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
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      showRowHover
    >
      {
        !loadingMappedDpToLocality
        ? mappedDpToLocality.map(mappedDeliveryAgent => (
          <MappedDeliveryAgentListItem
            key={mappedDeliveryAgent.id}
            mappedDeliveryAgent={mappedDeliveryAgent}
            mountConfirmDeleteDp={mountConfirmDeleteDp}
          />
        ))
        : [1, 2, 3, 4].map(i => (
          <TableLoadingShell key={i} />
        ))
      }
    </TableBody>
  </Table>
)

// MappedDeliveryAgentList.propTypes = {
//   mappedRetailers: PropTypes.arrayOf(PropTypes.object).isRequired,
//   loadingMappedRetailers: PropTypes.bool.isRequired,
//   mountConfirmDeleteRetailer: PropTypes.func.isRequired,
//   mountConfirmMakePrimeRetailer: PropTypes.func.isRequired
// }

export default MappedDeliveryAgentList
