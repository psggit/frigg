import React from "react"
import { rewardCoupons } from "./../../middleware/mock-data"
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
  'CAMPAIGN ID',
  'COUPON ID',
  'COUPON NAME',
  'MIN AMOUNT',
  'MAX AMOUNT',
  'EXPIRY',
  'ORDER TYPE',
  'COUNT',
  'START TIME',
  'END TIME',
  'ACTIVITY STATUS'
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '150px' },
  { width: '150px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' }
]

class ViewCoupons extends React.Component {
  constructor() {
    super()

    this.editCouponDetails = this.editCouponDetails.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editCouponDetails(e, item) {
    this.props.history.push("/home/manage-reward-coupons/edit", item)
  }

  render() {
    // console.log("Reward coupons", rewardCoupons)
    const { loadingRewardCoupons, rewardCoupons } = this.props
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
              !loadingRewardCoupons
                ? (
                  rewardCoupons.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editCouponDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.campaign_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.coupon_id}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.coupon_name}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.min_amount}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.max_amount}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.expiry}</TableRowColumn>
                        <TableRowColumn style={styles[7]}>{item.order_type}</TableRowColumn>
                        <TableRowColumn style={styles[8]}>{item.count}</TableRowColumn>
                        <TableRowColumn style={styles[9]}>{Moment(item.start_time).format("DD-MM-YYYY h:mm a")}</TableRowColumn>
                        <TableRowColumn style={styles[10]}>{Moment(item.end_time).format("DD-MM-YYYY h:mm a")}</TableRowColumn>
                        <TableRowColumn style={styles[11]}>{item.activity_status ? "Active" : "Inactive"}</TableRowColumn>
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

export default ViewCoupons