import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ViewDeliverers from './view-deliverers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'

class AddDeliveryAgentDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleAddDpToLocalityMap = this.handleAddDpToLocalityMap.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchUnmappedDpToLocality({
      locality_id: parseInt(this.props.locality_id)
    })
  }


  handleAddDpToLocalityMap(id) {
    this.props.actions.addDpToLocalityMap({
      dp_id: parseInt(id),
      locality_id: parseInt(this.props.locality_id)
    })
    this.handleClose()
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountAddDeliveryAgentDialog()
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
          title="Add delivery agent"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <ViewDeliverers 
            locality_id={this.props.locality_id} 
            handleClose={this.handleClose} 
            unmappedDpToLocality={this.props.unmappedDpToLocality}
            loadingUnmappedDpToLocality={this.props.loadingUnmappedDpToLocality}
            handleAddDpToLocalityMap={this.handleAddDpToLocalityMap}
          />
        </Dialog>
      </div>
    )
  }
}


const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeliveryAgentDialog)

//export default AddDeliveryAgentDialog
