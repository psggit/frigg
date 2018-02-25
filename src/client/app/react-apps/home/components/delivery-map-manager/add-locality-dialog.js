import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ViewLocalities from './view-localities'
import ConfirmChangeDpLocalityMap from './confirm-change-dp-locality-map'

class AddLocalityDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true,
      shouldMountConfirmChangeLocalityDpMap: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.setLocalityId = this.setLocalityId.bind(this)
    this.handleChangeDpLocalityMap = this.handleChangeDpLocalityMap.bind(this)
    this.mountConfirmChangeDpLocalityMap = this.mountConfirmChangeDpLocalityMap.bind(this)
    this.unmountConfirmChangeDpLocalityMap = this.unmountConfirmChangeDpLocalityMap.bind(this)
  }
  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountAddLocalityDialog()
    }, 500)
  }
  handleChangeDpLocalityMap() {
    if (this.state.newLocalityId && this.props.currentLocalityId) {
      this.props.deleteLocalityFromDpMap({
        dp_id: parseInt(this.props.dp_id),
        locality_id: this.props.currentLocalityId
      }, parseInt(this.state.newLocalityId))
    } else if (!this.props.currentLocalityId && this.state.newLocalityId) {
      this.props.updateDPLocalityMap({
        dp_id: parseInt(this.props.dp_id),
        locality_id: this.props.newLocalityId
      })
    }
    this.handleClose()
  }
  mountConfirmChangeDpLocalityMap() {
    // this.handleClose()
    this.setState({ shouldMountConfirmChangeLocalityDpMap: true  })
  }
  unmountConfirmChangeDpLocalityMap() {
    this.setState({ shouldMountConfirmChangeLocalityDpMap: false  })
  }
  setLocalityId(id) {
    this.setState({ newLocalityId: id })
  }
  render() {
    const actions = [
      <RaisedButton
        label="Save"
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
          title="Change locality"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <ViewLocalities
            dp_id={this.props.dp_id}
            setLocalityId={this.setLocalityId}
          />

        </Dialog>
        {
          this.state.shouldMountConfirmChangeLocalityDpMap &&
          <ConfirmChangeDpLocalityMap
            currentLocalityId={this.props.currentLocalityId}
            handleChangeDpLocalityMap={this.handleChangeDpLocalityMap}
            mountConfirmChangeDpLocalityMap={this.mountConfirmChangeDpLocalityMap}
            unmountConfirmChangeDpLocalityMap={this.unmountConfirmChangeDpLocalityMap}
          />
        }
      </div>
    )
  }
}

export default AddLocalityDialog
