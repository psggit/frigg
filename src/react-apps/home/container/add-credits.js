import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './../../../sass/add-credits.scss'
import * as Actions from './../actions'

class AddCredits extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      transactionCode: ''
    }
  }

  componentDidMount() {
    this.props.actions.fetchTrasactionCode()
  }

  renderTransactionCode() {
      console.log("trans code", this.props)
      // return this.props.transactionCodes.map((item, i) => {
      //   return (
      //     <option key={i} value={item.code}>{item.code}</option>
      //   )
      // })
  }  

  onDropdownSelected(e) {
    this.setState({transactionCode : e.target.value})
  }

  render() {
    return (
      <div className="form">
        <div className="input-field">
          <span>Consumer Email Ids</span>
          <input className="field-value"/>
        </div>
        <div className="input-field">
          <span>Transaction Code</span>
          <select onChange={(e) => this.onDropdownSelected(e)}>
            {this.renderTransactionCode()}
          </select>
        </div>
        <div className="input-field">
          <span>Batch Number</span>
          <input className="field-value"/>
        </div>
        <div className="input-field">
          <span>Amount</span>
          <input className="field-value"/>
        </div>
        <div className="input-field">
          <span>Comment</span>
          <input className="field-value"/>
        </div>
        <div className="submit-button">
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