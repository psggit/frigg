import React from 'react'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewCityMappedToPrediction from '../components/manage-city-prediction-mapping/view-mapped-city'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import getIcon from '../components/icon-utils'
import FilterModal from '@components/filter-modal'

class MapCityToPrediction extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingCityMappedToPredictionList: false,
      cityMappedToPredictionCount: 0,
      cityMappedtoPreditionList: [],
      citiesData: [],
      loadingCities: true,
      cityId: 0
    }

    this.filter = {
      cityId: ""
    }

    this.successCityMappedToPredictionListCallback = this.successCityMappedToPredictionListCallback.bind(this)
    this.fetchCityMappedToPrediction = this.fetchCityMappedToPrediction.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.successCityListCallback = this.successCityListCallback.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
  }

  componentDidMount() {
    this.fetchCityList()
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchDefaultData()
    }
  }

  fetchCityMappedToPrediction(payload, successCallback) {
    Api.fetchCityMappedToPrediction(payload, successCallback)
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    //this.fetchCityList()
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.setState({loadingCityMappedToPredictionList: true})

    if(queryObj.cityId) {
      this.fetchCityMappedToPrediction({
        offset: queryObj.activePage ? (parseInt(queryObj.activePage) - 1) * this.pageLimit : 0,
        limit: this.pageLimit,
        city_id: queryObj.cityId ? parseInt(queryObj.cityId) : 0,
      }, this.successCityMappedToPredictionListCallback)
    } else {
      this.fetchCityMappedToPrediction({
        offset: queryObj.activePage ? (parseInt(queryObj.activePage) - 1) * this.pageLimit : 0,
        limit: this.pageLimit,
      }, this.successCityMappedToPredictionListCallback)
    }
  }

  fetchDefaultData() {
    this.setState({loadingOptionMappedToPredictionList: true})
    this.fetchCityMappedToPrediction({
      offset: 0,
      limit: this.pageLimit
    }, this.successCityMappedToPredictionListCallback)
  }

  successCityMappedToPredictionListCallback(response) {
    console.log("res", response)
    this.setState({
      loadingCityMappedToPredictionList: false,
      cityMappedtoPreditionList: response.prediction_data,
      cityMappedToPredictionCount: response.count ? response.count : 0
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    let queryParamsObj = {}

    this.setState({
      loadingCityMappedToPredictionList: true,
      activePage: pageObj.activePage
    })

    if(queryObj.cityId) {
      queryParamsObj = {
        activePage: pageObj.activePage,
        //offset: pageObj.offset,
        cityId: queryObj.cityId
      }

      this.fetchCityMappedToPrediction({
        offset: pageObj.offset,
        limit: this.pageLimit,
        city_id: parseInt(queryObj.cityId)
      }, this.successCityMappedToPredictionListCallback)

    } else {
      queryParamsObj = {
        activePage: pageObj.activePage,
        //offset: pageObj.offset
      }

      this.fetchCityMappedToPrediction({
        offset: pageObj.offset,
        limit: this.pageLimit,
      }, this.successCityMappedToPredictionListCallback)
    }

    history.pushState(queryParamsObj, "city mapped prediction listing", `/home/manage-city-mapping?${getQueryUri(queryParamsObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  handleCityChange(k) {
    const { citiesData } = this.state
    this.filter.cityId = citiesData[k].value
  }

  fetchCityList() {
    Api.fetchCityList({
      available: true,
      delivery_available: false,
      wallet_available: false
    }, this.successCityListCallback)
  }

  successCityListCallback(response) {
    let cityList = []
    if(response.availableCities) {
      cityList = response.availableCities.map((item, i) => {
        return {
          text: item.name,
          value: item.id
        }
      })
    }

    this.setState({citiesData: cityList, loadingCities: false})
  }

  applyFilter() {
    
    console.log(this.filter);
    const queryObj = {
      //offset: 0,
      activePage: 1,
      cityId: this.filter.cityId
    }

    this.setState({
      activePage: 1,
      cityId: this.filter.cityId
    })

    history.pushState(queryObj, "city mapped to prediction listing", `/home/manage-city-mapping?${getQueryUri(queryObj)}`)
    this.setState({loadingCityMappedToPredictionList: true})
    this.fetchCityMappedToPrediction({
      city_id: parseInt(queryObj.cityId),
      offset: 0,
      limit: this.pageLimit
    }, this.successCityMappedToPredictionListCallback)
  }

  resetFilter() {
		this.setState({
			cityId: '',
		})
		this.fetchDefaultData()
		this.props.history.push(`/home/manage-city-mapping`)
  }

  render() {
    const {
      loadingCityMappedToPredictionList,
      cityMappedtoPreditionList,
      cityMappedToPredictionCount,
      citiesData,
      loadingCities
    } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-city-mapping/create`}>
              <RaisedButton
                label="Map city to prediction"
                primary
              />
            </NavLink>
          </div>

          <div>
            <RaisedButton
              onClick={this.mountFilterDialog}
              label="Filter"
              icon={getIcon('filter')}
              style={{marginRight: '15px'}}
            />

            <RaisedButton
              onClick={this.resetFilter}
              label="Reset Filter"
              disabled={this.state.cityId === 0}
            />
          </div>
        </div>

        <h3>Showing all cities mapped to prediction</h3>
        <ViewCityMappedToPrediction
          cityMappedtoPreditionList={cityMappedtoPreditionList}
          loadingCityMappedToPredictionList={loadingCityMappedToPredictionList}
          history={this.props.history}
        />
        {
          !loadingCityMappedToPredictionList && cityMappedtoPreditionList && cityMappedtoPreditionList.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={cityMappedToPredictionCount}
            setPage={this.setPage}
          />
          : ''
        }
        {
          this.state.shouldMountFilterDialog ?
          (<FilterModal
              applyFilter={this.applyFilter}
              title="Filter prediction by city"
              unmountFilterModal={this.unmountFilterModal}
              // handleStateChange={this.handleStateChange}
              handleCityChange={this.handleCityChange}
              filterCity={true}
              floatingLabelText="Choose city"
              citiesData={citiesData}
              loadingCities={loadingCities}
              filter="cityFilter"
            ></FilterModal>
          )
          : ''
        }
      </div>
    )
  }
}

export default MapCityToPrediction