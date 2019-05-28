import React from 'react'
import RetailerPromoForm from './create-retailer-promo-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class CreateRetailerPromo extends React.Component {
  constructor() {
    super()

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('creatingRetailerSpecificPromo')
    //this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const retailerPromoForm = this.retailerPromoForm.getData()

    if (retailerPromoForm.retailerList.length === 0) {
      return false
    } else if (retailerPromoForm.orderType.length === 0) {
      return false
    } else if (retailerPromoForm.promoCode.toString().length === 0) {
      return false
    } else if (retailerPromoForm.selectedStatusIdx.toString().length === 0) {
      return false
    }

    return true
  }

  handleSave() {
    const retailerPromoForm = this.retailerPromoForm.getData()

    if (this.formIsValid()) {
      this.props.actions.createRetailerSpecificPromo({
        promo_code: retailerPromoForm.promoCode,
        retailer_list: retailerPromoForm.retailerList,
        order_type: retailerPromoForm.orderType,
        is_active: retailerPromoForm.selectedStatusIdx === 1 ? true : false
      })
    }
  }

  render() {
    return (
      <RetailerPromoForm
        ref={(node) => { this.retailerPromoForm = node }}
        handleSave={this.handleSave}
        disableSave={!this.props.creatingRetailerSpecificPromo}
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
)(CreateRetailerPromo)