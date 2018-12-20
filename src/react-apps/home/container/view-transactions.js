import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import Moment from 'moment'
import {overrideTableStyle} from './../../utils'

class ViewTransactions extends React.Component {
    componentDidMount() {
        this.overrideTableStyle()
    }
    overrideTableStyle() {
        // document.querySelectorAll(".bordered--table")[1].parentElement.style.overflow = "auto"
        overrideTableStyle()
    }
    render() {
        return (
            <Table
              wrapperStyle={{ height: 'auto' }}
              className="bordered--table"
              selectable={false}
              fixedHeader
            >
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{ width: '80px' }}>ORDER ID</TableHeaderColumn>
                  {/* <TableHeaderColumn style={{ width: '80px' }}>CONSUMER ID</TableHeaderColumn> */}
                  <TableHeaderColumn style={{ width: '100px' }}>CONSUMER NAME</TableHeaderColumn>
                  <TableHeaderColumn style={{ width: '120px' }}>TRANSACTION TYPE</TableHeaderColumn>
                  <TableHeaderColumn style={{ width: '60px' }}>AMOUNT</TableHeaderColumn>
                  <TableHeaderColumn style={{ width: '120px' }}>CREATED AT</TableHeaderColumn>
                  {/* <TableHeaderColumn style={{ width: '80px' }}>RETAILER ID</TableHeaderColumn> */}
                  <TableHeaderColumn style={{ width: '100px' }}>RETAILER NAME</TableHeaderColumn>
                  <TableHeaderColumn style={{ width: '60px' }}></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                showRowHover
              >
                {
                  this.props.data.map(item => (
                    <TableRow key={item.order_id}>
                      <TableRowColumn style={{ width: '80px' }}>{item.order_id}</TableRowColumn>
                      {/* <TableRowColumn style={{ width: '80px' }}>{item.consumer_id}</TableRowColumn> */}
                      <TableRowColumn style={{ width: '100px' }}>{item.full_name}</TableRowColumn>
                      <TableRowColumn style={{ width: '120px' }}>{item.transaction_type}</TableRowColumn>
                      <TableRowColumn style={{ width: '60px' }}>{item.amount}</TableRowColumn>
                      <TableRowColumn style={{ width: '120px' }}>{Moment(item.created_at).format('DD/MM/YYYY, h:mm')}</TableRowColumn>
                      {/* <TableRowColumn style={{ width: '80px' }}>{item.retailer_id}</TableRowColumn> */}
                      <TableRowColumn style={{ width: '100px' }}>{item.org_name}</TableRowColumn>
                      <TableRowColumn style={{ width: '60px', textAlign: 'center' }}>
                        <button style={{ cursor: 'pointer' }} onClick={() => { this.props.mountConfirmModal(item.order_id) }}>Rollback</button>
                      </TableRowColumn>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          )
    }
}

export default ViewTransactions