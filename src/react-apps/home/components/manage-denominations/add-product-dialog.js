import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import Notify from "@components/Notification"
import * as Api from "../../middleware/api"
import ViewProduct from './view-product'

class AddProductDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true,
      conversionRateList: [],
      loadingConversionRate: false
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    this.fetchConversionRate({
      limit: 1000,
      offset: 0
    })
  }

  fetchConversionRate(payload) {
    this.setState({ loadingConversionRate: true })
    Api.fetchConversionRate(payload)
      .then((response) => {
        this.setState({
          conversionRateList: response.data,
          loadingConversionRate: false,
        })
      })
      .catch((err) => {
        this.setState({ loadingConversionRate: false })
        console.log("Error in fetching denomination list", err)
      })
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountDialog()
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
          title="Add Product"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <ViewProduct
            handleClose={this.handleClose}
            loadingConversionRate={this.state.loadingConversionRate}
            conversionRateList={this.state.conversionRateList}
            addProduct={this.props.addProduct}
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
)(AddProductDialog)
