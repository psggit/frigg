import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import ViewDeliverers from './view-deliverers'
import ConfirmChangeDpLocalityMap from './confirm-change-dp-locality-map'

class MapDeliveryAgentDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true,
      shouldMountConfirmChangeLocalityDpMap: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.setDelivererId = this.setDelivererId.bind(this)
    this.handleChangeDpLocalityMap = this.handleChangeDpLocalityMap.bind(this)
    this.mountConfirmChangeDpLocalityMap = this.mountConfirmChangeDpLocalityMap.bind(this)
    this.unmountConfirmChangeDpLocalityMap = this.unmountConfirmChangeDpLocalityMap.bind(this)
  }
  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountMapDeliveryAgentDialog()
    }, 500)
  }
  handleChangeDpLocalityMap() {
    if (this.props.currentDelivererId) {
      if (this.state.newDelivererId) {
        this.props.deleteDpFromLocalityMap({
          locality_id: parseInt(this.props.locality_id),
          dp_id: parseInt(this.props.currentDelivererId)
        }, parseInt(this.state.newDelivererId))
      }
    } else {
      this.props.addDpToLocalityMap({
        locality_id: parseInt(this.props.locality_id),
        dp_id: parseInt(this.state.newDelivererId)
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
  setDelivererId(id) {
    this.setState({ newDelivererId: id })
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
          title="Change delivery agent"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <ViewDeliverers
            locality_id={this.props.locality_id}
            setDelivererId={this.setDelivererId}
          />

        </Dialog>
        {
          this.state.shouldMountConfirmChangeLocalityDpMap &&
          <ConfirmChangeDpLocalityMap
            handleChangeDpLocalityMap={this.handleChangeDpLocalityMap}
            mountConfirmChangeDpLocalityMap={this.mountConfirmChangeDpLocalityMap}
            unmountConfirmChangeDpLocalityMap={this.unmountConfirmChangeDpLocalityMap}
          />
        }
      </div>
    )
  }
}

export default MapDeliveryAgentDialog
