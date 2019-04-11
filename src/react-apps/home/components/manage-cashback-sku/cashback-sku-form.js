import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Moment from 'moment'

class CashbackSkuForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedPromoId: "",
      selectedStateId: "",
      stateList: [],
      promoList: []
    }
  
    this.getData = this.getData.bind(this)
    this.handlePromoChange = this.handlePromoChange.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if(this.props.promoList !== newProps.promoList) {
      this.setState({promoList: newProps.promoList, selectedPromoId: newProps.promoList[0].value})
    }

    if(this.props.stateList !== newProps.stateList) {
      this.setState({stateList: newProps.stateList, selectedStateId: newProps.stateList[0].value})
    }
  }

  handlePromoChange(e, k) {
    this.setState({ selectedPromoId: this.state.promoList[k].value })
  }

  handleStateChange(e, k) {
    this.setState({ selectedStateId: this.state.stateList[k].value })
  }

  getData() {
    return this.state
  }

  render() {
    return (
      <Fragment>
        <Card style={{
            padding: '20px',
            width: '300px',
            position: 'relative',
            display: 'block',
            verticalAlign: 'top',
            marginRight: '20px'
          }}
        >
          <div className="form-group">
          <label className="label">Promo</label><br />
          <SelectField
            value={this.state.selectedPromoId}
            onChange={this.handlePromoChange}
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
        <div className="form-group">
          <label className="label">State</label><br />
          <SelectField
            value={this.state.selectedStateId}
            onChange={this.handleStateChange}
          >
            {
              this.state.stateList.map((item, i) => (
                <MenuItem
                  value={item.value}
                  key={item.value}
                  primaryText={item.text}
                />
              ))
            }
          </SelectField>
        </div>
        <div className="form-group">
          <RaisedButton
            label="Get sku's mapped to promo"
            primary
            disabled={this.props.loadingSkuList}
            onClick={this.props.handleSave}
          />
        </div>
        </Card>
      </Fragment>
    )
  }
}

export default CashbackSkuForm
