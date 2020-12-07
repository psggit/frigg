import React from "react"
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import FilterModal from '@components/filter-modal'
import ListStories from "../components/manage-stories/list-stories"
import getIcon from '../components/icon-utils'
import Notify from "@components/Notification"

class ManageStories extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingStories: false,
      stories: [],
      storiesCount: 0,
      shouldMountFilterDialog: false,
      fieldName: "",
      fieldValue: 0
    }

    this.filter = {
      fieldName: "",
      fieldValue: 0
    }

    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchStories({
          limit: this.pageLimit,
          offset: 0,
          filter: {}
      })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
    if (queryObj.fieldValue && queryObj.fieldValue.toString().length > 0) {
      this.fetchStories({
        offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
        limit: this.pageLimit,
        filter: {
          name: queryObj.fieldName,
          value: queryObj.fieldValue.toString()
        }
      })
    } else {
      this.fetchStories({
        offset: queryObj.activePage ? this.pageLimit * (parseInt(queryObj.activePage) - 1) : 0,
        limit: this.pageLimit,
        filter: {}
      })
    }
  }

  setPage(pageObj) {
    this.setState({ loadingStories: true })
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    if (typeof queryObj.fieldValue === "boolean" && queryObj.fieldValue.toString().length > 0) {
      this.fetchStories({
        offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
        limit: this.pageLimit,
        filter: {
          name: queryObj.fieldName,
          value: queryObj.fieldValue.toString()
        }
      })
    } else {
      this.fetchStories({
        offset: pageObj.activePage ? this.pageLimit * (parseInt(pageObj.activePage) - 1) : 0,
        limit: this.pageLimit,
        filter: {}
      })
    }

    this.setState({ activePage: pageObj.activePage })

    queryObj.activePage = pageObj.activePage

    history.pushState(queryObj, "stories listing", `/home/manage-stories?${getQueryUri(queryObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  fetchStories(payload) {
    this.setState({ loadingStories: true })
    Api.fetchStories(payload)
      .then((response) => {
        this.setState({
          stories: response.data,
          loadingStories: false,
          storiesCount: response.count
        })
      })
      .catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "error")
        })
        console.log("Error in fetching stories", err)
      })
  }

  applyFilter(fieldValue) {
    // console.log("applyFilter", fieldValue);
    const filterValue = fieldValue === 1 ? true : false;
    const queryObj = {
      activePage: 1,
      fieldName: 'is_active',
      fieldValue: filterValue
    }

    this.setState({
      activePage: 1,
      fieldName: 'is_active',
      fieldValue: filterValue,
      stories: []
    })

    history.pushState(queryObj, "stories listing", `/home/manage-stories?${getQueryUri(queryObj)}`)

    this.fetchStories({
      offset: 0,
      limit: this.pageLimit,
      filter: {
        name: "is_active",
        value: filterValue.toString()
      }
    })
  }

  render() {
    const { loadingStories, stories, storiesCount } = this.state
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-stories/create`}>
              <RaisedButton
                label="Create Story"
                primary
              />
            </NavLink>
          </div>
          <RaisedButton
            style={{ marginRight: "10px" }}
            onClick={this.mountFilterDialog}
            label="Filter"
            icon={getIcon('filter')}
          />
        </div>
        <h3>Showing all stories</h3>
        <ListStories
          stories={this.state.stories}
          loadingStories={this.state.loadingStories}
          history={this.props.history}
        />
        {
          !loadingStories && stories && stories.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={storiesCount}
              setPage={this.setPage}
            />
            : ''
        }
        {
          this.state.shouldMountFilterDialog
            ? (
              <FilterModal
                applyFilter={this.applyFilter}
                title="Filter stories"
                unmountFilterModal={this.unmountFilterModal}
                filter="storyFilter"
              />
            )
            : ''
        }
      </React.Fragment>
    )
  }
}

export default ManageStories