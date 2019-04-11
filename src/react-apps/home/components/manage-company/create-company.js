import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions/index'
import CompanyForm from "./company-form"
//import ViewSkuList from "./map-sku-to-promo"

class CreateCompany extends React.Component {
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
    this.setState({companyList})
  }

  successGenreCallback() {
    const genreList = this.props.genres.map((item, i) => {
      return {
        text: item.genre_name,
        value: item.id
      }
    })
    console.log("genre list", genreList)
    this.setState({genreList})
  }

  formIsValid() {
    const companyForm = this.companyForm.getData()

    if (companyForm.selectedCompanyId.toString().length === 0) {
      return false
    } else if (companyForm.selectedBrandId.toString().length === 0) {
      return false
    }
    return true
  }

  handleSave() {
    //console.log("form data", this.companyForm)
    const companyForm = this.companyForm.getData()
    console.log("form data", this.companyForm)
    this.setState({mappingBrandtoCompany: true})
    if (this.formIsValid()) {
      this.props.actions.mapCompanyToBrand({
        company_id: parseInt(companyForm.selectedCompanyId),
        company_name: companyForm.companyName,
        brand_id: parseInt(companyForm.selectedBrandId)
      }, () => {
        this.setState({mappingBrandtoCompany: false})
      })
    }
  }

  fetchGenreBasedBrandList(genreId) {
    //this.props.actions.setLoadingState('loadingGenreBasedBrandList')
    this.setState({brandList: []})
    this.props.actions.fetchGenreBasedBrandList({
      genre_id: parseInt(genreId)
    }, this.successBrandListCallback)
  }

  successBrandListCallback() {
    let brandList = []
    if(this.props.genreBasedBrandList) {
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
        <h4 style={{ margin: '0', marginBottom: '40px' }}>MAP COMPANY TO BRAND</h4>
        <CompanyForm 
          ref={(node) => { this.companyForm = node }}
          companyDetails = {this.state.companyList}
          genreList = {this.state.genreList}
          brands = {this.state.brandList}
          mappingBrandtoCompany = {this.state.mappingBrandtoCompany}
          handleSave = {this.handleSave}
          fetchGenreBasedBrandList={this.fetchGenreBasedBrandList}
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