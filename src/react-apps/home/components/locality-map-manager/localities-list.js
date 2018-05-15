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
import LocalityListItem from './localities-list-item'

const LocalitiesList = ({ localities, loadingLocalities }) => (
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
        <TableHeaderColumn />
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>NAME</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      showRowHover
    >
      {
        !loadingLocalities
        ? localities.map(locality => (
          <LocalityListItem
            locality={locality}
          />
        ))
        : [1, 2, 3, 4].map(i => (
          <TableLoadingShell key={i} />
        ))
      }
    </TableBody>
  </Table>
)

LocalitiesList.propTypes = {
  localities: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingLocalities: PropTypes.bool.isRequired
}

export default LocalitiesList
