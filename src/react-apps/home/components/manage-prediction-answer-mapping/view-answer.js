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
import * as Api from "./../../middleware/api"

const TableHeaderItems = [
  'PREDICTION ID',
  'PREDICTION TITLE',
  'OPTION ID',
  'OPTION NAME',
  'IS TRIGGERED'
]

const styles = [
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' }
]

class ViewPredictionAnswer extends React.Component {

  constructor() {
    super()

    this.invokeTrigger = this.invokeTrigger.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  invokeTrigger(item) {
    Api.invokeTrigger({
      prediction_id: item.prediction_id,
      option_id: item.option_id
    })
      .then((response) => {
        this.props.history.push("/home/manage-answer-mapping")
      })
      .catch((err) => {
        console.log("Error in trigger", err)
      })
  }

  render() {
    const {
      loadingPredictionAnswerList,
      predictionAnswerList
    } = this.props

    return (
      <div>
        <Table
          wrapperStyle={{ height: 'auto' }}
          className="bordered--table clickable"
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
              !loadingPredictionAnswerList && predictionAnswerList.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='6'>
                  <p style={{ fontWeight: '16px' }}>No answers found</p>
                </td>
              </tr>
            }
            {
              !loadingPredictionAnswerList
                ? (
                  predictionAnswerList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          {item.prediction_id}
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.prediction_title}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.option_id}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.option_name}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>
                          {
                            item.is_triggered
                              ? 'Triggered'
                              : <button
                                onClick={e => this.invokeTrigger(item)}
                              >
                                Trigger
                              </button>
                          }
                        </TableRowColumn>
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

export default ViewPredictionAnswer
