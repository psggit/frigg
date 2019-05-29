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
  'STATE SHORT NAME',
  'START TIME',
  'END TIME'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
]

class ViewStateTimings extends React.Component {

  constructor() {
    super()

    this.editStateTimings = this.editStateTimings.bind(this)
  }

  editStateTimings(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/manage-state-timings/edit`, item)
  }

  render() {
    const {
      loadingStateTimings,
      stateTimings
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
              !loadingStateTimings && stateTimings.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='6'>
                  <p style={{ fontWeight: '16px' }}>No state timings found</p>
                </td>
              </tr>
            }
            {
              !loadingStateTimings
                ? (
									stateTimings.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editStateTimings(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.state_short_name}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.start_time.substring(11, 16)}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.end_time.substring(11, 16)}</TableRowColumn>
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

export default ViewStateTimings
