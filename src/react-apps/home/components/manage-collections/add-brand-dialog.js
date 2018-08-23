
import React, { Fragment } from 'react'
import { unMountModal } from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { GET, POST } from '@utils/fetch'
import Search from '@components/SearchInput'
import '@sass/OrdersPage/ShowNotified.scss'
import '@sass/components/_spinner.scss'
import {getIcon} from './../../../../utils/icons-utils'


class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brand: this.props.brand, 
      brand_id: this.props.brand_id, 
      short_name: this.props.short_name, 
      brandCheck: false,
     
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {

    const target = event.target;
    const name = target.name;
    const value = target.checked
  
    this.setState({
      [name]: value
    });

    this.props.handleBrandChange({brandChecked: value, brand_id: this.props.brand_id, brand: this.props.brand, short_name: this.props.short_name})
  }

  render() {
    return(
      <td>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input id={this.props.brand_id} style={{ width: '30px', cursor: 'pointer', marginRight: '20px' }} name="brandCheck" type="checkbox" checked={this.state.brandCheck} value={this.props.brand_id}  onChange={(e) => this.handleChange(e)} />
          <label style={{cursor: 'pointer'}} for={this.props.brand_id} >{this.props.brand}</label>
        </div> 
      </td>
    )
  }
}

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
        brandCheck: false
      }

      this.selectedBrand = []
      this.handleChange = this.handleChange.bind(this)
      this.setActiveAccordian = this.setActiveAccordian.bind(this)
      this.listGenres = this.listGenres.bind(this)
      this.listBrandsUsingGenre = this.listBrandsUsingGenre.bind(this)
      // this.listSKUUsingBrand = this.listSKUUsingBrand.bind(this)
      this.searchBrands = this.searchBrands.bind(this)
      this.setSearchQuery = this.setSearchQuery.bind(this)
      this.handleCityChange = this.handleCityChange.bind(this)
      this.handleBrandChange = this.handleBrandChange.bind(this)
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
          this.brands = json.map(item => {
            return {
              id: item.brand_id,
              brand: item.brand_name,
              shortName: item.brand_short_name,
              genreShortName: item.genre_short_name
            }
          })
          this.setState({ loadingBrands: false })
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

    handleBrandChange(brand) {
      const { brandCheck } = this.state
      this.setState({brandCheck: !brandCheck})
      data.addBrand(brand)
    }

    render() {
      return (
        <React.Fragment>
          <ModalBox maxHeight="80vh">
            <ModalHeader>
              <div style={{display: 'flex'}}>
                <div> Browse Catalogue </div>
                <div>{getIcon('cross')} </div>
              </div>
            </ModalHeader>
            {
              <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #f6f6f6' }}>
                <h3>Choose city to list genre</h3>

                <select
                  style={{ marginRight: '20px', marginBottom: '20px', height: '46px', fontSize: '16px', width: '50%' }}
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
            <ModalBody height='560px'>
              {
                !this.state.loadingGenres && !this.state.loadingBrands &&
                <table className='table--hovered'>
                  <thead>
                    <tr>
                      <td>Brand name</td>
                      <td></td>
                    </tr>
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
                            {/* <td>
                              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input id={item.id} style={{ width: '0px', cursor: 'pointer', marginRight: '20px' }} name="brandCheck" type="checkbox" name={item.id} value={item.id}  onChange={(e) => this.handleBrandChange({ event: e, brand_id: item.id, brand: item.brand, short_name: item.shortName})} />
                                <label style={{cursor: 'pointer'}} for={item.id} >{item.brand}</label>
                              </div>
                            </td> */}
                            <ListItem brand={item.brand} brand_id={item.id} short_name={item.shortName} handleBrandChange={this.handleBrandChange} />
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
                            <td>
                              <button
                                onClick={() => { data.addBrand({ brand_id: item.id, brand: item.brand, short_name: item.shortName }) }}
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
              data.multiSelect &&
              <button className='btn btn-primary' onClick={data.unMountModal}>ADD BRAND</button>
            }
            {
              !data.multiSelect &&
              <button className='btn btn-primary' onClick={data.unMountModal}>CLOSE</button>
            }
            </ModalFooter>
          </ModalBox>

        </React.Fragment>
      )
    }
  }
}
