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

class ViewCollection extends React.Component {
  constructor() {
    super()

    this.inputNameMap = {
      displayName: 'DisplayName',
      name: 'Name'
    }

    this.state = {
      //shouldMountCollectionDialog: false,
      selectedBrand: [],
      is_active: false,
      name: '',
      displayName: '',
      nameErr: false,
      displayNameErr: false
    }
    this.brandList = []
    // this.mountCollectionDialog = this.mountCollectionDialog.bind(this)
    // this.unmountCollectionDialog = this.unmountCollectionDialog.bind(this)
    this.fetchBrandList = this.fetchBrandList.bind(this)
    this.removeBrand = this.removeBrand.bind(this),
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.addBrandToList = this.addBrandToList.bind(this)
    this.unMountBrandListModal = this.unMountBrandListModal.bind(this)
    this.updateListingOrder = this.updateListingOrder.bind(this)
  }

  // mountCollectionDialog() {
  //   this.setState({ shouldMountCollectionDialog: true, open: true })
  // }

  // unmountCollectionDialog() {
  //   this.setState({ shouldMountCollectionDialog: false })
  // }

  //removes duplaicates from array of object using property
  removeDuplicates(array, property) {
    return array.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[property]).indexOf(obj[property]) === pos
    })
  }

  addBrandToList(brandList) {
    unMountModal()
    this.setState({selectedBrand: this.removeDuplicates([...this.state.selectedBrand, ...brandList], "brand_id") })
  }

  unMountBrandListModal() {
    unMountModal()
  }

  removeBrand(brand) {

    this.setState({
      selectedBrand: this.state.selectedBrand.filter((item) => item.brand_id !== brand.brand_id)
    })

  }

  validateName(name) {
    if(name.length) {
      return false
    }
    return true
  }

  validateDisplayName(displayName) {
    if(displayName.length) {
      return false
    }
    return true
  }

  createCollection() {
    if(this.state.name.length && this.state.displayName.length) {
      // console.log("create collection", this.state.selectedBrand)
      let brandData = this.state.selectedBrand.map((item) => {
        return {
          brand_id: item.brand_id,
          listing_order: item.orderListNo
        }
      })
      this.props.actions.createCollection({
        collection_data: {
          name: this.state.name,
          display_name: this.state.displayName,
          is_active: this.state.is_active,
        },
        brand_data: brandData
      })
    } else {
      this.setState({nameErr: this.validateName(this.state.name)})
      this.setState({displayNameErr: this.validateDisplayName(this.state.displayName)})
    }
    this.brandList = []
    
  }

  handleCheckboxes(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  fetchBrandList() {
    mountModal(AddBrandDialog({
      heading: 'Browse catalogue',
      multiSelect: true,
      unMountModal: this.unMountBrandListModal,
      addBrandToList: this.addBrandToList,
      brandCount: this.state.selectedBrand.length
    }))
  }

  handleChange(e) {
    const errName = `${e.target.name}Err`
    const fnExp = eval(`this.validate${this.inputNameMap[e.target.name]}`)
    this.setState({
      [e.target.name]: e.target.value,
      [errName]: fnExp(e.target.value)
    })
  }

  updateListingOrder(brandToUpdate) {
    let state = Object.assign({}, this.state)
    let selectedBrand = state.selectedBrand.map((item) => {
      if(item.brand_id === brandToUpdate.brand_id) {
        item.orderListNo = brandToUpdate.listing_order
      }
      return item
    })
    this.setState({selectedBrand})
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
            <input style={{ marginTop: '10px' }} 
              name="name" 
              value={this.state.name} 
              onChange={(e) => this.handleChange(e)} 
            />
            {
              this.state.nameErr &&
              <p style={{color: '#ff3b34'}}> Name is required </p>
            }
          </div>

          <div className="form-group">
            <label className="label">Display name</label><br />
            <input 
              style={{ marginTop: '10px' }} 
              name="displayName" 
              value={this.state.displayName} 
              onChange={(e) => this.handleChange(e)} 
            />
            {
              this.state.displayNameErr &&
              <p style={{color: '#ff3b34'}}> Display name is required </p>
            }
          </div>

          <div className="form-group">
            <Checkbox
              disabled={false}
              checked={this.state.is_active}
              onCheck={this.handleCheckboxes}
              name="is_active"
              label="is_active"
            />
          </div>
        </Card>
        <br />
        <RaisedButton 
          style={{ marginTop: '40px' }} 
          onClick={() => this.createCollection()} 
          label="Save" 
          primary 
        />
        <RaisedButton
          style={{ marginTop: '40px', marginLeft: '20px' }}
          onClick={this.fetchBrandList}
          label="Add item"
          primary
        />
        {
          this.state.selectedBrand.length > 0 &&
          <div style={{ width: '100%', maxWidth: 900 }}>
            <h3>Listing all brands</h3>
            <ViewBrandsInCollection
              brandList={this.state.selectedBrand}
              removeBrand={this.removeBrand}
              showDelete={true}
              loadingBrandsInCollection={false}
              updateListingOrder = {this.updateListingOrder}
              isUpdatingListingOrder= {this.props.updatingListingOrder}
            ></ViewBrandsInCollection>
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
)(ViewCollection)
