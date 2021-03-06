import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import StateDetailsForm from './state-details-form'
import { Card } from 'material-ui/Card'

class CreateState extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isDisabled: false
    }
    this.submit = this.submit.bind(this)
    this.callbackUpdate = this.callbackUpdate.bind(this)
  }

  callbackUpdate (status) {
    if (status) {
      this.setState({ isDisabled: false })
    }
  }

  submit () {
    const data = this.stateDetailsForm.getData()
    if (data.stateName.length && data.stateShortName.length) {
      this.setState({ isDisabled: true })
      this.props.actions.createState({
        state_name: data.stateName,
        short_name: data.stateShortName,
        price_type: data.priceType,
        gst_number: data.gst,
        sgst_percentage: parseFloat(data.sgst),
        cgst_percentage: parseFloat(data.cgst),
        igst_percentage: parseFloat(data.igst),
        //default_city_id: parseInt(data.selectedCityIdx),
        upi_enabled: data.isUPIEnabled,
        hbwallet_enabled: data.isHipbarWalletEnabled,
        gift_wallet_enabled: data.isGiftWalletEnabled,
        //catalog_enabled: data.isCatalogEnabled,
        //add_money:data.addMoney,
        is_deliverable:data.isDeliverable,
        is_active: data.isActive,
        fk_enabled: data.fkEnabled,
        is_presentation_enabled: data.isPresentationEnabled,
        is_brand_details_enabled: data.isBrandDetailsEnabled,
      }, this.callbackUpdate)
    }
  }

  render () {
    return (
      <div style={{
        width: '50%',
        position: 'relative',
        display: 'block',
        verticalAlign: 'top',
        marginRight: '20px'
      }}
      >

        <div>

          {/* <Card
            style={{
              padding: '20px',
              width: '75%'
            }}
          > */}
            <h3 style={{ marginTop: 0, marginBottom: '40px' }}>Create new state</h3>
            <StateDetailsForm
              ref={(node) => { this.stateDetailsForm = node }}
            />
          {/* </Card> */}
          <RaisedButton
            primary
            disabled={this.state.isDisabled}
            label="Save"
            onClick={this.submit}
            style={{ marginTop: '40px' }}
          />
        </div>

      </div>
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
)(CreateState)
