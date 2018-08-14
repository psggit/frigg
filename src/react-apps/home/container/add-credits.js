import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './../../../sass/add-credits.scss'
import * as Actions from './../actions'

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

  validateForm() {
    // console.log("validate form");
    const { amount, transactionCode } = this.state
    this.setState({ amountErr : this.validateAmount(amount) })
    this.setState({ transactionCodeErr: this.validateTransactionCode(transactionCode) })
    const { amountErr, transactionCodeErr } = this.state

    if (!amountErr.status && !transactionCodeErr.status) {
      return true
    } else {
      return false
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
            <option> Select transaction code </option>
            {!this.props.data.loadingTransactionCode && 
              this.renderTransactionCode()
            }
          </select>
          {transactionCodeErr.status && <p className="form-group__error">{transactionCodeErr.value}</p>}
        </div>
        <div className="input-field">
          <span>Batch Number</span>
          <input className="field-value" onChange={this.handleChange} value={this.state.batchNo} name="batchNo" type="text"/>
        </div>
        <div className="input-field">
          <span>Amount</span>
          <input className="field-value" onChange={this.handleChangeWithValidation} value={this.state.amount} name="amount" type="text"/>
          {amountErr.status && <p className="form-group__error">{amountErr.value}</p>}
        </div>
        <div className="input-field">
          <span>Comment</span>
          <input className="field-value" onChange={this.handleChange} value={this.state.comment} name="comment" type="text"/>
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