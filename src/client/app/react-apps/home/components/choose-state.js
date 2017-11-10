import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import indiaStates from './../constants/india-states'

class ChooseState extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 17
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    this.setState({ value })
  }
  render() {
    console.log(indiaStates);
    return (
      <SelectField
        floatingLabelText="Choose state"
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
    )
  }
}

export default ChooseState
