import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import * as Api from "./../../middleware/api"
import Dialog from 'material-ui/Dialog'
import AddProductDialog from "./add-product-dialog"

class DenominationsForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.is_active = [
      { text: 'true', value: 1 },
      { text: 'false', value: 2 },
    ]
    // console.log("is-active", 
    // this.is_active.find(item => (item.text).toLowerCase()).value, 
    //  )
    console.log("selectedvalue", props.data ? props.data.is_active : 1 )
    this.state = {
      shouldMountDialog: false,
      productName: props.data ? props.data.product_id : "",
      denominations: props.data ? props.data.denomination : "",
      hipcoinLimitPercent: props.data ? props.data.hipcoin_limit_percentage : "",
      hipcoinLimitFlat: props.data ? props.data.hipcoin_limit_flat : "",
      listingOrder: props.data ? props.data.listing_order : "",
      selectedIsActiveIdx: props.data ? props.data.is_active ? 1 : 2 : 1,
      //selectedIsActiveIdx: props.data ? this.is_active.find(item => (item.text).toLowerCase() === (props.data.is_active).toLowerCase()).value : 1,
    }

    this.getData = this.getData.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleIsActiveChange = this.handleIsActiveChange.bind(this)
    this.mountDialog = this.mountDialog.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
    this.addProduct = this.addProduct.bind(this)
  }

  mountDialog() {
    this.setState({ shouldMountDialog: true })
  }

  unmountDialog() {
    this.setState({ shouldMountDialog: false })
  }


  getData() {
    return this.state
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleIsActiveChange(e, k) {
    console.log("isactivechange", this.is_active[k].value)
    this.setState({
      selectedIsActiveIdx: (this.is_active[k].value)
    })
  }

  handleSave() {
      this.props.handleSave()
  }

  addProduct(item){
    this.setState({
      productName: item.product_id
    })
    this.unmountDialog()
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter denomination details</h4>
          <div className="form-group">
            <RaisedButton
              label="Add Product Name"
              primary
              onClick={this.mountDialog}
              disabled={location.pathname.includes("edit")}
            />
            {
              this.state.shouldMountDialog &&
              <AddProductDialog unmountDialog={this.unmountDialog}  addProduct={this.addProduct}/>
            }
          </div>

          <div className="form-group">
            <label className="label">Product Name</label><br />
            <TextField
              onChange={this.handleTextFields}
               name="productName"
               value={this.state.productName}
              style={{ width: '100%' }}
              autoComplete="off"
              disabled={location.pathname.includes("edit") || location.pathname.includes("create")}
            />
          </div>

          <div className="form-group">
            <label className="label">Denomination</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="denominations"
              value={this.state.denominations}
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group">
            <label className="label">HipCoin Limit Percent</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="hipcoinLimitPercent"
              value={this.state.hipcoinLimitPercent}
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group">
            <label className="label">HipCoin Limit Flat</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="hipcoinLimitFlat"
              value={this.state.hipcoinLimitFlat}
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group">
            <label className="label">Listing Order</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="listingOrder"
              value={this.state.listingOrder}
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-group">
            <label className="label">Is Active</label><br />
            <SelectField
              name="is_active"
              value={this.state.selectedIsActiveIdx}
              onChange={this.handleIsActiveChange}
              style={{ width: '100%' }}
            >
              {
                this.is_active.map((item, i) => (
                  <MenuItem
                    value={parseInt(item.value)}
                    key={parseInt(item.value)}
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
              onClick={this.handleSave}
            />
          </div>
        </Card>
      </Fragment>
    )
  }
}

export default DenominationsForm

// import React from "react"

// class DenominationsForm extends React.Component {
//   render(){
//     return(
//       <div>
//         Denominations
//       </div>
//     )
//   }
// }

// export default DenominationsForm