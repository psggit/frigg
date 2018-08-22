// import React from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
// import Pagination from '@components/pagination'
// import '@sass/components/_pagination.scss'
// import * as Actions from './../actions'
import getIcon from './../components/icon-utils'
import FilterModal from '@components/filter-modal'
import { getQueryObj, getQueryUri } from '@utils/url-utils'
import Checkbox from 'material-ui/Checkbox'
import '@sass/components/_form.scss'
import { NavLink } from 'react-router-dom'

// import * as Roles from './../constants/roles'

// class ManageCollections extends React.Component {
//   constructor(props) {
//     super(props)
//     this.filter = {
//       stateShortName: null,
//       isLocalityAvailable: false,
//       stateName: null,
//       cityId: null
//     }
//     this.state = {
//       shouldMountFilterDialog: false,
//       shouldMountViewFencesDialog: false,
//       stateIdx: null,
//       cityIdx: null,
//       activePage: 1,
//       isLocalityAvailable: false
//     }

//     this.mountFilterDialog = this.mountFilterDialog.bind(this)
//     this.unmountFilterModal = this.unmountFilterModal.bind(this)
//     this.handleStateChange = this.handleStateChange.bind(this)
//     this.handleCityChange = this.handleCityChange.bind(this)
//     this.setQueryParamas = this.setQueryParamas.bind(this)
//     this.fetchData = this.fetchData.bind(this)
//     this.setPage = this.setPage.bind(this)
//     this.applyFilter = this.applyFilter.bind(this)
//     this.handleChangeIsLocalityAvailable = this.handleChangeIsLocalityAvailable.bind(this)
//     this.mountViewFencesDialog = this.mountViewFencesDialog.bind(this)
//     this.unmountViewFencesDialog = this.unmountViewFencesDialog.bind(this)
//   }

//   componentDidMount() {
//     console.log('mounting manage localities');
//     this.fetchData()
//     window.onpopstate = this.fetchData
//   }

//   componentWillUnmount() {
//     console.log('unmounting manage localities');
//     window.onpopstate = () => { }
//   }

//   unmountViewFencesDialog() {
//     this.setState({ shouldMountViewFencesDialog: false })
//   }

//   mountViewFencesDialog() {
//     this.setState({ shouldMountViewFencesDialog: true })
//   }

//   fetchData() {
//     this.props.actions.setLoadingState()
//     // this.props.actions.setLoadingState('loadingGeoboundary')

//     this.props.actions.fetchStates()

//     if (location.search.length) {
//       // if query string exists then apply filters
//       this.setQueryParamas()
//     } else {
//       // if there is no query string then fetch defult citiesData/all citiesData
//       this.props.actions.fetchImageAds({
//         city_id: null,
//         offset: 0,
//         limit: 10
//       })
//       this.setState({ stateIdx: 0 })
//     }
//   }

//   setQueryParamas() {
//     const queryUri = location.search.slice(1)
//     const queryObj = getQueryObj(queryUri)
//     Object.entries(queryObj).forEach((item) => {
//       this.setState({ [item[0]]: item[1] })
//       this.filter[item[0]] = item[1]
//     })

//     this.props.actions.fetchImageAds({
//       city_id: parseInt(queryObj.cityId) || null,
//       offset: parseInt(queryObj.offset),
//       limit: 10
//     })
//   }

//   setPage(pageObj) {
//     const queryUri = location.search.slice(1)
//     const queryObj = getQueryObj(queryUri)
//     const { statesData } = this.props

//     this.setState(pageObj)
//     this.props.actions.fetchImageAds({
//       city_id: parseInt(queryObj.cityId) || null,
//       offset: pageObj.offset,
//       limit: 10
//     })

//     queryObj.activePage = pageObj.activePage
//     queryObj.offset = pageObj.offset
//     history.pushState(queryObj, "city listing", `/home/manage-collections?${getQueryUri(queryObj)}`)
//   }

//   mountFilterDialog() {
//     this.setState({ shouldMountFilterDialog: true })
//   }

//   unmountFilterModal() {
//     this.setState({ shouldMountFilterDialog: false })
//   }

//   handleCityChange(e, k) {
//     const { citiesData } = this.props
//     const cityIdx = k + 1
//     this.setState({ cityIdx })
//     this.filter.cityId = citiesData[k].id
//     this.filter.cityName = citiesData[k].name
//   }

