import React from 'react'
import PossessionLimitForm from './city-possession-limit-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class UpdateCityPossessionLimit extends React.Component {
  constructor() {
    super()

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('updatingCityPossessionLimit')
    this.props.actions.fetchCities({
      state_short_name: null,
      is_available: false,
      offset: 0,
      limit: 10000,
      deliverable_city: true,
      no_filter: true
    })
    //this.props.actions.fetchAdIds()
  }

  formIsValid() {
    const possessionLimitForm = this.possessionLimitForm.getData()

    if (possessionLimitForm.selectedCityIdx.length === 0) {
      return false
    } else if (possessionLimitForm.bottleCount.length === 0) {
      return false
    } else if (possessionLimitForm.volume.toString().length === 0) {
      return false
    }
    // else if (possessionLimitForm.DAPossessionVolumeLimit.toString().length === 0) {
    //   return false
    // }

    return true
  }

  handleSave() {
    const possessionLimitForm = this.possessionLimitForm.getData()
    if (this.formIsValid()) {
      this.props.actions.updateCityPossessionLimit({
        city_id: possessionLimitForm.selectedCityIdx,
        bottle_count: parseInt(possessionLimitForm.bottleCount),
        volume: parseInt(possessionLimitForm.volume),
        da_possession_volume_limit: parseInt(possessionLimitForm.DAPossessionVolumeLimit)
      })
    }
  }

  render() {
    return (
      <PossessionLimitForm
        ref={(node) => { this.possessionLimitForm = node }}
        handleSave={this.handleSave}
        data={this.props.location.state}
        cityList={this.props.citiesData}
        disableCityChange={true}
        disableSave={!this.props.updatingCityPossessionLimit}
      />
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
)(UpdateCityPossessionLimit)