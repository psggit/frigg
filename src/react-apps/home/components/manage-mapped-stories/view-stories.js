import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
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
  'TYPE',
  ''
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

class ViewStories extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   clickedCell: -1
    // }
    //this.handleAddRetailerToDpMap = this.handleAddRetailerToDpMap.bind(this)
    //this.expandColumn = this.expandColumn.bind(this)
  }

  // componentDidMount() {
  //   const queryObj = getQueryObj(location.search.slice(1))
  //   this.props.actions.fetchUnmappedRetailersToLocality({
  //     locality_id: parseInt(queryObj.id)
  //   })
  // }

  // expandColumn(clickedCell) {
  //   this.setState({ clickedCell })
  // }

  // handleAddRetailerToDpMap(id) {
  //   const queryObj = getQueryObj(location.search.slice(1))
  //   this.props.actions.addRetailerToLocalityMap({
  //     retailer_id: parseInt(id),
  //     locality_id: parseInt(queryObj.id)
  //   })

  //   this.props.handleClose()
  // }

  render() {
    const {
      loadingStories,
      stories
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
              !loadingStories
                ? (
                  stories.map((item, i) => (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.name}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.type}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>
                        <FlatButton
                          label="add"
                          primary
                          onClick={() => {
                            this.props.handleAddStoryToCityMap(item.id)
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

// const mapStateToProps = state => state.main

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(Actions, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ViewRetailers)

export default ViewStories
