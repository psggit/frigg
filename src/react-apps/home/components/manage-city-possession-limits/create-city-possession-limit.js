import React from 'react'
import PossessionLimitForm from './city-possession-limit-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'

class CreateCityPossessionLimit extends React.Component {
  constructor() {
    super()

    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
  }

  componentDidMount() {
    this.props.actions.setLoadingState('creatingCityPossessionLimit')
    this.props.actions.fetchCities({
        state_short_name: null,
        is_available: false,
        offset: 0,
        limit: 10,
        deliverable_city: true,
        no_filter: true
    })
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

    return true
  }

  handleSave() {
    const possessionLimitForm = this.possessionLimitForm.getData()
    if (this.formIsValid()) {
      this.props.actions.createCityPossessionLimit({
        city_id: possessionLimitForm.selectedCityIdx,
        bottle_count: parseInt(possessionLimitForm.bottleCount),
        volume: parseInt(possessionLimitForm.volume)
      })
    }
  }

  render() {
    return (
      <PossessionLimitForm
        ref={(node) => { this.possessionLimitForm = node }}
				handleSave={this.handleSave}
				cityList={this.props.citiesData}
        disableSave={!this.props.creatingCityPossessionLimit}
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
)(CreateCityPossessionLimit)