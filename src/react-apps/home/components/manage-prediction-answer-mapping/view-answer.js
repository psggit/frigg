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
import Toggle from "material-ui/Toggle"
import '@sass/components/_table.scss'
import { overrideTableStyle } from '../../../utils'

const TableHeaderItems = [
  'PREDICTION ID',
  'OPTION ID',
  'IS TRIGGERED',
  ''
]

const styles = [
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' }
]

class ViewPredictionAnswer extends React.Component {

  constructor() {
    super()

    this.state = {
      predictionAnswerMap: {}
    }
    this.invokeTrigger = this.invokeTrigger.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.predictionAnswerMap !== newProps.predictionAnswerMap) {
      this.setState({
        predictionAnswerMap: newProps.predictionAnswerMap
      })
    }
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  invokeTrigger(item) {
    let predictionAnswerMap = Object.assign({}, this.state.predictionAnswerMap)
    predictionAnswerMap[item.prediction_id].is_triggered = !predictionAnswerMap[item.prediction_id].is_triggered
    this.setState({ predictionAnswerMap })
  }

  render() {
    const {
      loadingPredictionAnswerList,
      predictionAnswerList
    } = this.props
    const { predictionAnswerMap } = this.state
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
                        <TableRowColumn style={styles[1]}>{item.option_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>
                          {item.is_triggered ? "Yes" : "No"}
                        </TableRowColumn>
                        <TableRowColumn style={styles[3]}>
                          <Toggle
                            toggled={predictionAnswerMap[item.prediction_id].is_triggered}
                            onToggle={() => this.invokeTrigger(item)}
                            disabled={predictionAnswerMap[item.prediction_id].is_triggered}
                          />
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
