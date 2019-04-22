import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewOption from '../components/manage-option/view-option'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"

class ManageOption extends React.Component {
  constructor() {
    super()
    //this.pageLimit = 5
    this.state = {
      //activePage: 1,
      loadingOptionList: false,
      //teamCount: 0,
      optionList: []
    }

    this.successOptionListCallback = this.successOptionListCallback.bind(this)
    // this.setQueryParamas = this.setQueryParamas.bind(this)
    // this.setPage = this.setPage.bind(this)
  }

  componentDidMount() {
    // if (location.search.length) {
    //   this.setQueryParamas()
    // } else {
      this.fetchOptionList()
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

  fetchOptionList() {
    this.setState({loadingOptionList: true})
    Api.fetchOptionList({
      // offset: 0,
      // limit: this.pageLimit
    }, this.successOptionListCallback)
  }

  successOptionListCallback(response) {
    this.setState({
      loadingOptionList: false,
      optionList: response.options,
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
      loadingOptionList,
      optionList,
     // teamCount
    } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-option/create`}>
            <RaisedButton
              label="Create new option"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all option</h3>
        <ViewOption
          optionList={optionList}
          loadingOptionList={loadingOptionList}
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

export default ManageOption

// const mapStateToProps = state => state.main

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(Actions, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ManageTeam)