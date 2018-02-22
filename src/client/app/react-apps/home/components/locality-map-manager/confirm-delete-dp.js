import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

class ConfirmDeleteDp extends React.Component {
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
      this.props.unmountConfirmDeleteDp()
    }, 500)
  }
  render() {
    const actions = [
      <RaisedButton
        label="Save"
        primary
        onClick={() => {
          this.props.handleDeleteDp(this.props.dp_id)
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
          title="Delete delivery agent"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>Are your sure you want to remove this delivery agent?</p>
        </Dialog>
      </div>
    )
  }
}

// ConfirmDeleteRetailer.propTypes = {
//   retailer_id: PropTypes.string.isRequired,
//   handleDeleteRetailer: PropTypes.func.isRequired,
//   unmountConfirmDeleteRetailer: PropTypes.func.isRequired
// }

export default ConfirmDeleteDp
