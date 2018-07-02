import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import { POST } from '@utils/fetch/fetch'
import Notify from '@components/Notification'
import Moment from 'moment'

import Dialog from 'material-ui/Dialog'

class ConfirmRollback extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleReason = this.handleReason.bind(this)
  }
  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountConfirmModal()
    }, 500)
  }

  handleReason(e) {
    this.setState({ reason: e.target.value })
  }
  render() {
    const actions = [
      <RaisedButton
        label="Yes"
        primary
        onClick={() => {
          this.props.handleDeleteTransaction(this.props.id, this.state.reason)
          this.handleClose()
        }}
      />,
      <FlatButton
        label="Cancel"
        secondary
        onClick={this.handleClose}
      />
    ]
    return (
      <div>
        <Dialog
          title="Rollback transaction"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>Are your sure you want to rollback this transaction ({this.props.id})?</p>
          <textarea
            onChange={this.handleReason}
            placeholder="Reason (optional)"
            value={this.state.reason}
            style={{
              resize: 'none',
              width: '400px',
              height: '100px',
              fontSize: '14px',
              padding: '20px'
            }}
          />
        </Dialog>
      </div>
    )
  }
}


function ViewTransactions(data, mountConfirmModal) {
  return (
    <Table
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
          data.map(item => (
            <TableRow key={item.order_id}>
              <TableRowColumn style={{ width: '80px' }}>{item.order_id}</TableRowColumn>
              {/* <TableRowColumn style={{ width: '80px' }}>{item.consumer_id}</TableRowColumn> */}
              <TableRowColumn style={{ width: '100px' }}>{item.full_name}</TableRowColumn>
              <TableRowColumn style={{ width: '120px' }}>{item.transaction_type}</TableRowColumn>
              <TableRowColumn style={{ width: '120px' }}>{Moment(item.created_at).format('DD/MM/YYYY, h:mm')}</TableRowColumn>
              {/* <TableRowColumn style={{ width: '80px' }}>{item.retailer_id}</TableRowColumn> */}
              <TableRowColumn style={{ width: '100px' }}>{item.org_name}</TableRowColumn>
              <TableRowColumn style={{ width: '60px', textAlign: 'center' }}>
                <button style={{ cursor: 'pointer' }} onClick={() => { mountConfirmModal(item.order_id) }}>Rollback</button>
              </TableRowColumn>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}


class RollbackTransaction extends React.Component {
  constructor() {
    super()
    this.state = {
      orderId: '',
      loadingTransactions: true,
      shouldMountModal: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.mountConfirmModal = this.mountConfirmModal.bind(this)
    this.unmountConfirmModal = this.unmountConfirmModal.bind(this)
    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this)
  }

  handleChange(e) {
    this.setState({ orderId: e.target.value.trim() })
  }

  mountConfirmModal(id) {
    this.setState({ shouldMountModal: true, id })
  }

  unmountConfirmModal() {
    this.setState({ shouldMountModal: false })
  }

  handleDeleteTransaction(id, reason) {
    POST({
      api: '/consumer/quick_pay/delete_transaction',
      apiBase: 'orderman',
      data: { order_id: id, reason },
      handleError: true
    })
    .then(json => {
      Notify(json.message, 'success')
    })
    .catch(json => {
      Notify(json.message, 'warning')
    })
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      POST({
        api: '/consumer/quick_pay/get_transaction',
        apiBase: 'orderman',
        data: { order_id: this.state.orderId },
        handleError: true
      })
      .then(json => {
        this.setState({
          loadingTransactions: false,
          transactions: json.transaction,
          message: json.message
        })
      })
    }
  }

  render() {
    // console.log(this.transactions);
    return (
      <div>
        <input
          style={{
            height: '36px',
            padding: '0 20px',
            width: '320px',
            fontSize: '14px'
          }}
          placeholder="Search for transaction ID.."
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.orderId}
        />
         <div style={{ marginTop: '20px' }}>
           {
             !this.state.loadingTransactions && this.state.transactions &&
             ViewTransactions(this.state.transactions, this.mountConfirmModal)
           }
           <p>{ this.state.message }</p>
           {
             this.state.shouldMountModal &&
             <ConfirmRollback
               unmountConfirmModal={this.unmountConfirmModal}
               handleDeleteTransaction={this.handleDeleteTransaction}
               id={this.state.id}
             />
           }
         </div>
      </div>
    )
  }
}

export default RollbackTransaction
