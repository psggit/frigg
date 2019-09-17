import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/index'
import * as Api from "../../middleware/api"
import MapCompanyForm from "./company-brand-mapping-form"

class UpdateCompanyToBrand extends React.Component {
  constructor() {
    super()
    this.state = {
      companyList: [],
      genreList: [],
      brandList: [],
      mappingBrandtoCompany: true
      // selectedPromoId: "",
      // selectedStateId: ""
    }
    this.handleSave = this.handleSave.bind(this)
    this.formIsValid = this.formIsValid.bind(this)
    // this.successPromoListCallback = this.successPromoListCallback.bind(this)
    this.successCompanyListCallback = this.successCompanyListCallback.bind(this)
    this.successGenreCallback = this.successGenreCallback.bind(this)
    this.successBrandListCallback = this.successBrandListCallback.bind(this)
    this.fetchGenreBasedBrandList = this.fetchGenreBasedBrandList.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchCompanies({}, this.successCompanyListCallback)
    this.props.actions.fetchGenreList({}, this.successGenreCallback)
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
    this.setState({ companyList })
  }

  successGenreCallback() {
    const genreList = this.props.genres.map((item, i) => {
      return {
        text: item.genre_name,
        value: item.id
      }
    })
    console.log("genre list", genreList)
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
    //console.log("form data", this.companyForm)
    const mapCompanyForm = this.mapCompanyForm.getData()
    console.log("form data", this.mapCompanyForm)
    Api.updateCompanyToBrand({
      company_id: parseInt(mapCompanyForm.selectedCompanyId),
      company_name: mapCompanyForm.companyName,
      brand_id: parseInt(mapCompanyForm.selectedBrandId)
    })
      .then((response) => {
        console.log("response", response)
      })
      .catch((error) => {
        console.log("Error in updating company mapped to brand", error)
      })
    // this.setState({ mappingBrandtoCompany: true })
    // if (this.formIsValid()) {
    //   this.props.actions.mapCompanyToBrand({
    //     company_id: parseInt(mapCompanyForm.selectedCompanyId),
    //     company_name: mapCompanyForm.companyName,
    //     brand_id: parseInt(mapCompanyForm.selectedBrandId)
    //   }, () => {
    //     this.setState({ mappingBrandtoCompany: false })
    //   })
    // }
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
    console.log("brand list", brandList)
    this.setState({
      brandList,
      mappingBrandtoCompany: (this.props.genreBasedBrandList) ? false : true
    })
  }


  // successSkuListCallback() {
  //   this.setState({loadingSkuList: false})
  // }

  render() {
    console.log("props", this.props)
    return (
      <React.Fragment>
        <h4 style={{ margin: '0', marginBottom: '40px' }}>UPDATE COMPANY TO BRAND</h4>
        <MapCompanyForm
          ref={(node) => { this.mapCompanyForm = node }}
          companyDetails={this.state.companyList}
          genreList={this.state.genreList}
          brands={this.state.brandList}
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