import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ListDenominations from "./../components/manage-denominations/list-denominations"

class ManageDenominations extends React.Component {
  constructor() {
    super()
    this.pageLimit = 10
    this.state = {
      activePage: 1,
      loadingDenomination: false,
      denominationList: [],
      denominationCount: 0,
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchDenomination = this.fetchDenomination.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchDenomination({
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

    this.fetchDenomination({
      limit: this.pageLimit,
      offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
    })
  }

  setPage(pageObj) {
    this.setState({ loadingDenomination: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchDenomination({
      limit: this.pageLimit,
      offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

    history.pushState(queryObj, "denominations list", `/home/manage-denominations/${this.props.match.params.cityId}?${getQueryUri(queryObj)}`)
  }

  fetchDenomination(payload) {
    this.setState({ loadingDenomination: true })
    Api.fetchDenomination(payload)
      .then((response) => {
        this.setState({
          denominationList: response.message,
          loadingDenomination: false,
          denominationCount: response.count
        })
      })
      .catch((err) => {
        this.setState({ loadingDenomination: false })
        console.log("Error in fetching denomination list", err)
      })
  }

  render() {
    const { loadingDenomination, denominationList, denominationCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-denominations/create`}>
              <RaisedButton
                label="Create Demoninations"
                primary
              />
            </NavLink>
          </div>
        </div>
        <h3>Showing Denominations list</h3>
        <ListDenominations
          denominationList={denominationList}
          loadingDenomination={this.state.loadingDenomination}
          history={this.props.history}
        />
        {
          !loadingDenomination && denominationList && denominationList.length > 0
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={denominationCount}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageDenominations


