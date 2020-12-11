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


const TableHeaderItems = [
  '',
  'ID',
  'PRODUCT ID',
  'DENOMINATION',
  'HIPCOIN LIMIT PERCENTAGE',
  'HIPCOIN LIMIT FLAT',
  'LISTING ORDER',
  'IS ACTIVE'
]

const styles = [
  { width: '28px' },
  { width: '30px' },
  { width: '30px' },
  { width: '50px' },
  { width: '50px' },
  { width: '50px' },
  { width: '30px' },
  { width: '30px' },
]

class ListDenominations extends React.Component {
  constructor() {
    super()

    this.editDenominationDetails = this.editDenominationDetails.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editDenominationDetails(e, item) {
    this.props.history.push(`/home/manage-denominations/edit/${item.id}`, item)
  }

  render() {
    const { loadingDenomination, denominationList } = this.props
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
              !loadingDenomination && denominationList.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No data found</p>
                </td>
              </tr>
            }
            {
              !loadingDenomination
                ? (
                  denominationList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editDenominationDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.product_id}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.denomination}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.hipcoin_limit_percentage}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.hipcoin_limit_flat}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.listing_order}</TableRowColumn>
                        <TableRowColumn style={styles[7]}>{item.is_active ? "true" : "false"}</TableRowColumn>
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

export default ListDenominations