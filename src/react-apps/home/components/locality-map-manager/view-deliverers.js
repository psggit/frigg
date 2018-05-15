import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { getQueryObj } from '@utils/url-utils'
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
  'MAPPED LOCALITY',
  ''
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

class ViewDeliverers extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedDeliveryAgent: null,
      clickedCell: -1
    }
    this.handleAddDpToLocalityMap = this.handleAddDpToLocalityMap.bind(this)
    this.expandColumn = this.expandColumn.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchUnmappedDpToLocality({
      locality_id: parseInt(this.props.locality_id)
    })
  }

  expandColumn(clickedCell) {
    this.setState({ clickedCell })
  }

  handleAddDpToLocalityMap(id) {
    this.props.actions.addDpToLocalityMap({
      dp_id: parseInt(id),
      locality_id: parseInt(this.props.locality_id)
    })
    this.props.handleClose()
  }

  render() {
    const {
      unmappedDpToLocality,
      loadingUnmappedDpToLocality
    } = this.props

    return (
      <div>
        <Table
          onCellClick={this.expandColumn}
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
              !loadingUnmappedDpToLocality
              ? (
                unmappedDpToLocality.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableRowColumn style={styles[0]}>{item.id}</TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.name}</TableRowColumn>
                    <TableRowColumn
                      className={i === this.state.clickedCell ? 'white-space-wrap' : ''}
                      style={{ width: '120px', cursor: 'pointer' }}
                    >
                      {item.mapped_locality}
                    </TableRowColumn>
                    <TableRowColumn style={styles[2]}>
                      <FlatButton
                        label="add"
                        primary
                        onClick={() => {
                          this.handleAddDpToLocalityMap(item.id)
                        }}
                      />
                    </TableRowColumn>
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
)(ViewDeliverers)
