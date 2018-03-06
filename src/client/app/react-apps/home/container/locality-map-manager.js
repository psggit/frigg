import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Pagination from '@components/pagination'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import * as Actions from './../actions'
import LocalitiesList from './../components/locality-map-manager/localities-list'

class LocalityMapManager extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1
    }
    this.fetchData = this.fetchData.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.setPage = this.setPage.bind(this)
  }
  componentDidMount() {
    this.fetchData()
    window.onpopstate = this.fetchData
  }

  componentWillUnmount() {
    window.onpopstate = () => {}
  }

  fetchData() {
    this.props.actions.setLoadingState()
    // this.props.actions.setLoadingState('loadingGeoboundary')

    // this.props.actions.fetchStates()

    if (location.search.length) {
      // if query string exists then apply filters
      this.setQueryParamas()
    } else {
      // if there is no query string then fetch defult citiesData/all citiesData
      this.props.actions.fetchLocalities({
        city_id: null,
        is_available: false,
        offset: 0,
        limit: 10,
        no_filter: true
      })
      // this.setState({ stateIdx: 0 })
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    this.setState({ activePage: 1})
    Object.entries(queryObj).forEach((item) => {
      // console.log(item[0]);
      this.setState({ [item[0]]: item[1] })
    })

    this.props.actions.fetchLocalities({
      city_id: null,
      is_available: false,
      offset: parseInt(queryObj.offset),
      limit: 10,
      no_filter: true
    })
  }

  setPage(pageObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    // const { statesData } = this.props

    this.setState(pageObj)
    this.props.actions.fetchLocalities({
      city_id: parseInt(queryObj.cityId) || null,
      is_available: queryObj.isLocalityAvailable || false,
      offset: pageObj.offset,
      limit: 10,
      no_filter: queryObj.filter ? false : true
    })

    queryObj.activePage = pageObj.activePage
    queryObj.offset = pageObj.offset
    history.pushState(queryObj, null, `/home/locality-map-manager?${getQueryUri(queryObj)}`)
  }

  render() {
    const { geoLocalitiesData, loadingGeolocalities } = this.props
    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        <h3>Showing all localities</h3>
        <LocalitiesList
          localities={geoLocalitiesData.fences}
          loadingLocalities={loadingGeolocalities}
        />

        {
          !loadingGeolocalities && geoLocalitiesData.fences.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={10}
            totalItemsCount={geoLocalitiesData.count}
            pageRangeDisplayed={5}
            setPage={this.setPage}
          />
          : ''
        }
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

LocalityMapManager.propTypes = {
  actions: PropTypes.func.isRequired,
  geoLocalitiesData: PropTypes.object.isRequired,
  loadingGeolocalities: PropTypes.bool.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalityMapManager)
