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
      skuList: [],
      skuMap: {}
    }
    
    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Map sku to promo</h4>

          <div className="form-group">
            <label className="label">Promo</label><br />
            <SelectField
              value={this.state.selectedPromoId}
              onChange={this.handleSelectChange}
            >
              {
                this.props.promoList.map((item, i) => (
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
              label="Save"
              primary
              disabled={this.props.disableSave}
              onClick={this.props.handleSave}
            />
          </div>
        </Card>
      </Fragment>
    )
  }
}

export default CashbackSkuForm
