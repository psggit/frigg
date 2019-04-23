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
  // '',
  'OPTION ID',
  'OPTION NAME',
  'PREDICTION ID',
  'PREDICTION NAME'
]

const styles = [
  // { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' }
]

class ViewMappedOption extends React.Component {

  constructor() {
    super()

    this.handleRowClick = this.handleRowClick.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    // document.querySelectorAll(".bordered--table")[1].parentElement.style.overflow = "auto"
    overrideTableStyle()
  }

  handleRowClick(e, item) {
    console.log("prosp", this.props, item)
    this.props.history.push(`/home/manage-option-mapping/edit/${item.prediction_id}`, item)
  }

  render() {
    const {
      loadingOptionMappedToPredictionList,
      optionMappedtoPreditionList
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
              !loadingOptionMappedToPredictionList && optionMappedtoPreditionList.length === 0 && 
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='4'>
                  <p style={{fontWeight: '16px'}}>No options found</p>
                </td>
              </tr>
            }
            {
              !loadingOptionMappedToPredictionList
                ? (
                  optionMappedtoPreditionList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        {/* <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.handleRowClick(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn> */}
                        <TableRowColumn style={styles[0]}>{item.option_id}</TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.option_name}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.prediction_id}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.prediction_title}</TableRowColumn>
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

export default ViewMappedOption
