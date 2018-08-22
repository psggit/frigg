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
      pageOffset: 0
    },

      this.collectionName = '',
      this.collectionDisplayName = '',
      this.pagesLimit = 5
  }

  componentDidMount() {
    const { collectionShortName } = this.props.match.params
    this.setState({ collectionShortName, loadingBrand: true })

    const queryObj = getQueryObj(location.search.slice(1))

    this.collectionName = queryObj.collectionName
    this.collectionDisplayName = queryObj.collectionDisplayName

    this.props.actions.fetchBrandsInCollection({
      collectionShortName: collectionShortName,
      data: {
        from: 0,
        size: 9
      }
    })
  }

  handlePageChange(pageObj) {
    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset, loadingBrand: true })

    this.props.actions.fetchBrandsInCollection({
      collectionShortName: collectionShortName,
      data: {
        from: pageObj.offset,
        size: this.pagesLimit
      }
    })
  }

  // editCollection() {
  //   console.log("edit collection")
  // }

  render() {
    const { loadingBrandsInCollection, brandList, brandCount } = this.props.data
    const styles = {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
      display: 'flex',
      justifyContent: 'flex-start',
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
              !loadingBrandsInCollection && brandList.length > 0
              &&
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

          {
            !loadingBrandsInCollection && brandList.length > 0
            &&
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
          }
          {
            !loadingBrandsInCollection && brandList.length === 0
            &&
            <div style={styles}> No brands found in the collection </div>
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
)(ViewCollection)
