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
  'CITY ID',
  'CITY NAME',
  'BOTTLE COUNT',
  'VOLUME'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

class ViewCityPossessionLimits extends React.Component {

  constructor() {
    super()

    this.editPossessionLimits = this.editPossessionLimits.bind(this)
  }

  editPossessionLimits(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/manage-cities/possession-limit/edit`, item)
  }

  render() {
    const {
      loadingCityPossessionLimits,
      cityPossessionLimits
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
              !loadingCityPossessionLimits && cityPossessionLimits.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='6'>
                  <p style={{ fontWeight: '16px' }}>No possession limits found</p>
                </td>
              </tr>
            }
            {
              !loadingCityPossessionLimits
                ? (
                    cityPossessionLimits.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editPossessionLimits(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.city_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.city_name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.bottle_count}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.volume}</TableRowColumn>
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

export default ViewCityPossessionLimits
