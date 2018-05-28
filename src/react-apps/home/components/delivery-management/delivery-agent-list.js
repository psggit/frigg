import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import ViewDeliveryAgents from './../delivery-map-manager/view-deliverers'
import * as Actions from './../../actions'
import Pagination from '@components/pagination'

class DeliveryAgentsList extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1
    }
  }

  setPage({ offset }) {
    // const queryUri = location.search.slice(1)
    // const queryObj = getQueryObj(queryUri)
    // const { statesData } = this.props
    //
    // this.setState(pageObj)
    // this.props.actions.fetchDeliverers({
    //   city_id: parseInt(queryObj.cityId) || null,
    //   is_available: queryObj.isLocalityAvailable || false,
    //   offset: pageObj.offset,
    //   limit: pageObj.offset + 10,
    //   no_filter: queryObj.filter ? false : true
    // })
    //
    // queryObj.activePage = pageObj.activePage
    // queryObj.offset = pageObj.offset
    // // history.pushState(queryObj, "city listing", `/home/manage-localities?${getQueryUri(queryObj)}`)
  }

  componentDidMount() {
    const { actions } = this.props
    actions.fetchDeliverers({
      offset: 0,
      limit: 5
    })
  }

  render() {
    const { deliverers, loadingDeliverers } = this.props
    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <NavLink to={`${location.pathname}/create-new-delivery-agent`}>
            <RaisedButton
              label="Create new delivery agent"
              primary
            />
          </NavLink>
        </div>
        <ViewDeliveryAgents
          deliverers={deliverers}
          loadingDeliverers={loadingDeliverers}
        />
        {
          !loadingDeliverers && deliverers.length
          ? <Pagination
            activePage={parseInt(this.state.activePage)}
            itemsCountPerPage={10}
            totalItemsCount={5}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAgentsList)
