import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import ViewBrandsInCollection from './view-brands-in-collection'
import { GET, POST } from '@utils/fetch'
import { getQueryObj } from '@utils/url-utils'
import RaisedButton from 'material-ui/RaisedButton'
import { NavLink } from 'react-router-dom'

import Pagination from '@components/pagination'

import ViewCollectionList from './view-collection-list'

class ViewCollection extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      collectionShortName: '',
      // loadingBrand: false,
      activePage: 1,
      pageOffset: 0
    },
      // this.brandList = [],
      this.collectionName = '',
      this.collectionDisplayName = '',
      // this.brandCount = 0,
      this.pagesLimit = 5
  }

  componentDidMount() {

    const { collectionShortName } = this.props.match.params
    this.setState({ collectionShortName, loadingBrand: true })

    const queryObj = getQueryObj(location.search.slice(1))

    this.collectionName = queryObj.collectionName
    this.collectionDisplayName = queryObj.collectionDisplayName

    // this.props.actions.getSpecificCollections({
    //   from: 0,
    //   size: 10
    // })
    //console.log("collection name", collectionName);
    this.props.actions.fetchBrandsInCollection({
      collectionShortName: collectionShortName,
      data: {
        from: 0,
        size: 9
      }
    })
    // POST({
    //   api: `/bucket/browse/list/${collectionShortName}`,
    //   handleError: true,
    //   apiBase: 'catman',
    //   data: {
    //     from: 0,
    //     size: 9
    //   }
    // })
    //   .then(json => {
    //     console.log("json", json)
    //     this.brandList = json.bucket
    //     this.brandCount = json.count
    //     this.setState({ loadingBrand: false })
    //   })
  }

  handlePageChange(pageObj) {

    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset, loadingBrand: true })

    // this.props.actions.fetchCollections({
    //   offset: pageObj.offset,
    //   limit: this.pagesLimit,
    //   // from: this.state.fromDate,
    //   // to: this.state.toDate
    // })
    // POST({
    //   api: `/bucket/browse/list/${collectionShortName}`,
    //   handleError: true,
    //   apiBase: 'catman',
    //   data: {
    //     from: pageObj.offset,
    //     size: this.pagesLimit
    //   }
    // })
    //   .then(json => {
    //     console.log("json", json)
    //     this.brandList = json.bucket.map((item) => {
    //       return item
    //     })
    //     this.brandCount = json.count
    //     this.setState({ loadingBrand: false })
    //   })
    this.props.actions.fetchBrandsInCollection({
      collectionShortName: collectionShortName,
      data: {
        from: pageObj.offset,
        size: this.pagesLimit
      }
    })

  }
  
  editCollection() {
    console.log("edit collection")
  }

  render() {
    let {loadingBrandsInCollection, brandList, brandCount} = this.props.data
    //console.log("view collection", loadingBrandsInCollection, brandList, brandCount)
    console.log("view collection", loadingBrandsInCollection, brandList, brandCount)
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
            {/* <div>
              <NavLink to={`${location.pathname}/create-new`}>
                <RaisedButton
                  label="Create new collection"
                  primary
                  onClick={this.mountCreateStateDialog}
                />
              </NavLink>

            </div> */}

            <h3> Collection name: {this.collectionName} </h3>

            <div>
           
              <NavLink to={`/home/manage-collections/edit-collection/${this.state.collectionShortName}?collectionName=${this.collectionName}&collectionDisplayName=${this.collectionDisplayName}`}>
                <RaisedButton
                  label="EDIT"
                  primary
                  // onClick={() => this.editCollection()}
                />
              </NavLink>

            </div>
          </div>

          {/* <ViewCollectionList
            loadingAllCollections={loadingAllCollections}
            collectionsList={collectionsList}
          /> */}

          {
            !loadingBrandsInCollection && brandList.length > 0
              ?
              <React.Fragment>
                <ViewBrandsInCollection
                  brandList={brandList}
                />
                <Pagination
                  activePage={parseInt(this.state.activePage)}
                  itemsCountPerPage={this.pagesLimit}
                  totalItemsCount={brandCount}
                  pageRangeDisplayed={5}
                  setPage={this.handlePageChange}
                />
              </React.Fragment>
              : <div> No brands found </div>
          }
        </div>
      </React.Fragment>
    )
  }

  //   constructor(props) {

  //     super(props)
  //     // const today = new Date()
  //     // today.setUTCHours(0, 0, 0, 0)
  //     // const tommorrow = new Date(today.getTime())
  //     // tommorrow.setDate(tommorrow.getDate() + 1)
  //     // tommorrow.setUTCHours(0, 0, 0, 0)
  //     this.pagesLimit = 5
  //     this.state = {
  //       activePage: 1,
  //       pageOffset: 0,
  //       // fromDate: today.toISOString(),
  //       // toDate: tommorrow.toISOString(),
  //       // dateChanged: false
  //     }
  //     this.handlePageChange = this.handlePageChange.bind(this)
  //     // this.setDate = this.setDate.bind(this)
  //     // this.handleClearDate = this.handleClearDate.bind(this)

  //     // this.handleChooseDate = this.handleChooseDate.bind(this)
  //   }

  //   componentDidMount() {
  //     // const { fromDate, toDate } = this.state
  //     this.props.actions.fetchCollections({
  //       limit: this.pagesLimit,
  //       offset: 0,
  //       // from: fromDate,
  //       // to: toDate
  //     })
  //   }

  //   // handleChooseDate() {
  //   //   mountModal(DatePicker({
  //   //     setDate: this.setDate
  //   //   }))
  //   // }

  //   handlePageChange(pageObj) {

  //     let pageNumber = pageObj.activePage
  //     let offset = this.pagesLimit * (pageNumber - 1)
  //     this.setState({ activePage: pageNumber, pageOffset: offset })

  //     this.props.actions.fetchCollections({
  //       offset: pageObj.offset,
  //       limit: this.pagesLimit,
  //       // from: this.state.fromDate,
  //       // to: this.state.toDate
  //     })

  //   }

  //   // setDate(fromDate, toDate) {
  //   //   this.setState({
  //   //     fromDate,
  //   //     toDate,
  //   //     dateChanged: true
  //   //   })
  //   //   this.props.actions.fetchCredits({
  //   //     limit: this.pagesLimit,
  //   //     offset: 0,
  //   //     from: fromDate,
  //   //     to: toDate
  //   //   })
  //   // }

  //   // handleClearDate() {
  //   //   const today = new Date()
  //   //   today.setUTCHours(0, 0, 0, 0)
  //   //   const tommorrow = new Date(today.getTime())
  //   //   tommorrow.setDate(tommorrow.getDate() + 1)
  //   //   tommorrow.setUTCHours(0, 0, 0, 0)

  //   //   this.setState({
  //   //     fromDate: today,
  //   //     toDate: tommorrow,
  //   //     dateChanged: false
  //   //   })

  //   //   this.props.actions.fetchCredits({
  //   //     limit: this.pagesLimit,
  //   //     offset: 0,
  //   //     from: today,
  //   //     to: tommorrow
  //   //   })
  //   // }

  //   render() {
  //     const { activePage } = this.state
  //     const {
  //       loadingAllCollections,
  //       collectionsList,
  //       collectionsCount
  //     } = this.props.data

  //     return(
  //       <React.Fragment>
  //         <div style={{ width: '100%', maxWidth: 900 }}>
  //           <ViewCollectionList
  //             loadingAllCollections={loadingAllCollections}
  //             collectionsList={collectionsList}
  //           />
  //           {
  //             !loadingAllCollections 
  //             ? 
  //               <React.Fragment>
  //                 <Pagination
  //                   activePage={parseInt(activePage)}
  //                   itemsCountPerPage={this.pagesLimit}
  //                   totalItemsCount={collectionsCount}
  //                   pageRangeDisplayed={5}
  //                   setPage={this.handlePageChange}
  //                 />
  //               </React.Fragment>
  //             : ''
  //           }
  //         </div>
  //       </React.Fragment>
  //     )
  //   }
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

// //export default ViewCredits