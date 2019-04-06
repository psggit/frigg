import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'


class MapSkuToPromo extends React.Component {
  constructor() {
    super()
    this.state = {
      promoList: [],
      selectedPromoId: ""
    }
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.successPromoListCallback = this.successPromoListCallback.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('mappingPromoToSku')
    this.props.actions.fetchPromoList({
    }, this.successPromoListCallback)
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
    this.setState({promoList, selectedPromoId: promoList[0].value})
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

  handleSelectChange(e, k) {
    //console.log("brand manaer", k, this.state.promoList[k])
    const selectedPromoId = k
    this.setState({ selectedPromoId: this.state.promoList[k].value })
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
    return (
      <React.Fragment>
        <h4 style={{ margin: '0', marginBottom: '40px' }}>Map sku to promo</h4>

        <div className="form-group">
          <label className="label">Promo</label><br />
          <SelectField
            value={this.state.selectedPromoId}
            onChange={this.handleSelectChange}
          >
            {
              this.state.promoList.map((item, i) => (
                <MenuItem
                  value={item.value}
                  key={item.value}
                  primaryText={item.text}
                />
              ))
            }
          </SelectField>

        </div>
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