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

  // formIsValid() {
  //   const predictionForm = this.predictionForm.getData()

  //   if (predictionForm.predictionTitle.length === 0) {
  //     return false
  //   } else if (predictionForm.activeFrom.toString().length === 0) {
  //     return false
  //   } else if (predictionForm.activeTo.toString().length === 0) {
  //     return false
  //   } else if (predictionForm.predictionImage.toString().length === 0) {
  //     return false
  //   } else if (predictionForm.detailedPredictionImage.toString().length === 0) {
  //     return false
  //   }

  //   return true
  // }

  successOptionCallback() {
    this.setState({ creatingOption: false })
    this.props.history.push("/home/manage-option")
  }

  failureOptionCallback() {
    this.setState({ creatingOption: false })
  }

  handleSave() {
    const optionForm = this.optionForm.getData()
    this.setState({creatingoption: true})
    Api.createOption({
      option_name: optionForm.optionName
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