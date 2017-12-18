import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import { NavLink } from 'react-router-dom'
import { getQueryObj } from '@utils/url-utils'
import '@sass/components/_form.scss'
import StateDetailsForm from './state-details.form'
import IfElse from '@components/declarative-if-else'

class ViewState extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false
    }

    this.enableEditMode = this.enableEditMode.bind(this)
    this.disableEditMode = this.disableEditMode.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    const { actions, match } = this.props
    const queryObj = getQueryObj(location.search.slice(1))
    this.setState({ queryObj })
    // actions.fetchStateDetails({
    //   id: parseInt(queryObj.id)
    // })
  }

  update() {
    const { stateDetails } = this.props
    const { stateName, queryObj } = this.state
    const data = this.stateDetailsForm.getData()

    // this.props.actions.updateState({
    //   id: parseInt(queryObj.id),
    //   is_available: data.isCityActive,
    //   deliverable_city: cityDetails.deliverable_city,
    //   state_short_name: cityDetails.state_short_name,
    //   gps: cityDetails.gps,
    //   name: data.cityName,
    //   geoboundary: cityDetails.geoboundary
    // }, this.disableEditMode)
  }

  enableEditMode() {
    this.setState({ isEdit: true })
  }

  disableEditMode() {
    this.setState({ isEdit: false })
  }

  render() {
    // const { loadingStateDetails, stateDetails } = this.props
    //
    // if (!loadingStateDetails) {
    //   let urlArray = location.pathname.split("/")
    //   urlArray[3] = stateDetails.name
    //   let url = urlArray.join('/')
    //   history.pushState(null, null, `${url}?id=${stateDetails.id}`)
    // }
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px 0'
      }}
      >


        {
          false
          ? (
            <div style={{ paddingTop: '40px' }}>
              <StateDetailsForm
                ref={(node) => { this.stateDetailsForm = node }}
                isDisabled={!this.state.isEdit}
                stateName={stateDetails.name}
              />
              <IfElse conditionMet={this.state.isEdit}>
                <RaisedButton
                  primary
                  label="Update changes"
                  onClick={this.update}
                  style={{ marginTop: '40px' }}
                />
                <Fragment />
              </IfElse>
            </div>
          )
          : <div>loading..</div>
        }

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
)(ViewState)
