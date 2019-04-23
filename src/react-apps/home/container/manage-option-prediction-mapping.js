import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewOptionMappedToPrediction from '../components/manage-prediction-option-mapping/view-mapped-option'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"

class MapOptionToPrediction extends React.Component {
  constructor() {
    super()
    //this.pageLimit = 5
    this.state = {
      //activePage: 1,
      loadingOptionMappedToPredictionList: false,
      //teamCount: 0,
      optionMappedtoPreditionList: []
    }

    this.successOptionMappedToPredictionListCallback = this.successOptionMappedToPredictionListCallback.bind(this)
    this.fetchOptionMappedToPrediction = this.fetchOptionMappedToPrediction.bind(this)
    // this.setQueryParamas = this.setQueryParamas.bind(this)
    // this.setPage = this.setPage.bind(this)
  }

  componentDidMount() {
    // if (location.search.length) {
    //   this.setQueryParamas()
    // } else {
      this.fetchOptionMappedToPrediction()
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

  fetchOptionMappedToPrediction() {
    this.setState({loadingOptionMappedToPredictionList: true})
    Api.fetchOptionMappedToPredictionList({
      // offset: 0,
      // limit: this.pageLimit
    }, this.successOptionMappedToPredictionListCallback)
  }

  successOptionMappedToPredictionListCallback(response) {
    console.log("res", response)
    this.setState({
      loadingOptionMappedToPredictionList: false,
      optionMappedtoPreditionList: response.options,
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
      loadingOptionMappedToPredictionList,
      optionMappedtoPreditionList
    } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-option-mapping/create`}>
            <RaisedButton
              label="Map option to prediction"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all option mapped to prediction</h3>
        <ViewOptionMappedToPrediction
          optionMappedtoPreditionList={optionMappedtoPreditionList}
          loadingOptionMappedToPredictionList={loadingOptionMappedToPredictionList}
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

export default MapOptionToPrediction