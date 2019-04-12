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
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import Moment from "moment"
import {overrideTableStyle} from '../../../utils'

const TableHeaderItems = [
  '',
  'BRAND ID',
  'BRAND NAME',
  'SKU ID',
  'SKU PRICING ID',
  'VOLUME',
  'PRICE'
]

const styles = [
  { width: '38px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' },
  { width: '100px' }
]

class MapSkuToPromo extends React.Component {

  constructor() {
    super()

    this.state = {
      skuList: [],
      skuMap: []
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.mapSkuToPromo = this.mapSkuToPromo.bind(this)
  }

  componentDidMount() {
    const skuMap = {}
    this.props.skuList.map((item) => {
      skuMap[item.sku_pricing_id] = Object.assign({}, item, {is_modified: false})
    })
    this.setState({skuMap, skuList: Object.values(skuMap) })
  }

  handleCheckboxChange(e, skuPricingId) {
    let updatedSkuMap = Object.assign({}, this.state.skuMap)
    updatedSkuMap[skuPricingId].is_modified = (e.target.checked)
    this.setState({skuMap: updatedSkuMap, skuList: Object.values(updatedSkuMap)})
  } 

  mapSkuToPromo() {
    const selectedSkuList = this.state.skuList.map((item) => {
      if(item.is_modified) {
        return parseInt(item.sku_pricing_id)
      }
    })
    console.log("selected sku list", selectedSkuList)
    this.props.mapSkuToPromo(selectedSkuList)
  }

  render() {
    const notificationStyle = {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
      display: 'flex',
      justifyContent: 'center',
      padding: '20px'
    }
    const {
      skuList
    } = this.state
    return (
      <div style={{marginTop: '20px'}}>
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
              skuList.length === 0 &&
              <tr>
                <td>
                  <div style={notificationStyle}> No skus found </div>
                </td>
              </tr>
            }
            {
              skuList.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableRowColumn style={styles[0]}>
                      <Checkbox
                        onCheck={(e) => this.handleCheckboxChange(e, item.sku_pricing_id)}
                        checked={this.state.skuMap[item.sku_pricing_id].is_modified}
                        name="isModified"
                      />
                    </TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.brand_id}</TableRowColumn>
                    <TableRowColumn style={styles[2]}>{item.brand_name}</TableRowColumn>
                    <TableRowColumn style={styles[3]}>{item.sku_id}</TableRowColumn>
                    <TableRowColumn style={styles[4]}>{item.sku_pricing_id}</TableRowColumn>
                    <TableRowColumn style={styles[5]}>{item.volume}</TableRowColumn>
                    <TableRowColumn style={styles[6]}>{item.price}</TableRowColumn>
                  </TableRow> 
                )
              })
            }
            {
              this.props.loadingSkuList &&
              [1, 2, 3, 4, 5].map(() => (
                <TableLoadingShell />
              ))
            }
          </TableBody>
        </Table>
        {
          skuList.length > 0 &&
          <div style={{marginTop: '30px'}}>
            <RaisedButton
              label="Save"
              primary
              disabled={this.props.mappingSkuToPromo}
              onClick={() => this.mapSkuToPromo()}
            />
          </div>
        }
      </div>
    )
  }
}

export default MapSkuToPromo
