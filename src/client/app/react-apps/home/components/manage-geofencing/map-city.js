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

  render() {
    const { loadingCities, citiesData } = this.props

    return (
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
      </div>
    )
  }
}

export default MapCity
