import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import Dialog from 'material-ui/Dialog'
import '@sass/components/_button.scss'

class CreateNewLocality extends React.Component {
  constructor() {
    super()

    this.state = {
      open: true,
      localityName: '',
      isLocalityActive: true
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.input.focus()
    }, 100)
  }

  handleSubmit() {
    const { localityName, isLocalityActive } = this.state
    this.props.submitNewLocality({
      localityName,
      isLocalityActive
    })
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountCreateNewLocalityDialog()
    }, 500)
    this.props.changeGmapKey()
  }

  handleCheckboxes(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
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
              onChange={this.handleTextFields}
              hintText="Whitefield"
              name="localityName"
              style={{ marginBottom: '20px' }}
            />

            <br />
            <Checkbox
              style={{ marginTop: '10px' }}
              checked={this.state.isLocalityActive}
              onCheck={this.handleCheckboxes}
              name="isLocalityActive"
              label="is_available"
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
