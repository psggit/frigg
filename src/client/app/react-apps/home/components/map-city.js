import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'


class MapCity extends React.Component {
  constructor(props) {
    super(props)
    this.postData = null
    this.state = {
      cityIdx: props.cityIdx,
      isCreateNew: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.switchCityForms = this.switchCityForms.bind(this)
  }

  componentDidMount() {
    const { stateShortName } = this.props
    this.props.fetchCities({
      state_short_name: stateShortName
    })
  }

  handleChange(e, k) {
    const { citiesData } = this.props
    const cityIdx = k + 1
    this.setState({ cityIdx })
    this.postData = citiesData[k]
    this.props.setCityData({
      cityData: citiesData[k],
      cityIdx
    })
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
    const { loadingCities, citiesData } = this.props

    return (
      <div>
        {
          isCreateNew
          ? (
            <div>
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
          )
          : (
            <div>
              <SelectField
                disabled={loadingCities || !citiesData.length}
                floatingLabelText="Choose city"
                value={this.state.cityIdx}
                onChange={this.handleChange}
              >
                {
                  citiesData.map((city, i) => {
                    return (
                      <MenuItem
                        value={i + 1}
                        key={city.id}
                        primaryText={city.name}
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
          )
        }
      </div>
    )
  }
}

export default MapCity
