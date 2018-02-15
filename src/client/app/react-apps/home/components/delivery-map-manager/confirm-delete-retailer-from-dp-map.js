import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ViewLocalities from './view-localities'

class ConfirmDeleteRetailerFromDpMap extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this)
  }
  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountConfirmDeleteRetailerFromDpMap()
    }, 500)
  }
  render() {
    const actions = [
      <RaisedButton
        label="Save"
        primary
        onClick={() => {
          this.props.handleDeleteRetailerFromDpMap(this.props.retailer_id)
          this.handleClose()
        }}
      />,
      <FlatButton
        label="Cancel"
        secondary
        onClick={this.handleClose}
      />
    ]
    return (
      <div>
        <Dialog
          title="Delete retailer"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>Are your sure you want to delete this retailer?</p>
        </Dialog>
      </div>
    )
  }
}

export default ConfirmDeleteRetailerFromDpMap
