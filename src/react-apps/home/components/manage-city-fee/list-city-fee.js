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

const TableHeaderItems = [
  '',
  'TITLE',
  'ORDER TYPE',
  'CHARGE TYPE',
  'FLAT',
  'PERCENTAGE',
  'MIN_VALUE',
  'MAX_VALUE',
  'PLATFORM'
]

const styles = [
  { width: '38px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' }, 
  { width: '100px' },
  { width: '100px' }
]


class ListCityFee extends React.Component {

  constructor () {
    super()

    this.editCityFee = this.editCityFee.bind(this)
  }

  componentDidMount () {
    this.overrideTableStyle()
  }

  overrideTableStyle () {
    overrideTableStyle()
  }

  editCityFee (item) {
    this.props.history.push(`/home/manage-city-fee/${item.city_id}/edit`, item)
  }

  render () {
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

            !this.props.loadingCityFeeList && this.props.cityFeeList.length === 0 &&
            <tr>
              <td style={{ textAlign: 'center' }} colSpan='10'>
                <p style={{ fontWeight: '16px' }}>No records found</p>
              </td>
            </tr>
          }
          {
            !this.props.loadingCityFeeList
              ? (
                this.props.cityFeeList.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableRowColumn style={styles[0]}>
                        <button
                          onClick={() => this.editCityFee(item)}
                        >
                          Edit
                      </button>
                      </TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.title}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.order_type}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.charge_type}</TableRowColumn>
                      <TableRowColumn style={styles[4]}>{item.txn_fee_flat}</TableRowColumn>
                      <TableRowColumn style={styles[5]}>{item.txn_fee_percentage}</TableRowColumn>
                      <TableRowColumn style={styles[6]}>{item.min_value}</TableRowColumn>
                      <TableRowColumn style={styles[7]}>{item.max_value}</TableRowColumn>
                      <TableRowColumn style={styles[7]}>{item.platform}</TableRowColumn>
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
    )
  }
}

export default ListCityFee