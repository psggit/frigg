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
  'DELIVERY SERVICE PROVIDER ID',
  ' DELIVERY SERVICE PROVIDER NAME',
  // 'CITY ID',
  // 'LOCALITY ID',
  // 'GPS X CORDINATE',
  // 'GPS Y CORDINATE',
  // 'STATUS'
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  // { width: '120px' },
  // { width: '120px' },
  // { width: '120px' },
  // { width: '120px' },
  // { width: '120px' },
]

class ListDeliveryServiceProvider extends React.Component {
  constructor() {
    super()

    this.editDeliveryServiceProviderDetails = this.editDeliveryServiceProviderDetails.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editDeliveryServiceProviderDetails(e, item) {
    this.props.history.push(`/home/manage-delivery-service-provider/edit/${item.delivery_service_provider_id}`, item)
  }

  render() {
    const { loadingDeliveryServiceProvider, serviceProviderList } = this.props
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
              !loadingDeliveryServiceProvider && serviceProviderList.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No data found</p>
                </td>
              </tr>
            }
            {
              !loadingDeliveryServiceProvider
                ? (
                  serviceProviderList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editDeliveryServiceProviderDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.delivery_service_provider_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.delivery_service_provider_name}</TableRowColumn>
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

export default ListDeliveryServiceProvider