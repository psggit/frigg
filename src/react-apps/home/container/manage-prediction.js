import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewPrediction from '../components/manage-prediction/view-prediction'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../middleware/api"

class ManagePrediction extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingPredictionList: false,
      predictionCount: 0,
      predictionList: []
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchPredictionList = this.fetchPredictionList.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchPredictionList()
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
    this.setState({loadingPredictionList: true})
    Api.fetchPredictionList({
      offset: queryObj.offset ? parseInt(queryObj.offset) : 0,
      limit: this.pageLimit,
    }, this.successPredictionListCallback)
  }

  fetchPredictionList() {
    this.setState({loadingPredictionList: true})
    Api.fetchPredictionList({
      offset: 0,
      limit: this.pageLimit
    }, this.successPredictionListCallback)
  }

  successPredictionListCallback(response) {
    this.setState({
      loadingPredictionList: false,
      predictionList: [],
      predictionCount: 100
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.setState({
      loadingPredictionList: true,
      activePage: pageObj.activePage
    })

    Api.fetchPredictionList({
      offset: pageObj.offset,
      limit: this.pageLimit,
    }, this.successPredictionListCallback)

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, "prediction listing", `/home/manage-prediction?${getQueryUri(queryObj)}`)
  }


  render() {
    const {
      loadingPredictionList,
      predictionList,
      predictionCount
    } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-prediction/create`}>
            <RaisedButton
              label="Create new prediction"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all prediction</h3>
        <ViewPrediction
          predictionList={predictionList}
          loadingPredictionList={loadingPredictionList}
          history={this.props.history}
        />
        {
          !loadingPredictionList && predictionList && predictionList.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={predictionCount}
            setPage={this.setPage}
          />
          : ''
        }
      </div>
    )
  }
}

export default ManagePrediction
// const mapStateToProps = state => state.main

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(Actions, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ManagePrediction)