//   handleStateChange(e, k) {
//     const { statesData } = this.props
//     const stateIdx = k + 1
//     this.setState({ stateIdx, cityIdx: null })


//     this.filter.stateShortName = statesData[k].short_name
//     this.filter.stateName = statesData[k].state_name

//     this.props.actions.fetchCities({
//       state_short_name: statesData[k].short_name,
//       is_available: false,
//       offset: 0,
//       limit: 999999,
//       deliverable_city: true,
//       no_filter: false
//     })
//   }

//   handleChangeIsLocalityAvailable(e) {
//     this.setState({ isLocalityAvailable: e.target.checked })
//     // this.filter.isCityAvailable = e.target.checked
//   }

//   applyFilter() {
//     const { statesData } = this.props
//     console.log(this.filter);
//     const queryObj = {
//       stateIdx: this.state.stateIdx,
//       stateShortName: this.filter.stateShortName,
//       cityId: this.filter.cityId,
//       stateName: this.filter.stateName,
//       offset: 0,
//       cityName: this.filter.cityName,
//       activePage: 1,
//       filter: true
//     }

//     this.setState({
//       offset: 0,
//       activePage: 1,
//       stateShortName: this.filter.stateShortName,
//       stateName: this.filter.stateName,
//       cityName: this.filter.cityName,
//       cityId: this.filter.cityId
//     })

//     history.pushState(queryObj, "image-ads listing", `/home/manage-collections?${getQueryUri(queryObj)}`)

//     this.props.actions.fetchImageAds({
//       city_id: queryObj.cityId,
//       offset: 0,
//       limit: 10
//     })
//   }

//   render() {
//     const {
//       loadingCities,
//       citiesData,
//       loadingStates,
//       citiesCount,
//       imageAdsData,
//       loadingImageAds,
//       statesData
//     } = this.props

//     return (
//       <div style={{ width: '100%' }}>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between'
//           }}
//         >
//           <div>
//             <NavLink to={`${location.pathname}/create-new`}>
//               <RaisedButton
//                 label="Create new collection"
//                 primary
//                 onClick={this.mountCreateStateDialog}
//               />
//             </NavLink>

//           </div>

//           <RaisedButton
//             onClick={this.mountFilterDialog}
//             label="Filter"
//             icon={getIcon('filter')}
//           />
//         </div>

//         {/* <ViewImageAds
//           imageAdsData={imageAdsData.ads_data}
//           loadingImageAds={loadingImageAds}
//           updateImageAdStatus={this.props.actions.updateImageAdStatus}
//           updateImageAdStatusCB={this.fetchData}
//         /> */}

//         {
//           !loadingImageAds && imageAdsData.ads_data.length
//             ? <Pagination
//               activePage={parseInt(this.state.activePage)}
//               itemsCountPerPage={10}
//               totalItemsCount={imageAdsData.count}
//               pageRangeDisplayed={5}
//               setPage={this.setPage}
//             />
//             : ''
//         }

//         {
//           this.state.shouldMountFilterDialog
//             ? (
//               <FilterModal
//                 applyFilter={this.applyFilter}
//                 title="Filter collections"
//                 unmountFilterModal={this.unmountFilterModal}
//               >
//                 <div>
//                   <div className="form-group">
//                     <label>State</label><br />
//                     <SelectField
//                       style={{ width: '100%' }}
//                       floatingLabelText="Choose state"
//                       value={parseInt(this.state.stateIdx)}
//                       onChange={this.handleStateChange}
//                       iconStyle={{ fill: '#9b9b9b' }}
//                     >
//                       {
//                         !loadingStates
//                           ? (
//                             statesData.map((state, i) => (
//                               <MenuItem
//                                 value={i + 1}
//                                 key={state.id}
//                                 primaryText={state.state_name}
//                               />
//                             ))
//                           )
//                           : ''
//                       }
//                     </SelectField>
//                   </div>
//                   <div className="form-group">
//                     <label>City</label><br />
//                     <SelectField
//                       style={{ width: '100%' }}
//                       floatingLabelText="Choose state"
//                       disabled={loadingCities || !citiesData.length}
//                       value={parseInt(this.state.cityIdx)}
//                       onChange={this.handleCityChange}
//                     >
//                       {
//                         !loadingCities && citiesData.length
//                           ? (
//                             citiesData.map((city, i) => (
//                               <MenuItem
//                                 value={i + 1}
//                                 key={city.id}
//                                 primaryText={city.name}
//                               />
//                             ))
//                           )
//                           : ''
//                       }
//                     </SelectField>
//                   </div>
//                   {/* <div className="form-group">
//                   <Checkbox
//                     style={{ marginTop: '10px' }}
//                     // disabled={this.props.isDisabled}
//                     checked={this.state.isLocalityAvailable}
//                     onCheck={this.handleChangeIsLocalityAvailable}
//                     name="isLocalityAvailable"
//                     label="is_available"
//                   />
//                 </div> */}
//                 </div>
//               </FilterModal>
//             )
//             : ''
//         }
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => state.main

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(Actions, dispatch)
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ManageCollections)


