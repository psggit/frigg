import React from 'react'
import ViewBrandsInCollection from './view-brands-in-collection'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { Card } from 'material-ui/Card'
import AddBrandDialog from './add-brand-dialog'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import { getQueryObj } from '@utils/url-utils'
import Pagination from '@components/pagination'

class EditCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldMountCollectionDialog: false,
      selectedBrand: [],
      is_active: false,
      name: '',
      display_name: '',
      short_name: '',
      activePage: 1,
      pageOffset: 0,
    }
    this.brandCount = 0,
    this.pagesLimit = 5
    this.fetchBrandList = this.fetchBrandList.bind(this)
    this.addBrand = this.addBrand.bind(this)
    this.removeBrand = this.removeBrand.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)

  }

  componentDidMount() {
    const { collectionShortName } = this.props.match.params
    this.setState({ short_name: collectionShortName })

    const queryObj = getQueryObj(location.search.slice(1))

    if(queryObj && queryObj.collectionName.length && queryObj.collectionDisplayName.length) {
      this.setState({name: queryObj.collectionName, display_name: queryObj.collectionDisplayName})
    }

    this.props.actions.fetchBrandsInCollection({
      collectionShortName: collectionShortName,
      data: {
        from: 0,
        size: 5
      }
    }, (response) => {
      let brandList = this.props.brandList.map((item) => {
        return {
          brand_id:item.brand_id,
          brand: item.brand_name,
          short_name: item.brand_short_name
        }
      })
  
      this.setState({selectedBrand: brandList})
    })
    
  }

  addBrand(newBrand) {

    unMountModal()
    let brandIdFound = false

    for(let i in this.state.selectedBrand) {
      if(this.state.selectedBrand[i].brand_id === newBrand.brand_id) {
        brandIdFound = true
      }
    }

    if(!brandIdFound) {
      this.setState({ selectedBrand: [...this.state.selectedBrand, newBrand] })
    }
    
    this.props.actions.addBrandToCollection({
      brand_id: newBrand.brand_id,
      short_name: this.state.short_name
    })
  }

  removeBrand(brand) {

    this.props.actions.removeBrandFromCollection({
      brand_id: brand.brand_id,
      short_name: this.state.short_name
    })

    this.setState({
      selectedBrand: this.state.selectedBrand.filter((item) => item.brand_id !== brand.brand_id)
    })

  }

  handlePageChange(pageObj) {

    const { collectionShortName } = this.props.match.params

    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset, loadingBrand: true, selectedBrand:[] })
  
    this.props.actions.fetchBrandsInCollection({
      collectionShortName: collectionShortName,
      data: {
        from: pageObj.offset,
        size: this.pagesLimit
      }
    }, () => {
      let brandList = this.props.brandList.map((item) => {
        return {
          brand_id:item.brand_id,
          brand: item.brand_name,
          short_name: item.brand_short_name
        }
      })
  
      this.setState({selectedBrand: brandList})
    })

  }

  // handleCheckboxes(e) {
  //   this.setState({ [e.target.name]: e.target.checked })
  // }

  fetchBrandList() {
    mountModal(AddBrandDialog({
      heading: 'Browse catalogue',
      addBrand: this.addBrand
    }))
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div>
        <Card
          style={{
            padding: '20px',
            paddingTop: '0',
            display: 'inline-block'
          }}
        >
          <div className="form-group">
            <label className="label">Name</label><br />
            <input style={{ marginTop: '10px' }} name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} disabled/>
          </div>

          <div className="form-group">
            <label className="label">Display name</label><br />
            <input style={{ marginTop: '10px' }} name="display_name" value={this.state.display_name} onChange={(e) => this.handleChange(e)} disabled/>
          </div>

          <div className="form-group">
            <Checkbox
              disabled={true}
              checked={true}
              onCheck={this.handleCheckboxes}
              name="is_active"
              label="is_active"
            />
          </div>
        </Card>
        <br />
        <RaisedButton style={{ marginTop: '40px' }} label="Save" primary disabled={true} />
        <RaisedButton
          style={{ marginTop: '40px', marginLeft: '20px' }}
          onClick={this.fetchBrandList}
          label="Add item"
          primary
        />

        {
          !this.props.loadingBrandsInCollection && this.state.selectedBrand.length > 0 &&
          <div style={{ width: '100%', maxWidth: 900 }}>
            <h3>Listing all brands</h3>
            <ViewBrandsInCollection
              brandList={this.state.selectedBrand}
              removeBrand={this.removeBrand}
              showDelete={true}
            ></ViewBrandsInCollection>
            <Pagination
              activePage={parseInt(this.state.activePage)}
              itemsCountPerPage={this.pagesLimit}
              totalItemsCount={this.props.brandCount}
              pageRangeDisplayed={5}
              setPage={this.handlePageChange}
            />
          </div>
        }
      </div>
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
)(EditCollection)



//export default ViewCollection
