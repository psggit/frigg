import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'
import { mountModal } from '@components/ModalBox/utils'
import DatePicker from './../../../components/DatePicker'
import Moment from 'moment'
import Pagination from '@components/pagination'
import ViewValidCredits from './../components/customer-management/view-credits'
import { getIcon } from '@components/utils'

class ViewCredits extends React.Component {

  constructor(props) {

    super(props)
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const tommorrow = new Date(today.getTime())
    tommorrow.setDate(tommorrow.getDate() + 1)
    tommorrow.setUTCHours(0, 0, 0, 0)
    this.pagesLimit = 40
    this.state = {
      activePage: 1,
      pageOffset: 0,
      fromDate: today.toISOString(),
      toDate: tommorrow.toISOString(),
      dateChanged: false
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setDate = this.setDate.bind(this)
    this.handleClearDate = this.handleClearDate.bind(this)

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

  setDate(fromDate, toDate) {
    this.setState({
      fromDate,
      toDate,
      dateChanged: true
    })
    this.props.actions.fetchCredits({
      limit: this.pagesLimit,
      offset: 0,
      from: fromDate,
      to: toDate
    })
  }

  handleClearDate() {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const tommorrow = new Date(today.getTime())
    tommorrow.setDate(tommorrow.getDate() + 1)
    tommorrow.setUTCHours(0, 0, 0, 0)

    this.setState({
      fromDate: today,
      toDate: tommorrow,
      dateChanged: false
    })

    this.props.actions.fetchCredits({
      limit: this.pagesLimit,
      offset: 0,
      from: today,
      to: tommorrow
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
          <div style={{'marginBottom': '20px'}}>
            <button
              style={{
                textTransform: 'capitalize',
                color: '#333',
                marginTop: '20px',
                borderColor: '#333',
                height: '40px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              onClick={this.handleChooseDate}
            >
              Choose date
            </button>
            <span style={{
              margin: '20px 0 0 40px',
              fontSize: '14px',
              border: '1px solid #333',
              padding: '11px 10px',
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
            {
              dateChanged &&
              <button
                onClick={this.handleClearDate}
                style={{
                  padding: '5px',
                  borderColor: '#333',
                  borderLeft: '0',
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '0',
                  position: 'relative',
                  top: '2px',
                  height: '40px',
                  cursor: 'pointer'
                }}>
                <span title="Clear date" style={{ position: 'relative', top: '2px' }}>{ getIcon('cross') }</span>
              </button>
            }
          </div>
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