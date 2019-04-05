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
import {overrideTableStyle} from './../../../utils'

const TableHeaderItems = [
  '',
  'SKU PRICING ID',
  'OFFER_ID',
  'PRICE',
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '100px' },
]

class ViewCashbackSku extends React.Component {

  constructor() {
    super()

    this.editCashbackSkuDetails = this.editCashbackSkuDetails.bind(this)
    //this.overrideTableStyle = this.overrideTableStyle.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  editCashbackSkuDetails(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/manage-cashback-sku/edit/${item.id}`, item)
  }

  overrideTableStyle() {
    // document.querySelectorAll(".bordered--table")[1].parentElement.style.overflow = "auto"
    overrideTableStyle()
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
              !loadingCashbackSkuList
                ? (
                  cashbackSkuList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editCampaignDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.sku_pricing_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.offer_id}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.price}</TableRowColumn>
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

export default ViewCashbackSku
