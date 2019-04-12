import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'
import CashbackSkuForm from "./cashback-sku-form"
import ViewSkuList from "./map-sku-to-promo"

class MapSkuToPromo extends React.Component {
  constructor() {
    super()
    this.state = {
      promoList: [],
      stateList: [],
      loadingSkuList: false,
      mappingSkuToPromo: false
      // selectedPromoId: "",
      // selectedStateId: ""
    }
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.successPromoListCallback = this.successPromoListCallback.bind(this)
    this.successStateCallback = this.successStateCallback.bind(this)
    this.successSkuListCallback = this.successSkuListCallback.bind(this)
    this.mapSkuToPromo = this.mapSkuToPromo.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('mappingPromoToSku')
    this.props.actions.fetchPromoList({
    }, this.successPromoListCallback)
    this.props.actions.fetchStateList({}, this.successStateCallback)
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
    const cashbackSkuForm = this.cashbackSkuForm.getData()

    if (cashbackSkuForm.selectedPromoId.toString().length === 0) {
      return false
    } else if (cashbackSkuForm.selectedStateId.toString().length === 0) {
      return false
    }
    return true
  }

  handleSave() {
    const cashbackSkuForm = this.cashbackSkuForm.getData()
    this.setState({loadingSkuList: true})
    //if (this.formIsValid()) {
      this.props.actions.fetchSkuList({
        offer_id: parseInt(cashbackSkuForm.selectedPromoId),
        state_id: parseInt(cashbackSkuForm.selectedStateId)
      }, this.successSkuListCallback)
  }

  successSkuListCallback() {
    this.setState({loadingSkuList: false})
  }

  mapSkuToPromo(skuList) {
    const cashbackSkuForm = this.cashbackSkuForm.getData()
    if(skuList.length > 0) {
      this.setState({mappingSkuToPromo: true})
      this.props.actions.mapSkuToPromo({
        offer_id: parseInt(cashbackSkuForm.selectedPromoId),
        sku_price_list: skuList
      }, () => {
        this.setState({mappingSkuToPromo: false})
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <h4 style={{ margin: '0', marginBottom: '40px' }}>MAP SKU TO PROMO</h4>
        <CashbackSkuForm 
          ref={(node) => { this.cashbackSkuForm = node }}
          promoList = {this.state.promoList}
          stateList = {this.state.stateList}
          loadingSkuList = {this.state.loadingSkuList}
          handleSave = {this.handleSave}
        />
        {
          !this.state.loadingSkuList && 
          <ViewSkuList 
            skuList = {this.props.skuList}
            loadingSkuList = {this.state.loadingSkuList}
            mappingSkuToPromo = {this.state.mappingSkuToPromo}
            mapSkuToPromo = {this.mapSkuToPromo}
          />
        }
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