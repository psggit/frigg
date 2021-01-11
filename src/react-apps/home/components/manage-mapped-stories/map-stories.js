import React from 'react'
import * as Api from "./../../middleware/api"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import Notify from "@components/Notification"
import AddStoryDialog from './add-story-dialog'

class MapStories extends React.Component {
  constructor() {
    super()

    this.state = {
      shouldMountAddStoryDialog: false,
      loadingCityList: false,
      cityList: [],
      cityId: ''
    }

    // /this.fetchStories = this.fetchStories.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.mountAddStoryDialog = this.mountAddStoryDialog.bind(this)
    this.unmountAddStoryDialog = this.unmountAddStoryDialog.bind(this)
  }

  componentDidMount() {
    this.fetchCities()
  }

  fetchCities() {
    this.setState({ loadingCityList: true })
    Api.fetchCities({
      data: {
        state_short_name: null,
        is_available: false,
        offset: 0,
        limit: 1000,
        deliverable_city: true,
        no_filter: true
      }
    })
      .then((response) => {
        this.setState({
          cityList: response.cities,
          loadingCityList: false,
          cityId: response.cities[0].id 
        })
      })
      .catch((error) => {
        this.setState({ loadingCityList: false })
        error.response.json().then((json) => {
          Notify(json.message, "error")
        })
        console.log("Error in fetching city list", error)
      })
  }

  handleCityChange(e, k) {
    this.setState({
      cityId: (this.state.cityList[k].id)
    })
  }

  mountAddStoryDialog() {
    this.setState({ shouldMountAddStoryDialog: true })
  }

  unmountAddStoryDialog() {
    this.setState({ shouldMountAddStoryDialog: false })
  }

  render() {
    return (
      <Card style={{
        padding: '20px',
        width: '300px',
        position: 'relative',
        display: 'block',
        verticalAlign: 'top',
        marginRight: '20px'
      }}
      >
        <SelectField
          style={{ marginRight: '20px' }}
          floatingLabelText="Choose City"
          value={parseInt(this.state.cityId)}
          onChange={this.handleCityChange}
          iconStyle={{ fill: '#9b9b9b' }}
        >
          {
            this.state.cityList.map((item, i) => {
              return (
                <MenuItem
                  value={item.id}
                  key={item.id}
                  primaryText={item.name}
                />
              )
            })
          }
        </SelectField>
        <RaisedButton
          primary
          label="Add Story"
          onClick={this.mountAddStoryDialog}
        />
        {
          this.state.shouldMountAddStoryDialog &&
          <AddStoryDialog unmountAddStoryDialog={this.unmountAddStoryDialog} cityId={this.state.cityId} />
        }
      </Card>
    )
  }
}

export default MapStories