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
  'BRAND ID',
  'BRAND NAME',
  'SKU ID',
  'VOLUME',
  'SKU PRICING ID'
]

const styles = [
  { width: '38px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' }
]

class MapSkuToPromo extends React.Component {

  constructor() {
    super()

    this.state = {
      skuList: [],
      skuMap: []
    }
  }

  // componentDidMount() {
  //   this.overrideTableStyle()
  // }

  // handleCellClick(row, column, e) {
  //   console.log("click",row, column, this.props.cashbackSkuList[row])
  //   this.props.history.push(`/home/manage-cashback-sku/:offerId`, item)
  // }

  render() {
    const {
      skuList,
    } = this.props
    return (
      <div style={{marginTop: '20px'}}>
        <Table
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
              skuList.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableRowColumn style={styles[0]}>{item.brand_id}</TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.brand_name}</TableRowColumn>
                  </TableRow> 
                )
              })
            }
            {
              this.props.loadingSkuList &&
              [1, 2, 3, 4, 5].map(() => (
                <TableLoadingShell />
              ))
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default MapSkuToPromo