import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'

import Pagination from '@components/pagination'

import ViewCollectionList from './../components/manage-collections/view-collection-list'

class ManageCollections extends React.Component {

  constructor(props) {

    super(props)
    // const today = new Date()
    // today.setUTCHours(0, 0, 0, 0)
    // const tommorrow = new Date(today.getTime())
    // tommorrow.setDate(tommorrow.getDate() + 1)
    // tommorrow.setUTCHours(0, 0, 0, 0)
    this.pagesLimit = 5
    this.state = {
      activePage: 1,
      pageOffset: 0,
      // fromDate: today.toISOString(),
      // toDate: tommorrow.toISOString(),
      // dateChanged: false
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    // this.setDate = this.setDate.bind(this)
    // this.handleClearDate = this.handleClearDate.bind(this)

    // this.handleChooseDate = this.handleChooseDate.bind(this)
  }

  componentDidMount() {
    // const { fromDate, toDate } = this.state
    this.props.actions.fetchCollections({
      limit: this.pagesLimit,
      offset: 0,
      // from: fromDate,
      // to: toDate
    })
  }

  // handleChooseDate() {
  //   mountModal(DatePicker({
  //     setDate: this.setDate
  //   }))
  // }

  handlePageChange(pageObj) {

    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })

    this.props.actions.fetchCollections({
      offset: pageObj.offset,
      limit: this.pagesLimit,
      // from: this.state.fromDate,
      // to: this.state.toDate
    })

  }

  // setDate(fromDate, toDate) {
  //   this.setState({
  //     fromDate,
  //     toDate,
  //     dateChanged: true
  //   })
  //   this.props.actions.fetchCredits({
  //     limit: this.pagesLimit,
  //     offset: 0,
  //     from: fromDate,
  //     to: toDate
  //   })
  // }

  // handleClearDate() {
  //   const today = new Date()
  //   today.setUTCHours(0, 0, 0, 0)
  //   const tommorrow = new Date(today.getTime())
  //   tommorrow.setDate(tommorrow.getDate() + 1)
  //   tommorrow.setUTCHours(0, 0, 0, 0)

  //   this.setState({
  //     fromDate: today,
  //     toDate: tommorrow,
  //     dateChanged: false
  //   })

  //   this.props.actions.fetchCredits({
  //     limit: this.pagesLimit,
  //     offset: 0,
  //     from: today,
  //     to: tommorrow
  //   })
  // }

  render() {
    const { activePage } = this.state
    const {
      loadingAllCollections,
      collectionsList,
      collectionsCount
    } = this.props.data

    return (
      <React.Fragment>
        <div style={{ width: '100%', maxWidth: 900 }}>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <NavLink to={`${location.pathname}/create-new`}>
                <RaisedButton
                  label="Create new collection"
                  primary
                  onClick={this.mountCreateStateDialog}
                />
              </NavLink>

            </div>

            <RaisedButton
              onClick={this.mountFilterDialog}
              label="Filter"
              icon={getIcon('filter')}
            />
          </div>
          <h3> Showing All Collections </h3>
          <ViewCollectionList
            loadingAllCollections={loadingAllCollections}
            collectionsList={collectionsList}
          />
          {
            !loadingAllCollections
              ?
              <React.Fragment>
                <Pagination
                  activePage={parseInt(activePage)}
                  itemsCountPerPage={this.pagesLimit}
                  totalItemsCount={collectionsCount}
                  pageRangeDisplayed={5}
                  setPage={this.handlePageChange}
                />
              </React.Fragment>
              : ''
          }
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
)(ManageCollections)

//export default ViewCredits
