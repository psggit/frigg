import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './../../../sass/add-credits.scss'
import * as Actions from './../actions'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import ConfirmCredits from '../components/confirm-credits';

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
      }
    }

    this.validateForm = this.validateForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeWithValidation = this.handleChangeWithValidation.bind(this)
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

  // onDropdownSelected(e) {
  //   this.setState({transactionCode : e.target.value})
  // }

  validateAmount(amount) {
    // console.log('amount', amount, amount.length);
    if(amount <= 0) {
      return ({status: true, value: 'Amount is required'})
    }
    return ({status: false, value: ''})
  }

  validateTransactionCode(transactionCode) {
    // console.log("transaction code", transactionCode, transactionCode.length)
    if(!transactionCode.length) {
      return ({status: true, value: 'Trasanction code is required'})
    }
    return ({status: false, value: ''})
  }

  mountConfirmCredits() {
    console.log("confirmCredutsModal", "props", this.props, this.props.data.customerDetails)
    mountModal(ConfirmCredits({
      customerDetails: this.props.data.customerDetails
    }))
  }

  validateForm() {

    const { amount, transactionCode, batchNo, comment } = this.state
    this.setState({ amountErr : this.validateAmount(amount) })
    this.setState({ transactionCodeErr: this.validateTransactionCode(transactionCode) })
    const { amountErr, transactionCodeErr } = this.state

  
    let transactionId = this.props.data.transactionCodes.filter((item) => {
  
      if(transactionCode === item.code) {
        return item
      }
       
    })

    if (!amountErr.status && !transactionCodeErr.status) {

      let emailIds = [] 
      emailIds = this.state.emailIds.replace(/\s/g, '')
      emailIds = emailIds.split(',')
      emailIds = [...new Set(emailIds.map((id) => { return id}))]

      this.props.data.addCreditsFormDetails = {
        transactionId : transactionId[0].id,
        transactionCode,
        amount,
        batchNo,
        comment,
        emailIds
      }

      emailIds = emailIds.map((email) => {
        return {
          email
        }
      })
      
      this.props.actions.verifyTransaction({
        mail_ids: emailIds
      }, (response) => {
        this.mountConfirmCredits(response)
      })

    }

  }

  handleChangeWithValidation(e) {
    const errName = `${e.target.name}Err`
    const fnExp = eval(`this.validate${this.inputNameMap[e.target.name]}`)
    this.setState({
      [e.target.name]: e.target.value,
      [errName]: fnExp(e.target.value)
    })
    // console.log("err", fnExp(e.target.value))
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })  
  }

  render() {
    const { transactionCodeErr, amountErr } = this.state
    return (
      <div className="form">
        <div className="input-field">
          <span>Consumer Email Ids</span>
          <input className="field-value" onChange={this.handleChange} name="emailIds" value={this.state.emailIds} type="text"/>
        </div>
        <div className="input-field">
          <span>Transaction Code</span>
          <select onChange={this.handleChangeWithValidation} value={this.state.transactionCode} name="transactionCode">
            {/* <option> Select transaction code </option> */}
            {!this.props.data.loadingTransactionCode && 
              this.renderTransactionCode()
            }
          </select>
          {transactionCodeErr.status && <p className="field-error">{transactionCodeErr.value}</p>}
        </div>
        <div className="input-field">
          <span>Batch Number</span>
          <input className="field-value" onChange={this.handleChange} value={this.state.batchNo} name="batchNo" type="text"/>
        </div>
        <div className="input-field">
          <span>Amount</span>
          <input className="field-value" onChange={this.handleChangeWithValidation} value={this.state.amount} name="amount" type="text"/>
          {amountErr.status && <p className="field-error">{amountErr.value}</p>}
        </div>
        <div className="input-field">
          <span>Comment</span>
          <textarea className="field-value" onChange={this.handleChange} value={this.state.comment} name="comment" rows="4" cols="40"></textarea>
        </div>
        <div className={`submit-button`} onClick={this.validateForm}>
          <button> Create </button>
        </div>
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