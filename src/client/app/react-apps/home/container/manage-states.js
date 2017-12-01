import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'
import CreateState from './../components/manage-states/create-state'
import EditState from './../components/manage-states/edit-state'
import RoleBasedComponent from '@components/RoleBasedComponent'
import RaisedButton from 'material-ui/RaisedButton'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import * as Roles from './../constants/roles'

const TableHeaderItems = [
  '',
  'ID',
  'NAME',
  'SHORT_NAME'
]

class ManageStates extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountEditState: false,
      shouldMountCreateState: false
    }
    this.mountEditStateDialog = this.mountEditStateDialog.bind(this)
    this.unmountEditStateDialog = this.unmountEditStateDialog.bind(this)
    this.mountCreateStateDialog = this.mountCreateStateDialog.bind(this)
    this.unmountCreateStateDialog = this.unmountCreateStateDialog.bind(this)
  }

  mountCreateStateDialog() {
    this.setState({ shouldMountCreateState: true })
  }

  unmountCreateStateDialog() {
    this.setState({ shouldMountCreateState: false })
  }

  mountEditStateDialog() {
    this.setState({ shouldMountEditState: true })
  }

  unmountEditStateDialog() {
    this.setState({ shouldMountEditState: false })
  }

  render() {
    return (
      <div style={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
        <Table selectable={false}>
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
              TableHeaderItems.map((item, i) => (
                <TableRow key={`table-body-row-${i}`}>
                  <TableRowColumn>
                    <button className='btn--icon' onClick={this.mountEditStateDialog}>
                      <img
                        src="/images/pencil.svg"
                        alt="edit"
                      />
                    </button>
                  </TableRowColumn>
                  <TableRowColumn>1</TableRowColumn>
                  <TableRowColumn>John Smith</TableRowColumn>
                  <TableRowColumn>Employed</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <RaisedButton
          style={{ marginTop: '40px' }}
          label="Create new state"
          primary
          onClick={this.mountCreateStateDialog}
        />
        {
          this.state.shouldMountEditState
          ? (
            <EditState
              shouldMountEditState={this.state.shouldMountEditState}
              unmountEditStateDialog={this.unmountEditStateDialog}
            />
          )
          : ''
        }

        {
          this.state.shouldMountCreateState
          ? (
            <CreateState
              shouldMountCreateState={this.state.shouldMountCreateState}
              unmountCreateStateDialog={this.unmountCreateStateDialog}
            />
          )
          : ''
        }
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
)(ManageStates)
