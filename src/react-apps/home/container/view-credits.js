import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'
import { mountModal } from '@components/ModalBox/utils'
import DatePicker from './../../../components/DatePicker'
import Moment from 'moment'
import Pagination from '@components/pagination'
import ViewValidCredits from './../components/customer-management/view-credits'

class ViewCredits extends React.Component {

  constructor(props) {

    super(props)
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const tommorrow = new Date(today.getTime())
    tommorrow.setDate(tommorrow.getDate() + 1)
    tommorrow.setUTCHours(0, 0, 0, 0)
    this.pagesLimit = 5
    this.state = {
      activePage: 1,
      pageOffset: 0,
      fromDate: today.toISOString(),
      toDate: tommorrow.toISOString(),
      dateChanged: false
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    // this.handleClick = this.handleClick.bind(this)
    // this.getData = this.getData.bind(this)
    // this.setDate = this.setDate.bind(this)
    this.handleChooseDate = this.handleChooseDate.bind(this)
  }

  componentDidMount() {
    const { fromDate, toDate } = this.state
    this.props.actions.fetchCredits({
      limit: this.pagesLimit,
      offset: 0,
      from: fromDate,
      to: toDate
    })
  }

  handleChooseDate() {
    mountModal(DatePicker({
      setDate: this.setDate
    }))
  }

  handlePageChange(pageObj) {

    let pageNumber = pageObj.activePage
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })

    this.props.actions.fetchCredits({
      offset: pageObj.offset,
      limit: this.pagesLimit,
      from: this.state.fromDate,
      to: this.state.toDate
    })

  }

  render() {
    const { dateChanged, fromDate, toDate, activePage } = this.state
    const {
      loadingCredits,
      validCreditsData,
      validCreditsCount
    } = this.props.data

    return(
      <React.Fragment>
        <div style={{ width: '100%', maxWidth: 900 }}>
        
          <button
            style={{
              textTransform: 'capitalize',
              color: '#333',
              marginTop: '20px',
              borderColor: '#333'
            }}
            onClick={this.handleChooseDate}
          >
            Choose date
          </button>
          <span style={{
            margin: '20px 0 0 40px',
            fontSize: '14px',
            border: '1px solid #333',
            padding: '10px 10px',
            borderRadius: '2px',
            color: '#333',
            borderTopRightRadius: dateChanged ? '0' : '2px',
            borderBottomRightRadius: dateChanged ? '0' : '2px'
          }}>
            {
              `${ Moment(new Date(fromDate).toJSON().slice(0, 10)).format('MMM Do YYYY') }
              - ${ Moment(new Date(toDate).toJSON().slice(0, 10)).format('MMM Do YYYY') }`
            }
          </span>
          <ViewValidCredits 
            creditsData={validCreditsData}
            loadingCredits={loadingCredits}
          />
          {
            !loadingCredits 
            ? 
              <React.Fragment>
                <Pagination
                  activePage={parseInt(activePage)}
                  itemsCountPerPage={this.pagesLimit}
                  totalItemsCount={validCreditsCount}
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
)(ViewCredits)

//export default ViewCredits