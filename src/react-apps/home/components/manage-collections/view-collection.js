import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import ViewBrandsInCollection from './view-brands-in-collection'
import { getQueryObj } from '@utils/url-utils'
import RaisedButton from 'material-ui/RaisedButton'
import { NavLink } from 'react-router-dom'
import Pagination from '@components/pagination'

class ViewCollection extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      collectionShortName: '',
      activePage: 1,
      pageOffset: 0,
      brandList: [],
      loadingBrands: false
    },

    this.collectionName = '',
    this.collectionDisplayName = '',
    this.pagesLimit = 5

    this.handlePageChange = this.handlePageChange.bind(this)

  }

  componentDidMount() {

    const { collectionShortName } = this.props.match.params
    this.setState({ collectionShortName, loadingBrands: true })

    const queryObj = getQueryObj(location.search.slice(1))

    this.collectionName = queryObj.collectionName
    this.collectionDisplayName = queryObj.collectionDisplayName

    this.props.actions.fetchBrandsInCollection({
      collectionShortName: collectionShortName,
      data: {
        offset: 0,
        limit: 5
      }
    }, () => {
      let brandList = this.props.data.brandList.map((item) => {
        return {
          brand_id:item.brand_id,
          brand: item.brand_name,
          short_name: item.brand_short_name
        }
      })
      this.setState({brandList: brandList, loadingBrands: false})
    })
  }

  handlePageChange(pageObj) {

    const { collectionShortName } = this.props.match.params
    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset, brandList:[], loadingBrands:true })

    this.props.actions.fetchBrandsInCollection({
      collectionShortName: collectionShortName,
      data: {
        offset: pageObj.offset,
        limit: this.pagesLimit
      }
    }, () => {
      let brandList = this.props.data.brandList.map((item) => {
        return {
          brand_id: item.brand_id,
          brand: item.brand_name,
          short_name: item.brand_short_name
        }
      })
      this.setState({brandList: brandList, loadingBrands: false})
    })
  }

  // editCollection() {
  //   console.log("edit collection")
  // }

  render() {
    const { brandCount } = this.props.data
    const styles = {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
      display: 'flex',
      justifyContent: 'center',
      padding: '20px'
    }
    return (
      <React.Fragment>
        <div style={{ width: '100%', maxWidth: 900 }}>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h3> Collection name: {this.collectionName} </h3>
            {
              // !this.state.loadingBrands && this.state.brandList.length > 0
              // &&
              <div>

                <NavLink to={`/home/manage-collections/edit-collection/${this.state.collectionShortName}?collectionName=${this.collectionName}&collectionDisplayName=${this.collectionDisplayName}`}>
                  <RaisedButton
                    label="EDIT"
                    primary
                  // onClick={() => this.editCollection()}
                  />
                </NavLink>

              </div>
            }
          </div>
          <ViewBrandsInCollection
            brandList={this.state.brandList}
            showDelete={false}
            loadingBrandsInCollection={this.state.loadingBrands}
          />
          {
            !this.state.loadingBrands && this.state.brandList.length > 0
            &&
            <React.Fragment>
              <Pagination
                activePage={parseInt(this.state.activePage)}
                itemsCountPerPage={this.pagesLimit}
                totalItemsCount={brandCount}
                pageRangeDisplayed={5}
                setPage={this.handlePageChange}
              />
            </React.Fragment>
          }
          {/* {
            !this.state.loadingBrands && this.state.brandList.length === 0
            &&
            <div style={styles}> No brands found in the collection </div>
          } */}
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    data: state.main
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCollection)
