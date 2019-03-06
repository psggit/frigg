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
  'PROMO CODE',
  'USER LIST',
  'ORDER TYPE',
  'PROMO STATUS'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

class ManageUserPromos extends React.Component {

  constructor() {
    super()

    this.editPromoDetails = this.editPromoDetails.bind(this)
  }

  editPromoDetails(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/user-specific-promos/edit/${item.promo_code}`, item)
  }

  render() {
    const {
      loadingUserSpecificPromos,
      userSpecificPromos
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
              !loadingUserSpecificPromos
                ? (
                  userSpecificPromos.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editPromoDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.promo_code}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.user_list}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.order_type}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn>
                      </TableRow> 
                    )
                  })
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

export default ManageUserPromos
