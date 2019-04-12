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
  'CAMPAIGN NAME',
  'ACTIVE_FROM',
  'ACTIVE_TO',
  //'TYPE',
  'CAMPAIGN STATUS',
  'BRAND MANAGER ID',
  // 'BUDGETED AMOUNT',
  // 'FUNDS CREDITED'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '100px' },
  { width: '100px' },
  //{ width: '38px' },
  { width: '38px' },
  { width: '38px' },
  // { width: '38px' },
  // { width: '100px' }
]

class ViewCampaign extends React.Component {

  constructor() {
    super()

    this.editCampaignDetails = this.editCampaignDetails.bind(this)
    //this.overrideTableStyle = this.overrideTableStyle.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  editCampaignDetails(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/manage-campaign/edit/${item.id}`, item)
  }

  overrideTableStyle() {
    // document.querySelectorAll(".bordered--table")[1].parentElement.style.overflow = "auto"
    overrideTableStyle()
  }

  render() {
    const {
      loadingCampaignList,
      campaignList
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
              !loadingCampaignList && campaignList.length === 0 && 
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='7'>
                  <p style={{fontWeight: '16px'}}>No campaign found</p>
                </td>
              </tr>
            }
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
                        <TableRowColumn style={styles[3]}>{Moment(item.active_from).format("DD/MM/YYYY h:mm A")}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{Moment(item.active_to).format("DD/MM/YYYY h:mm A")}</TableRowColumn>
                        {/* <TableRowColumn style={styles[5]}>{item.type}</TableRowColumn> */}
                        <TableRowColumn style={styles[5]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.brand_manager_id}</TableRowColumn>
                        {/* <TableRowColumn style={styles[8]}>{item.budgeted_amount}</TableRowColumn>
                        <TableRowColumn style={styles[9]}>{item.funds_credited}</TableRowColumn> */}
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
