import React from 'react'
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

export default ViewCredits