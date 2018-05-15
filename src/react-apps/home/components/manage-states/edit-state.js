import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import '@sass/components/_button.scss'

class EditState extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stateIdx: 0,
      open: true,
      selectedState: props.stateToBeEdit
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
      this.props.unmountEditStateDialog()
    }, 500)
  }

  handleChange(e) {
    const { selectedState } = this.state
    this.setState({
      selectedState: Object.assign({}, selectedState, {
        state_name: e.target.value
      })
    })
  }

  handleSubmit() {
    const { selectedState } = this.state
    this.props.updateState({
      id: selectedState.id,
      state_name: selectedState.state_name
    })

    this.handleClose()
    // this.props.setSnackBarOptions({
    //   open: true,
    //   message: 'State created successfully'
    // })
  }

  render() {
    return (
      <Dialog
        autoScrollBodyContent
        title="Edit state"
        contentStyle={{ width: '100%', maxWidth: '500px' }}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div style={{ maxWidth: '256px' }}>
          <div>
            <p style={{ fontWeight: '600' }}>State name</p>
            <TextField
              ref={(node) => { this.input = node }}
              value={this.state.selectedState.state_name}
              onChange={this.handleChange}
              hintText="Tamilnadu"
              style={{ marginBottom: '20px' }}
            />

            <p style={{ fontWeight: '600' }}>Short name</p>
            <TextField
              disabled
              value={this.state.selectedState.short_name}
              hintText="TN"
            />

            <br />
            <RaisedButton
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

export default EditState
