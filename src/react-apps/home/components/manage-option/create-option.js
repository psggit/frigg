import React from "react"
import OptionForm from './option-form'
import * as Api from "../../middleware/api"


class CreateOption extends React.Component {
  constructor() {
    super()
    this.state = {
      creatingOption: false
    }
    this.handleSave = this.handleSave.bind(this)
    this.successOptionCallback = this.successOptionCallback.bind(this)
    this.failureOptionCallback = this.failureOptionCallback.bind(this)
  }

  successOptionCallback() {
    this.setState({ creatingOption: false })
  }

  failureOptionCallback() {
    this.setState({ creatingOption: false })
  }

  handleSave() {
    const optionForm = this.optionForm.getData()
    this.setState({ creatingoption: true })
    Api.createOption({
      option_name: optionForm.optionName.trim()
    }, this.successOptionCallback, this.failureOptionCallback)
  }

  render() {
    return (
      <OptionForm
        ref={(node) => { this.optionForm = node }}
        handleSave={this.handleSave}
        disableSave={this.state.creatingOption}
      />
    )
  }
}

export default CreateOption