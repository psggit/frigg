import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton'
import { overrideTableStyle } from './../../../utils'
import * as Api from "../../middleware/api"
import FlatButton from 'material-ui/FlatButton'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBox from '@components/ModalBox'
import Switch from "@components/switch"
import Notify from "@components/Notification"
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  '',
  '',
  'ID',
  'NAME',
  'REMAINING ORDER COUNT',
  'PAYMENT ON DELIVERY ENABLED',
  'PAY BY CASH',
  'PAY BY UPI',
  'IS_CONSIDER_FEE',
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' }
]

class ViewLocalities extends React.Component {
  constructor () {
    super()

    this.state = {
      mountDialog: false,
      considerLocalityFee: false,
      localityId: "",
      localityName: ""
    }

    this.mountDialog = this.mountDialog.bind(this)
    this.onToggleChange = this.onToggleChange.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
    this.updateConsiderLocalityFee = this.updateConsiderLocalityFee.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
  }

  overrideTableStyle () {
    overrideTableStyle()
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
    this.mountDialog()
    this.setState({
      localityId: item.id,
      localityName: item.name,
      considerLocalityFee: value,
    })
  }

  updateConsiderLocalityFee () {
    this.unmountDialog()
    Api.updateConsiderLocalityFee({
      id: this.state.localityId,
      is_consider: this.state.considerLocalityFee
    })
      .then((response) => {
        location.reload()
      })
      .catch((error) => {
        console.log("Error in updating consider city fee", error)
        error.response.json().then((json) => {
          Notify(json.message, "error")
        })
      })
  }

  render () {
    return (
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
            !this.props.loadingGeolocalities
              ? (
                this.props.geoLocalitiesData.fences.map(item => (
                  <TableRow key={item.id}>
                    <TableRowColumn style={styles[0]}>
                      <NavLink
                        // target="_blank"
                        // exact
                        // to={`/home/manage-cities/${item.name}?id=${item.id}`}
                        to={`/home/manage-localities/${item.name}?id=${item.id}&cityId=${item.city_id}`}
                      >
                        <FlatButton primary label="View" />
                      </NavLink>

                    </TableRowColumn>
                    <TableRowColumn style={styles[1]}>
                      <NavLink
                        to={`/home/manage-locality-fee/${item.id}`}
                      >
                        <FlatButton primary label="Fee" />
                      </NavLink>
                    </TableRowColumn>
                    <TableRowColumn style={styles[2]}>{item.id}</TableRowColumn>
                    <TableRowColumn style={styles[3]}>{item.name}</TableRowColumn>
                    <TableRowColumn style={styles[4]}>{item.remaining_order_count}</TableRowColumn>
                    <TableRowColumn style={styles[5]}>{item.payment_on_delivery_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                    <TableRowColumn style={styles[6]}>{item.pay_by_cash_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                    <TableRowColumn style={styles[7]}>{item.pay_by_upi_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                    <TableRowColumn style={styles[8]}>
                      <Switch onToggle={this.onToggleChange} toggled={item.is_consider_fee} value={item} />
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
                    Are you sure you want to {this.state.considerLocalityFee === false ? 'not consider' : 'consider'} locality {this.state.localityName} ({this.state.localityId}) ?
                   </tbody>
                </table>
              </ModalBody>
              <ModalFooter>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                  <button className="btn btn-primary" onClick={() => this.updateConsiderLocalityFee()}> Yes </button>
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

export default ViewLocalities
