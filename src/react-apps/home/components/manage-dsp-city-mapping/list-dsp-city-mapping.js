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
import * as Api from "../../middleware/api"
import Notify from "@components/Notification"
import Switch from "@components/switch"
import ModalBody from '@components/ModalBox/ModalBody'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBox from '@components/ModalBox'

const TableHeaderItems = [
  '',
  'CITY NAME',
  'DSP NAME',
  'PRIORITY',
  'TURNAROUND DURATION',
  'IS ACTIVE',
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
]

class ListDSPCityMapping extends React.Component {
  constructor () {
    super()

    this.state = {
      mountDialog: false,
      deliveryServiceProviderId: "",
      cityId: "",
      cityName: "",
      dspName: "",
      activityStatus: false,
    }
    this.deleteDSPMappedToCityData = this.deleteDSPMappedToCityData.bind(this)
    this.mountDialog = this.mountDialog.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
    this.onToggleChange = this.onToggleChange.bind(this)
    this.updateDSPCityMappedStatus = this.updateDSPCityMappedStatus.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
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

  overrideTableStyle () {
    overrideTableStyle()
  }

  onToggleChange(item, value) {
    this.mountDialog()
    this.setState({
      deliveryServiceProviderId: item.delivery_service_provider_id,
      cityId: item.city_id,
      cityName: item.city_name,
      dspName: item.delivery_service_provider_name,
      activityStatus: value,
    })
  }

  updateDSPCityMappedStatus() {
    this.unmountDialog()
    Api.updateDSPCityMappedStatus({
      delivery_service_provider_id: this.state.deliveryServiceProviderId,
      city_id: this.state.cityId,
      is_active: this.state.activityStatus
    })
      .then((response) => {
        Notify(response.message,'success')
        this.props.history.push("/home/dsp-city-mapping")
      })
      .catch((error) => {
        console.log("Error in updating", error)
      })

  }

  deleteDSPMappedToCityData (e, item) {
    Api.deleteDSPMappedToCity({
      delivery_service_provider_id: item.delivery_service_provider_id,
      city_id: item.city_id
    })
      .then((response) => {
        Notify(response.message, 'success')
        this.props.history.push("/home/dsp-city-mapping")
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
      })
  }

  render () {
    const { loadingDeliveryserviceproviderCityMapped, 
      deliveryServiceProviderCityMapped } = this.props
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
              !loadingDeliveryserviceproviderCityMapped && deliveryServiceProviderCityMapped.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No Delivery Service Provider City Mapped details found</p>
                </td>
              </tr>
            }
            {
              !loadingDeliveryserviceproviderCityMapped
                ? (
                  deliveryServiceProviderCityMapped.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.deleteDSPMappedToCityData(e, item)}
                          >
                            Delete
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.city_name}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.delivery_service_provider_name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.priority}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.turnaround_duration}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>
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
                    <div style={{ fontSize: '18px' }}>{this.state.activityStatus === false ? 'Deactivate' : 'Activate'} Delivery Service Provider City Mapped</div>
                  </div>
                </ModalHeader>
                <ModalBody height="60px">
                  <table className="table--hovered">
                    <tbody>
                      Are you sure you want to {this.state.activityStatus === false ? 'Deactivate' : 'Activate'} "{this.state.cityName}" ({this.state.dspName}) ?
                   </tbody>
                  </table>
                </ModalBody>
                <ModalFooter>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                    <button className="btn btn-primary" onClick={() => this.updateDSPCityMappedStatus()}> Yes </button>
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

export default ListDSPCityMapping