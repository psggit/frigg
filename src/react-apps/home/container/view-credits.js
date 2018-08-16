import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'

class ViewCredits extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.actions.viewCredits()
  }

  render() {
    return(
      <div> view credits</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.main
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCredits)

//export default ViewCredits