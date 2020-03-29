import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ViewRetailers from './view-retailers'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import { getQueryObj } from '@utils/url-utils'

class AddRetailerDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleAddRetailerToDpMap = this.handleAddRetailerToDpMap.bind(this)
  }

  componentDidMount() {
    const queryObj = getQueryObj(location.search.slice(1))
    this.props.actions.fetchUnmappedRetailersToLocality({
      locality_id: parseInt(queryObj.id)
    })
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountAddRetailerDialog()
    }, 500)
  }

  handleAddRetailerToDpMap (id) {
    const queryObj = getQueryObj(location.search.slice(1))
    this.props.actions.addRetailerToLocalityMap({
      retailer_id: parseInt(id),
      locality_id: parseInt(queryObj.id)
    })
    this.handleClose()
  }

  render() {
    console.log("Add retailer")
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
          autoScrollBodyContent
        >
          <ViewRetailers 
            handleClose={this.handleClose} 
            loadingUnmappedRetailersToLocality={this.props.loadingUnmappedRetailersToLocality}
            unmappedRetailersToLocality={this.props.unmappedRetailersToLocality}
            handleAddRetailerToDpMap={this.handleAddRetailerToDpMap}
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
)(AddRetailerDialog)
//export default AddRetailerDialog
