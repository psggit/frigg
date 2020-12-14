import React from "react"
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TableLoadingShell from '../table-loading-shell'
import '@sass/components/_table.scss'
import { overrideTableStyle } from '../../../utils'
import TextField from 'material-ui/TextField'
import * as Api from "../../middleware/api"
import Notify from "@components/Notification"

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
      updatingConversionRate: false,
      conversionList: [],
      stateMap: {},
      productId: '',
      updateOnce: false,
    }
    this.updateConversionRate = this.updateConversionRate.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
    this.mapStates()
  }

  mapStates() {
    if (this.props.conversionRateList.length > 0) {
      const newList = this.props.conversionRateList.map(item => {
        item.mode = "edit";
        return item;
      })
      console.log(newList);
      this.setState({ conversionList: this.props.conversionRateList, updateOnce: true })
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.loadingConversionRate === true && !this.state.updateOnce){
      this.mapStates();
    }
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  updateConversionRate(e, item, i, itemId) {
    let updatedItem = this.state.conversionList[i];
    updatedItem = {
      ...updatedItem,
      mode: this.state.conversionList[i].mode === "edit" ? "save" : "edit"
    }
    

    if(this.state.conversionList[i].mode === "save"){
      updatedItem = {
        ...updatedItem,
        mode: this.state.conversionList[i].mode === "edit" ? "save" : "edit"
      }
      this.setState({ updatingConversionRate: true })
      Api.updateConversionRate({
        product_id: item.product_id,
        conversion_rate: parseInt(item.conversion_rate),
        is_active: item.is_active ? false : true,
      })
        .then((response) => {
          this.setState({ updatingConversionRate: false })
          Notify(response.message, "success")
        })
        .catch((err) => {
          err.response.json().then((json) => {
            Notify(json.message, "warning")
          })
          this.setState({ updatingConversionRate: false })
        })
    }
    let updatedArray = [...this.state.conversionList];
    updatedArray[i] = updatedItem;
    this.setState({
      conversionList: updatedArray
    })
  }

  handleConversionRateChange(e, i){
    let updatedItem = this.state.conversionList[i];
    updatedItem = {
      ...updatedItem,
      conversion_rate: e.target.value
    }
    let updatedArray = [...this.state.conversionList];
    updatedArray[i] = updatedItem;
    this.setState({
      conversionList: updatedArray
    })
  }

  handleIsActiveChange(event, index, value, i){
    // console.log(value);
    let updatedItem = this.state.conversionList[i];
    updatedItem = {
      ...updatedItem,
      is_active: value
    }
    let updatedArray = [...this.state.conversionList];
    updatedArray[i] = updatedItem;
    this.setState({
      conversionList: updatedArray
    })
  }

  render() {
    const { loadingConversionRate, conversionRateList } = this.props
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
                  this.state.conversionList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.updateConversionRate(e, item, i, item.product_id)}
                          >
                            {item.mode === "edit" ? "Edit" : "Save"}
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
                            onChange={(e) => this.handleConversionRateChange(e, i)}
                            disabled={item.mode === "edit" ? true : false}
                          />
                        </TableRowColumn>
                        <TableRowColumn style={styles[6]}>
                          {/* <TextField
                            type="text"
                            name="is_active"
                            value={item.is_active ? "True" : "False"}
                            onChange={(e) => this.handleIsActiveChange(e, i)}
                            disabled={this.state.selectedItem === item.product_id ? false : true}
                          /> */}
                           <SelectField
                            value={item.is_active === 1 ? 1 : 2}
                            onChange={(event, index, value) => {
                              this.handleIsActiveChange(event, index, value, i)
                            }}
                            disabled={item.mode === "edit" ? true : false}
                          >
                            <MenuItem value={1} primaryText="True" />
                            <MenuItem value={2} primaryText="False" />
                          </SelectField>
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