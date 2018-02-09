import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import * as Actions from './../../actions'

class ViewRetailers extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.actions.fetchRetailers()
  }

  render() {
    const {
      loadingRetailers,
      retailers
    } = this.props
    
    return (
      <div>

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
)(ViewRetailers)
