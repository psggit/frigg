import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ViewRetailers from './view-retailers'

class AddRetailerDialog extends React.Component {
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
      this.props.unmountAddRetailerDialog()
    }, 500)
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />
    ]
    return (
      <div>
        <Dialog
          title="Add retailer"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <ViewRetailers handleClose={this.handleClose} />
        </Dialog>
      </div>
    )
  }
}

export default AddRetailerDialog
