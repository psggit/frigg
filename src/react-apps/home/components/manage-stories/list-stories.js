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
import { overrideTableStyle } from '../../../utils'
import Moment from 'moment'
import * as Api from "../../middleware/api"

const TableHeaderItems = [
  '',
  'ID',
  'NAME',
  'TYPE',
  'DISPLAY DURATION',
  'EXPIRES ON',
  'STARTS ON',
  'STATUS'
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' }
]

class ListStories extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editStoryDetails(e, item) {
    this.props.history.push(`/home/manage-stories/edit/${item.id}`, item)
  }

  render() {
    const { loadingStories, stories } = this.props
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
              !loadingStories && stories.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No data found</p>
                </td>
              </tr>
            }
            {
              !loadingStories
                ? (
                  stories.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editStoryDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.type}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.default_display_duration}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{Moment(item.starts_on).format("DD-MM-YYYY h:mm:ss A")}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{Moment(item.expires_on).format("DD-MM-YYYY h:mm:ss A")}</TableRowColumn>
                        <TableRowColumn style={styles[7]}>{item.is_active ? "Active" : "Inactive"}</TableRowColumn>
                      </TableRow>
                    )
                  })
                )
                : (
                  [1, 2, 3, 4, 5].map((item, index) => (
                    <TableLoadingShell key={index} />
                  ))
                )
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default ListStories