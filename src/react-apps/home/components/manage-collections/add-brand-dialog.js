import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

class AddBrandDialog extends React.Component {
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
      this.props.unmountCollectionDialog()
    }, 500)
  }

  render() {
    const actions = [
      <RaisedButton
        label="Add"
        primary
        onClick={this.mountConfirmChangeDpLocalityMap}
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
          title="Select brand to add"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <p>ferf</p>
        </Dialog>
      </div>
    )
  }
}

export default AddBrandDialog
