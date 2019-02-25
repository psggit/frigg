import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'

class UpdateBankForm extends React.Component {
  constructor(props) {
    super(props)
    this.uploadedImageUrl = ''
    this.intialState = {
      bankName: props.data.bank_name || '',
      name: props.data.name || '',
      imageUrl: props.data.image_url || '',
      listingOrder: props.data.listing_order || ''
    }

    this.state = Object.assign({}, this.intialState)
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Bank Details</h4>
          <div className="form-group">
            <label className="label">Bank Name</label><br/>
            <TextField
              readOnly
              onChange={this.handleTextFields}
              name="bankName"
              value={this.state.bankName}
              style={{ width: '100%' }}
            />
          </div>
        
          <div className="form-group">
            <label className="label">Name</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="name"
              hintText="https://cloudfront.ads.johnny_walker.jpg"
              value={this.state.name}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Image Url</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="imageUrl"
              hintText="https://cloudfront.ads.johnny_walker.jpg"
              value={this.state.imageUrl}
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

export default UpdateBankForm
