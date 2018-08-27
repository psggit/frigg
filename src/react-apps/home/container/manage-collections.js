
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'

import Pagination from '@components/pagination'

import ViewCollectionList from './../components/manage-collections/view-collection-list'

class ManageCollections extends React.Component {

  constructor(props) {

    super(props)
    this.pagesLimit = 40
    this.state = {
      activePage: 1,
      pageOffset: 0,
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchCollections({
      limit: this.pagesLimit,
      offset: 0,
    })
  }

  handlePageChange(pageObj) {
    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })

    this.props.actions.fetchCollections({
      offset: pageObj.offset,
      limit: this.pagesLimit,
    })
  }

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

            {/* <RaisedButton
              onClick={this.mountFilterDialog}
              label="Filter"
              icon={getIcon('filter')}
            /> */}
          </div>
          <h3> Showing all collections </h3>
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
