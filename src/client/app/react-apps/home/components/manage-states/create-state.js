import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import '@sass/components/_button.scss'

class CreateState extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true,
      state_name: '',
      short_name: '',
      isSubmitDisabled: true
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleChange(e) {
    const { state_name, short_name } = this.state
    if (state_name.length && short_name.length) {
      this.setState({ isSubmitDisabled: false })
    }
    this.setState({ [e.target.name]: e.target.value })
  }


  handleSubmit() {
    const { state_name, short_name } = this.state
    this.props.createState({
      state_name,
      short_name
    })

    this.handleClose()
    this.props.setSnackBarOptions({
      open: true,
      message: 'State created successfully'
    })
  }

  render() {
    return (
      <Dialog
        autoScrollBodyContent
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
            onChange={this.handleChange}
            name="state_name"
          />

          <p style={{ fontWeight: '600' }}>Short name</p>
          <TextField
            hintText="TN"
            name="short_name"
            onChange={this.handleChange}
          />
          <br />

          <RaisedButton
            disabled={this.state.isSubmitDisabled}
            style={{ marginTop: '20px' }}
            label="Submit"
            primary
            onClick={this.handleSubmit}
          />
        </div>
      </Dialog>
    )
  }
}

export default CreateState
