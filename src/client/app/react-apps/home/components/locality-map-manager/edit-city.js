import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import '@sass/components/_button.scss'

class EditCity extends React.Component {
  constructor() {
    super()
    this.statesData = [
      {
        state_name: 'Bangalore',
        short_name: 'BLR'
      }
    ]
    this.state = {
      stateIdx: 0,
      open: true,
      selectedState: {
        state_name: null,
        short_name: null
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleStateNameChange = this.handleStateNameChange.bind(this)
    this.handleStateShortNameChange = this.handleStateShortNameChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.input.focus()
    }, 100)
  }

  handleChange(e, k) {
    this.setState({ stateIdx: k + 1, selectedState: this.statesData[k], isStateSelected: true })
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountEditStateDialog()
    }, 500)
  }

  handleStateNameChange(e) {
    const { selectedState } = this.state
    this.setState({
      selectedState: Object.assign({}, selectedState, { state_name: e.target.value })
    })
  }

  handleStateShortNameChange(e) {
    const { selectedState } = this.state
    this.setState({
      selectedState: Object.assign({}, selectedState, { short_name: e.target.value })
    })
  }

  render() {
    return (
      <Dialog
        title="Edit City"
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
              value={this.state.selectedState.state_name}
              onChange={this.handleStateNameChange}
              hintText="Tamilnadu"
              style={{ marginBottom: '20px' }}
            />

            <br />
            <RaisedButton
              style={{ marginTop: '20px' }}
              label="Submit"
              primary
            />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default EditCity
