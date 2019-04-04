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
  'CAMPAIGN ID',
  'CAMPAIGN NAME',
  'ACTIVE_FROM',
  'ACTIVE_TO',
  'TYPE',
  'CAMPAIGN STATUS',
  'BRAND MANAGER ID',
  'BUDGETED AMOUNT',
  'FUNDS CREDITED'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '100px' }
]

class ViewCampaign extends React.Component {

  constructor() {
    super()

    this.editPromoDetails = this.editPromoDetails.bind(this)
  }

  editCampaignDetails(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/manage-campaign/edit/${item.promo_code}`, item)
  }

  render() {
    const {
      loadingCampaignList,
      campaignList
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
              !loadingCampaignList
                ? (
                  campaignList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editCampaignDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.active_from}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.active_to}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.type}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.status === "true" ? 'Active' : 'Inactive'}</TableRowColumn>
                        <TableRowColumn style={styles[7]}>{item.brand_manager_id}</TableRowColumn>
                        <TableRowColumn style={styles[8]}>{item.budgeted_amount}</TableRowColumn>
                        <TableRowColumn style={styles[9]}>{item.funds_credited}</TableRowColumn>
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

export default ViewCampaign
