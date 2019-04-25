import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/index'
import CompanyForm from "./company-form"
import {formatStateAndCityList} from "@utils/response-format-utils"

class UpdateCompany extends React.Component {
  constructor() {
    super()
    this.state = {
      stateList: [],
      cityList: [],
      stateMap: {},
      updatingCompany: false
    }
    this.handleSave = this.handleSave.bind(this)
    this.successStateCallback = this.successStateCallback.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchStateList({}, this.successStateCallback)
  }

  successStateCallback() {
    const {stateList, cityList, stateMap} = formatStateAndCityList(this.props.stateList)
    this.setState({stateList, cityList, stateMap})
  }

  handleSave() {
    const companyForm = this.companyForm.getData()
    console.log("form data", this.companyForm)
    this.setState({updatingCompany: true})
    this.props.actions.updateCompany({
      id: parseInt(this.props.location.state.id),
      name: companyForm.companyName,
      city_id: parseInt(companyForm.selectedCityId),
      state_id: parseInt(companyForm.selectedStateId),
      address: companyForm.address,
      pin_code: parseInt(companyForm.pincode)
    }, () => {
      this.setState({updatingCompany: false})
    })
  }

  render() {
    return (
      <React.Fragment>
        <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter company details</h4>
        <CompanyForm 
          ref={(node) => { this.companyForm = node }}
          stateList={this.state.stateList}
          cityList={this.state.cityList}
          stateMap={this.state.stateMap}
          data={this.props.location.state}
          disableSave={this.state.updatingCompany}
          handleSave={this.handleSave}
        />
      </React.Fragment>
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
)(UpdateCompany)