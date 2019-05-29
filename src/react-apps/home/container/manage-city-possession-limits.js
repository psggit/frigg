import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewCityPossessionLimits from '../components/manage-city-possession-limits/view-city-possession-limits'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageCityPossessionLimits extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.fetchPossessionLimits()
  }

  fetchPossessionLimits() {
    console.log("match", this.props, this.props.match.stateShortName)
    this.props.actions.fetchCityPossessionLimits()
  }

  render() {
    const {
      loadingCityPossessionLimits,
      cityPossessionLimits
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-cities/possession-limit/create`}>
            <RaisedButton
              label="Create new possession limit"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all possession limits</h3>
        <ViewCityPossessionLimits
          cityPossessionLimits={cityPossessionLimits}
          loadingCityPossessionLimits={loadingCityPossessionLimits}
          history={this.props.history}
        />
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCityPossessionLimits)
