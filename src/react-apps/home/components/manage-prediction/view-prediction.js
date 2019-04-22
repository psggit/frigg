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

    //this.editCashbackSkuDetails = this.editCashbackSkuDetails.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
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

  handleRowClick(e, item) {
    //console.log("click",row, column, this.props.cashbackSkuList[row])
    this.props.history.push(`/home/manage-prediction/edit/${item.id}`, item)
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
              !loadingPredictionList
                ? (
                  predictionList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.handleRowClick(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.prediction_title}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.prediction_image}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.detailed_prediction_image}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.active_from}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.actie_to}</TableRowColumn>
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
