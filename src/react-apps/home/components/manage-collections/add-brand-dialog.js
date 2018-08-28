
import React, { Fragment } from 'react'
//import { unMountModal } from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { GET, POST } from '@utils/fetch'
import Search from '@components/SearchInput'
import '@sass/OrdersPage/ShowNotified.scss'
import '@sass/components/_spinner.scss'
import {getIcon} from '@components/utils'

// class ListItem extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       brand: this.props.brand,
//       brand_id: this.props.brand_id,
//       short_name: this.props.short_name,
//       brandCheck: false,
//       orderListNo: 0
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSetBrandListingOrder = this.handleSetBrandListingOrder.bind(this)
//   }

//   handleChange(e) {
//     const targetValue = e.target
//     this.setState({
//       [e.target.name]: e.target.checked,
//       orderListNo : this.props.list_no + 1
//     }, () => {
//       this.props.handleBrandChange ({
//         brandChecked: targetValue.checked,
//         brand_id: this.props.brand_id,
//         brand: this.props.brand,
//         short_name: this.props.short_name,
//         orderListNo: this.state.orderListNo
//       })
//     })
//     // this.props.handleBrandChange({brandChecked: e.target.checked, brand_id: this.props.brand_id, brand: this.props.brand, short_name: this.props.short_name, orderListNo: this.props.list_no + 1})
//   }

//   handleSetBrandListingOrder(e) {
//     this.setState({orderListNo: e.target.value})
//     this.props.updateBrandListingOrder({orderListNo: e.target.value, brand_id: this.props.brand_id})
//   }

//   render() {
//     return(
//       <React.Fragment>
//         <td>
//             <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//               <input
//                 id={this.props.brand_id}
//                 style={{ width: '30px', cursor: 'pointer', marginRight: '20px', height: 'auto' }}
//                 name="brandCheck"
//                 type="checkbox"
//                 checked={this.state.brandCheck}
//                 value={this.props.brand_id}
//                 onChange={(e) => this.handleChange(e)}
//               />
//               <label style={{cursor: 'pointer'}} for={this.props.brand_id} >{this.props.brand}</label>
//             </div>
//         </td>
//         {/* <td>
//           <input
//             type="number"
//             onChange={(e) => { this.handleSetBrandListingOrder(e) }}
//             value={this.state.orderListNo}
//             style={{width: '50px'}}
//             //disabled={!(this.props.brandList.indexOf(this.props.brand_id) > -1)}
//             disabled={!this.state.brandCheck}
//           />
//         </td> */}
//       </React.Fragment>
//     )
//   }
// }

