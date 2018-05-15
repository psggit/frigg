import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_button.scss'

class EditLocality extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: true,
      localityName: props.localityName,
      isLocalityActive: props.isActive
    }

    this.handleLocalityNameChange = this.handleLocalityNameChange.bind(this)
    this.handleLocalityActivation = this.handleLocalityActivation.bind(this)
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
    this.props.updateGeolocality({
      localityName,
      isLocalityActive
    })
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountEditLocalityDialog()
    }, 500)
    this.props.changeGmapKey()
  }

  handleLocalityActivation(e) {
    this.setState({ isLocalityActive: e.target.checked })
  }

  handleLocalityNameChange(e) {
    this.setState({ localityName: e.target.value })
  }

  render() {
    return (
      <Dialog
        title={`Edit locality - ${this.props.localityName}`}
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

            <Checkbox
              onCheck={this.handleLocalityActivation}
              label="isActive"
              checked={this.state.isLocalityActive}
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

export default EditLocality
