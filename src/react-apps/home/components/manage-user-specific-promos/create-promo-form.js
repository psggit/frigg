import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'

class UserPromoForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      promoCode: "",
      userList: "",
      orderType: "",
      status: ""
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Fragment>
        <Card style={{
            padding: '20px',
            width: '30%',
            position: 'relative',
            display: 'block',
            verticalAlign: 'top',
            marginRight: '20px'
          }}
        >
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Promo Details</h4>
          <div className="form-group">
            <label className="label">Promo Code</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="promoCode"
              value={this.state.promoCode}
              style={{ width: '100%' }}
            />
          </div>
        
          <div className="form-group">
            <label className="label">User List</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="userList"
              value={this.state.userList}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Order Type</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="orderType"
              value={this.state.orderType}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Status</label><br/>
            <SelectField
              //disabled={this.props.isDisabled}
              value={this.state.selectedStatusIdx}
              onChange={this.handleStatusChange}
            >
              {
                this.PromoStatus.map((item, i) => (
                  <MenuItem
                    value={i + 1}
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

export default UserPromoForm
