import React from "react"
import BrandManagerForm from './brand-manager-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'


class CreateBrandManager extends React.Component {
  constructor() {
    super()
    this.state = {
      companyList: [],
      creatingBrandManager: false
    }
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    this.successBrandManagerCallback = this.successBrandManagerCallback.bind(this)
    this.successCompanyListCallback = this.successCompanyListCallback.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchCompanies({}, this.successCompanyListCallback)
  }

  successCompanyListCallback() {
    const companyList = this.props.companies.map((item, i) => {
      return {
        //value: i,
        text: item.name,
        value: item.id
        //id: item.id
      }
    })
    console.log("company list", companyList)
    this.setState({companyList})
  }

  formIsValid() {
    const brandManagerForm = this.brandManagerForm.getData()

    if (brandManagerForm.name.length === 0) {
      return false
    } else if (brandManagerForm.email.toString().length === 0) {
      return false
    } else if (brandManagerForm.phone.toString().length === 0) {
      return false
    } else if (brandManagerForm.selectedCompanyIdx.toString().length === 0) {
      return false
    } else if (brandManagerForm.selectedStatusIdx.toString().length === 0) {
      return false
    } else if (brandManagerForm.selectedKycStatusIdx.toString().length === 0) {
      return false
    }

    return true
  }

  successBrandManagerCallback() {
    this.setState({ creatingBrandManager: false })
  }

  handleSave() {
    const brandManagerForm = this.brandManagerForm.getData()
    if (this.formIsValid()) {
      this.setState({creatingBrandManager: true})
      this.props.actions.createBrandManager({
        name: brandManagerForm.name,
        email: brandManagerForm.email,
        mobile_number: brandManagerForm.phone,
        company_id: brandManagerForm.selectedCompanyIdx,
        activity_status: brandManagerForm.selectedStatusIdx === 1 ? true : false,
        kyc_status: brandManagerForm.selectedKycStatusIdx === 1 ? 'Verified' : 'Not Verified',
        password: brandManagerForm.password
      }, this.successBrandManagerCallback)
    }
  }

  render() {
    return (
      <BrandManagerForm
        ref={(node) => { this.brandManagerForm = node }}
        handleSave={this.handleSave}
        disableSave={this.state.creatingBrandManager}
        companyList={this.state.companyList}
        //campaignStatus={this.props.campaignList}
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
)(CreateBrandManager)