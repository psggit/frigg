import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

class ConfirmMakePrimeRetailer extends React.Component {
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
      this.props.unmountConfirmMakePrimeRetailer()
    }, 500)
  }
  render() {
    const actions = [
      <RaisedButton
        label="Save"
        primary
        onClick={() => {
          this.props.handleMakePrimeRetailer(this.props.retailer_id)
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
          <p>
            This will replace the exisiting prime retailer for this locality.<br/>
            Are your sure you want to replace?
          </p>
        </Dialog>
      </div>
    )
  }
}

ConfirmMakePrimeRetailer.propTypes = {
  handleMakePrimeRetailer: PropTypes.func.isRequired,
  unmountConfirmMakePrimeRetailer: PropTypes.func.isRequired
}

export default ConfirmMakePrimeRetailer
