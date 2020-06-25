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
  'TYPE ID',
  'TYPE NAME',
  'BOTTLE COUNT',
  'VOLUME',
  'DA Possession Volume Limit'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
  { width: '38px' },
  { width: '100px' }
]

class ViewPossessionLimits extends React.Component {

  constructor() {
    super()

    this.editPossessionLimits = this.editPossessionLimits.bind(this)
  }

  editPossessionLimits(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/manage-states/possession-limit/edit/${this.props.stateShortName}`, item)
  }

  render() {
    const {
      loadingPossessionLimits,
      possessionLimits
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
              !loadingPossessionLimits && possessionLimits.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='6'>
                  <p style={{ fontWeight: '16px' }}>No possession limits found</p>
                </td>
              </tr>
            }
            {
              !loadingPossessionLimits
                ? (
                    possessionLimits.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editPossessionLimits(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.type_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.type_name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.bottle_count}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.volume}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.da_possession_volume_limit}</TableRowColumn>
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

export default ViewPossessionLimits
