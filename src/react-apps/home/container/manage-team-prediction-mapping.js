import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewTeamMappedToPrediction from '../components/manage-prediction-team-mapping/view-mapped-team'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import Api from "./../middleware/api"

class MapTeamToPrediction extends React.Component {
  constructor() {
    super()
    //this.pageLimit = 5
    this.state = {
      //activePage: 1,
      loadingTeamMappedToPredictionList: false,
      //teamCount: 0,
      teamMappedtoPreditionList: []
    }

    this.successTeamMappedToPredictionListCallback = this.successTeamMappedToPredictionListCallback.bind(this)
    // this.setQueryParamas = this.setQueryParamas.bind(this)
    // this.setPage = this.setPage.bind(this)
  }

  componentDidMount() {
    // if (location.search.length) {
    //   this.setQueryParamas()
    // } else {
      this.fetchTeamMappedToPrediction()
    //}
  }

  // setQueryParamas() {
  //   const queryUri = location.search.slice(1)
  //   const queryObj = getQueryObj(queryUri)
  //   Object.entries(queryObj).forEach((item) => {
  //     this.setState({ [item[0]]: item[1] })
  //   })
  //   this.setState({loadingTeamList: true})
  //   Api.fetchTeamList({
  //     offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
  //     limit: this.pageLimit,
  //   }, this.successTeamListCallback)
  // }

  fetchTeamMappedToPrediction() {
    this.setState({loadingTeamMappedToPredictionList: true})
    Api.fetchTeamMappedToPredictionList({
      // offset: 0,
      // limit: this.pageLimit
    }, this.successTeamMappedToPredictionListCallback)
  }

  successTeamMappedToPredictionListCallback(response) {
    this.setState({
      loadingTeamMappedToPredictionList: false,
      teamMappedtoPreditionList: [],
      //teamCount: 100
    })
  }

  // setPage(pageObj) {
  //   const queryUri = location.search.slice(1)
  //   const queryObj = getQueryObj(queryUri)

  //   this.setState({
  //     loadingTeamList: true,
  //     activePage: pageObj.activePage
  //   })

  //   Api.fetchTeamList({
  //     offset: pageObj.offset,
  //     limit: this.pageLimit,
  //   }, this.successTeamListCallback)

  //   queryObj.activePage = pageObj.activePage
  //   queryObj.offset = pageObj.offset
  //   history.pushState(queryObj, "team listing", `/home/manage-team?${getQueryUri(queryObj)}`)
  // }


  render() {
    const {
      loadingTeamMappedToPredictionList,
      teamMappedtoPreditionList
    } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-team/create`}>
            <RaisedButton
              label="Map team to prediction"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all team mapped to prediction</h3>
        <ViewTeamMappedToPrediction
          teamMappedtoPreditionList={teamMappedtoPreditionList}
          loadingTeamMappedToPredictionList={loadingTeamMappedToPredictionList}
          history={this.props.history}
        />
        {/* {
          !loadingTeamList && teamList && teamList.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={teamCount}
            setPage={this.setPage}
          />
          : ''
        } */}
      </div>
    )
  }
}

export default MapTeamToPrediction