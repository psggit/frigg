import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/index'
import CompanyForm from "./company-form"
import {formatStateAndCityList} from "@utils/response-format-utils"

class CreateCompany extends React.Component {
  constructor() {
    super()
    this.state = {
      stateList: [],
      cityList: [],
      stateMap: {},
      creatingCompany: false
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
    this.setState({creatingCompany: true})
    this.props.actions.createCompany({
      name: companyForm.companyName,
      city_id: parseInt(companyForm.selectedCityId),
      state_id: parseInt(companyForm.selectedStateId),
      address: companyForm.address,
      pin_code: parseInt(companyForm.pincode)
    }, () => {
      this.setState({creatingCompany: false})
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
          disableSave={this.state.creatingCompany}
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
)(CreateCompany)