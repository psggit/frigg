import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import '@sass/components/_button.scss'

class CreateCity extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true,
      stateIdx: 0
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
  }

  handleStateChange(e, k) {
    const { statesData } = this.props
    const stateIdx = k + 1
    this.setState({ stateIdx })
  }


  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountCreateStateDialog()
    }, 500)
  }

  render() {
    const { statesData } = this.props
    return (
      <Dialog
        title="Create City"
        contentStyle={{ width: '100%', maxWidth: '500px' }}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <div style={{ maxWidth: '256px' }}>
          <SelectField
            value={this.state.stateIdx}
            floatingLabelText="select state"
            onChange={this.handleStateChange}
          >
            {
              statesData.map((state, i) => (
                <MenuItem
                  value={i + 1}
                  key={state.id}
                  primaryText={state.state_name}
                />
              ))
            }
          </SelectField>
          <p style={{ fontWeight: '600' }}>City name</p>
          <TextField
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
      </Dialog>
    )
  }
}

export default CreateCity