export default function AddBrandDialog(data) {
  return class AddBrandDialog extends React.Component {
    constructor() {
      super()
      this.shortNamesMap = {}
      this.skus = []
      this.state = {
        genre: 'Beer',
        genreShortName: 'beer',
        isAccordianOpen: false,
        activeAccordian: -1,
        loadingGenres: true,
        loadingBrands: true,
        loadingSKU: true,
        searchQuery: '',
        citiesData: [],
        cityId: '',
        //brandCheck: false,
        //brandList: [],
        brandMap: {},
        //orderListNo: 0
      }

      this.selectedBrandList = []
      this.handleChange = this.handleChange.bind(this)
      this.setActiveAccordian = this.setActiveAccordian.bind(this)
      this.listGenres = this.listGenres.bind(this)
      this.listBrandsUsingGenre = this.listBrandsUsingGenre.bind(this)
      // this.listSKUUsingBrand = this.listSKUUsingBrand.bind(this)
      this.searchBrands = this.searchBrands.bind(this)
      this.setSearchQuery = this.setSearchQuery.bind(this)
      this.handleCityChange = this.handleCityChange.bind(this)
      //this.handleBrandChange = this.handleBrandChange.bind(this)
      this.addBrandToLocalList = this.addBrandToLocalList.bind(this)
      this.addBrandToExistingList = this.addBrandToExistingList.bind(this)
      this.updateBrandListingOrder = this.updateBrandListingOrder.bind(this)
      //this.handleChangeInOrderListNumber = this.handleChangeInOrderListNumber.bind(this)
    }

    componentDidMount() {
      this.fetchCities()
    }

    fetchCities() {

      POST({
        api: `/cityManagement/listCities`,
        handleError: true,
        apiBase: 'odin',
        data: {
          state_short_name: null,
          is_available: null,
          offset: 0,
          limit: 50,
          deliverable_city: null,
          no_filter: true
        }
      })
        .then(json => {
          this.setState({ citiesData: json.cities })
        })
    }

    setActiveAccordian(i, genreShortName, brandName) {
      if (this.state.activeAccordian === i) {
        this.setState({
          isAccordianOpen: false,
          activeAccordian: -1
        })
      } else {
        this.setState({
          activeAccordian: i,
          isAccordianOpen: true,
          loadingSKU: true
        })
        //this.listSKUUsingBrand(genreShortName, brandName)
      }
    }

    listBrandsUsingGenre(genre, cityId) {
      POST({
        api: `/support/browse/bucket/genre/${genre}`,
        handleError: true,
        apiBase: 'catman',
        data: {
          from: 0,
          size: 9999,
          city_id: parseInt(cityId),
        }
      })
        .then(json => {
          let brandMap = {}
          this.brands = json.map(item => {
            brandMap[item.brand_id] = {
              id: item.brand_id,
              brand: item.brand_name,
              shortName: item.brand_short_name,
              genreShortName: item.genre_short_name,
              orderListNo: 0
            }
            return {
              id: item.brand_id,
              brand: item.brand_name,
              shortName: item.brand_short_name,
              genreShortName: item.genre_short_name
            }
          })
          console.log("brandlist", brandMap)
          this.setState({ brandMap, loadingBrands: false })
        })
    }

    listGenres(cityId) {
      POST({
        api: '/support/browse/bucket/stores',
        handleError: true,
        apiBase: 'catman',
        data: {
          city_id: parseInt(cityId),
        }
      })
        .then(json => {
          this.genres = json.data.map(item => {
            this.shortNamesMap[item.genre_name] = item.short_name
            return {
              id: item.id,
              genre: item.genre_name
            }
          })
          this.setState({ loadingGenres: false })
        })
    }

    searchBrands(searchText) {
      this.setState({ loadingBrands: true, isAccordianOpen: false, activeAccordian: -1 })
      if (searchText.length) {
        POST({
          api: '/consumer/browse/search',
          handleError: true,
          apiBase: 'blogicUrl',
          data: {
            searchText,
            km: '40km',
            id: this.state.cityId,
            is_featured: false,
            stateName: 'TN'
          }
        })
          .then(json => {
            this.brands = json.brands.map(item => {
              return {
                id: item.id,
                brand: item.brand_name,
                shortName: item.short_name,
                genreShortName: item.category.genre_short.short_name
              }
            })
            this.setState({ loadingBrands: false })
          })
      } else {
        this.listBrandsUsingGenre(this.state.genreShortName, this.state.cityId)
      }
    }

    addBrandToExistingList(newBrand) {
        //this.setState({orderNo: data.brandCount + 1})
        data.addBrand(newBrand)
    }

    updateBrandListingOrder(newOrderNo) {

      let updateActiveBrandList = Object.assign({}, this.state.brandMap)

      return this.selectedBrandList.map((item) => {
        updateActiveBrandList[newOrderNo.brand_id].orderListNo = item.orderListNo + 1  
        this.setState({brandMap: updateActiveBrandList})

        if(item.brand_id === newOrderNo.brand_id) {
          item.orderListNo = parseInt(newOrderNo.orderListNo)
        }
        return item
      })
    }

    // getAllActiveBrandList() {
    //   this.selectedBrandList = this.state.activeBrandList.filter((item) => {
    //     if(item.orderListNo > 0) {
    //       return item
    //     }
    //   })

    //   console.log("selcted list", this.selectedBrandList)
    // }

    handleChange(e) {
      const genreShortName = this.shortNamesMap[e.target.value]
      this.setState({ genre: e.target.value, genreShortName, loadingBrands: true })
      this.listBrandsUsingGenre(genreShortName, this.state.cityId)
    }

    setSearchQuery(searchQuery) {
      this.setState({ searchQuery })
    }

    handleCityChange(e) {
      this.setState({ cityId: e.target.value })
      this.listGenres(e.target.value)
      this.listBrandsUsingGenre('beer', e.target.value)
    }

    // handleBrandChange(brand) {
    //   // const { brandCheck} = this.state
    //   // this.setState({brandCheck: !brandCheck})
    //   this.addBrandToLocalList(brand)
    // }

    addBrandToLocalList(newBrand) {
      //console.log("add brand to local", newBrand)
      if(newBrand.brandChecked) {
        this.selectedBrandList.push(newBrand)
      } else {
        this.selectedBrandList = this.selectedBrandList.filter((item) => item.brand_id !== newBrand.brand_id)
      }
    }

    // handleChangeInOrderListNumber(e) {
    //   this.setState({orderNo: e.target.value})
    // }

    handleChangeInBrandList(newBrand) {

      const targetElement = newBrand.event.target
      let updateActiveBrandList = Object.assign({}, this.state.brandMap)
     
      updateActiveBrandList[newBrand.brand_id].orderListNo = newBrand.list_no + 1  
     
      console.log("list", updateActiveBrandList)
      
      this.setState({brandMap: updateActiveBrandList},
      () => {
        //this.getAllActiveBrandList()
        this.addBrandToLocalList ({
          brandChecked:  targetElement.checked,
          brand_id: newBrand.brand_id,
          brand: newBrand.brand,
          short_name: newBrand.short_name,
          orderListNo: newBrand.list_no + 1
        })
      })
    }

    render() {
      return (
        <React.Fragment>
          <ModalBox maxHeight="80vh">
            <ModalHeader>
              <div style={{display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                <div> Browse Catalogue </div>
                <div onClick={data.unMountModal}>{getIcon('cross')} </div>
              </div>
            </ModalHeader>
            {
              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #f6f6f6' }}>
                <h3>Choose city to list genre</h3>

                <select
                  style={{ marginRight: '20px', marginBottom: '20px', height: '46px', fontSize: '16px', width: '50%'}}
                  value={this.state.cityId}
                  onChange={this.handleCityChange}
                >
                  {
                    this.state.citiesData.length > 0 &&
                    this.state.citiesData.map(item => (
                      <option
                        key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  }
                </select>
              </div>
            }
            <div style={{ display: 'flex', margin: '20px 0' }}>
              {
                !this.state.loadingGenres &&
                <Fragment>
                  <select
                    style={{ marginRight: '20px', height: '46px', fontSize: '16px' }}
                    value={this.state.genre}
                    onChange={this.handleChange}
                  >
                    {
                      this.genres.map(item => (
                        <option
                          key={item.id}>
                          {item.genre}
                        </option>
                      ))
                    }
                  </select>
                  <Search
                    placeholder='Search for brands..'
                    search={this.searchBrands}
                    setSearchQuery={this.setSearchQuery}
                    searchQuery={this.state.searchQuery}
                  />
                </Fragment>
              }
            </div>
            <ModalBody maxHeight='400px'>
              {
                !this.state.loadingGenres && !this.state.loadingBrands &&
                <table className='table--hovered'>
                  <thead>
                    {
                      data.multiSelect &&
                      <tr>
                        <td>Brand name</td>
                        <td>Listing order</td>
                      </tr>
                    }
                    {
                      !data.multiSelect &&
                      <tr>
                        <td>Brand name</td>
                        {/* <td>Listing order</td> */}
                        <td></td>
                      </tr>
                    }
                  </thead>
                  <tbody>

                    {
                      data.multiSelect &&
                      this.brands.map((item, i) => {
                        return <Fragment key={item.id}>
                          <tr
                            onClick={() => { this.setActiveAccordian(i, item.genreShortName, item.shortName) }}
                            style={{ cursor: 'pointer' }} key={item.id}
                          >
                            {/* <ListItem
                              brand={item.brand}
                              brand_id={item.id}
                              short_name={item.shortName}
                              handleBrandChange={this.handleBrandChange}
                              list_no={this.brandList.length + data.brandCount}
                              updateBrandListingOrder={this.updateBrandListingOrder}
                            /> */}
                             <td>
                                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                  <input
                                    id={item.id}
                                    style={{ width: '30px', cursor: 'pointer', marginRight: '20px', height: 'auto' }}
                                    name="brandCheck"
                                    type="checkbox"
                                    // checked={
                                    //   this.state.updateActiveBrandList.length && this.state.updateActiveBrandList[item.id]
                                    //   ? this.state.updateActiveBrandList[item.id].checked
                                    //   : false
                                    // }
                                    value={item.id}
                                    onChange={(e) => this.handleChangeInBrandList({event:e, brand: item.brand, brand_id: item.id, short_name: item.shortName,list_no: this.selectedBrandList.length + data.brandCount})}
                                  />
                                  <label style={{cursor: 'pointer'}} for={item.id} >{item.brand}</label>
                                </div>
                            </td>
                            <td>
                              <input
                                type="number"
                                onChange={(e) => this.updateBrandListingOrder({ orderListNo: e.target.value, brand_id: item.id}) }
                                //value={Object.keys(this.state.activeBrandList).length ? this.state.activeBrandList[item.id] : 0}
                                // value={
                                //   Object.keys(this.state.activeBrandList).length
                                //   ? (
                                //     this.state.activeBrandList[item.id] && this.state.activeBrandList[item.id].length
                                //     ? this.state.activeBrandList[item.id][0].orderListNo
                                //     : this.state.orderListNo
                                //   )
                                //   : this.state.orderListNo
                                // }
                                style={{width: '100px'}}
                                disabled={
                                  // Object.keys(this.state.activeBrandList).length
                                  //? 
                                  this.state.brandMap[item.id].orderListNo === 0
                                  //? this.state.activeBrandList[item.id] && this.state.activeBrandList[item.id].length == 0
                                  //: true
                                }
                                value = {this.state.brandMap[item.id].orderListNo}
                                //disabled = {}
                                
                                //disabled={!this.state.brandCheck}
                              />
                            </td>
                          </tr>
                        </Fragment>
                      })
                    }
                    {
                      !data.multiSelect &&
                      this.brands.map((item, i) => {
                        return <Fragment key={item.id}>
                          <tr
                            onClick={() => { this.setActiveAccordian(i, item.genreShortName, item.shortName) }}
                            style={{ cursor: 'pointer' }} key={item.id}
                          >
                            <td>{item.brand}</td>
                            {/* <td><input type="number" value={this.state.orderNo} style={{width: '50px'}} onChange={(e) => this.handleChangeInOrderListNumber(e)} /></td> */}
                            <td>
                              <button
                                onClick={() => { this.addBrandToExistingList({ brand_id: item.id, brand: item.brand, short_name: item.shortName, orderListNo: data.brandCount + 1 }) }}
                                style={{
                                  padding: '2px 20px'
                                }}
                              >
                                  add
                              </button>
                            </td>
                          </tr>
                        </Fragment>
                      })
                    }
                  </tbody>
                </table>
              }
            </ModalBody>
            <ModalFooter>
            {
              data.multiSelect &&  !this.state.loadingGenres && !this.state.loadingBrands &&
              <button style={{padding: '10px 20px', fontSize: '13px', cursor: 'pointer'}} onClick={() => data.addBrandToList(this.selectedBrandList)}>ADD BRANDS</button>
            }
            {
              !data.multiSelect &&
              <button style={{padding: '10px 20px', fontSize: '13px', cursor: 'pointer'}} onClick={data.unMountModal}>CLOSE</button>
            }
            </ModalFooter>
          </ModalBox>

        </React.Fragment>
      )
    }
  }
}
