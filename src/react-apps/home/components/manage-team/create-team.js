import React from "react"
import TeamForm from './team-form'
import Api from "./../../middleware/api"


class CreateTeam extends React.Component {
  constructor() {
    super()
    this.state = {
      creatingTeam: false
    }
    this.handleSave = this.handleSave.bind(this)
    this.successTeamCallback = this.successTeamCallback.bind(this)
    this.failureTeamCallback = this.failureTeamCallback.bind(this)
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

  successTeamCallback() {
    this.setState({ creatingTeam: false })
    this.props.history.push("/home/manage-team")
  }

  failureTeamCallback() {
    this.setState({ creatingTeam: false })
  }

  handleSave() {
    const teamForm = this.teamForm.getData()
    //console.log("form data", campaignForm)
    //if (this.formIsValid()) {
      this.setState({creatingTeam: true})
      Api.createTeam({
        name: teamForm.teamName
      }, this.successTeamCallback, this.failureTeamCallback)
    //}
  }

  render() {
    return (
      <TeamForm
        ref={(node) => { this.teamForm = node }}
        handleSave={this.handleSave}
        disableSave={this.state.creatingTeam}
      />
    )
  }
}

export default CreateTeam