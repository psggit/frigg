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
  'CAMPAIGN ID',
  'AMOUNT',
  'PROMO NAME',
  'IS PACK ON',
  'PROMO DESCRIPTION',
  'PERCENTAGE',
  'SERVICE CHARGE PERCENTAGE',
  "SERVICE CHARGE FLAT"
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' }
]

class ViewSkuPromo extends React.Component {

  constructor() {
    super()

    this.editSkuPromoDetails = this.editSkuPromoDetails.bind(this)
    //this.overrideTableStyle = this.overrideTableStyle.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  editSkuPromoDetails(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/manage-sku-promo/edit/${item.id}`, item)
  }

  overrideTableStyle() {
    // document.querySelectorAll(".bordered--table")[1].parentElement.style.overflow = "auto"
    overrideTableStyle()
  }

  render() {
    const {
      loadingSkuPromoList,
      skuPromoList
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
              !loadingSkuPromoList
                ? (
                  skuPromoList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editSkuPromoDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.campaign_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.amount}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.promoName}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.is_on_pack ? "ON" : "OFF"}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.promo_description}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.percentage}</TableRowColumn>
                        <TableRowColumn style={styles[7]}>{item.service_charge_percentage}</TableRowColumn>
                        <TableRowColumn style={styles[8]}>{item.service_charge_flat}</TableRowColumn>
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
