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
  '',
  // 'SKU PRICING ID',
  'OFFER_ID',
  // 'PRICE',
]

const styles = [
  { width: '38px' },
  // { width: '38px' },
  { width: '120px' },
  // { width: '100px' },
]

class ViewSkuPromo extends React.Component {

  constructor() {
    super()

    //this.editCashbackSkuDetails = this.editCashbackSkuDetails.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  // editCashbackSkuDetails(e, item) {
  //   e.stopPropagation()
  //   this.props.history.push(`/home/manage-cashback-sku/edit/${item.id}`, item)
  // }

  overrideTableStyle() {
    // document.querySelectorAll(".bordered--table")[1].parentElement.style.overflow = "auto"
    overrideTableStyle()
  }

  handleCellClick(e, item) {
    //console.log("click",row, column, this.props.cashbackSkuList[row])
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
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.handleCellClick(e, item)}
                          >
                            View
                          </button>
                        </TableRowColumn>
                        {/* <TableRowColumn style={styles[1]}>{item.sku_pricing_id}</TableRowColumn> */}
                        <TableRowColumn style={styles[1]}>{item.offer_id}</TableRowColumn>
                        {/* <TableRowColumn style={styles[2]}>{item.price}</TableRowColumn> */}
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
