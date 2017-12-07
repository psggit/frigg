import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import '@sass/components/_button.scss'

class CreateNewLocality extends React.Component {
  constructor() {
    super()

    this.state = {
      open: true,
      localityName: ''
    }

    this.handleLocalityNameChange = this.handleLocalityNameChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.input.focus()
    }, 100)
  }

  handleSubmit() {
    const { localityName } = this.state
    this.props.submitNewLocality(localityName)
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountCreateNewLocalityDialog()
    }, 500)
    this.props.changeGmapKey()
  }

  handleLocalityNameChange(e) {
    this.setState({ localityName: e.target.value })
  }

  render() {
    return (
      <Dialog
        title="Name your locality"
        contentStyle={{ width: '100%', maxWidth: '500px' }}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div style={{ maxWidth: '256px' }}>
          <div>
            <p style={{ fontWeight: '600' }}>City name</p>
            <TextField
              ref={(node) => { this.input = node }}
              value={this.state.localityName}
              onChange={this.handleLocalityNameChange}
              hintText="Whitefield"
              style={{ marginBottom: '20px' }}
            />

            <br />
            <RaisedButton
              disabled={!this.state.localityName.length}
              style={{ marginTop: '20px' }}
              label="Submit"
              primary
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default CreateNewLocality
