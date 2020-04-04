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

const TableHeaderItems = [
  '',
  'ID',
  'NAME'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '38px' }
]

class ManageRetailerWarehouseList extends React.Component {
  deleteRetailerMappedToWarehouse (e, item) {
    this.props.deleteRetailerMappedToWarehouse(item)
  }

  render () {
    const {
      retailerWarehouseList,
      loadingRetailerWarehouseList
    } = this.props
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
              !loadingRetailerWarehouseList && retailerWarehouseList.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='3'>
                  <p style={{ fontWeight: '16px' }}>No mappings found</p>
                </td>
              </tr>
            }
            {
              !loadingRetailerWarehouseList
                ? (
                  retailerWarehouseList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.deleteRetailerMappedToWarehouse(e, item)}
                          >
                            Delete
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
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
      </div>
    )
  }
}

export default ManageRetailerWarehouseList
