import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'

import Pagination from '@components/pagination'

import ViewCollectionList from './view-collection-list'

class ViewCollections extends React.Component {

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

    return(
      <React.Fragment>
        <div style={{ width: '100%', maxWidth: 900 }}>
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
)(ViewCollections)

//export default ViewCredits