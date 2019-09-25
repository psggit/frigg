import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class CompanyForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedCompanyId: props.data ? props.data.company_id : 0,
      selectedBrandId: props.data ? props.data.brand_id : 0,
      companyName: props.data ? props.data.company_name : "",
      brandName: props.brandName,
      companyList: [],
      genreList: [],
      brandList: []
    }

    this.getData = this.getData.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.handleCompanyChange = this.handleCompanyChange.bind(this)
    this.handleBrandChange = this.handleBrandChange.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.companyDetails !== newProps.companyDetails) {
      this.setState({
        companyList: newProps.companyDetails,
        selectedCompanyId: this.state.selectedCompanyId === 0 ? newProps.companyDetails[0].value : this.state.selectedCompanyId,
        companyName: this.state.selectedCompanyId === 0 ? newProps.companyDetails[0].text : this.state.companyName
      })
    }

    if (this.props.genreList !== newProps.genreList) {
      this.setState({ genreList: newProps.genreList, selectedGenreIdx: newProps.genreList[0].value })
      this.props.fetchGenreBasedBrandList(newProps.genreList[0].value)
    }
    if (this.props.brands !== newProps.brands) {
      this.setState({
        brandList: newProps.brands.length ? newProps.brands : [],
        selectedBrandId: this.state.selectedBrandId === 0 ? newProps.brands.length ? newProps.brands[0].value : 0 : this.state.selectedBrandId
      })
    }
  }

  handleGenreChange(e, k) {
    this.setState({
      selectedGenreIdx: (this.state.genreList[k].value)
    })
    this.props.fetchGenreBasedBrandList(this.state.genreList[k].value)
  }

  handleCompanyChange(e, k) {
    this.setState({
      selectedCompanyId: this.state.companyList[k].value,
      companyName: this.state.companyList[k].text
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
    console.log("props", this.props)
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

          {
            location.pathname.indexOf("create") !== -1 &&
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
          }

          {
            location.pathname.indexOf("create") !== -1 &&
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
          }

          {
            location.pathname.indexOf("edit") !== -1 &&
            <div>
              <TextField
                disabled={location.pathname.indexOf("edit") !== -1}
                name="brandName"
                value={this.props.brandName}
              />
            </div>
          }

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