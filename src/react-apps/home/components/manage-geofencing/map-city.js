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
    this.props.setLoadingState('loadingGeolocalities')
    const { stateShortName } = this.props
    this.props.fetchCities({
      state_short_name: stateShortName,
      offset: 0,
      limit: 10,
      is_available: false,
      deliverable_city: true,
      no_filter: false
    })
  }

  handleChange(e, k) {
    const { citiesData } = this.props
    const cityIdx = k + 1
    this.setState({ cityIdx })
    this.props.setCityId(citiesData[k].id)
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
