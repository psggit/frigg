import React from "react"
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import TableLoadingShell from '../table-loading-shell'
import '@sass/components/_table.scss'
import { overrideTableStyle } from '../../../utils'
import Moment from "moment"


const TableHeaderItems = [
  '',
  'ID',
  'COUPAN NAME',
  'START TIME',
  'END TIME',
  'MAX COUNT',
  'AVAILABLE COUNT',
  'FREQUENCY',
  'SIGNUP DATE',
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '150px' },
  { width: '150px' },
  { width: '150px' }
]

class Listcoupons extends React.Component {
  constructor () {
    super()

    this.editCouponDetails = this.editCouponDetails.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
  }

  overrideTableStyle () {
    overrideTableStyle()
  }

  editCouponDetails (e, item) {
    this.props.history.push("/home/manage-cart-coupons/edit", item)
  }

  render () {
    const { loadingListCoupons, listCoupons } = this.props
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
              !loadingListCoupons && listCoupons.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No cart coupons found</p>
                </td>
              </tr>
            }
            {
              !loadingListCoupons
                ? (
                  listCoupons.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editCouponDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{Moment(item.start_time).format("DD-MM-YYYY h:mm a")}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{Moment(item.end_time).format("DD-MM-YYYY h:mm a")}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.max_count}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.available_count}</TableRowColumn>
                        <TableRowColumn style={styles[7]}>{item.frequency}</TableRowColumn>
                        <TableRowColumn style={styles[8]}>{Moment(item.sign_up_date) ? Moment(item.sign_up_date).format("DD-MM-YYYY h:mm a") : ""}</TableRowColumn>
                      </TableRow>
                    )
                  })
                )
                : (
                  [1, 2, 3, 4, 5].map((item, index) => (
                    <TableLoadingShell key={index} />
                  ))
                )
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default Listcoupons