import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewPossessionLimits from '../components/manage-possession-limits/view-possession-limits'
import Pagination from '@components/pagination'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageStatePossessionLimits extends React.Component {
  constructor(props) {
    super(props)
    this.pageLimit = 5
    this.state = {
      activePage: 1
    }
    //this.setQueryParamas = this.setQueryParamas.bind(this)
    //this.setPage = this.setPage.bind(this)
  }

  componentDidMount() {
    this.fetchPossessionLimits()
  }

  fetchPossessionLimits() {
    console.log("match", this.props, this.props.match.stateShortName)
    this.props.actions.fetchPossessionLimits({
      state_short_name: this.props.match.params.stateShortName
    })
  }

  render() {
    const {
      loadingPossessionLimits,
      possessionLimits
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-states/possession-limit/create/${this.props.match.params.stateShortName}`}>
            <RaisedButton
              label="Create new possession limit"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all possession limits</h3>
        <ViewPossessionLimits
          possessionLimits={possessionLimits}
          loadingPossessionLimits={loadingPossessionLimits}
          stateShortName={this.props.match.params.stateShortName}
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
)(ManageStatePossessionLimits)
