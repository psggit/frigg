import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'
import { overrideTableStyle } from './../../../utils'

const TableHeaderItems = [
  '',
  'COUPON ID',
  'COUPON NAME',
]

class ListConsumerSpecificCartCoupons extends React.Component {

  constructor () {
    super()

    this.editConsumerCoupon = this.editConsumerCoupon.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
  }

  overrideTableStyle () {
    overrideTableStyle()
  }

  editConsumerCoupon (item) {
    this.props.history.push(`/home/manage-consumer-specific-cart-coupons/edit/${item.id}`, item)
  }

  render () {
    return (
      <Table
        //wrapperStyle={{ height: 'auto' }}
        className="bordered--table"
        selectable={false}
        fixedHeader
      >
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
            
            !this.props.loadingConsumerSpecificCartCoupon && this.props.consumerSpecificCartCoupons.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No records found</p>
                </td>
              </tr>
          }
          {
            !this.props.loadingConsumerSpecificCartCoupon
              ? (
                this.props.consumerSpecificCartCoupons.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableRowColumn>
                        <button
                          onClick={() => this.editConsumerCoupon(item)}
                        >
                          Edit
                      </button>
                      </TableRowColumn>
                      <TableRowColumn>{item.id}</TableRowColumn>
                      <TableRowColumn>{item.name}</TableRowColumn>
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
    )
  }
}

export default ListConsumerSpecificCartCoupons