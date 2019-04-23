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
  '',
  'PREDICTION TITLE',
  'PREDICTION IMAGE',
  'DETAILED PREDICTION IMAGE',
  'ACTIVE FROM',
  'ACTIVE TO'
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
]

class ViewPrediction extends React.Component {

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

  handleRowClick(rowIdx, columnIdx) {
    //console.log(this.props.predictionList[rowIdx])
    //console.log("click",row, column, this.props.cashbackSkuList[row])
    this.props.history.push(`/home/manage-prediction/edit/${this.props.predictionList[rowIdx].id}`, this.props.predictionList[rowIdx])
  }

  render() {
    const {
      loadingPredictionList,
      predictionList
    } = this.props

    return (
      <div>
        <Table
          wrapperStyle={{ height: 'auto' }}
          className="bordered--table clickable"
          selectable={false}
          fixedHeader
          onCellClick={this.handleRowClick}
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
              !loadingPredictionList
                ? (
                  predictionList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            //onClick={e => this.handleRowClick(e, item)}
                          >
                            Edit
                          </button>
                          {/* Edit */}
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.prediction_title}</TableRowColumn>
                        {/* <TableRowColumn style={styles[2]}>{item.prediction_image}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.detailed_prediction_image}</TableRowColumn> */}
                        <TableRowColumn style={styles[2]}>
                          <a target="_blank" href={item.high_res_image}>
                            <img
                              alt="prediction_image"
                              style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain'
                              }}
                              src={item.prediction_image}
                            />
                          </a>
                        </TableRowColumn>
                        <TableRowColumn style={styles[3]}>
                          <a target="_blank" href={item.detailed_prediction_image}>
                            <img
                              alt="ad-image"
                              style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'contain'
                              }}
                              src={item.detailed_prediction_image}
                            />
                          </a>
                        </TableRowColumn>
                        <TableRowColumn style={styles[4]}>{Moment(item.active_from).format("DD/MM/YYYY h:mm A")}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{Moment(item.active_to).format("DD/MM/YYYY h:mm A")}</TableRowColumn>
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

export default ViewPrediction
