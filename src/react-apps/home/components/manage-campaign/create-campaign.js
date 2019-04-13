import React from "react"
import CampaignForm from './campaign-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'


class CreateCampaign extends React.Component {
  constructor() {
    super()
    this.state = {
      brandManagerList: [],
      creatingCampaign: false
    }
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.successBrandListCallback = this.successBrandListCallback.bind(this)
    this.successCampaignCallback = this.successCampaignCallback.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('creatingCampaign')
    this.props.actions.fetchBrandManagerList({}, this.successBrandListCallback)
    //this.props.actions.fetchCampaignStatus({})
    //this.props.actions.fetchAdIds()
  }

  successBrandListCallback() {
    const brandManagerList = this.props.brandManagerList.map((item) => {
      return {
        value: item.id,
        text: item.email
      }
    })
    console.log("manager list", brandManagerList)
    this.setState({brandManagerList})
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
    this.setState({ creatingCampaign: false })
  }

  handleSave() {
    const campaignForm = this.campaignForm.getData()
    //console.log("form data", campaignForm)
    if (this.formIsValid()) {
      this.setState({creatingCampaign: true})
      this.props.actions.createCampaign({
        name: campaignForm.campaignName,
        brand_manager_id: campaignForm.selectedBrandManagerIdx,
        active_from: campaignForm.activeFrom,
        active_to: campaignForm.activeTo,
        is_active: campaignForm.selectedStatusIdx === 1 ? true : false
      }, this.successCampaignCallback)
    }
  }

  render() {
    return (
      <CampaignForm
        ref={(node) => { this.campaignForm = node }}
        handleSave={this.handleSave}
        disableSave={this.state.creatingCampaign}
        brandManagerList={this.state.brandManagerList}
        //campaignStatus={this.props.campaignList}
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