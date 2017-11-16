import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import indiaStates from './../constants/india-states'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class MapCity extends React.Component {
  constructor() {
    super()
    this.state = {
      cityIdx: null,
      isCreateNew: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.switchCityForms = this.switchCityForms.bind(this)
  }
  handleChange(e, k) {
    this.setState({ cityIdx: k + 1 })
    this.props.setCityData(indiaStates[k].name)
  }
  handleInputChange(e, value) {
    this.props.setCityData(value)
  }
  switchCityForms(value) {
    this.props.setCityData(null)
    this.setState({ isCreateNew: value, cityIdx: null })
  }
  render() {
    const { isCreateNew } = this.state
    return (
      <div>
        {
          isCreateNew
          ? <div>
              {/* <h5 style={{marginBottom: '0', fontWeight: '500', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)'}}>Create new city</h5> */}
              <TextField
                defaultValue=""
                floatingLabelText="Enter city name"
                onChange={this.handleInputChange}
              />
              <div>
                <p style={{color: '#9b9b9b', margin: '20px 0'}}>or</p>
                <RaisedButton
                  label="Choose city"
                  onClick={() => { this.switchCityForms(false) }}
                  style={{marginRight: 12, marginTop: '10px'}}
                />
              </div>
          </div>
          : <div>
              <SelectField
                  floatingLabelText="Choose city"
                  value={this.state.cityIdx}
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
                    label="Create new city"
                    onClick={() => { this.switchCityForms(true) }}
                    style={{marginRight: 12, marginTop: '10px'}}
                  />
                </div>
            </div>
        }
      </div>
    )
  }
}

export default MapCity
