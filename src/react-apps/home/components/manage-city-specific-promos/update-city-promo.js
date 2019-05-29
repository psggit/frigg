import React from 'react'
import CityPromoForm from './create-city-promo-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class EditCityPromo extends React.Component {
  constructor() {
    super()
   
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('updatingCitySpecificPromo')
    //this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const cityPromoForm = this.cityPromoForm.getData()

    if (cityPromoForm.cityList.length === 0) {
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
      this.props.actions.updateCitySpecificPromo({
        promo_code: cityPromoForm.promoCode.toString(),
        city_list: cityPromoForm.cityList,
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
        data={this.props.location.state}
        disableSave={!this.props.updatingCitySpecificPromo}
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
)(EditCityPromo)
