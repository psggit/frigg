import React from 'react'
import BankForm from './bank-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class UpdateBank extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   isFormValid: false
    // }

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  formIsValid() {
    const bankForm = this.bankForm.getData()

    if (bankForm.name.length === 0) {
      return false
    } else if (bankForm.imageUrl.length === 0) {
      return false
    } else if (bankForm.listingOrder.toString().length === 0) {
      return false
    }

    return true
  }

  handleSave() {
    const bankForm = this.bankForm.getData()
    if (this.formIsValid()) {
      this.props.actions.updateBankDetails({
        image_url: bankForm.imageUrl,
        listing_order: parseInt(bankForm.listingOrder),
        name: bankForm.name,
        bank_name: bankForm.bankName
      })
    }
  }

  render() {
    return (
      <BankForm
        ref={(node) => { this.bankForm = node }}
        handleSave={this.handleSave}
        data={this.props.location.state}
        disableSave={!this.props.updatingBankDetails}
      />
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateBank)