import React from "react"
import CampaignForm from "./campaign-form"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class EditCampaign extends React.Component {
  constructor() {
    super()
   
    this.state = {
      brandManagerList: []
    }

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.successCampaignCallback = this.successCampaignCallback.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('updatingCampaign')
    this.props.actions.fetchBrandManagerList({}, this.successCampaignCallback)
    //this.props.actions.fetchCampaignStatus({})
    //this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const campaignForm = this.campaignForm.getData()

    if (campaignForm.campaignName.length === 0) {
      return false
    } else if (campaignForm.activeFrom.toString().length === 0) {
      return false
    } else if (campaignForm.activeTo.toString().length === 0) {
      return false
    } else if (campaignForm.selectedStatusIdx.toString().length === 0) {
      return false
    } else if (campaignForm.selectedBrandManagerIdx.toString().length === 0) {
      return false
    }

    return true
  }

  successCampaignCallback() {
    const brandManagerList = this.props.brandManagerList.map((item) => {
      return {
        value: item.id,
        text: item.email
      }
    })
    console.log("manager list", brandManagerList)
    this.setState({brandManagerList})
  }

  handleSave() {
    const campaignForm = this.campaignForm.getData()
    if (this.formIsValid()) {
      this.props.actions.updateCampaign({
        id: this.props.location.state.id,
        name: campaignForm.campaignName,
        // funds_credited: campaignForm.fundsCredited,
        // budgeted_amount: campaignForm.budgetedAmount,
        brand_manager_id: campaignForm.selectedBrandManagerIdx,
        //type: campaignForm.type,
        active_from: new Date(campaignForm.activeFrom),
        active_to:  new Date(campaignForm.activeTo),
        is_active: campaignForm.selectedStatusIdx === 1 ? true : false
      })
    }
  }

  render() {
    return (
      <CampaignForm
        ref={(node) => { this.campaignForm = node }}
        handleSave={this.handleSave}
        data={this.props.location.state}
        disableSave={!this.props.updatingCampaign}
        isDisabled={true}
        brandManagerList={this.state.brandManagerList}
        campaignStatus={this.props.campaignList}
      />
    )
  }
}

//export default EditCampaign
const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditCampaign)