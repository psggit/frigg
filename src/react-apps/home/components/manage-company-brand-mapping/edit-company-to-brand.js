import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/index'
import * as Api from "../../middleware/api"
import Notify from '@components/Notification'
import MapCompanyForm from "./company-brand-mapping-form"

class UpdateCompanyToBrand extends React.Component {
  constructor() {
    super()
    this.state = {
      companyList: [],
      genreList: [],
      brandList: [],
      brandName: "",
      mappingBrandtoCompany: true
    }
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)

    this.successCompanyListCallback = this.successCompanyListCallback.bind(this)
    this.successGenreCallback = this.successGenreCallback.bind(this)
    this.successBrandListCallback = this.successBrandListCallback.bind(this)
    this.fetchGenreBasedBrandList = this.fetchGenreBasedBrandList.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchCompanies({}, this.successCompanyListCallback)
    this.props.actions.fetchGenreList({}, this.successGenreCallback)
    Api.getBrandDetails({
      limit: 10,
      offset: 0,
      filter: {
        column: 'ID',
        operator: 'EQUAL',
        value: this.props.location.state.brand_id.toString()
      }
    })
      .then((response) => {
        console.log("response", response)
        this.setState({
          brandName: response.brand_details[0].brand_name
        })
      })
      .catch((err) => {
        console.log("Error in fetching brand details of given brand id", err)
      })
  }

  successCompanyListCallback() {
    const companyList = this.props.companies.map((item, i) => {
      return {
        text: item.name,
        value: item.id
      }
    })
    this.setState({ companyList })
  }

  successGenreCallback() {
    const genreList = this.props.genres.map((item, i) => {
      return {
        text: item.genre_name,
        value: item.id
      }
    })
    this.setState({ genreList })
  }

  formIsValid() {
    const mapCompanyForm = this.mapCompanyForm.getData()

    if (mapCompanyForm.selectedCompanyId.toString().length === 0) {
      return false
    } else if (mapCompanyForm.selectedBrandId.toString().length === 0) {
      return false
    }
    return true
  }

  handleSave() {
    const mapCompanyForm = this.mapCompanyForm.getData()
    // console.log("form data", this.mapCompanyForm)
    this.setState({ mappingBrandtoCompany: true })
    Api.updateCompanyToBrand({
      company_id: parseInt(mapCompanyForm.selectedCompanyId),
      company_name: mapCompanyForm.companyName,
      brand_id: parseInt(mapCompanyForm.selectedBrandId)
    })
      .then((response) => {
        this.setState({ mappingBrandtoCompany: false })
        Notify("Updated Successfully", "success")
        this.props.history.push(`/home/manage-company-brand-mapping`)
      })
      .catch((error) => {
        error.response.json().then(json => { Notify(json.message, "warning") })
      })
  }

  fetchGenreBasedBrandList(genreId) {
    //this.props.actions.setLoadingState('loadingGenreBasedBrandList')
    this.setState({ brandList: [] })
    this.props.actions.fetchGenreBasedBrandList({
      genre_id: parseInt(genreId)
    }, this.successBrandListCallback)
  }

  successBrandListCallback() {
    let brandList = []
    if (this.props.genreBasedBrandList) {
      brandList = this.props.genreBasedBrandList.map((item, i) => {
        return {
          text: item.brand_name,
          value: item.id
        }
      })
    }
    this.setState({
      brandList,
      mappingBrandtoCompany: (this.props.genreBasedBrandList) ? false : true
    })
  }

  render() {
    return (
      <React.Fragment>
        <h4 style={{ margin: '0', marginBottom: '40px' }}>UPDATE COMPANY TO BRAND</h4>
        <MapCompanyForm
          ref={(node) => { this.mapCompanyForm = node }}
          companyDetails={this.state.companyList}
          genreList={this.state.genreList}
          brands={this.state.brandList}
          brandName={this.state.brandName}
          mappingBrandtoCompany={this.state.mappingBrandtoCompany}
          handleSave={this.handleSave}
          fetchGenreBasedBrandList={this.fetchGenreBasedBrandList}
          data={this.props.location.state}
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
)(UpdateCompanyToBrand)