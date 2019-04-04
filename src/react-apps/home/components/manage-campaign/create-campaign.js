import React from "react"
import CampaignForm from './campaign-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'


class CreateCampaign extends React.Component {
  constructor() {
    super()

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('creatingCampaign')
    this.props.actions.fetchBrandManagerList({})
    this.props.actions.fetchCampaignStatus({})
    //this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const campaignForm = this.campaignForm.getData()

    if (campaignForm.campaignName.length === 0) {
      return false
    } else if (campaignForm.type.toString().length === 0) {
      return false
    } else if (campaignForm.activeFrom.toString().length === 0) {
      return false
    } else if (campaignForm.activeTo.toString().length === 0) {
      return false
    } else if (campaignForm.selectedStatusIdx.toString().length === 0) {
      return false
    } else if (campaignForm.brandManagerId.toString().length === 0) {
      return false
    } else if (campaignForm.budgetedAmount.toString().length === 0) {
      return false
    } else if (campaignForm.fundsCredited.toString().length === 0) {
      return false
    }

    return true
  }

  handleSave() {
    const campaignForm = this.campaignForm.getData()
    console.log("form data", campaignForm)
    if (this.formIsValid()) {
      this.props.actions.createCampaign({
        name: campaignForm.campaignName,
        funds_credited: campaignForm.fundsCredited,
        budgeted_amount: campaignForm.budgetedAmount,
        brandManagerId: campaignForm.brandManagerId,
        type: campaignForm.type,
        active_from: campaignForm.activeFrom,
        active_to: campaignForm.activeTo,
        is_active: campaignForm.selectedStatusIdx === 1 ? true : false
      })
    }
  }

  render() {
    return (
      <CampaignForm
        ref={(node) => { this.campaignForm = node }}
        handleSave={this.handleSave}
        disableSave={!this.props.creatingCampaign}
        brandManagerList={this.props.brandManagerList}
        campaignStatus={this.props.campaignList}
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
)(CreateCampaign)