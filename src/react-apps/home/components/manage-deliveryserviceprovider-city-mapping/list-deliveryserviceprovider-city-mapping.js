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

const TableHeaderItems = [
  '',
  'CITY NAME',
  'DSP NAME',
  'PRIORITY',
  'IS ACTIVE',
  'TURNAROUND DURATION',
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
]

class ListDeliveryServiceProviderCityMapping extends React.Component {
  constructor () {
    super()

    this.state = {
      mountDialog: false,
      deliveryAgentId: "",
      deliveryAgentName: "",
      activityStatus: false,
    }
    this.deleteDeliveryServiceProviderMappedToCityData = this.deleteDeliveryServiceProviderMappedToCityData.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
  }

  overrideTableStyle () {
    overrideTableStyle()
  }

  deleteDeliveryServiceProviderMappedToCityData (e, item) {
    Api.deleteDeliveryServiceProviderMappedToCity({
      delivery_service_provider_id: item.delivery_service_provider_id,
      city_id: item.city_id
    })
      .then((response) => {
        Notify('Deleted Succesfully', 'success')
        this.props.history.push("/home/delivery-service-provider-city-mapping")
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
      })
  }

  render () {
    const { loadingDeliveryserviceproviderCityMapped, deliveryServiceProviderCityMapped } = this.props
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
                            onClick={e => this.deleteDeliveryServiceProviderMappedToCityData(e, item)}
                          >
                            Delete
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.city_name}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.delivery_service_provider_name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.priority}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.is_active ? "true" : "false"}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.turnaround_duration}</TableRowColumn>
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

export default ListDeliveryServiceProviderCityMapping