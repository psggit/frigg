import React, { Fragment } from 'react'

class IfElse extends React.Component {
  render() {
    return (
      <Fragment>
        {
          this.props.conditionMet
          ? this.props.children[0]
          : this.props.children[1]
        }
      </Fragment>
    )
  }
}

export default IfElse
