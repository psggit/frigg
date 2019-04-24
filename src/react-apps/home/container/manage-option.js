import React from 'react'
import ViewOption from '../components/manage-option/view-option'
import '@sass/components/_pagination.scss'
import { NavLink } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import * as Api from "../middleware/api"

class ManageOption extends React.Component {
  constructor() {
    super()
    this.state = {
      loadingOptionList: false,
      optionList: []
    }

    this.successOptionListCallback = this.successOptionListCallback.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
  }

  componentDidMount() {
    this.fetchDefaultData()
  }

  fetchDefaultData() {
    this.setState({loadingOptionList: true})
    this.fetchOptionList({}, this.successOptionListCallback)
  }

  fetchOptionList(payload, successCallback) {
    Api.fetchOptionList(payload, successCallback)
  }

  successOptionListCallback(response) {
    this.setState({
      loadingOptionList: false,
      optionList: response.options
    })
  }

  render() {
    const {
      loadingOptionList,
      optionList,
    } = this.state
    return (
      <div style={{ width: '50%' }}>
        <div>
          <NavLink to={`/home/manage-option/create`}>
            <RaisedButton
              label="Create new option"
              primary
            />
          </NavLink>
        </div>
        <h3>Showing all options</h3>
        <ViewOption
          optionList={optionList}
          loadingOptionList={loadingOptionList}
          history={this.props.history}
        />
      </div>
    )
  }
}

export default ManageOption