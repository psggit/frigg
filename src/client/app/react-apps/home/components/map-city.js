import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import indiaStates from './../constants/india-states'
import TextField from 'material-ui/TextField'

class ChooseState extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    this.setState({ value })
  }
  render() {
    return (
      <div>
        <SelectField
          floatingLabelText="Choose city"
          value={this.state.value}
          onChange={this.handleChange}
        >
          {
            indiaStates.map((state, i) => {
              return (
                <MenuItem
                  value={i + 1}
                  key={`state-${i}`}
                  primaryText={state.name}
                />
              )
            })
          }
        </SelectField>
        <p style={{color: '#9b9b9b', margin: '40px 0'}}>or</p>
        <h5 style={{marginBottom: '0', fontWeight: '500', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)'}}>Create new city</h5>
        <TextField
          defaultValue=""
          floatingLabelText="Enter city name"
        />
      </div>
    )
  }
}

export default ChooseState
