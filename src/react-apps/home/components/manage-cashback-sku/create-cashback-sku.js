import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'
import CashbackSkuForm from "./cashback-sku-form"

class MapSkuToPromo extends React.Component {
  constructor() {
    super()
    this.state = {
      promoList: [],
      stateList: [],
      // selectedPromoId: "",
      // selectedStateId: ""
    }
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.successPromoListCallback = this.successPromoListCallback.bind(this)
    this.successStateCallback = this.successStateCallback.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('mappingPromoToSku')
    this.props.actions.fetchPromoList({
    }, this.successPromoListCallback)
    this.props.actions.fetchStateList({}, this.successStateCallback)
    //this.props.actions.
  }

  successPromoListCallback() {
    const promoList = this.props.promoList.map((item, i) => {
      return {
        //value: i,
        text: item.promoName,
        value: item.id
        //id: item.id
      }
    })
    console.log("promo list", promoList)
    this.setState({promoList})
  }

  successStateCallback() {
    const stateList = this.props.stateList.map((item, i) => {
      return {
        text: item.state_name,
        value: item.state_id
      }
    })
    console.log("state list", stateList)
    this.setState({stateList})
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
        amount: parseInt(skuPromoForm.amount),
        promoName: skuPromoForm.promoName,
        promo_description: skuPromoForm.description,
        is_on_pack: skuPromoForm.isPackOn === 1 ? true : false
      })
    }
  }

  render() {
    console.log("props", this.props)
    return (
      <React.Fragment>
        <h4 style={{ margin: '0', marginBottom: '40px' }}>Map sku to promo</h4>
        <CashbackSkuForm 
          promoList = {this.state.promoList}
          stateList = {this.state.stateList}
        />
      </React.Fragment>
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
)(MapSkuToPromo)