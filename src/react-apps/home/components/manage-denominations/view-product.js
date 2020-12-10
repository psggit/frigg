import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { getQueryObj } from '@utils/url-utils'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  'ID',
  'PRODUCT NAME',
  ''
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '100px' }
]

class ViewProduct extends React.Component {
  constructor() {
    super()

    this.handleAddProduct = this.handleAddProduct.bind(this)
  }

  handleAddProduct(e, item){
    //console.log("id", item.product_id)
    this.props.addProduct(item)
  }

  render() {
    const {
      loadingConversionRate,
      conversionRateList
    } = this.props

    return (
      <div>
        <Table
          onCellClick={this.expandColumn}
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
              !loadingConversionRate
                ? (
                  conversionRateList.map((item, i) => (
                    <TableRow key={item.id}>
                      <TableRowColumn style={styles[0]}>{item.product_id}</TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.name}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>
                        <FlatButton
                          label="add"
                          primary
                          //onClick={this.handleAddProduct}
                          onClick={e => this.handleAddProduct(e, item)}

                          // onClick={() => {
                          //   this.props.handleAddProduct(item.id)
                          // }}
                        />
                      </TableRowColumn>
                    </TableRow>
                  ))
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


export default ViewProduct
