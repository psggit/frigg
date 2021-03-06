import React from "react"
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from '../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  '',
  'AD ID',
  'USER LIST',
  'APP TYPE',
  'AD STATUS'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

class ManageUserAds extends React.Component {

  constructor() {
    super()

    this.editAdDetails = this.editAdDetails.bind(this)
  }

  editAdDetails(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/user-specific-ads/edit/${item.ad_id}`, item)
  }

  render() {
    const {
      loadingUserSpecificAds,
      userSpecificAds
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
              !loadingUserSpecificAds
                ? (
                  userSpecificAds.map(item => (
                    (
                      <TableRow key={item.id}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editAdDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.ad_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.user_list}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.app_type}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn>
                      </TableRow> 
                    )
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

export default ManageUserAds
