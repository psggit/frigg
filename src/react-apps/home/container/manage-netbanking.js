import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import ViewNetBanking from '../components/manage-netbanking/index'

class ManageNetBanking extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.props.actions.fetchNetBankingList()
  }

  render() {
    const {
      loadingNetBankingList,
      netBankingList
    } = this.props
    return (
      <div style={{ width: '100%' }}>
        <h3>Showing all netbanking list</h3>
        <ViewNetBanking
          netBankingData={netBankingList}
          loadingNetBanking={loadingNetBankingList}
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
)(ManageNetBanking)
