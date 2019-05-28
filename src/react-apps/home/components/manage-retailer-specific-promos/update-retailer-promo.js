import React from 'react'
import RetailerPromoForm from './create-retailer-promo-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class EditRetailerPromo extends React.Component {
  constructor() {
    super()
   
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('updatingRetailerSpecificPromo')
    //this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const retailerPromoForm = this.retailerPromoForm.getData()

    if (retailerPromoForm.userList.length === 0) {
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
      this.props.actions.updateRetailerSpecificPromo({
        promo_code: retailerPromoForm.promoCode.toString(),
        retailer_list: retailerPromoForm.userList,
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
        data={this.props.location.state}
        disableSave={!this.props.updatingRetailerSpecificPromo}
        isDisabled={true}
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
)(EditRetailerPromo)
