import React from 'react'
import Toggle from 'material-ui/Toggle'

class Switch2 extends React.Component {

  constructor () {
    super()
    this.onToggle = this.onToggle.bind(this)
  }

  onToggle (e, isInputChecked) {
    this.props.onToggle(this.props.value, isInputChecked)
  }

  render () {
    return (
      <div>
        <Toggle toggled={this.props.toggled} disabled={this.props.disabled} onToggle={(e, isInputChecked) => this.onToggle(e, isInputChecked)} />
      </div>
    )
  }
}

export default Switch2