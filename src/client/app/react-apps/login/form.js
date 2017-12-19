import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'

class Form extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Fragment>
        <div className="form-group">
          <TextField />
        </div>
      </Fragment>
    )
  }
}

export default Form
