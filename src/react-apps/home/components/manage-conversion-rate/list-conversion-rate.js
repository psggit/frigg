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
  'STATUS'
]

const styles = [
  { width: '28px' },
  { width: '80px' },
  { width: '80px' },
  { width: '80px' },
  { width: '80px' },
  { width: '80px' },
  { width: '80px' },
]

class ListConversionRate extends React.Component {
  constructor() {
    super()

    this.state = {
      conversionRate: 0,
      isActive: '',
      productId: '',
      isDisabled: true,
      updatingConversionRate: false,
    }

    this.updateConversionRate = this.updateConversionRate.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)

  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  updateConversionRate(e, item) {
    this.setState({
      isDisabled: false
    })
    if(!this.state.isDisabled){
      console.log("helloooooo happinesss")
      this.setState({ updatingConversionRate: true })
      Api.updateConversionRate({
        product_id: this.state.productId,
        conversion_rate: this.state.conversionRate,
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

  render() {
    const { loadingConversionRate, conversionRateList } = this.props
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
                            onChange={this.handleTextFields}
                            disabled={this.state.isDisabled}
                          />
                        </TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.is_active ? "True" : "False"}</TableRowColumn>
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