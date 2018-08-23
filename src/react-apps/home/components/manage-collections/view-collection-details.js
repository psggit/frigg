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
    this.state = {
      shouldMountCollectionDialog: false,
      selectedBrand: [],
      is_active: false,
      name: '',
      display_name: '',
      nameErr: false,
      displayNameErr: false
    }
    this.mountCollectionDialog = this.mountCollectionDialog.bind(this)
    this.unmountCollectionDialog = this.unmountCollectionDialog.bind(this)
    this.fetchBrandList = this.fetchBrandList.bind(this)
    this.addBrand = this.addBrand.bind(this)
    this.removeBrand = this.removeBrand.bind(this),
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
  }

  mountCollectionDialog() {
    this.setState({ shouldMountCollectionDialog: true, open: true })
  }

  unmountCollectionDialog() {
    this.setState({ shouldMountCollectionDialog: false })
  }

  addBrand(newBrand) {
    unMountModal()
    let brandIdFound = false

    for (let i in this.state.selectedBrand) {
      if (this.state.selectedBrand[i].brand_id === newBrand.brand_id) {
        brandIdFound = true
      }
    }

    if (!brandIdFound) {
      this.setState({ selectedBrand: [...this.state.selectedBrand, newBrand] })
    }
  }

  removeBrand(brand) {

    this.setState({
      selectedBrand: this.state.selectedBrand.filter((item) => item.brand_id !== brand.brand_id)
    })

  }

  createCollection() {

    if(this.state.name.length && this.state.display_name.length) {
      let brandData = this.state.selectedBrand.map((item) => {
        return {
          brand_id: item.brand_id
        }
      })
      this.props.actions.createCollection({
        collection_data: {
          name: this.state.name,
          display_name: this.state.display_name,
          is_active: this.state.is_active,
        },
        brand_data: brandData
      })
    } else if(this.state.name.length === 0 && this.state.display_name.length > 0) {
      this.setState({nameErr: true})
    } else if(this.state.name.length > 0 && this.state.display_name.length === 0) {
      this.setState({displayNameErr: true})
    } else {
      this.setState({nameErr: true, displayNameErr: true})
    }
    
  }

  handleCheckboxes(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  fetchBrandList() {
    mountModal(AddBrandDialog({
      heading: 'Browse catalogue',
      //gps: '13.009625760868293,80.25397762656212',
      addBrand: this.addBrand
    }))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
            <input style={{ marginTop: '10px' }} name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
            {
              this.state.nameErr &&
              <p style={{color: '#ff3b34'}}> Name is required </p>
            }
          </div>

          <div className="form-group">
            <label className="label">Display name</label><br />
            <input style={{ marginTop: '10px' }} name="display_name" value={this.state.display_name} onChange={(e) => this.handleChange(e)} />
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
        <RaisedButton style={{ marginTop: '40px' }} onClick={() => this.createCollection()} label="Save" primary />
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



//export default ViewCollection
