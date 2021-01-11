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
    // this.qc_den_active_status = [
    //   { text: 'true', value: 1 },
    //   { text: 'false', value: 2 },
    // ]
    this.state = {
      shouldMountDialog: false,
      productName: props.data ? props.data.product_id : "",
      denominations: props.data ? props.data.denomination : "",
      hipcoinLimitPercent: props.data ? props.data.hipcoin_limit_percentage : 0,
      hipcoinLimitFlat: props.data ? props.data.hipcoin_limit_flat : 0,
      listingOrder: props.data ? props.data.listing_order : "",
      selectedIsActiveIdx: props.data ? props.data.is_active ? 1 : 2 : 1,
      //selectedQcDenActiveIdx: props.data ? props.data.qc_den_active_status ? 1 : 2 : 1,

      denominationsErr: {
        status: false,
        value: ""
      },
      hipcoinLimitPercentErr: {
        status: false,
        value: ""
      },
      hipcoinLimitFlatErr: {
        status: false,
        value: ""
      },
      listingOrderErr: {
        status: false,
        value: ""
      },
      productNameErr: {
        status: false,
        value: ""
      }
    }

    this.getData = this.getData.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleIsActiveChange = this.handleIsActiveChange.bind(this)
   // this.handleQcDenActiveChange = this.handleQcDenActiveChange.bind(this)
    this.mountDialog = this.mountDialog.bind(this)
    this.unmountDialog = this.unmountDialog.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
  }

  mountDialog() {
    this.setState({ shouldMountDialog: true })
  }

  unmountDialog() {
    this.setState({ shouldMountDialog: false })
  }

  isFormValid() {
    if (this.state.hipcoinLimitPercent.length === 0) {
      this.setState({
        hipcoinLimitPercentErr: {
          value: " hipcoinLimitPercent is required",
          status: true
        }
      })
      return false
    } else if (this.state.hipcoinLimitFlat.length === 0) {
      this.setState({
        hipcoinLimitFlatErr: {
          value: "hipcoinLimitFlat is required",
          status: true
        }
      })
      return false
    } else if (this.state.denominations.length === 0) {
      this.setState({
        denominationsErr: {
          value: " denominations is required",
          status: true
        }
      })
      return false
    }
    else if (this.state.listingOrder.length === 0) {
      this.setState({
        listingOrderErr: {
          value: "listingOrder is required",
          status: true
        }
      })
      return false
    }
    else if (this.state.productName.length === 0) {
      this.setState({
        productNameErr: {
          value: "productName is required",
          status: true
        }
      })
      return false
    }
    return true
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName]: {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleIsActiveChange(e, k) {
    this.setState({
      selectedIsActiveIdx: (this.is_active[k].value)
    })
  }

  // handleQcDenActiveChange(e, k) {
  //   this.setState({
  //     selectedQcDenActiveIdx: (this.qc_den_active_status[k].value)
  //   })
  // }

  handleSave() {
    if (this.isFormValid()) {
      console.log("state", this.state)
      this.props.handleSave()
    }
  }

  addProduct(item) {
    this.setState({
      productName: item.product_id
    })
    this.unmountDialog()
  }

  render() {
    const { denominationsErr, hipcoinLimitFlatErr, hipcoinLimitPercentErr, listingOrderErr, productNameErr } = this.state

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
              label="Add Denomination"
              primary
              onClick={this.mountDialog}
              disabled={location.pathname.includes("edit")}
            />
            {
              this.state.shouldMountDialog &&
              <AddProductDialog unmountDialog={this.unmountDialog} addProduct={this.addProduct} />
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
            {
              productNameErr.status &&
              <p className="error-message">* {productNameErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Denomination</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="denominations"
              value={this.state.denominations}
              style={{ width: '100%' }}
              autoComplete="off"
            />
            {
              denominationsErr.status &&
              <p className="error-message">* {denominationsErr.value}</p>
            }
          </div>
          <div className="form-group">
            <label className="label">HipCoin Limit Flat</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="hipcoinLimitFlat"
              value={this.state.hipcoinLimitFlat}
              style={{ width: '100%' }}
              autoComplete="off"
            />
            {
              hipcoinLimitFlatErr.status &&
              <p className="error-message">* {hipcoinLimitFlatErr.value}</p>
            }
          </div>
          <div className="form-group">
            <label className="label">HipCoin Limit Percent</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="hipcoinLimitPercent"
              value={this.state.hipcoinLimitPercent}
              style={{ width: '100%' }}
              autoComplete="off"
            />
            {
              hipcoinLimitPercentErr.status &&
              <p className="error-message">* {hipcoinLimitPercentErr.value}</p>
            }
          </div>
          <div className="form-group">
            <label className="label">Listing Order</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="listingOrder"
              value={this.state.listingOrder}
              style={{ width: '100%' }}
              autoComplete="off"
            />
            {
              listingOrderErr.status &&
              <p className="error-message">* {listingOrderErr.value}</p>
            }
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
          {/* <div className="form-group">
            <label className="label">Qc Den Active Status</label><br />
            <SelectField
              name="is_active"
              value={this.state.selectedQcDenActiveIdx}
              onChange={this.handleQcDenActiveChange}
              style={{ width: '100%' }}
              disabled={location.pathname.includes("edit")}
            >
              {
                this.qc_den_active_status.map((item, i) => (
                  <MenuItem
                    value={parseInt(item.value)}
                    key={parseInt(item.value)}
                    primaryText={item.text}
                  />
                ))
              }
            </SelectField>
          </div> */}
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