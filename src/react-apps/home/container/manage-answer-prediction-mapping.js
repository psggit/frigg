import React from 'react'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewPredictionAnswer from '../components/manage-prediction-answer-mapping/view-answer'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "./../middleware/api"

class ManagePredictionAnswer extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingPredictionAnswerList: false,
      predictionAnswerCount: 0,
      predictionAnswerList: [],
      predictionAnswerMap: {}
    }
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchPredictionAnswerList = this.fetchPredictionAnswerList.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
    this.updatePredictionAnswerMap = this.updatePredictionAnswerMap.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchDefaultData()
    }
  }

  fetchDefaultData() {
    this.setState({ loadingPredictionAnswerList: true })
    this.fetchPredictionAnswerList({
      offset: 0,
      limit: this.pageLimit
    })
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
    this.setState({ loadingPredictionAnswerList: true })
    this.fetchPredictionAnswerList({
      offset: queryObj.activePage ? (parseInt(queryObj.activePage) - 1) * this.pageLimit : 0,
      limit: this.pageLimit,
    })
  }

  updatePredictionAnswerMap(response) {
    console.log("prediction answer")
    const predictionAnswerMap = {}
    response.prediction_answer.map((item) => {
      predictionAnswerMap[item.prediction_id] = item
    })
    console.log("set", predictionAnswerMap)
    this.setState({ predictionAnswerMap })
  }

  fetchPredictionAnswerList(payload) {
    console.log("netwrk", payload)
    Api.fetchPredictionAnswerList(payload)
      .then((response) => {
        this.updatePredictionAnswerMap(response)
        this.setState({
          loadingPredictionAnswerList: false,
          predictionAnswerList: response.prediction_answer,
          predictionAnswerCount: response.count
        })
      })
      .catch((err) => {
        console.log("Error in fetching prediction answer list", err)
      })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    this.setState({
      loadingPredictionAnswerList: true,
      activePage: pageObj.activePage
    })

    this.fetchPredictionAnswerList({
      offset: pageObj.activePage ? (parseInt(pageObj.activePage) - 1) * this.pageLimit : 0,
      limit: this.pageLimit,
    })

    queryObj.activePage = pageObj.activePage
    history.pushState(queryObj, "prediction-answer listing", `/home/manage-answer-mapping?${getQueryUri(queryObj)}`)
  }


  render() {
    const {
      loadingPredictionAnswerList,
      predictionAnswerList,
      predictionAnswerMap,
      predictionAnswerCount
    } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-answer-mapping/create`}>
            <RaisedButton
              label="Map prediction to answer"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all prediction answer</h3>
        <ViewPredictionAnswer
          predictionAnswerList={predictionAnswerList}
          loadingPredictionAnswerList={loadingPredictionAnswerList}
          predictionAnswerMap={predictionAnswerMap}
          history={this.props.history}
        />
        {
          !loadingPredictionAnswerList && predictionAnswerList && predictionAnswerList.length
            ? <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pageLimit}
              totalItemsCount={predictionAnswerCount}
              setPage={this.setPage}
            />
            : ''
        }
      </div>
    )
  }
}

export default ManagePredictionAnswer