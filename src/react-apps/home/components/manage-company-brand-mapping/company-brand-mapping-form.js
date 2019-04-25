import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../../actions/index'
import Moment from 'moment'

class CompanyForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedCompanyId: "",
      selectedBrandId: "",
      selectedGenreIdx: "",
      companyName: "",
      companyList: [],
      genreList: [],
      brandList: []
    }
  
    this.getData = this.getData.bind(this)
    //this.successBrandListCallback = this.successBrandListCallback.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleCompanyChange = this.handleCompanyChange.bind(this)
    this.handleBrandChange = this.handleBrandChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if(this.props.companyDetails !== newProps.companyDetails) {
      this.setState({
        companyList: newProps.companyDetails, 
        selectedCompanyId: newProps.companyDetails[0].value,
        companyName: newProps.companyDetails[0].text
      })
    }

    if(this.props.genreList !== newProps.genreList) {
      this.setState({genreList: newProps.genreList, selectedGenreIdx: newProps.genreList[0].value})
      this.props.fetchGenreBasedBrandList(newProps.genreList[0].value)
      // this.props.actions.fetchGenreBasedBrandList({
      //   genre_id: parseInt(newProps.genreList[0].value)
      // }, this.successBrandListCallback)
    }
    if(this.props.brands !== newProps.brands) {
      this.setState({
        brandList: newProps.brands.length ? newProps.brands : [], 
        selectedBrandId: newProps.brands.length ? newProps.brands[0].value : ""
      })
    }
  }

  handleGenreChange(e, k) {
    this.setState({
      selectedGenreIdx: (this.state.genreList[k].value)
    })
    this.props.fetchGenreBasedBrandList(this.state.genreList[k].value)
    // this.props.actions.fetchGenreBasedBrandList({
    //   genre_id: parseInt(this.state.genreList[k].value)
    // }, this.successBrandListCallback)
  }

  // successBrandListCallback() {
  //   const brandList = this.props.genreBasedBrandList.map((item, i) => {
  //     return {
  //       text: item.brand_name,
  //       value: item.id
  //     }
  //   })
  //   this.setState({brandList, selectedBrandId: brandList[0].value})
  // }


  handleCompanyChange(e, k) {
    this.setState({ 
      selectedCompanyId: this.state.companyList[k].value, 
      companyName:  this.state.companyList[k].text
    })
    this.props.fetchGenreBasedBrandList(this.state.selectedGenreIdx)
  }

  handleBrandChange(e, k) {
    this.setState({ selectedBrandId: this.state.brandList[k].value })
  }

  getData() {
    return this.state
  }

  render() {
    console.log("pros", this.props)
    return (
      <Fragment>
        <Card style={{
            padding: '20px',
            width: '300px',
            position: 'relative',
            display: 'block',
            verticalAlign: 'top',
            marginRight: '20px'
          }}
        >
           <div className="form-group">
              <label className="label">Company</label><br />
              <SelectField
                value={this.state.selectedCompanyId}
                onChange={this.handleCompanyChange}
                style={{ width: '100%' }}
              >
                {
                  !this.props.loadingCompanies && this.state.companyList.map((item, i) => (
                    <MenuItem
                      value={parseInt(item.value)}
                      key={parseInt(item.value)}
                      primaryText={item.text}
                    />
                  ))
                }
              </SelectField>
            </div>

            <div className="form-group">
              <label className="label">Genre</label><br />
              <SelectField
                value={this.state.selectedGenreIdx}
                onChange={this.handleGenreChange}
                style={{ width: '100%' }}
              >
                {
                  !this.props.loadingGenres && this.state.genreList.map((item, i) => (
                    <MenuItem
                      value={(item.value)}
                      key={(item.value)}
                      primaryText={item.text}
                    />
                  ))
                }
              </SelectField>
            </div>
            
            <div className="form-group">
              <label className="label">Brand</label><br />
              <SelectField
                value={this.state.selectedBrandId}
                onChange={this.handleBrandChange}
                style={{ width: '100%' }}
              >
                {
                  !this.props.loadingGenreBasedBrandList && this.state.brandList.map((item, i) => (
                    <MenuItem
                      value={(item.value)}
                      key={(item.value)}
                      primaryText={item.text}
                    />
                  ))
                }
              </SelectField>
            </div>

          <div className="form-group">
            <RaisedButton
              label="save"
              primary
              disabled={this.props.mappingBrandtoCompany}
              onClick={this.props.handleSave}
            />
          </div>
        </Card>
      </Fragment>
    )
  }
}

export default CompanyForm
// const mapStateToProps = state => state.main

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(Actions, dispatch)
// })

// console.log("connect returns", connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CompanyForm))

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CompanyForm)