import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import ViewStateTimings from '../components/manage-state-timings/view-state-timings'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

class ManageStateTimimgs extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.fetchStateTimings()
  }

  fetchStateTimings() {
    this.props.actions.fetchStateTimings()
  }

  render() {
    const {
      loadingStateTimings,
      stateTimings
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <div>
          <NavLink to={`/home/manage-state-timings/create`}>
            <RaisedButton
              label="Create new state timings"
              primary
            />
          </NavLink>

        </div>
        <h3>Showing all state timings</h3>
        <ViewStateTimings
          stateTimings={stateTimings}
          loadingStateTimings={loadingStateTimings}
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
)(ManageStateTimimgs)
