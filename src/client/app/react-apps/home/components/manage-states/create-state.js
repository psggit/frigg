import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import '@sass/components/_button.scss'

class CreateState extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.input.focus()
    }, 100)
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountCreateStateDialog()
    }, 500)
  }

  render() {
    return (
      <Dialog
        title="Create state"
        contentStyle={{ width: '100%', maxWidth: '500px' }}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div style={{ maxWidth: '256px' }}>
          <p style={{ fontWeight: '600' }}>State name</p>
          <TextField
            ref={(node) => { this.input = node }}
            hintText="Tamilnadu"
            style={{ marginBottom: '20px' }}
          />
          <p style={{ fontWeight: '600' }}>Short name</p>
          <TextField
            hintText="TN"
          />
          <br />
          <RaisedButton
            style={{ marginTop: '20px' }}
            label="Submit"
            primary
          />
        </div>
      </Dialog>
    )
  }
}

export default CreateState
