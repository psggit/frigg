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


const TableHeaderItems = [
  '',
  'DELIVERY AGENT ID',
  'NAME',
  'EMPLOYEE ID',
  'WAREHOUSE ID',
  'GCM TOKEN',
  'CONTACT NUMBER'
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
  constructor () {
    super()

    this.editDeliveryAgentDetails = this.editDeliveryAgentDetails.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
  }

  overrideTableStyle () {
    overrideTableStyle()
  }

  editDeliveryAgentDetails (e, item) {
    this.props.history.push(`/home/delivery-agent/edit/${item.id}`, item)
  }

  render () {
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
                        <TableRowColumn style={styles[4]}>{item.warehouse_id}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.gcm_token}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.contact_number}</TableRowColumn>
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

export default ListDeliveryAgent