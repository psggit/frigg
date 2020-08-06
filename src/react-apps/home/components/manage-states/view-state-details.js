import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import StateDetailsForm from './state-details-form'
import IfElse from '@components/declarative-if-else'
import { Card } from 'material-ui/Card'
import { getQueryObj } from '@utils/url-utils'

class ViewState extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
    this.submit = this.submit.bind(this)
    this.enableEditMode = this.enableEditMode.bind(this)
    this.disableEditMode = this.disableEditMode.bind(this)
  }

  enableEditMode() {
    this.setState({ isEdit: true })
  }

  disableEditMode() {
    this.setState({ isEdit: false })
    this.stateDetailsForm.resetState()
  }

  submit() {
    const data = this.stateDetailsForm.getData()
    const queryObj = getQueryObj(location.search.slice(1))
    if (data.stateName.length && data.stateShortName.length) {
      this.props.actions.updateState({
        id: parseInt(this.props.history.location.state.id),
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
        //add_money: data.addMoney,
        is_deliverable: data.isDeliverable,
        is_active: data.isActive,
        fk_enabled:data.fkEnabled,
      })
    }
  }

  render() {
    const queryObj = getQueryObj(location.search.slice(1))
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
          <IfElse conditionMet={!this.state.isEdit}>
            <RaisedButton
              primary
              label="Edit"
              onClick={this.enableEditMode}
              style={{ marginBottom: '40px' }}
            />
            <RaisedButton
              primary
              label="Cancel"
              onClick={this.disableEditMode}
              style={{ marginBottom: '40px' }}
            />
          </IfElse>
          <Card
            style={{
              padding: '20px',
              width: '100%'
            }}
          >
            <StateDetailsForm
              isDisabled={!this.state.isEdit}
              ref={(node) => { this.stateDetailsForm = node }}
              data={this.props.location.state}
              // stateName={queryObj.stateName}
              // stateShortName={queryObj.stateShortName}
              // priceType={queryObj.priceType}
              // isUPIPressed={queryObj.isUPIPressed}
              // isHipbarWalletPressed={queryObj.isHipbarWalletPressed}
              // isGiftWalletPressed={queryObj.isGiftWalletPressed}
              // isCatalogPressed={queryObj.isCatalogPressed}
            />
          </Card>
          <RaisedButton
            primary
            label="Save Changes"
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
)(ViewState)
