import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

import Toggle from 'material-ui/Toggle'

const MappedRetailersListItem = ({ mappedRetailer, mountConfirmDeleteRetailer, mountConfirmMakePrimeRetailer }) => (
  <TableRow>
    <TableRowColumn>{ mappedRetailer.id }</TableRowColumn>
    <TableRowColumn>{ mappedRetailer.org_name }</TableRowColumn>
    <TableRowColumn>
      <Toggle
        toggled={mappedRetailer.is_prime}
        onToggle={(e, val) => { mountConfirmMakePrimeRetailer(mappedRetailer.id, val) }}
      />
    </TableRowColumn>
    <TableRowColumn>
      <FlatButton
        secondary
        label="delete"
        onClick={() => { mountConfirmDeleteRetailer(mappedRetailer.id) }}
      />
    </TableRowColumn>
  </TableRow>
)

MappedRetailersListItem.propTypes = {
  mappedRetailer: PropTypes.object.isRequired,
  mountConfirmDeleteRetailer: PropTypes.func.isRequired
}

export default MappedRetailersListItem
