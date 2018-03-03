import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import CheckResultCard from './../components/geofence-check/check-result-card'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'

class GeoFenceCheck extends React.Component {
  constructor() {
    super()
    this.checkButtons = [
      { label: 'Check prime retailer', name: 'check-prime' },
      { label: 'Check delivery agent', name: 'check-da' },
      { label: 'Check delivery agent retailer', name: 'check-da-retailer' },
      { label: 'Check delivery time', name: 'check-delivery-time' }
    ]
    this.state = {
      isDisabled: false,
      disabledButtons: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckAll = this.handleCheckAll.bind(this)
  }

  componentDidMount() {
    this.props.actions.emptyGeoFenceCheckData()
  }

  handleCheckAll() {
    const disabledButtons = [0, 1, 2, 3]
    this.setState({ isDisabled: true, disabledButtons })

    this.props.actions.checkPrimeRetailer({ cityId: 1 })
    this.props.actions.checkDeliveryAgent({ cityId: 1 })
    this.props.actions.checkDeliveryAgentRetailer({ cityId: 1 })
    this.props.actions.checkDeliveryTimeForLocality({ cityId: 1 })
  }

  handleClick(e, i) {
    const disabledButtons = this.state.disabledButtons.slice()
    disabledButtons.push(i)
    this.setState({ disabledButtons, isDisabled: true })
    switch (e.currentTarget.name) {
      case 'check-prime':
        this.props.actions.checkPrimeRetailer({ cityId: 1 })
        break

      case 'check-da':
        this.props.actions.checkDeliveryAgent({ cityId: 1 })
        break

      case 'check-da-retailer':
        this.props.actions.checkDeliveryAgentRetailer({ cityId: 1 })
        break
      case 'check-delivery-time':
        this.props.actions.checkDeliveryTimeForLocality({ cityId: 1 })

      default:
        return;
    }
  }

  render() {
    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        <RaisedButton
          primary
          label="Check all"
          onClick={this.handleCheckAll}
          style={{ marginBottom: '20px' }}
          disabled={this.state.isDisabled}
        />
        <br />
        {
          this.checkButtons.map((button, i) => {
            return (
              <RaisedButton
                primary
                onClick={(e) => { this.handleClick(e, i) }}
                label={button.label}
                disabled={this.state.disabledButtons.indexOf(i) > -1}
                name={button.name}
                style={{ marginRight: '20px' }}
              />
            )
          })
        }
        <div style={{ marginTop: '20px' }}>
          {
            this.props.geoFenceCheckData.map((result, i) => {
              return (
                <CheckResultCard
                  key={`result-card-${i}`}
                  data={result.data}
                  checkName={result.title}
                  status={result.status}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeoFenceCheck)
