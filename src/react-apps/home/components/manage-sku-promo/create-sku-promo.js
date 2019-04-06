import React from "react"
import SkuPromoForm from './sku-promo-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'


class CreateSkuPromo extends React.Component {
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
    this.props.actions.setLoadingState('creatingSkuPromo')
    this.props.actions.fetchCampaignList({
      offset: 0,
      limit: 10
    }, this.successCampaignCallback)
    //this.props.actions.fetchCampaignStatus({})
    //this.props.actions.fetchAdIds()
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
    console.log("form data", skuPromoForm)
    if (this.formIsValid()) {
      this.props.actions.createSkuPromo({
        campaign_id: skuPromoForm.selectedCampaignId,
        amount: skuPromoForm.amount,
        promoName: skuPromoForm.promoName,
        promo_description: skuPromoForm.description,
        is_on_pack: skuPromoForm.isPackOn === 1 ? true : false
      })
    }
  }

  render() {
    return (
      // <div>Create</div>
      <SkuPromoForm
        ref={(node) => { this.skuPromoForm = node }}
        handleSave={this.handleSave}
        disableSave={!this.props.creatingSkuPromo}
        campaignList={this.state.campaignList}
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
)(CreateSkuPromo)