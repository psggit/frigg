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
  'SKU PRICING ID',
  'PRICE'
]

const styles = [
  { width: '38px' },
  { width: '120px' }
]

class ViewCashbackSku extends React.Component {

  constructor() {
    super()

    this.state = {
      cashbackSkuList: [],
      offerId: ""
    }

    // this.editCashbackSkuDetails = this.editCashbackSkuDetails.bind(this)
    // this.handleCellClick = this.handleCellClick.bind(this)
  }

  componentDidMount() {
    console.log("props", this.props.location.state)
    // this.setState({cashbackSkuList: this.props.location.state.skus, offerId: this.props.location.state.offer_id})
    this.setState({offerId: this.props.location.state.offer_id})
    this.overrideTableStyle()
  }

  // editCashbackSkuDetails(e, item) {
  //   e.stopPropagation()
  //   this.props.history.push(`/home/manage-cashback-sku/edit/${item.id}`, item)
  // }

  overrideTableStyle() {
    // document.querySelectorAll(".bordered--table")[1].parentElement.style.overflow = "auto"
    //overrideTableStyle()
  }

  // handleCellClick(row, column, e) {
  //   console.log("click",row, column, this.props.cashbackSkuList[row])
  //   this.props.history.push(`/home/manage-cashback-sku/:offerId`, item)
  // }

  render() {
    const {
      cashbackSkuList,
      offerId
    } = this.state
    return (
      <div>
        <div>
          <span>Offer Id:</span>
          <span>{offerId}</span>
        </div>
        {/* <Table
          wrapperStyle={{ height: 'auto' }}
          className="bordered--table clickable"
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
              cashbackSkuList.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableRowColumn style={styles[0]}>{item.sku_pricing_id}</TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.price}</TableRowColumn>
                  </TableRow> 
                )
              })
            }
          </TableBody>
        </Table> */}
      </div>
    )
  }
}

export default ViewCashbackSku
