import React from 'react'
import PromoForm from './create-promo-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class EditUserPromo extends React.Component {
  constructor() {
    super()
   
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('updatingUserSpecificPromo')
    //this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const promoForm = this.promoForm.getData()

    if (promoForm.userList.length === 0) {
      return false
    } else if (promoForm.orderType.length === 0) {
      return false
    } else if (promoForm.promoCode.toString().length === 0) {
      return false
    } else if (promoForm.selectedStatusIdx.toString().length === 0) {
      return false
    }

    return true
  }

  handleSave() {
    const promoForm = this.promoForm.getData()
    if (this.formIsValid()) {
      this.props.actions.updateUserSpecificPromo({
        promo_code: promoForm.promoCode.toString(),
        user_list: promoForm.userList,
        order_type: promoForm.orderType,
        is_active: promoForm.selectedStatusIdx === 1 ? true : false
      })
    }
  }

  render() {
    return (
      <PromoForm
        ref={(node) => { this.promoForm = node }}
        handleSave={this.handleSave}
        data={this.props.location.state}
        disableSave={!this.props.updatingUserSpecificPromo}
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
)(EditUserPromo)
