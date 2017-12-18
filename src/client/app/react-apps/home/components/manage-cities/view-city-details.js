import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import { NavLink } from 'react-router-dom'
import { getQueryObj } from '@utils/url-utils'
import '@sass/components/_form.scss'
import CityDetailsForm from './city-details-form'
import IfElse from '@components/declarative-if-else'

class ViewCity extends React.Component {
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
    actions.fetchCityDetails({
      id: parseInt(queryObj.id)
    })
  }

  update() {
    const { cityDetails } = this.props
    const { isCityActive, cityName, queryObj } = this.state
    const data = this.cityDetailsForm.getData()

    this.props.actions.updateCity({
      id: parseInt(queryObj.id),
      is_available: data.isCityActive,
      deliverable_city: cityDetails.deliverable_city,
      state_short_name: cityDetails.state_short_name,
      gps: cityDetails.gps,
      name: data.cityName,
      geoboundary: cityDetails.geoboundary
    }, this.disableEditMode)
  }

  enableEditMode() {
    this.setState({ isEdit: true })
  }

  disableEditMode() {
    this.setState({ isEdit: false })
  }

  render() {
    const { loadingCityDetails, cityDetails } = this.props

    // if (!loadingCityDetails) {
    //   let urlArray = location.pathname.split("/")
    //   urlArray[3] = cityDetails.name
    //   let url = urlArray.join('/')
    //   history.pushState(null, null, `${url}?id=${cityDetails.id}`)
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
          !loadingCityDetails
          ? (
            <div style={{ position: 'absolute', right: '0' }}>

              <IfElse conditionMet={!this.state.isEdit}>
                <RaisedButton
                  primary
                  label="Edit City"
                  onClick={this.enableEditMode}
                  style={{ marginRight: '20px' }}
                />
                <RaisedButton
                  primary
                  label="Cancel"
                  onClick={this.disableEditMode}
                  style={{ marginRight: '20px' }}
                />
              </IfElse>

              <IfElse conditionMet={cityDetails.geoboundary.length || cityDetails.geoboundary}>
                <a
                  // target="_blank"
                  // exact
                  // to={`${location.pathname}/boundary?id=${this.state.queryObj.id}`}
                  href={`${location.pathname}/boundary?id=${this.state.queryObj.id}`}
                >
                  <RaisedButton
                    primary
                    label="View city boundary"
                    style={{ marginRight: '20px' }}
                  />
                </a>

                <a
                  // target="_blank"
                  // exact
                  // to={`${location.pathname}/create-boundary?id=${this.state.queryObj.id}`}
                  href={`${location.pathname}/create-boundary?id=${this.state.queryObj.id}`}
                >
                  <RaisedButton
                    primary
                    label="Create new"
                  />
                </a>
              </IfElse>

              <IfElse conditionMet={cityDetails.geoboundary.length || cityDetails.geoboundary}>
                <a
                  // target="_blank"
                  // exact
                  // to={`${location.pathname}/localities?id=${this.state.queryObj.id}`}
                  href={`${location.pathname}/localities?id=${this.state.queryObj.id}`}
                >
                  <RaisedButton
                    primary
                    label="View localities"
                  />
                </a>
                <Fragment />
              </IfElse>

            </div>
          )
          : ''
        }

        <IfElse conditionMet={!loadingCityDetails}>
          <div style={{ paddingTop: '40px' }}>
            <CityDetailsForm
              ref={(node) => { this.cityDetailsForm = node }}
              isDisabled={!this.state.isEdit}
              isCityActive={cityDetails.is_available}
              cityName={cityDetails.name}
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
          <div>loading..</div>
        </IfElse>

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
)(ViewCity)
