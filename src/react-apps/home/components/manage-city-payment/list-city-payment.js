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
// import * as Api from "../../middleware/api"
// import Switch from "@components/switch"
// import ModalBody from '@components/ModalBox/ModalBody'
// import ModalHeader from '@components/ModalBox/ModalHeader'
// import ModalFooter from '@components/ModalBox/ModalFooter'
// import ModalBox from '@components/ModalBox'

const TableHeaderItems = [
  '',
  'APP TYPE',
  'JP PAYMENT',
  'UPI TIME LIMIT',
  'ICICI PAYMENT',
  'UPI LOW RATE MESSAGE',
  'IS JP WALLETS ENABLED',
  'IS CARD ENABLED',
  'IS NET BANKING ENABLED',
  'IS UPI LOW SUCCESS RATE',
  'IS UPI COLLECT LOW SUCCESS RATE',
  'IS JP UPI COLLECT ENABLED',
  'IS ICICI UPI INTENT ENABLED',
  'IS ICICI UPI COLLECT ENABLED',
  'PAYMENT ON DELIVERY ENABLED',
  'PAY BY CASH',
  'PAY BY UPI',
]

const styles = [
  { width: '38px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
]


class ListCityPayment extends React.Component {

  constructor () {
    super()
    this.editCityPayment = this.editCityPayment.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
  }

  overrideTableStyle () {
    overrideTableStyle()
  }

  editCityPayment (item) {
    this.props.history.push(`/home/manage-city-payment/${item.city_id}/edit`, item)
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
              TableHeaderItems.map((item, i) => <TableHeaderColumn key={`table-head-col-${i}`} style={styles[i]}>{item}</TableHeaderColumn>)
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {
            !this.props.loadingCityPaymentList && this.props.cityPaymentList.length === 0 &&
            <tr>
              <td style={{ textAlign: 'center' }} colSpan='10'>
                <p style={{ fontWeight: '16px' }}>No records found</p>
              </td>
            </tr>
          }
          {
            !this.props.loadingCityPaymentList
              ? (
                this.props.cityPaymentList.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableRowColumn style={styles[0]}>
                        <button
                          onClick={() => this.editCityPayment(item)}
                        >
                          Edit
                      </button>
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.app_type}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.jp_payment_method}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.upi_time_limit}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.icici_payment_method}</TableRowColumn>
                      <TableRowColumn style={styles[5]}>{item.upi_low_rate_message}</TableRowColumn>
                      <TableRowColumn style={styles[6]}>{item.is_jp_wallets_enabled ? 'Enabled': 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[7]}>{item.is_card_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[8]}>{item.is_nb_enabled ? 'Enabled': 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[9]}>{item.is_upi_low_success_rate ? 'Enabled' : 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[10]}>{item.is_upi_collect_low_success_rate ? 'Enabled' : 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[11]}>{item.is_jp_upi_collect_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[12]}>{item.is_icici_upi_intent_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[13]}>{item.is_icici_upi_collect_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[14]}>{item.payment_on_delivery_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[15]}>{item.pay_by_cash_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                      <TableRowColumn style={styles[16]}>{item.pay_by_upi_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
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

export default ListCityPayment