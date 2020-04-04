import React from "react"
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import * as Api from "../middleware/api"
import { Card } from 'material-ui/Card'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import Pagination from '@components/pagination'
import { NavLink } from 'react-router-dom'
import ViewMappedRetailerWarehouse from "../components/manage-retailer-warehouse-mapping/view-mapped-retailer-warehouse"

class RetailerWarehouseMapping extends React.Component {

  constructor () {
    super()

    this.pageLimit = 5
    this.state = {
      optionIdx: -1,
      id: "",
      activePage: 1,
      retailerWarehouseList: [],
      retailerWarehouseCount: 0,
      loadingRetailerWarehouseList: false
    }

    this.filter = {
      id: "",
      field: ""
    }
    this.options = [
      { text: 'Retailer ID', value: 1 },
      { text: 'Warehouse ID', value: 2 },
    ]

    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.deleteRetailerMappedToWarehouse = this.deleteRetailerMappedToWarehouse.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.fetchRetailerWarehouseMapping = this.fetchRetailerWarehouseMapping.bind(this)
  }

  componentDidMount () {
    if (location.search.length) {
      this.setQueryParamas()
    }
  }

  setQueryParamas () {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      this.filter[item[0]] = item[1]
    })

    this.fetchRetailerWarehouseMapping({
      filter: {
        field: this.filter.optionIdx === "1" ? "retailer_id" : "warehouse_id",
        value: this.filter.id
      },
      pagination: {
        limit: this.pageLimit,
        offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0
      }
    })
  }

  // setPage (pageObj) {
  //   this.setState({ loadingRetailerWarehouseList: true })
  //   const queryUri = location.search.slice(1)
  //   const queryObj = getQueryObj(queryUri)

  //   this.fetchRetailerWarehouseMapping({
  //     filter: {
  //       field: this.filter.optionIdx === "1" ? "retailer_id" : "warehouse_id",
  //       value: this.filter.id
  //     },
  //     pagination: {
  //       limit: this.pageLimit,
  //       offset: pageObj.offset
  //     }
  //   })
  //   this.setState({ activePage: pageObj.activePage })

  //   queryObj.activePage = pageObj.activePage
  //   history.pushState(queryObj, "retailer warehouse listing", `/home/manage-reward-coupons?${getQueryUri(queryObj)}`)
  // }

  handleOptionChange (e, k) {
    const optionIdx = k + 1
    this.setState({ optionIdx: optionIdx.toString() })
  }

  deleteRetailerMappedToWarehouse (item) {
    let payload = {}
    if(this.state.optionIdx === "1") {
      payload = {
        retailer_id: parseInt(this.state.id),
        warehouse_id: parseInt(item.id)
      }
    } else {
      payload = {
        warehouse_id: parseInt(this.state.id),
        retailer_id: parseInt(item.id)
      }
    }

    Api.deleteRetailerMappedToWarehouse(payload)
    .then((response) => {
      location.reload()
    })
    .catch((error) => {
      console.log("Error in deleting retailer mapped to warehouse", error)
    })
  }

  fetchRetailerWarehouseMapping (payload) {
    this.setState({ loadingRetailerWarehouseList: true })
    Api.fetchRetailerWarehouseMapping(payload)
    .then((response) => {
      this.setState({
        retailerWarehouseList: response.data,
        retailerWarehouseCount: response.count,
        loadingRetailerWarehouseList: false
      })
    })
    .catch((error) => {
      this.setState({ loadingRetailerWarehouseList: false})
      console.log("Error in fetching retailer warehouse list", error)
    })
  }

  handleTextFields (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSearch () {
    const queryObj = {
      id: this.state.id,
      optionIdx: this.state.optionIdx
    }
    this.fetchRetailerWarehouseMapping({
      filter: {
        field: this.state.optionIdx === "1" ? "retailer_id" : "warehouse_id",
        value: this.state.id
      },
      pagination: {
        limit: this.pageLimit,
        offset: 0
      }
    })
    history.pushState(queryObj, "retailer warehouse listing", `/home/retailer-warehouse-mapping?${getQueryUri(queryObj)}`)
  }

  render () {
    const {loadingRetailerWarehouseList, retailerWarehouseList, retailerWarehouseCount} = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}
        >
          <NavLink to={`/home/map-retailer-to-warehouse`}>
            <RaisedButton
              label="Map Retailer to Warehouse"
              primary
              onClick={this.mountCreateStateDialog}
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
            floatingLabelText="Choose Option"
            value={parseInt(this.state.optionIdx)}
            onChange={this.handleOptionChange}
            iconStyle={{ fill: '#9b9b9b' }}
          >
            {
              this.options.map((item, i) => {
                return (
                  <MenuItem
                    value={item.value}
                    key={item.value}
                    primaryText={item.text}
                  />
                )
              })
            }
          </SelectField>
          <TextField
            style={{ marginRight: '20px' }}
            onChange={this.handleTextFields}
            name="id"
            value={this.state.id}
          />
          <RaisedButton
            primary
            label="Search"
            disabled={loadingRetailerWarehouseList}
            onClick={this.handleSearch}
          />
        </Card>
        <React.Fragment>
          <h3>Showing all retailers mapped to warehouse</h3>
          <ViewMappedRetailerWarehouse
            retailerWarehouseList={this.state.retailerWarehouseList}
            deleteRetailerMappedToWarehouse={this.deleteRetailerMappedToWarehouse}
            loadingRetailerWarehouseList={this.state.loadingRetailerWarehouseList}
            history={this.props.history}
          />
        </React.Fragment>
        {
          !loadingRetailerWarehouseList && retailerWarehouseList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={10}
              totalItemsCount={retailerWarehouseCount}
              pageRangeDisplayed={5}
              setPage={this.setPage}
            />
            : ''
        }
      </React.Fragment>
    )
  }
}

export default RetailerWarehouseMapping