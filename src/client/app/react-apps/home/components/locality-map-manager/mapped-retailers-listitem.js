import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const MappedRetailersListItem = ({ mappedRetailer, mountConfirmDeleteRetailer, mountConfirmMakePrimeRetailer }) => (
  <TableRow>
    <TableRowColumn>{ mappedRetailer.id }</TableRowColumn>
    <TableRowColumn>{ mappedRetailer.org_name }</TableRowColumn>
    <TableRowColumn>
      <FlatButton
        primary
        label="delete"
        onClick={() => { mountConfirmDeleteRetailer(mappedRetailer.id) }}
      />
    </TableRowColumn>
    <TableRowColumn>
      <FlatButton
        primary
        label="make it prime"
        onClick={() => { mountConfirmMakePrimeRetailer(mappedRetailer.id) }}
      />
    </TableRowColumn>
  </TableRow>
)

MappedRetailersListItem.propTypes = {
  mappedRetailer: PropTypes.object.isRequired,
  mountConfirmDeleteRetailer: PropTypes.func.isRequired
}

export default MappedRetailersListItem
