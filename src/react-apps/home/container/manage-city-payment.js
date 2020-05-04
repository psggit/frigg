import React from "react"
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ListCityPayment from "../components/manage-city-payment/list-city-payment"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageCitiesPayment extends React.Component {
  constructor () {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingCityPayementList: false,
      cityPaymentList: [],
      cityPaymentCount: 0
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchCityPaymentList = this.fetchCityPaymentList.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchCityPaymentList({
        city_id: parseInt(this.props.match.params.cityId),
        limit: this.pageLimit,
        offset: 0
      })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.fetchCityPaymentList({
      city_id: parseInt(this.props.match.params.cityId),
      limit: this.pageLimit,
      offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
    })
  }

  setPage (pageObj) {
    this.setState({ loadingCityPayementList: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchCityPaymentList({
      city_id: parseInt(this.props.match.params.cityId),
      limit: this.pageLimit,
      offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

    history.pushState(queryObj, "city payment list", `/home/manage-city-payment/${this.props.match.params.cityId}?${getQueryUri(queryObj)}`)
  }

  fetchCityPaymentList (payload) {
    this.setState({ loadingCityPayementList: true })
    Api.fetchCityPaymentList(payload)
      .then((response) => {
        console.log("response", response)
        this.setState({
          cityPaymentList: response.message,
          loadingCityPayementList: false,
          cityPaymentCount: response.count
        })
      })
      .catch((err) => {
        this.setState({ loadingCityPayementList: false })
        console.log("Error in fetching City Payment List", err)
      })
  }

  render() {
    const { loadingCityPayementList, cityPaymentList, cityPaymentCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-city-payment/${this.props.match.params.cityId}/create`}>
              <RaisedButton
                label="Create City Payment"
                primary
              />
            </NavLink>
          </div>
        </div>
        <h3>{`Showing City Payment List (${this.props.match.params.cityId})`}</h3>
        <ListCityPayment
          cityPaymentList={cityPaymentList}
          loadingCityPayementList={this.state.loadingCityPayementList}
          history={this.props.history}
        />
        {
          !loadingCityPayementList && cityPaymentList && cityPaymentList.length > 0
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={cityPaymentCount}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageCitiesPayment