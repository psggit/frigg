import React from 'react'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewOptionMappedToPrediction from '../components/manage-prediction-option-mapping/view-mapped-option'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"
import getIcon from '../components/icon-utils'
import FilterModal from '@components/filter-modal'

class MapOptionToPrediction extends React.Component {
  constructor() {
    super()
    this.pageLimit = 5
    this.state = {
      activePage: 1,
      loadingOptionMappedToPredictionList: false,
      loadingPredictionList: true,
      optionMappedToPredictionCount: 0,
      optionMappedtoPreditionList: [],
      predictionList: [],
      predictionId: 0,
      shouldMountFilterDialog: false
    }

    this.filter = {
      predictionId: ""
    }
    this.successOptionMappedToPredictionListCallback = this.successOptionMappedToPredictionListCallback.bind(this)
    this.fetchPredictionList = this.fetchPredictionList.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
    this.mountFilterDialog = this.mountFilterDialog.bind(this)
    this.unmountFilterModal = this.unmountFilterModal.bind(this)
    this.handlePredictionChange = this.handlePredictionChange.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.successPredictionListCallback = this.successPredictionListCallback.bind(this)
  }

  componentDidMount() {
    this.fetchPredictionList()
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchDefaultData()
    }
  }

  fetchPredictionList() {
    Api.fetchPredictionList({
      offset: 0,
      limit: 1000
    }, this.successPredictionListCallback)
  }

  successPredictionListCallback(response) {
    // this.setState({
    //   loadingPredictionList: false,
    //   predictionList: response.prediction_data
    // })
    let predictionList = []
    if(response.prediction_data) {
      predictionList = response.prediction_data.map((item, i) => {
        return {
          text: item.prediction_title,
          value: item.prediction_id
        }
      })
    }

    this.setState({predictionList, loadingPredictionList: false})
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    //this.fetchCityList()
    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.setState({loadingOptionMappedToPredictionList: true})

    if(queryObj.predictionId) {
      this.fetchOptionMappedToPredictionList({
        offset: queryObj.activePage ? (parseInt(queryObj.activePage) - 1) * this.pageLimit : 0,
        limit: this.pageLimit,
        prediction_id: queryObj.predictionId ? parseInt(queryObj.predictionId) : 0,
      }, this.successOptionMappedToPredictionListCallback)
    } else {
      this.fetchOptionMappedToPredictionList({
        offset: queryObj.activePage ? (parseInt(queryObj.activePage) - 1) * this.pageLimit : 0,
        limit: this.pageLimit,
      }, this.successOptionMappedToPredictionListCallback)
    }
  }

  fetchOptionMappedToPredictionList(payload, successCallback) {
    console.log("pay", payload)
    Api.fetchOptionMappedToPredictionList(payload, successCallback)
  }

  fetchDefaultData() {
    this.setState({loadingOptionMappedToPredictionList: true})
    this.fetchOptionMappedToPredictionList({
      offset: 0,
      limit: this.pageLimit
    }, this.successOptionMappedToPredictionListCallback)
  }

  successOptionMappedToPredictionListCallback(response) {
    this.setState({
      loadingOptionMappedToPredictionList: false,
      optionMappedtoPreditionList: response.options,
      optionMappedToPredictionCount: response.count ? response.count : 0
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    let queryParamsObj = {}

    this.setState({
      activePage: pageObj.activePage,
      loadingOptionMappedToPredictionList: true
    })

    if(queryObj.predictionId) {
      queryParamsObj = {
        activePage: pageObj.activePage,
        //offset: pageObj.offset,
        predictionId: queryObj.predictionId
      }

      this.fetchOptionMappedToPredictionList({
        offset: pageObj.offset,
        limit: this.pageLimit,
        prediction_id: parseInt(queryObj.predictionId)
      }, this.successOptionMappedToPredictionListCallback)

    } else {
      queryParamsObj = {
        activePage: pageObj.activePage,
        //offset: pageObj.offset
      }

      this.fetchOptionMappedToPredictionList({
        offset: pageObj.offset,
        limit: this.pageLimit,
      }, this.successOptionMappedToPredictionListCallback)
    }

    history.pushState(queryParamsObj, "option mapped prediction listing", `/home/manage-option-mapping?${getQueryUri(queryParamsObj)}`)
  }

  mountFilterDialog() {
    this.setState({ shouldMountFilterDialog: true })
  }

  unmountFilterModal() {
    this.setState({ shouldMountFilterDialog: false })
  }

  applyFilter() {
    console.log(this.filter);
    const queryObj = {
      activePage: 1,
      predictionId: this.filter.predictionId
    }

    this.setState({
      activePage: 1,
      predictionId: this.filter.predictionId
    })

    history.pushState(queryObj, "option mapped to prediction listing", `/home/manage-option-mapping?${getQueryUri(queryObj)}`)
    this.setState({loadingOptionMappedToPredictionList: true})
    this.fetchOptionMappedToPredictionList({
      prediction_id: parseInt(queryObj.predictionId),
      offset: 0,
      limit: this.pageLimit
    }, this.successOptionMappedToPredictionListCallback)
  }

  handlePredictionChange(k) {
    const { predictionList } = this.state
    this.filter.predictionId = predictionList[k].value
  }

  resetFilter() {
		this.setState({
			predictionId: '',
		})
		this.fetchDefaultData()
		this.props.history.push(`/home/manage-option-mapping`)
  }

  render() {
    const {
      loadingOptionMappedToPredictionList,
      optionMappedtoPreditionList,
      optionMappedToPredictionCount,
      loadingPredictionList, 
      predictionList
    } = this.state
    return (
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NavLink to={`/home/manage-option-mapping/create`}>
              <RaisedButton
                label="Map option to prediction"
                primary
              />
            </NavLink>
          </div>

          <div>
            <RaisedButton
              onClick={this.mountFilterDialog}
              label="Filter"
              icon={getIcon('filter')}
              style={{marginRight: '15px'}}
            />
            <RaisedButton
              onClick={this.resetFilter}
              label="Reset Filter"
              disabled={this.state.predictionId === 0}
              //icon={getIcon('filter')}
            />
          </div>
        </div>

        <h3>Showing all options mapped to prediction</h3>
        <ViewOptionMappedToPrediction
          optionMappedtoPreditionList={optionMappedtoPreditionList}
          loadingOptionMappedToPredictionList={loadingOptionMappedToPredictionList}
          history={this.props.history}
        />
        {
          !loadingOptionMappedToPredictionList && 
          optionMappedtoPreditionList && 
          optionMappedtoPreditionList.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={this.pageLimit}
            totalItemsCount={optionMappedToPredictionCount}
            setPage={this.setPage}
          />
          : ''
        }
         {
          this.state.shouldMountFilterDialog ?
          (<FilterModal
              applyFilter={this.applyFilter}
              title="Filter prediction"
              unmountFilterModal={this.unmountFilterModal}
              filterPrediction={true}
              floatingLabelText="Choose prediction"
              predictionList={predictionList}
              handlePredictionChange={this.handlePredictionChange}
              loadingPredictionList={loadingPredictionList}
              filter="predictionFilter"
            ></FilterModal>
          )
          : ''
        }
      </div>
    )
  }
}

export default MapOptionToPrediction