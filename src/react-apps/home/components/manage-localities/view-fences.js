import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import DefineLocality from './../manage-geofencing/define-locality'

class ViewFences extends React.Component {
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
      this.props.unmountViewFencesDialog()
    }, 500)
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.loadingGeolocalities !== this.props.loadingGeolocalities) || nextProps.cityId !== this.props.cityId) {
      this.locality.changeGmapKey()
    }
  }
  render() {
    const actions = [
      <FlatButton
        label="Close"
        secondary
        onClick={this.handleClose}
      />
    ]
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent
      >
        <DefineLocality
          ref={(node) => this.locality = node}
          geoLocalitiesData={this.props.geoLocalitiesData}
          loadingGeolocalities={this.props.loadingGeolocalities}
          zoomLevel={12}
          cityId={this.props.cityId}
        />
      </Dialog>
    )
  }
}

export default ViewFences
