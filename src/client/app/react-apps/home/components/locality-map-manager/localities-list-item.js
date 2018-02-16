import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const LocalityListItem = ({ locality }) => (
  <TableRow>
    <TableRowColumn>
      <a href={`/home/locality-map-manager/${locality.name}?id=${locality.id}`}>
        <FlatButton label="view" primary />
      </a>
    </TableRowColumn>
    <TableRowColumn>{ locality.id }</TableRowColumn>
    <TableRowColumn>{ locality.name }</TableRowColumn>
  </TableRow>
)

LocalityListItem.propTypes = {
  locality: PropTypes.object
}

LocalityListItem.defaultProps = {
  locality: { id: null, name: null }
}
export default LocalityListItem
