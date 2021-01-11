import React from "react"
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ListLocalityFee from "../components/manage-locality-fee/list-locality-fee"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageLocalityFee extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingLocalityFeeList: false,
      localityFeeList: [],
      localityFeeListCount: 0
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchLocalityFeeList = this.fetchLocalityFeeList.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchLocalityFeeList({
        locality_id: parseInt(this.props.match.params.localityId),
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

    this.fetchLocalityFeeList({
      locality_id: parseInt(this.props.match.params.localityId),
      limit: this.pageLimit,
      offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
    })
  }

  setPage(pageObj) {
    this.setState({ loadingLocalityFeeList: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchLocalityFeeList({
      locality_id: parseInt(this.props.match.params.localityId),
      limit: this.pageLimit,
      offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
    })
    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

    history.pushState(queryObj, "locality fee list", `/home/manage-locality-fee/${this.props.match.params.localityId}?${getQueryUri(queryObj)}`)
  }

  fetchLocalityFeeList(payload) {
    this.setState({ loadingLocalityFeeList: true })
    Api.fetchLocalityFeeList(payload)
      .then((response) => {
        this.setState({
          localityFeeList: response.message,
          loadingLocalityFeeList: false,
          localityFeeListCount: response.count
        })
      })
      .catch((err) => {
        this.setState({ loadingLocalityFeeList: false })
        console.log("Error in fetching Locality Fee List", err)
      })
  }

  render() {
    const { loadingLocalityFeeList, localityFeeList, localityFeeListCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-locality-fee/${this.props.match.params.localityId}/create`}>
              <RaisedButton
                label="Create Locality Fee"
                primary
              />
            </NavLink>
          </div>
        </div>
        <h3>{`Showing Locality Fee List (${this.props.match.params.localityId})`}</h3>
        <ListLocalityFee
          localityFeeList={localityFeeList}
          loadingLocalityFeeList={this.state.loadingLocalityFeeList}
          history={this.props.history}
        />
        {
          !loadingLocalityFeeList && localityFeeList && localityFeeList.length > 0
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={localityFeeListCount}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageLocalityFee