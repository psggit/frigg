import React from "react"
import SkuPromoForm from "./sku-promo-form"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class EditSkuPromo extends React.Component {
  constructor() {
    super()
   
    this.state = {
      campaignList: []
    }

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.successCampaignCallback = this.successCampaignCallback.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('updatingCampaign')
    this.props.actions.fetchCampaignList({
      offset: 0,
      limit: 5000
    }, this.successCampaignCallback)
  }

  successCampaignCallback() {
    const campaignList = this.props.campaignList.map((item, i) => {
      return {
        //value: i,
        text: item.name,
        value: item.id
        //id: item.id
      }
    })
    console.log("campaign list", campaignList)
    this.setState({campaignList})
  }

  formIsValid() {
    const skuPromoForm = this.skuPromoForm.getData()

    if (skuPromoForm.selectedCampaignId.length === 0) {
      return false
    } else if (skuPromoForm.promoName.toString().length === 0) {
      return false
    } else if (skuPromoForm.amount.toString().length === 0) {
      return false
    } else if (skuPromoForm.description.toString().length === 0) {
      return false
    } else if (skuPromoForm.isPackOn.toString().length === 0) {
      return false
    }

    return true
  }

  handleSave() {
    const skuPromoForm = this.skuPromoForm.getData()
    if (this.formIsValid()) {
      this.props.actions.updateSkuPromo({
        id: this.props.location.state.id,
        campaign_id: skuPromoForm.selectedCampaignId,
        amount: parseInt(skuPromoForm.amount),
        is_on_pack: skuPromoForm.isPackOn,
        promo_description: skuPromoForm.description,
        promoName: skuPromoForm.promoName
      })
    }
  }

  render() {
    return (
      <SkuPromoForm
        ref={(node) => { this.skuPromoForm = node }}
        handleSave={this.handleSave}
        data={this.props.location.state}
        disableSave={!this.props.updatingSkuPromo}
        isDisabled={true}
        campaignList={this.state.campaignList}
        //campaignStatus={this.props.campaignList}
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
)(EditSkuPromo)