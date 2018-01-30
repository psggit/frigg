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
import { Card } from 'material-ui/Card'

class ViewCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      stateIdx: 0
    }

    this.enableEditMode = this.enableEditMode.bind(this)
    this.disableEditMode = this.disableEditMode.bind(this)
    // this.setStateIdxFromShortName = this.setStateIdxFromShortName.bind(this)
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    const { actions, match } = this.props
    const queryObj = getQueryObj(location.search.slice(1))
    this.setState({ queryObj })
    actions.fetchStates()
    actions.fetchCityDetails({
      id: parseInt(queryObj.id)
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.loadingStates);
    const queryObj = getQueryObj(location.search.slice(1))
    this.setStateIdxFromShortName(queryObj.stateShortName)
  }

  setStateIdxFromShortName(stateShortName) {
    const { statesData } = this.props
    const stateIdx = statesData.map(item => item.short_name).indexOf(stateShortName)
    // console.log(stateIdx);
    this.setState({ stateIdx: stateIdx + 1 })
  }

  update() {
    const { cityDetails } = this.props
    const { isCityActive, cityName, queryObj } = this.state
    const data = this.cityDetailsForm.getData()
    const cityBoundaryData = this.cityBoundary.getData()

    if (data.cityName) {
      this.props.actions.updateCity({
        id: parseInt(queryObj.id),
        is_available: data.isCityActive,
        deliverable_city: data.isDeliveryActive,
        state_short_name: data.stateShortName || cityDetails.state_short_name,
        gps: data.gps || cityDetails.gps,
        name: data.cityName || cityDetails.name,
        geoboundary: cityBoundaryData || cityDetails.geoboundary
      }, this.disableEditMode)
    }
  }

  enableEditMode() {
    this.setState({ isEdit: true })
    this.cityBoundary.editGeoboundary()
  }

  disableEditMode() {
    this.setState({ isEdit: false })
    this.cityBoundary.clearSelection()
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

        <IfElse conditionMet={!loadingCityDetails && !loadingStates}>
          <div>
            <IfElse conditionMet={!this.state.isEdit}>
              <RaisedButton
                primary
                label="Edit"
                onClick={this.enableEditMode}
                style={{ marginBottom: '40px' }}
              />
              <RaisedButton
                primary
                label="Cancel"
                onClick={this.disableEditMode}
                style={{ marginBottom: '40px' }}
              />
            </IfElse>
            <div
              style={{
                width: '30%',
                position: 'relative',
                display: 'block',
                verticalAlign: 'top',
                marginRight: '20px'
              }}
            >
              <Card style={{
                padding: '20px',
                width: '100%'
              }}
              >
                <CityDetailsForm
                  ref={(node) => { this.cityDetailsForm = node }}
                  isDisabled={!this.state.isEdit}
                  isCityActive={cityDetails.is_available}
                  isDeliveryActive={cityDetails.deliverable_city}
                  cityName={cityDetails.name}
                  statesData={statesData}
                  stateIdx={this.state.stateIdx}
                />

              </Card>

            </div>
            <Card style={{
              padding: '20px',
              paddingTop: '0',
              marginTop: '40px',
              width: '100%',
              position: 'relative',
              display: 'inline-block',
              verticalAlign: 'top'
            }}
            >
              <DefineGeoboundary
                ref={(node) => { this.cityBoundary = node }}
                setLoadingState={actions.setLoadingState}
                fetchCityDetails={actions.fetchCityDetails}
                update={this.update}
                cityDetails={cityDetails}
                loadingCityDetails={loadingCityDetails}
                isGeolocalityUpdated={isGeolocalityUpdated}
                cityId={parseInt(queryObj.id)}
                zoomLevel={12}
              />
            </Card>
            <RaisedButton
              primary
              label="Save changes"
              onClick={this.update}
              style={{ marginTop: '40px' }}
            />
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
