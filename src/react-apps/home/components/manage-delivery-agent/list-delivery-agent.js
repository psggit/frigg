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
import Switch from "@components/switch"
import ModalBody from '@components/ModalBox/ModalBody'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBox from '@components/ModalBox'
import * as Api from "../../middleware/api"

const TableHeaderItems = [
  '',
  'DELIVERY AGENT ID',
  'NAME',
  'EMPLOYEE ID',
  'CITY ID',
  'GCM TOKEN',
  'CONTACT NUMBER',
  'ACTIVE'
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

]

class ListDeliveryAgent extends React.Component {
  constructor() {
    super()

    this.state = {
      mountDialog: false,
      deliveryAgentId: "",
      deliveryAgentName: "",
      activityStatus: false,
    }

    this.editDeliveryAgentDetails = this.editDeliveryAgentDetails.bind(this)
    this.onToggleChange = this.onToggleChange.bind(this)
    this.updateDeliveryAgentStatus = this.updateDeliveryAgentStatus.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
    this.mountDialog = this.mountDialog.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editDeliveryAgentDetails(e, item) {
    this.props.history.push(`/home/delivery-agent/edit/${item.id}`, item)
  }

  mountDialog() {
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
      deliveryAgentId: item.id,
      deliveryAgentName: item.name,
      activityStatus: value,
    })
  }

  updateDeliveryAgentStatus() {
    this.unmountDialog()
    Api.updateDeliveryAgentStatus({
      id: this.state.deliveryAgentId,
      is_active: this.state.activityStatus
    })
      .then((response) => {
        console.log("Successfully Updated Delivery Agent")
        // if (location.pathname.includes("delivery-agent")) {
        //   this.props.history.push("/home/delivery-agent")
        // } else {
        this.props.history.push("/home/delivery-agent")
        //}
      })
      .catch((error) => {
        console.log("Error in updating coupon status", error)
      })

  }

  setDialogState() {
    this.setState({ mountDialog: false })
  }


  render() {
    const { loadingDeliveryagent, deliveryAgent } = this.props
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
              !loadingDeliveryagent && deliveryAgent.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No Delivery Agent details found</p>
                </td>
              </tr>
            }
            {
              !loadingDeliveryagent
                ? (
                  deliveryAgent.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editDeliveryAgentDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.employee_id}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.city_id}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.gcm_token}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.contact_number}</TableRowColumn>
                        <TableRowColumn style={styles[7]}>
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
                    <div style={{ fontSize: '18px' }}>{this.state.activityStatus === false ? 'Deactivate' : 'Activate'} Delivery Agent</div>
                  </div>
                </ModalHeader>
                <ModalBody height="60px">
                  <table className="table--hovered">
                    <tbody>
                      Are you sure you want to {this.state.activityStatus === false ? 'Deactivate' : 'Activate'} {this.state.deliveryAgentName} ({this.state.deliveryAgentId}) ?
                   </tbody>
                  </table>
                </ModalBody>
                <ModalFooter>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                    <button className="btn btn-primary" onClick={() => this.updateDeliveryAgentStatus()}> Yes </button>
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

export default ListDeliveryAgent