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
import Switch from "@components/switch"
import ModalBody from '@components/ModalBox/ModalBody'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBox from '@components/ModalBox'

const TableHeaderItems = [
  '',
  'PRODUCT ID',
  'PRODUCT NAME',
  'MIN PRICE',
  'MAX PRICE',
  'CONVERSION RATE',
  'QC VOUCHER ACTIVE STATUS',
  'STATUS',
]

const styles = [
  { width: '28px' },
  { width: '80px' },
  { width: '100px' },
  { width: '60px' },
  { width: '60px' },
  { width: '60px' },
  { width: '90px' },
  { width: '40px' },
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
      mountDialog: false,
      activityStatus: false,
    }
    this.updateConversionRate = this.updateConversionRate.bind(this)
    this.mountDialog = this.mountDialog.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
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
      // console.log(newList);
      this.setState({ conversionList: this.props.conversionRateList })
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.loadingConversionRate === true){
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
        conversion_rate: parseFloat(item.conversion_rate),
        is_active: item.is_active === 1 || item.is_active === true ? true : false,
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

  handleIsActiveChange(e, isActive,i) {
    let updatedItem = this.state.conversionList[i];
    updatedItem = {
      ...updatedItem,
      is_active: !isActive
    }
    let updatedArray = [...this.state.conversionList];
    updatedArray[i] = updatedItem;
    this.setState({
      conversionList: updatedArray,
      mountDialog: true,
      activityStatus: !isActive
    })
  }

  mountDialog() {
    this.setState({
      mountDialog: true
    })
  }

  unmountDialog() {
    this.setState({
      mountDialog: false
    })
  }

  setDialogState() {
    this.setState({ mountDialog: false })
  }

  render() {
    const { loadingConversionRate, conversionRateList } = this.props
    console.log("conversionRateList", conversionRateList);
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
                        <TableRowColumn style={styles[6]}>{item.qc_active_status ? "True" : "False"}</TableRowColumn>
                        <TableRowColumn style={styles[7]}>
                          <Switch
                          onToggle={(e) => this.handleIsActiveChange(e, item.is_active,i)}
                          toggled={item.is_active} 
                          disabled={item.mode === "edit" ? true : false} 
                          value={item} 
                          />
                        </TableRowColumn>
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
            {
              this.state.mountDialog &&
              <ModalBox>
                <ModalHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '18px' }}>{this.state.activityStatus === false ? 'Deactivate' : 'Activate'} Conversion</div>
                  </div>
                </ModalHeader>
                <ModalBody height="60px">
                  <table className="table--hovered">
                    <tbody>
                      Are you sure you want to {this.state.activityStatus === false ? 'Deactivate' : 'Activate'} ?
                   </tbody>
                  </table>
                </ModalBody>
                <ModalFooter>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                    <button className="btn btn-primary" onClick={() => this.unmountDialog()}> Yes </button>
                    <button className="btn btn-secondary" onClick={() => this.unmountDialog()}> Cancel </button>
                  </div>
                </ModalFooter>
              </ModalBox>

            }
          </TableBody>
        </Table>
      </div>

    )
  }
}

export default ListConversionRate