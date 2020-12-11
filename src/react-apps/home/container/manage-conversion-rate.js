import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
//import ListDenominations from "./../components/manage-denominations/list-denominations"
import ListConversionRate from "./../components/manage-conversion-rate/list-conversion-rate"

class ManageConversionRate extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingConversionRate: false,
      conversionRateList: [],
      conversionRateCount: 0,
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchConversionRate = this.fetchConversionRate.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchConversionRate({
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

    this.fetchConversionRate({
      limit: this.pageLimit,
      offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
    })
  }

  setPage(pageObj) {
    this.setState({ loadingConversionRate: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchConversionRate({
      limit: this.pageLimit,
      offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

     history.pushState(queryObj, "conversion rate list", `/home/manage-conversion-rate?${getQueryUri(queryObj)}`)
  }

  fetchConversionRate(payload) {
    this.setState({ loadingConversionRate: true })
    Api.fetchConversionRate(payload)
      .then((response) => {
        //console.log("response",response.data)
        this.setState({
          conversionRateList: response.data,
          loadingConversionRate: false,
          conversionRateCount: response.count
        })
      })
      .catch((err) => {
        this.setState({ loadingConversionRate: false })
        console.log("Error in fetching denomination list", err)
      })
  }

  render() {
    const { loadingConversionRate, conversionRateList, conversionRateCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
        </div>
        <h3>Showing Conversion rate list</h3>
        <ListConversionRate
          conversionRateList={conversionRateList}
          loadingConversionRate={this.state.loadingConversionRate}
          history={this.props.history}
        />
        {
          !loadingConversionRate && conversionRateList && conversionRateList.length > 0
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={conversionRateCount}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageConversionRate


