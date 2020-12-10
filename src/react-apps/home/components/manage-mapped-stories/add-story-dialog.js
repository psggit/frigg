import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import Notify from "@components/Notification"
import ViewStories from './view-stories'
import * as Api from "../../middleware/api"

class AddStoryDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true,
      stories: [],
      loadingStories: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleAddStoryToCityMap = this.handleAddStoryToCityMap.bind(this)
    this.mapStoryToCity = this.mapStoryToCity.bind(this)
  }

  componentDidMount() {
    this.fetchStories({
      limit: 1000,
      offset: 0,
      filter: {
        name: "is_active",
        value: "true"
      }
    })
  }

  fetchStories(payload) {
    this.setState({ loadingStories: true })
    Api.fetchStories(payload)
      .then((response) => {
        this.setState({
          stories: response.data,
          loadingStories: false,
          storiesCount: response.count
        })
      })
      .catch((err) => {
        err.response.json().then((json) => {
          Notify(json.message, "error")
        })
        console.log("Error in fetching stories", err)
      })
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountAddStoryDialog()
    }, 500)
  }

  mapStoryToCity(storyId) {
    Api.mapStoryToCity({
      city_id: this.props.cityId,
      id: storyId
    })
    .then((response) => {
      if(!response.error) {
        Notify(response.message, "success")
        setTimeout(() => {
          location.href = `/home/manage-mapped-stories?cityIdx=${this.props.cityId}`
        }, 500)
      } else {
        Notify(response.message, "error")
      }
    })
    .catch((error) => {
      error.response.json().then((json) => {
        Notify(json.message, "error")
      })
      console.log("Error in mapping story to city", error)
    })
  }

  handleAddStoryToCityMap(storyId) {
    this.mapStoryToCity(storyId)
    this.handleClose()
  }

  render() {
    console.log("Add retailer")
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />
    ]
    return (
      <div>
        <Dialog
          title="Add story"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <ViewStories
            handleClose={this.handleClose}
            loadingStories={this.state.loadingStories}
            stories={this.state.stories}
            handleAddStoryToCityMap={this.handleAddStoryToCityMap}
          />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStoryDialog)
//export default AddRetailerDialog
