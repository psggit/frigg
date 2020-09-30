import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ListDeliveryServiceProvider from "./../components/manage-delivery-service-provider/list-delivery-service-provider"

class DeliveryServiceProvider extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingDeliveryServiceProvider: false,
      serviceProviderList: [],
      serviceProviderCount: 0,
    }

     this.setQueryParamas = this.setQueryParamas.bind(this)
     this.setPage = this.setPage.bind(this)
     this.fetchServiceProvider = this.fetchServiceProvider.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchServiceProvider({
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
    this.fetchServiceProvider({
        offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
        limit: this.pageLimit,
    })
  }

  setPage(pageObj) {
    this.setState({ loadingDeliveryServiceProvider: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.fetchServiceProvider({
      offset: pageObj.offset,
      limit: this.pageLimit,
    })

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

    history.pushState(queryObj, "delivery service provider listing", `/home/manage-delivery-service-provider?${getQueryUri(queryObj)}`)
  }

  fetchServiceProvider(payload) {
    this.setState({ loadingDeliveryServiceProvider: true })
    Api.fetchDeliveryServiceProvider(payload)
      .then((response) => {
        console.log("count", response.count, response.message )
        this.setState({
          serviceProviderList: response.message,
          loadingDeliveryServiceProvider: false,
          serviceProviderCount: response.count
        })
      })
      .catch((err) => {
        this.setState({ loadingDeliveryServiceProvider: false })
        console.log("Error in fetching service provider list", err)
      })
  }

  render() {
    const {loadingDeliveryServiceProvider, serviceProviderList,serviceProviderCount} = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-delivery-service-provider/create`}>
              <RaisedButton
                label="Create Delivery Service Provider"
                primary
              />
            </NavLink>
          </div>
        </div>
        <h3>Showing list of Delivery Service Provider</h3>
        <ListDeliveryServiceProvider
          serviceProviderList={serviceProviderList}
          loadingDeliveryServiceProvider={loadingDeliveryServiceProvider}
          history={this.props.history}
        />
        {
          !loadingDeliveryServiceProvider && serviceProviderList && serviceProviderList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={serviceProviderCount}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default DeliveryServiceProvider