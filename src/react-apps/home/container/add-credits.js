import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './../../../sass/add-credits.scss'
import * as Actions from './../actions'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import ConfirmCredits from '../components/confirm-credits'
import { validateNumType, checkCtrlA, checkCtrlV } from './../../utils'
//import ConfirmModal from '@components/ModalBox/ConfirmModal'

class AddCredits extends React.Component {

  constructor(props) {
    super(props)

    this.inputNameMap = {
      transactionCode: 'TransactionCode',
      amount: 'Amount'
    }

    this.state = {
      transactionCode: '',
      amount: '',
      emailIds: '',
      batchNo: '',
      comment: '',
      amountErr: {
        status: false,
        value: ''
      },
      transactionCodeErr: {
        status: false,
        value: ''
      },
      duplicateEmailIdCount: 0,
      shouldMountConfirmCredits: false,
      verifyingTransaction: false,
      showNotification: false
    }

    //this.showNotification = false
    this.validateForm = this.validateForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeWithValidation = this.handleChangeWithValidation.bind(this)
    this.createTransaction = this.createTransaction.bind(this)
    this.unMountConfirmCreditsModal = this.unMountConfirmCreditsModal.bind(this)
    this.mountConfirmCredits = this.mountConfirmCredits.bind(this)
    this.deleteCredit =  this.deleteCredit.bind(this)
    this.handleChangeInAmount = this.handleChangeInAmount.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchTrasactionCode()
  }

  renderTransactionCode() {
    return this.props.data.transactionCodes.map((item, i) => {
      return (
        <option key={i} value={item.code}>{item.code}</option>
      )
    })
  }
  
  deleteCredit(consumerId) {

    this.props.actions.updateAddCreditTrasactionList({
      data : consumerId
    })

  }

  // onDropdownSelected(e) {
  //   this.setState({transactionCode : e.target.value})
  // }

  validateAmount(amount) {
    if(amount.toString().length && (/^[.\d]+$/.test(amount)) && +(amount)) {
      return ({status: false, value: ''})
    } 
    return ({status: true, value: 'Valid amount is required'})
  }

  validateTransactionCode(transactionCode) {
    if(!transactionCode.length) {
      return ({status: true, value: 'Trasanction code is required'})
    }
    return ({status: false, value: ''})
  }

  unMountConfirmCreditsModal() {
    this.setState({ shouldMountConfirmCredits: false })
  }

  getValidTransactions() {

    let validTransactions = this.props.data.customerDetails.filter((item) => {
      if(item.valid) {
        return item;
      }
    })
    return validTransactions;
  }

  createTransaction() {

    let validTransactions = this.getValidTransactions()

    if(validTransactions.length) {

      this.setState({verifyingTransaction: true})

      let validTransactionsDetails = validTransactions.map((transaction) => {
        return {
          email: transaction.email,
          id: transaction.id.toString(),
          amount: +(transaction.amount),
          reason: transaction.reason,
          transaction_code_id: transaction.transactionId,
          batch_number: transaction.batchNo
        }
      })

      this.props.actions.createTransaction({
        data : validTransactionsDetails
      }, (response) => {
        this.setState({verifyingTransaction: false})
      })
    } else {
      this.unMountConfirmCreditsModal()
      this.setState({showNotification: true})
      // mountModal(ConfirmModal({
      //   heading: 'Notification',
      //   confirmMessage: 'Sorry! no valid customers found',
      // }))
    }

  }

  mountConfirmCredits() {
    // mountModal(ConfirmCredits({
    //   customerDetails: this.props.data.customerDetails,
    //   handleClickOnCancel: this.unMountModal,
    //   handleClickOnConfirm: this.createTransaction,
    //   duplicateEmailIDCount: this.state.duplicateEmailIDCount
    // }))
    this.setState({ shouldMountConfirmCredits: true })
  }

