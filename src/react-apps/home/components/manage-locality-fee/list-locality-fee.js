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
import Switch from "@components/switch"
import ModalBody from '@components/ModalBox/ModalBody'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBox from '@components/ModalBox'
import * as Api from "../../middleware/api"

const TableHeaderItems = [
  '',
  'ID',
  'LOCALITY ID',
  'TITLE',
  'ORDER TYPE',
  'CHARGE TYPE',
  'FLAT',
  'PERCENTAGE',
  'MIN_VALUE',
  'MAX_VALUE',
  'PLATFORM',
  'START TIME',
  'END TIME',
  'MIN CART VALUE',
  'MAX CART VALUE',
  'IS_ACTIVE'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
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
  { width: '100px' }
]


class ListLocalityFee extends React.Component {

  constructor() {
    super()

    this.state = {
      mountDialog: false,
      activityStatus: false,
      feeId: "",
      feeTitle: ""
    }

    this.editLocalityFee = this.editLocalityFee.bind(this)
    this.mountDialog = this.mountDialog.bind(this)
    this.onToggleChange = this.onToggleChange.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
    this.updateFeeStatus = this.updateFeeStatus.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editLocalityFee(item) {
    this.props.history.push(`/home/manage-locality-fee/${item.locality_id}/edit`, item)
  }

  mountDialog() {
    this.setState({
      mountDialog: true
    })
  }

  unmountDialog() {
    this.setState({
      mountDialog: false
    })
  }

  onToggleChange(item, value) {
    this.mountDialog()
    this.setState({
      feeId: item.id,
      feeTitle: item.title,
      activityStatus: value,
    })
  }

  updateFeeStatus() {
    this.unmountDialog()
    Api.updateLocalityFeeStatus({
      id: this.state.feeId,
      is_active: this.state.activityStatus
    })
      .then((response) => {
        location.reload()
      })
      .catch((error) => {
        console.log("Error in updating locality fee status", error)
      })
  }

  render() {
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

            !this.props.loadingLocalityFeeList && this.props.localityFeeList.length === 0 &&
            <tr>
              <td style={{ textAlign: 'center' }} colSpan='10'>
                <p style={{ fontWeight: '16px' }}>No records found</p>
              </td>
            </tr>
          }
          {
            !this.props.loadingLocalityFeeList
              ? (
                this.props.localityFeeList.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableRowColumn style={styles[0]}>
                        <button
                          onClick={() => this.editLocalityFee(item)}
                        >
                          Edit
                      </button>
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.locality_id}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.title}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.order_type}</TableRowColumn>
                      <TableRowColumn style={styles[5]}>{item.charge_type}</TableRowColumn>
                      <TableRowColumn style={styles[6]}>{item.txn_fee_flat}</TableRowColumn>
                      <TableRowColumn style={styles[7]}>{item.txn_fee_percentage}</TableRowColumn>
                      <TableRowColumn style={styles[8]}>{item.min_value}</TableRowColumn>
                      <TableRowColumn style={styles[9]}>{item.max_value}</TableRowColumn>
                      <TableRowColumn style={styles[10]}>{item.platform}</TableRowColumn>
                      <TableRowColumn style={styles[11]}>{item.start_time.substring(11, 16)}</TableRowColumn>
                      <TableRowColumn style={styles[12]}>{item.end_time.substring(11, 16)}</TableRowColumn>
                      <TableRowColumn style={styles[13]}>{item.cart_min}</TableRowColumn>
                      <TableRowColumn style={styles[14]}>{item.cart_max}</TableRowColumn>
                      <TableRowColumn style={styles[15]}>
                        <Switch onToggle={this.onToggleChange} toggled={item.is_active} value={item} />
                      </TableRowColumn>
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

          {
            this.state.mountDialog &&

            <ModalBox>
              {/* <ModalHeader>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '18px' }}>{this.state.activityStatus === false ? 'Deactivate' : 'Activate'} Coupon</div>
                </div>
              </ModalHeader> */}
              <ModalBody height="60px">
                <table className="table--hovered">
                  <tbody>
                    Are you sure you want to {this.state.activityStatus === false ? 'Deactivate' : 'Activate'} {this.state.feeTitle} ({this.state.feeId}) ?
                   </tbody>
                </table>
              </ModalBody>
              <ModalFooter>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                  <button className="btn btn-primary" onClick={() => this.updateFeeStatus()}> Yes </button>
                  <button className="btn btn-secondary" onClick={() => this.unmountDialog()}> Cancel </button>
                </div>
              </ModalFooter>
            </ModalBox>
          }
        </TableBody>
      </Table>
    )
  }
}

export default ListLocalityFee