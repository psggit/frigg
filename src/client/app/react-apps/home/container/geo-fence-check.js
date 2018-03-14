import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import CheckResultCard from './../components/geofence-check/check-result-card'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SelectField from 'material-ui/SelectField'
import { Card } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import * as Actions from './../actions'
import '@sass/components/_tooltip.scss'

class GeoFenceCheck extends React.Component {
  constructor() {
    super()
    this.state = {
      cityIdx: 0
    }
    this.checkButtons = [
      {
        label: 'Check prime retailer',
        name: 'check-prime',
        title: 'Checks whether the active locality under the city has a prime retailer',
        tooltipPosition: 'top'
      },
      {
        label: 'Check delivery agent',
        name: 'check-da',
        title: 'Check whether the acive locality has a delivery agent',
        tooltipPosition: 'top'
      },
      {
        label: 'Check active locality',
        name: 'check-active-locality',
        title: 'Check whether all the active localities are within a deliverable city',
        tooltipPosition: 'top'
      },
      {
        label: 'Check delivery agent retailer',
        name: 'check-da-retailer',
        title: 'Check whether the prime retailer has a delivery agent',
        tooltipPosition: 'bottom'
      },
      {
        label: 'List retailer outside locality',
        name: 'list-retailer-outside',
        title: 'Check whether all retailer are within respective locality boundary',
        tooltipPosition: 'bottom'
      },
      {
        label: 'City fence check',
        name: 'check-city-fence',
        title: 'Checks whether city Gps value is within its geoboundary',
        tooltipPosition: 'bottom'
      }
    ]
    this.state = {
      isDisabled: true,
      disabledButtons: [0, 1, 2, 3, 4, 5 ]
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckAll = this.handleCheckAll.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
  }

  componentDidMount() {
    this.props.actions.emptyGeoFenceCheckData()
    this.props.actions.fetchCities({
      state_short_name: null,
      is_available: null,
      offset: 0,
      limit: 50,
      deliverable_city: null,
      no_filter: true
    })
  }

  handleCheckAll() {
    const disabledButtons = [0, 1, 2, 3, 4, 5]
    const { cityId } = this.state
    this.setState({ isDisabled: true, disabledButtons })

    this.props.actions.checkPrimeRetailer({ cityId })
    this.props.actions.checkDeliveryAgent({ cityId })
    this.props.actions.checkDeliveryAgentRetailer({ cityId })
    this.props.actions.checkActiveLocalityWithinCity({ cityId })
    this.props.actions.listRetailerOutsideLocality({ cityId })
    this.props.actions.checkCityFence({ cityId })
  }

  handleClick(e, i) {
    const { cityId } = this.state
    const disabledButtons = this.state.disabledButtons.slice()
    disabledButtons.push(i)
    this.setState({ disabledButtons, isDisabled: true })
    switch (e.currentTarget.name) {
      case 'check-prime':
        this.props.actions.checkPrimeRetailer({ cityId })
        break

      case 'check-da':
        this.props.actions.checkDeliveryAgent({ cityId })
        break

      case 'check-da-retailer':
        this.props.actions.checkDeliveryAgentRetailer({ cityId })
        break

      case 'check-active-locality':
        this.props.actions.checkActiveLocalityWithinCity({ cityId })
        break

      case 'list-retailer-outside':
        this.props.actions.listRetailerOutsideLocality({ cityId })
        break

      case 'check-city-fence':
        this.props.actions.checkCityFence({ cityId })
        break

      default:
        return;
    }
  }

  handleCityChange(e, k) {
    this.props.actions.emptyGeoFenceCheckData()
    const cityIdx = k + 1
    const { citiesData } = this.props
    this.setState({
      cityIdx,
      cityId: citiesData[k].id,
      isDisabled: false,
      disabledButtons: []
    })
  }

  render() {
    return (
      <div style={{ width: '100%', maxWidth: 900 }}>
        <div>
          <Card
            style={{
              padding: '10px 20px 0 20px',
              width: '30%',
              marginBottom: '40px'
            }}
          >
            <h3>Choose city to check</h3>
            <div className="form-group">
              <SelectField
                value={parseInt(this.state.cityIdx)}
                onChange={this.handleCityChange}
                iconStyle={{ fill: '#9b9b9b' }}
              >
                {
                  !this.props.loadingCities
                  ? (
                    this.props.citiesData.map((item, i) => (
                      <MenuItem
                        value={i + 1}
                        key={item.id}
                        primaryText={item.name}
                      />
                    ))
                  )
                  : ''
                }
              </SelectField>
            </div>
          </Card>
        </div>

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
                tooltip={button.title}
                tooltip-position={button.tooltipPosition}
                primary
                onClick={(e) => { this.handleClick(e, i) }}
                label={button.label}
                disabled={this.state.disabledButtons.indexOf(i) > -1}
                name={button.name}
                style={{ marginRight: '20px', marginBottom: '20px' }}
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