  validateForm() {

    const { amount, transactionCode, batchNo, comment} = this.state

    this.setState({ 
      amountErr : this.validateAmount(amount), 
      transactionCodeErr: this.validateTransactionCode(transactionCode) 
    },  () => {
      const { amountErr, transactionCodeErr } = this.state
      let transactionId = this.props.data.transactionCodes.filter((item) => {
        if(transactionCode === item.code) {
          return item
        }
      })

      if (!amountErr.status && !transactionCodeErr.status) {

        let emailIdsWithDuplicates = [], uniqueEmailIds = []
        emailIdsWithDuplicates = this.state.emailIds.replace(/\s/g, '')
        emailIdsWithDuplicates = emailIdsWithDuplicates.split(',')
        uniqueEmailIds = [...new Set(emailIdsWithDuplicates.map((id) => { return id}))]
  
        this.setState({ duplicateEmailIdCount : emailIdsWithDuplicates.length - uniqueEmailIds.length, verifyingTransaction: true})
  
        this.props.data.addCreditsFormDetails = {
          transactionId : transactionId[0].id,
          transactionCode,
          amount,
          batchNo,
          comment,
          emailIds: uniqueEmailIds
        }
  
        uniqueEmailIds = uniqueEmailIds.map((email) => {
          return {
            email
          }
        })
        
        this.props.actions.verifyTransaction({
          mail_ids: uniqueEmailIds
        }, (response) => {
  
          this.setState({verifyingTransaction :false})
  
          let validTransactions = this.getValidTransactions()
  
          if(validTransactions.length) {
            this.mountConfirmCredits(response)
          } else {
            this.setState({showNotification : true})
            // mountModal(ConfirmModal({
            //   heading: 'Notification',
            //   confirmMessage: 'Sorry! no valid customers found',
            // }))
          }
          
        })
      
      }
     
    })

  }

  handleChangeWithValidation(e) {
    const errName = `${e.target.name}Err`
    const fnExp = eval(`this.validate${this.inputNameMap[e.target.name]}`)
    this.setState({
      [e.target.name]: e.target.value,
      [errName]: fnExp(e.target.value)
    })
  }

  handleChangeInAmount(e) {
    const errName = `${e.target.name}Err`
    const fnExp = eval(`this.validate${this.inputNameMap[e.target.name]}`)
    if(validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) {
      this.setState({ 
        [e.target.name]: (e.target.value),
        [errName]: fnExp(e.target.value) 
      })
    } else {
      e.preventDefault()
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })  
  }

  unMountErrorModal() {
    this.setState({showNotification: false})
  }

  render() {
    const { transactionCodeErr, amountErr, duplicateEmailIdCount, verifyingTransaction} = this.state
    return (
      <div>
      <div className="form">
        <div className="input-field">
          <span>Consumer Email Ids</span>
          {/* <input className="field-value" onChange={this.handleChange} name="emailIds" value={this.state.emailIds} type="text"/> */}
          <textarea className="field-value" onChange={this.handleChange} value={this.state.emailIds} name="emailIds" rows="2" cols="40"></textarea>
        </div>
        <div className="input-field">
          <span>Transaction Code</span>
          <select onChange={this.handleChangeWithValidation} value={this.state.transactionCode} name="transactionCode">
            <option> Select transaction code </option>
            {!this.props.data.loadingTransactionCode && 
              this.renderTransactionCode()
            }
          </select>
          {transactionCodeErr.status && <p className="field-error">{transactionCodeErr.value}</p>}
        </div>
        <div className="input-field">
          <span>Batch Number</span>
          <input className="field-value" onChange={this.handleChange} value={this.state.batchNo} name="batchNo" maxLength={15} type="text"/>
        </div>
        <div className="input-field">
          <span>Amount</span>
          <input className="field-value" onKeyDown={this.handleChangeInAmount} onKeyUp={this.handleChangeInAmount} name="amount" />
          {amountErr.status && <p className="field-error">{amountErr.value}</p>}
        </div>
        <div className="input-field">
          <span>Comment</span>
          <textarea className="field-value" onChange={this.handleChange} value={this.state.comment} name="comment" rows="4" cols="40"></textarea>
        </div>
        <div className={`submit-button ${verifyingTransaction ? 'disable' : ''}`} onClick={this.validateForm}>
          <button> Create </button>
        </div>
      </div>
      {
        this.state.shouldMountConfirmCredits &&
        <ConfirmCredits 
          data={this.props.data.customerDetails} 
          unMountModal= {this.unMountConfirmCreditsModal} 
          handleClickOnConfirm = {this.createTransaction}
          duplicateEmailIdCount = {duplicateEmailIdCount} 
          deleteCredit={this.deleteCredit} 
        />
      }
      {
        this.state.showNotification && 
        <ModalBox>
          <ModalHeader>Notification</ModalHeader>
          <ModalBody>Sorry! no valid customer found</ModalBody>
          <ModalFooter>
            <button className="btn btn-secondary" onClick={() => this.unMountErrorModal()}> Cancel </button>
          </ModalFooter>
        </ModalBox>
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.main
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCredits)

//export default AddCredits