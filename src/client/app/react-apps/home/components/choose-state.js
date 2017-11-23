import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import indiaStates from './../constants/india-states'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class ChooseState extends React.Component {
  constructor() {
    super()
    this.state = {
      stateIdx: null,
      isCreateNew: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.switchStateForms = this.switchStateForms.bind(this)
  }
  handleChange(e, k) {
    this.setState({ stateIdx: k + 1 })
    this.props.setStateData(indiaStates[k].name)
  }
  handleInputChange(e, value) {
    this.props.setStateData(value)
  }
  switchStateForms(value) {
    this.props.setStateData(null)
    this.setState({ isCreateNew: value, stateIdx: null })
  }
  render() {
    const { isCreateNew } = this.state
    return (
      <div>
        {
          isCreateNew
          ? <div>
              {/* <h5 style={{marginBottom: '0', fontWeight: '500', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)'}}>Create new state</h5> */}
              <TextField
                defaultValue=""
                floatingLabelText="Enter state name"
                onChange={this.handleInputChange}
              />
              <div>
                <p style={{color: '#9b9b9b', margin: '20px 0'}}>or</p>
                <RaisedButton
                  label="Choose state"
                  onClick={() => { this.switchStateForms(false) }}
                  style={{marginRight: 12, marginTop: '10px'}}
                />
              </div>
          </div>
          : <div>
              <SelectField
                  floatingLabelText="Choose state"
                  value={this.state.stateIdx}
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
                <p style={{color: '#9b9b9b', margin: '20px 0'}}>or</p>
                <div>
                  <RaisedButton
                    label="Create new state"
                    onClick={() => { this.switchStateForms(true) }}
                    style={{marginRight: 12, marginTop: '10px'}}
                  />
                </div>
            </div>
        }
      </div>
    )
  }
}

export default ChooseState
