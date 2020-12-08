import React from 'react';
import * as Api from "./../../middleware/api";
import StoryForm from './story-form';
import Notify from "@components/Notification"

class EditStory extends React.Component {
  constructor() {
    super()

    this.state = {
      updatingStory: false
    }

    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    const storyFormData = this.storyFormData.getData()
    const payload = {
      id: parseInt(this.props.match.params.storyId),
      url: storyFormData.file,
      name: storyFormData.storyName,
      type: storyFormData.selectedTypeIdx === 1 ? "image" : "video",
      thumbnail_url: storyFormData.thumbnailUrl,
      default_display_duration: parseInt(storyFormData.displayDuration),
      starts_on: new Date(storyFormData.startsOn).toISOString(),
      expires_on: new Date(storyFormData.expiresOn).toISOString(),
      is_active: storyFormData.selectedStatusIdx === 1 ? true : false
    }
    this.setState({ updatingStory: true })

    Api.updateStory({
      data: payload
    })
      .then((response) => {
        Notify('Successfully updated story', 'success')
        this.setState({ updatingStory: false })
        this.props.history.push("/home/manage-stories")
      })
      .catch((err) => {
        console.log("Error in updating story", err)
        this.setState({ updatingStory: false })
        err.response.json().then((json) => {
          Notify(json.message, "error")
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <StoryForm
          ref={(node) => { this.storyFormData = node }}
          disableSave={this.state.updatingStory}
          handleSave={this.handleSave}
          isDisabled={true}
          data={this.props.location.state}
          action="edit"
        />
      </React.Fragment>
    )
  }
}

export default EditStory