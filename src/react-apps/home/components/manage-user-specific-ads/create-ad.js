import React from 'react'
import AdForm from './create-ad-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class CreateUserAd extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   isFormValid: false
    // }

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('creatingUserSpecificAd')
    this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const adForm = this.adForm.getData()

    if (adForm.userList.length === 0) {
      return false
    } else if (adForm.appType.length === 0) {
      return false
    } else if (adForm.selectedAdId.toString().length === 0) {
      return false
    } else if (adForm.selectedStatusIdx.toString().length === 0) {
      return false
    }

    return true
  }

  handleSave() {
    const adForm = this.adForm.getData()
    console.log("form data", adForm)
    if (this.formIsValid()) {
      this.props.actions.createUserSpecificAd({
        ad_id: adForm.selectedAdId.toString(),
        user_list: adForm.userList,
        app_type: adForm.appType,
        is_active: adForm.selectedStatusIdx === 1 ? true : false
      })
    }
  }

  render() {
    return (
      <AdForm
        ref={(node) => { this.adForm = node }}
        handleSave={this.handleSave}
        userSpecificAdIds={this.props.userSpecificAdIds}
        disableSave={!this.props.creatingUserSpecificAd}
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
)(CreateUserAd)