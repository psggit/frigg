import React from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import { NavLink } from 'react-router-dom'
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table'

const LocalityListItem = ({ locality }) => (
  <TableRow>
    <TableRowColumn>
      <NavLink to={`/home/locality-mapping/${locality.name}?id=${locality.id}&city_id=${locality.city_id}`}>
        <FlatButton label="view" primary />
      </NavLink>
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
