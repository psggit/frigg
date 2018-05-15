import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const MappedDeliveryAgentListItem = ({ mappedDeliveryAgent, mountConfirmDeleteDp }) => (
  <TableRow>
    <TableRowColumn>{ mappedDeliveryAgent.id }</TableRowColumn>
    <TableRowColumn>{ mappedDeliveryAgent.name }</TableRowColumn>
    <TableRowColumn>
      <FlatButton
        secondary
        label="delete"
        onClick={() => { mountConfirmDeleteDp(mappedDeliveryAgent.id) }}
      />
    </TableRowColumn>
  </TableRow>
)

// MappedDeliveryAgentListItem.propTypes = {
//   mappedDeliveryAgent: PropTypes.object.isRequired,
//   mountConfirmDeleteRetailer: PropTypes.func.isRequired
// }

export default MappedDeliveryAgentListItem
