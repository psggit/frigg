import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Pagination from '@components/pagination'
// import '@sass/components/_pagination.scss'
import * as Actions from './../actions'
import LocalitiesList from './../components/locality-map-manager/localities-list'

class LocalityMapManager extends React.Component {
  componentDidMount() {
    this.props.actions.setLoadingState()
    this.props.actions.fetchLocalities({
      city_id: null,
      is_available: false,
      offset: 0,
      limit: 10,
      no_filter: true
    })
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
