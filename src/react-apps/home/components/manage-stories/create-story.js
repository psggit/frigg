import React from 'react';
import * as Api from "./../../middleware/api";
import StoryForm from './story-form';
import Notify from "@components/Notification"

class CreateStory extends React.Component {
  constructor() {
    super()

    this.state = {
      creatingStory: false
    }

    this.handleSave = this.handleSave.bind(this)
  }

  handleSave() {
    const storyFormData = this.storyFormData.getData()

    const payload = {
      url: storyFormData.url,
      name: storyFormData.storyName,
      type: storyFormData.selectedTypeIdx === 1 ? "image" : "video",
      thumbnail_url: storyFormData.thumbnailUrl,
      default_display_duration: parseInt(storyFormData.displayDuration),
      starts_on: new Date(storyFormData.startsOn).toISOString(),
      expires_on: new Date(storyFormData.expiresOn).toISOString(),
      is_active: storyFormData.selectedStatusIdx === 1 ? true : false
    }

    this.setState({ creatingStory: true })

    Api.createStory({
      data: payload
    })
      .then((response) => {
        this.setState({ creatingStory: false })
        if(!response.error) {
          Notify('Successfully created story', 'success')
          this.props.history.push("/home/manage-stories")
        } else {
          Notify(response.message, 'error')
        }
      })
      .catch((err) => {
        console.log("Error in creating story", err)
        this.setState({ creatingStory: false })
        err.response.json().then((json) => {
          Notify(json.message, "error")
        })
      })
  }

  render () {
    return (
      <React.Fragment>
        <StoryForm
          ref={(node) => { this.storyFormData = node }}
          disableSave={this.state.creatingStory}
          handleSave={this.handleSave}
          action="create"
        />
      </React.Fragment>
    )
  }
}

export default CreateStory