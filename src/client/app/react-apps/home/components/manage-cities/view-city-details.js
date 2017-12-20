import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import { NavLink } from 'react-router-dom'
import { getQueryObj } from '@utils/url-utils'
import '@sass/components/_form.scss'
import CityDetailsForm from './city-details-form'
import DefineGeoboundary from './../manage-geofencing/define-geoboundary'
import IfElse from '@components/declarative-if-else'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'

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
    const {
      actions,
      statesData,
      citiesData,
      cityDetails,
      geoLocalitiesData,
      loadingCities,
      loadingStates,
      loadingCityDetails,
      loadingGeoboundary,
      loadingGeolocalities,
      isGeolocalityUpdated,
      match
    } = this.props

    const queryObj = getQueryObj(location.search.slice(1))

    return (
      <div style={{
        position: 'relative',
        width: '100%'
      }}
      >

        <IfElse conditionMet={!loadingCityDetails}>
          <div>
            <Card style={{
              padding: '20px',
              width: '30%',
              position: 'relative',
              display: 'inline-block',
              verticalAlign: 'top',
              marginRight: '20px'
            }}
            >
                <IfElse conditionMet={!this.state.isEdit}>
                  <button
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                    className="btn--icon"
                    onClick={this.enableEditMode}
                  >
                    <img src="/images/pencil.svg" />
                  </button>
                  <button
                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                    className="btn--icon"
                    onClick={this.disableEditMode}
                  >
                    <img src="/images/cross-blue.svg" />
                  </button>

                </IfElse>
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
            </Card>
            <Card style={{
              padding: '20px',
              width: 'calc(70% - 20px)',
              position: 'relative',
              display: 'inline-block',
              verticalAlign: 'top'
            }}
            >
              <DefineGeoboundary
                setLoadingState={actions.setLoadingState}
                fetchCityDetails={actions.fetchCityDetails}
                updateGeoboundary={actions.updateGeoboundary}
                cityDetails={cityDetails}
                loadingCityDetails={loadingCityDetails}
                isGeolocalityUpdated={isGeolocalityUpdated}
                cityId={parseInt(queryObj.id)}
                mode={'edit'}
              />
            </Card>
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
