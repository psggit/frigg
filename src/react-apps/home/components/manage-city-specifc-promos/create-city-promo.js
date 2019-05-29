import React from 'react'
import CityPromoForm from './create-retailer-promo-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class CreateCityPromo extends React.Component {
  constructor() {
    super()

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('creatingCitySpecificPromo')
    //this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const cityPromoForm = this.cityPromoForm.getData()

    if (cityPromoForm.retailerList.length === 0) {
      return false
    } else if (cityPromoForm.orderType.length === 0) {
      return false
    } else if (cityPromoForm.promoCode.toString().length === 0) {
      return false
    } else if (cityPromoForm.selectedStatusIdx.toString().length === 0) {
      return false
    }

    return true
  }

  handleSave() {
    const cityPromoForm = this.cityPromoForm.getData()

    if (this.formIsValid()) {
      this.props.actions.createCitySpecificPromo({
        promo_code: cityPromoForm.promoCode,
        retailer_list: cityPromoForm.cityList,
        order_type: cityPromoForm.orderType,
        is_active: cityPromoForm.selectedStatusIdx === 1 ? true : false
      })
    }
  }

  render() {
    return (
      <CityPromoForm
        ref={(node) => { this.cityPromoForm = node }}
        handleSave={this.handleSave}
        disableSave={!this.props.creatingCitySpecificPromo}
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
)(CreateCityPromo)