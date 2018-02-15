import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ViewLocalities from './view-localities'

class ConfirmChangeDpLocalityMap extends React.Component {
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
      this.props.unmountConfirmChangeDpLocalityMap()
    }, 500)
  }
  render() {
    const actions = [
      <RaisedButton
        label="Save"
        primary
        onClick={() => {
          this.props.handleChangeDpLocalityMap(this.props.locality_id)
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
          title="Replace locality"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <p>
            This will replace the exisiting locality mapped to the delivery agent.<br/>
            Are your sure you want to replace?
          </p>
        </Dialog>
      </div>
    )
  }
}

export default ConfirmChangeDpLocalityMap
