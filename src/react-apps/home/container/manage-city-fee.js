import React from "react"
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ListCityFee from "../components/manage-city-fee/list-city-fee"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageCitiesFee extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingCityFeeList: false,
      cityFeeList: [],
      cityFeeListCount: 0
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchCityFeeList = this.fetchCityFeeList.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchCityFeeList({
        city_id: parseInt(this.props.match.params.cityId),
        limit: this.pageLimit,
        offset: 0
      })
    }
  }

  setQueryParamas () {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.fetchCityFeeList({
      city_id: parseInt(this.props.match.params.cityId),
      limit: this.pageLimit,
      offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
    })
  }

  setPage (pageObj) {
    this.setState({ loadingCityFeeList: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchCityFeeList({
      city_id: parseInt(this.props.match.params.cityId),
      limit: this.pageLimit,
      offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

    history.pushState(queryObj, "city fee list", `/home/manage-city-fee/${this.props.match.params.cityId}?${getQueryUri(queryObj)}`)
  }

  fetchCityFeeList (payload) {
    this.setState({ loadingCityFeeList: true })
    Api.fetchCityFeeList(payload)
      .then((response) => {
        this.setState({
          cityFeeList: response.message,
          loadingCityFeeList: false,
          cityFeeListCount: response.count
        })
      })
      .catch((err) => {
        this.setState({ loadingCityFeeList: false })
        console.log("Error in fetching City Fee List", err)
      })
  }

  render () {
    const { loadingCityFeeList, cityFeeList, cityFeeListCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-city-fee/${this.props.match.params.cityId}/create`}>
              <RaisedButton
                label="Create City Fee"
                primary
              />
            </NavLink>
          </div>
        </div>
        <h3>{`Showing City Fee List (${this.props.match.params.cityId})`}</h3>
        <ListCityFee
          cityFeeList={cityFeeList}
          loadingCityFeeList={this.state.loadingCityFeeList}
          history={this.props.history}
        />
        {
          !loadingCityFeeList && cityFeeList && cityFeeList.length > 0
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={cityFeeListCount}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageCitiesFee