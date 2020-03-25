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
//import Switch from '@material-ui/core/Switch'
// import { Switch } from '@material-ui/core'
// import Toggle from 'material-ui/Toggle'
import Switch from "@components/switch"
import Moment from "moment"
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBox from '@components/ModalBox'
import Notify from "@components/Notification"
import * as Api from "./../../middleware/api"


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
  'STATUS'
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
  { width: '150px' },
  { width: '100px' }
]

class ListCoupons extends React.Component {
  constructor () {
    super()

    this.state = {
      mountDialog: false,
      couponId: "",
      couponName: "",
      activityStatus: false,
      //cityList: ""
    }

    this.editCouponDetails = this.editCouponDetails.bind(this)
    this.onToggleChange = this.onToggleChange.bind(this)
    this.updateCouponStatus = this.updateCouponStatus.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
    this.mountDialog = this.mountDialog.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
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

  mountDialog () {
    this.setState({
      mountDialog: true
    })
  }

  unmountDialog () {
    this.setState({
      mountDialog: false
    })
  }

  onToggleChange (item, value) {
    console.log("hello from toggle", item, value)
    this.mountDialog()
    this.setState({
      couponId: item.id,
      couponName: item.name,
      activityStatus: value,
      //cityList: item.city_list
    })
  }

  updateCouponStatus () {
    this.unmountDialog()
    Api.updateCouponStatus({
      id: this.state.couponId,
      is_active: this.state.activityStatus
    })
      .then((response) => {
        console.log("Successfully updated coupon status")
        this.props.history.push("/home/manage-cart-coupons")
      })
      .catch((error) => {
        console.log("Error in updating coupon status", error)
      })

  }

  setDialogState () {
    this.setState({ mountDialog: false })
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

                        <TableRowColumn style={styles[9]}>
                          <Switch onToggle={this.onToggleChange} toggled={item.is_active} value={item} />
                        </TableRowColumn>
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
            {
               this.state.mountDialog &&
              
               <ModalBox>
                <ModalHeader>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '18px' }}>{this.state.activityStatus === false ? 'Deactivate' : 'Activate'} Coupon</div>
                  </div>
                </ModalHeader>
                <ModalBody height="60px">
                  <table className="table--hovered">
                    <tbody>
                     Are you sure you want to {this.state.activityStatus === false ? 'Deactivate' : 'Activate'} {this.state.couponName} ({this.state.couponId}) ?
                   </tbody>
                  </table>
                 </ModalBody>
                <ModalFooter>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                    <button className="btn btn-primary" onClick={() => this.updateCouponStatus()}> Yes </button>
                    <button className="btn btn-secondary" onClick={() => this.unmountDialog()}> Cancel </button>
                  </div>
                </ModalFooter>
               </ModalBox>
             
            }
          </TableBody>
        </Table>
      </div>
      
    )
  }
}

export default ListCoupons