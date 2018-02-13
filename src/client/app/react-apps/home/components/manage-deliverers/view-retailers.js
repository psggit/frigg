import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  'ID',
  'NAME',
  ''
]

const styles = [
  { width: '38px' },
  { width: '60px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

class ViewRetailers extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.actions.fetchRetailers()
  }

  render() {
    const {
      loadingRetailers,
      retailers
    } = this.props

    return (
      <div>
        <Table
          className="bordered--table"
          selectable={false}
          fixedHeader
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {
                TableHeaderItems.map((item, i) => <TableHeaderColumn style={styles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
              }
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
          >
            {
              !loadingRetailers
              ? (
                retailers.map(item => (
                  <TableRow key={item.id}>
                    <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                    <TableRowColumn style={styles[2]}>{item.org_name}</TableRowColumn>
                    <TableRowColumn style={styles[3]}><FlatButton label="add" primary /></TableRowColumn>
                  </TableRow>
                ))
              )
              : (
                [1, 2, 3, 4, 5].map(() => (
                  <TableLoadingShell />
                ))
              )
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewRetailers)
