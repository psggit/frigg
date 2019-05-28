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
  'COMPANY_ID',
  'COMPANY_NAME',
  'BRAND_ID'
]

const styles = [
  // { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
]

class ViewCompany extends React.Component {

  constructor() {
    super()

    //this.editCashbackSkuDetails = this.editCashbackSkuDetails.bind(this)
    //this.handleRowClick = this.handleRowClick.bind(this)
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

  // handleRowClick(e, item) {
  //   //console.log("click",row, column, this.props.cashbackSkuList[row])
  //   this.props.history.push(`/home/manage-company-brand-mapping/${item.id}`, item)
  // }

  render() {
    const {
      loadingCompanyList,
      companyList
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
              !loadingCompanyList
                ? (
                  companyList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        {/* <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.handleRowClick(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn> */}
                        <TableRowColumn style={styles[0]}>{item.company_id}</TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.company_name}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.brand_id}</TableRowColumn>
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

export default ViewCompany
