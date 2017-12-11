import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

class FilterModal extends React.Component {
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
      this.props.unmountFilterModal()
    }, 500)
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleClose}
      />,

      <RaisedButton
        primary
        label="Apply filter"
      />
    ]
    return (
      <div>
        <Dialog
          autoScrollBodyContent
          title={this.props.title}
          contentStyle={{ width: '100%', maxWidth: '500px' }}
          modal={false}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
        >
          { this.props.children }
        </Dialog>
      </div>
    )
  }
}

export default FilterModal
