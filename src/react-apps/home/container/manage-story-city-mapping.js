import React from "react"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import { Card } from 'material-ui/Card'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import Pagination from '@components/pagination'
import { NavLink } from 'react-router-dom'
import ViewMappedStories from "../components/manage-mapped-stories/view-mapped-stories"
import Notify from "@components/Notification"

class ManageMappedStories extends React.Component {

  constructor() {
    super()

    this.pageLimit = 5
    this.state = {
      cityIdx: -1,
      loadingCityList: false,
      cityList: [],
      activePage: 1,
      mappedStories: [],
      mappedStoriesCount: 0,
      loadingMappedStories: false
    }

    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.deleteStoryMappedToCity = this.deleteStoryMappedToCity.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.fetchCities = this.fetchCities.bind(this)
    this.fetchMappedtories = this.fetchMappedStories.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.fetchCities()
    if (location.search.length) {
      this.setQueryParamas()
    }
  }

  fetchCities() {
    this.setState({loadingCityList: true})
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
          cityIdx: !this.state.cityId ? response.cities[0].id : this.state.cityId
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

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
    this.fetchMappedStories({
      limit: this.pageLimit,
      offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
      city_id: parseInt(queryObj.cityId)
    })
  }

  setPage (pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchMappedStories({
      limit: this.pageLimit,
      offset: pageObj.offset,
      city_id: parseInt(this.state.cityId)
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage
    history.pushState(queryObj, "mapped stories listing", `/home/manage-mapped-stories?${getQueryUri(queryObj)}`)
  }

  handleCityChange(e, k) {
    const cityIdx = k
    this.setState({ cityIdx: this.state.cityList[cityIdx].id })
  }

  deleteStoryMappedToCity(e, item) {
    let payload = {
      mapping_id: item.mapping_id
    }

    Api.deleteStoryMappedToCity(payload)
      .then((response) => {
        location.reload()
      })
      .catch((error) => {
        error.response.json().then((json) => {
          Notify(json.message, "error")
        })
        console.log("Error in deleting story mapped to city", error)
      })
  }

  fetchMappedStories(payload) {
    this.setState({ loadingMappedStories: true })
    Api.fetchMappedStories(payload)
      .then((response) => {
        this.setState({
          mappedStories: response.data,
          mappedStoriesCount: response.count,
          loadingMappedStories: false
        })
      })
      .catch((error) => {
        this.setState({ loadingMappedStories: false })
        error.response.json().then((json) => {
          Notify(json.message, "error")
        })
        console.log("Error in fetching mapped story list", error)
      })
  }

  handleSearch() {
    const queryObj = {
      cityId: this.state.cityIdx
    }
    this.fetchMappedStories({
      limit: this.pageLimit,
      offset: 0,
      city_id: this.state.cityIdx
    })
    history.pushState(queryObj, "mapped stories listing", `/home/manage-mapped-stories?${getQueryUri(queryObj)}`)
  }

  render() {
    const { loadingMappedStories, mappedStories, mappedStoriesCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <NavLink to={`/home/map-story-to-city`}>
            <RaisedButton
              label="Map Story to City"
              primary
              //onClick={this.mountCreateStDialog}
            />
          </NavLink>
        </div>

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
            value={parseInt(this.state.cityIdx)}
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
            label="Search"
            disabled={loadingMappedStories}
            onClick={this.handleSearch}
          />
        </Card>
        <React.Fragment>
          <h3>Showing all mapped stories</h3>
          <ViewMappedStories
            mappedStories={this.state.mappedStories}
            deleteStoryMappedToCity={this.deleteStoryMappedToCity}
            loadingMappedStories={this.state.loadingMappedStories}
            history={this.props.history}
          />
        </React.Fragment>
        {
          !loadingMappedStories && mappedStories.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={mappedStoriesCount}
              pageRangeDisplayed={5}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageMappedStories