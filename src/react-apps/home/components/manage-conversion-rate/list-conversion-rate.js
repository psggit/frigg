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
import TextField from 'material-ui/TextField'
import * as Api from "../../middleware/api"


const TableHeaderItems = [
  '',
  'PRODUCT ID',
  'NAME',
  'MIN PRICE',
  'MAX PRICE',
  'CONVERSION RATE',
  'STATUS',
  'QC ACTIVE STATUS'
]

const styles = [
  { width: '28px' },
  { width: '80px' },
  { width: '80px' },
  { width: '40px' },
  { width: '40px' },
  { width: '40px' },
  { width: '40px' },
  { width: '40px' }
]

class ListConversionRate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      conversionRate: 0,
      isActive: false,
      isDisabled: true,
      updatingConversionRate: false,
      conversionList: [],
      stateMap: {},
      productId: '',
    }

    this.updateConversionRate = this.updateConversionRate.bind(this)

  }

  componentDidMount() {
    this.overrideTableStyle()
    this.mapStates()
  }

  componentDidUpdate(prevProps) {
    if (this.props.conversionRateList !== prevProps.conversionRateList) {
      console.log("CDM", this.props.conversionRateList)
      this.mapStates()
    }
    // else if (prevProps.disableSave !== this.props.disableSave && !this.props.disableSave) {
    //   let updatedStateMap = Object.assign({}, this.state.stateMap)
    //   updatedStateMap[this.state.productId].is_modified = false
    //   this.setState({ stateMap: updatedStateMap })
    // }
  }

  mapStates() {
    if (this.props.conversionRateList) {
      console.log("mapStates", this.props.conversionRateList)
      this.setState({ conversionList: this.props.conversionRateList, stateMap: this.props.productStateMap })
    }
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  updateConversionRate(e, item) {
      this.setState({
        isDisabled: false
      })

    if(!this.state.isDisabled){
      this.setState({ updatingConversionRate: true })
      Api.updateConversionRate({
        product_id: item.product_id,
        conversion_rate: parseInt(this.state.conversionRate),
        is_active: this.state.isActive,
      })
        .then((response) => {
          this.setState({ updatingConversionRate: false })
        })
        .catch((err) => {
          this.setState({ updatingConversionRate: false })
        })
    }
  }

  handleConversionRateChange(e, item){
    // let updatedMap = Object.assign({}, this.state.stateMap)
    // updatedMap[item].product_id = (e.target.value)
    // console.log("updatedMap", updatedMap[item].product_id, e.target.value)
    // this.setState({ stateMap: updatedMap, conversionList: Object.values(updatedMap) })

    this.setState({
      conversionRate: e.target.value
    })
  }

  handleIsActiveChange(e, item){
    this.setState({
      isActive: e.target.value
    })
  }

  render() {
    const { loadingConversionRate, conversionRateList } = this.props
    console.log("render", conversionRateList)
    const { isDisabled } = this.state
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
              !loadingConversionRate && conversionRateList.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No data found</p>
                </td>
              </tr>
            }
            {
              !loadingConversionRate
                ? (
                  conversionRateList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.updateConversionRate(e, item)}
                          >
                            {isDisabled ? "Edit" : "Save"}
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.product_id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.min_price}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.max_price}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>
                          <TextField
                            type="text"
                            name="conversionRate"
                            value={item.conversion_rate}
                            //value={this.state.stateMap[item].conversion_rate}
                            //onChange={this.handleTextFields}
                            onChange={(e) => this.handleConversionRateChange(e, item)}
                            disabled={this.state.isDisabled}
                          />
                        </TableRowColumn>
                        <TableRowColumn style={styles[6]}>
                          <TextField
                            type="text"
                            name="is_active"
                            value={item.is_active ? "True" : "False"}
                            onChange={(e) => this.handleIsActiveChange(e, item)}
                            disabled={this.state.isDisabled}
                          />
                        </TableRowColumn>
                        <TableRowColumn style={styles[7]}>{item.qc_active_status ? "True" : "False"}</TableRowColumn>
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

export default ListConversionRate