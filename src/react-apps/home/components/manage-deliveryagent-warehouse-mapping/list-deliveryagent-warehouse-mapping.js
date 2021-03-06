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
  'DELIVERY AGENT ID',
  'DELIVERY AGENT NAME',
  'WAREHOUSE ID',
  'WAREHOUSE NAME',
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' }
]

class ListDeliveryAgentWarehouseMapping extends React.Component {
  constructor () {
    super()

    this.state = {
      mountDialog: false,
      deliveryAgentId: "",
      deliveryAgentName: "",
      activityStatus: false,
    }
    this.deleteDeliveryAgentMappedToWarehouseData = this.deleteDeliveryAgentMappedToWarehouseData.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
  }

  overrideTableStyle () {
    overrideTableStyle()
  }

  deleteDeliveryAgentMappedToWarehouseData (e, item) {
    console.log("DELETE",item.da_id,item.warehouse_id)
    this.props.history.push("/home/delivery-agent-warehouse-mapping")
    Api.deleteDeliveryAgentMappedToWarehouse({
      da_id: item.da_id,
      warehouse_id: item.warehouse_id
    })
      .then((response) => {
        Notify('Deleted Succesfully', 'success')
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "warning")
        })
      })
  }

  render () {
    const { loadingDeliveryagentWarehouseMapped, deliveryAgentWarehouseMapped } = this.props
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
              !loadingDeliveryagentWarehouseMapped && deliveryAgentWarehouseMapped.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No Delivery Agent Warehouse Mapped details found</p>
                </td>
              </tr>
            }
            {
              !loadingDeliveryagentWarehouseMapped
                ? (
                  deliveryAgentWarehouseMapped.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.deleteDeliveryAgentMappedToWarehouseData(e, item)}
                          >
                            Delete
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.da_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.da_name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.warehouse_id}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.warehouse_name}</TableRowColumn>
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

export default ListDeliveryAgentWarehouseMapping