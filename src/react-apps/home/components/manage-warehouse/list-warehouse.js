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
import Switch from "@components/switch"
import ModalBody from '@components/ModalBox/ModalBody'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBox from '@components/ModalBox'
import * as Api from "../../middleware/api"


const TableHeaderItems = [
  '',
  'ID',
  'WAREHOUSE NAME',
  'CITY ID',
  // 'LOCALITY ID',
  'GPS X CORDINATE',
  'GPS Y CORDINATE',
  'STATUS'
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  // { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
]

class ListWareHouse extends React.Component {
  constructor () {
    super()

    this.state = {
      mountDialog: false,
      warehouseId: "",
      warehouseName: "",
      activityStatus: false
    }

    this.editWarehouseDetails = this.editWarehouseDetails.bind(this)
    this.onToggleChange = this.onToggleChange.bind(this)
    this.updateWarehouseStatus = this.updateWarehouseStatus.bind(this)
    this.setDialogState = this.setDialogState.bind(this)
    this.mountDialog = this.mountDialog.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editWarehouseDetails(e, item) {
    this.props.history.push(`/home/manage-warehouse/edit/${item.id}`, item)
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

  setDialogState () {
    this.setState({ mountDialog: false })
  }

  onToggleChange (item, value) {
    this.mountDialog()
    this.setState({
      warehouseId: item.id,
      warehouseName: item.name,
      activityStatus: value,
    })
  }

  updateWarehouseStatus () {
    this.unmountDialog()
    Api.updateWarehouseStatus({
      id: this.state.warehouseId,
      status: this.state.activityStatus
    })
      .then((response) => {
        console.log("Successfully updated warehouse status")
        // if (location.pathname.includes("manage-warehouse")) {
        //   this.props.history.push("/home/manage-warehouse")
        // } else {
          this.props.history.push("/home/manage-warehouse")
        //}
      })
      .catch((error) => {
        console.log("Error in updating warehouse status", error)
      })

  }

  render() {
    const { loadingWarehouse, wareHouseList } = this.props
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
              !loadingWarehouse && wareHouseList.length === 0 &&
              <tr>
                <td style={{ textAlign: 'center' }} colSpan='10'>
                  <p style={{ fontWeight: '16px' }}>No data found</p>
                </td>
              </tr>
            }
            {
              !loadingWarehouse
                ? (
                  wareHouseList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editWarehouseDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.city_id}</TableRowColumn>
                        {/* <TableRowColumn style={styles[3]}>{item.locality_id}</TableRowColumn> */}
                        <TableRowColumn style={styles[4]}>{item.gps_x_cordinate}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.gps_y_cordinate}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>
                          <Switch onToggle={this.onToggleChange} toggled={item.status} value={item} />
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
                    <div style={{ fontSize: '18px' }}>{this.state.activityStatus === false ? 'Deactivate' : 'Activate'} Warehouse</div>
                  </div>
                </ModalHeader>
                <ModalBody height="60px">
                  <table className="table--hovered">
                    <tbody>
                      Are you sure you want to {this.state.activityStatus === false ? 'Deactivate' : 'Activate'} {this.state.warehouseName} ({this.state.warehouseId}) ?
                   </tbody>
                  </table>
                </ModalBody>
                <ModalFooter>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontWeight: '600' }}>
                    <button className="btn btn-primary" onClick={() => this.updateWarehouseStatus()}> Yes </button>
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

export default ListWareHouse