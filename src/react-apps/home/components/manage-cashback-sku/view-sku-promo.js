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
import Moment from "moment"
import {overrideTableStyle} from '../../../utils'

const TableHeaderItems = [
  'OFFER_ID',
  'PPOMO NAME',
  'SKU PRICING ID',
]

const styles = [
  { width: '120px' },
  { width: '100px' },
  { width: '100px' },
]

class ViewSkuPromo extends React.Component {

  constructor() {
    super()

    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  handleCellClick(e, item) {
    this.props.history.push(`/home/manage-cashback-sku/${item.id}`, item)
  }

  render() {
    const {
      loadingCashbackSkuList,
      cashbackSkuList
    } = this.props
    return (
      <div>
        <Table
          wrapperStyle={{ height: 'auto' }}
          className="bordered--table clickable"
          selectable={false}
          fixedHeader
          //onCellClick={this.handleCellClick}
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
              !loadingCashbackSkuList
                ? (
                  cashbackSkuList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        {/* <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.handleCellClick(e, item)}
                          >
                            View
                          </button>
                        </TableRowColumn> */}
                        {/* <TableRowColumn style={styles[1]}>{item.sku_pricing_id}</TableRowColumn> */}
                        <TableRowColumn style={styles[0]}>{item.offer_id}</TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.promo_name}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.sku_pricing_id}</TableRowColumn>
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

export default ViewSkuPromo
