import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'

class CreateNewContactDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true,
      phoneNumber: '',
      isActive: true
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }
  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountAddLocalityDialog()
    }, 500)
  }

  handleCheck(e) {
    this.setState({ isActive: e.target.checked })
  }

  handleChange(e) {
    const target = e.target
    // if (/[0-9]/.test(target.value) || !target.value.length) {
      this.setState({ phoneNumber: target.value })
    // }
  }

  handleSubmit() {
    const { phoneNumber, isActive } = this.state
    if (phoneNumber.length < 10) {
      return
    }
    this.props.handleCreateNewContact(phoneNumber, isActive)
  }

  render() {
    const actions = [
      <RaisedButton
        label="Save"
        primary
        onClick={this.handleSubmit}
      />,
      <FlatButton
        label="Cancel"
        secondary
        onClick={this.handleClose}
      />
    ]

    return (
      <Dialog
        title="Create new contact"
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent
        contentStyle={{
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <div className="form-group">
          <label style={{ fontWeight: '600' }}>Enter 10 digits phone no.</label>
          <input
            style={{
              padding: '11px 10px',
              borderRadius: '2px',
              border: '1px solid #dfdfdf',
              marginRight: '20px',
              marginTop: '5px',
              fontSize: '14px',
              width: '330px'
            }}
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            maxLength={10}
            type="text"
          />
        </div>

        <div className="form-group">
          {/* <console.log(require('util').inspect(, { depth: null })); */}
          <Checkbox
            label="is_active"
            onCheck={this.handleCheck}
            checked={this.state.isActive}
          />
        </div>
      </Dialog>
    )
  }
}

export default CreateNewContactDialog
