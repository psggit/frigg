import React from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

class FilterModal extends React.Component {
  constructor() {
    super()
    this.state = {
      open: true,
      isLocalityAvailable: false,
      stateIdx: null,
      cityIdx: null
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleApplyFilter = this.handleApplyFilter.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleCityChange = this.handleCityChange.bind(this)
    this.handleChangeIsLocalityAvailable = this.handleChangeIsLocalityAvailable.bind(this)
  }

  handleClose() {
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountFilterModal()
    }, 500)
  }

  handleApplyFilter(stateIdx, isLocalityAvailable) {
    this.props.applyFilter(stateIdx, isLocalityAvailable)
    this.setState({ open: false })
    setTimeout(() => {
      this.props.unmountFilterModal()
    }, 500)
  }

  handleStateChange(e, k) {
    const stateIdx = k + 1
    this.setState({ stateIdx, cityIdx: null })
    this.props.handleStateChange(k)
  }

  handleCityChange(e, k) {
    const cityIdx = k + 1
    this.setState({ cityIdx })
    this.props.handleCityChange(k)
  }

  handleChangeIsLocalityAvailable(e) {
    this.setState({ isLocalityAvailable: e.target.checked })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleClose}
      />,

      <RaisedButton
        primary
        label="Apply filter"
        onClick={() => this.handleApplyFilter(this.state.stateIdx, this.state.isLocalityAvailable)}
      />
    ]
    return (
      <div>
        <Dialog
          autoScrollBodyContent
          title={this.props.title}
          contentStyle={{ width: '100%', maxWidth: '500px' }}
          modal={false}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
        >
          {/* { this.props.children } */}
          <div>
            <div className="form-group">
              <label>State</label><br />
              <SelectField
                style={{ width: '100%' }}
                floatingLabelText="Choose state"
                value={parseInt(this.state.stateIdx)}
                onChange={this.handleStateChange}
                iconStyle={{ fill: '#9b9b9b' }}
              >
                {
                  !this.props.loadingStates
                  ? (
                    this.props.statesData.map((state, i) => (
                      <MenuItem
                        value={i + 1}
                        key={state.id}
                        primaryText={state.state_name}
                      />
                    ))
                  )
                  : ''
                }
              </SelectField>
            </div>
            <div className="form-group">
              <label>City</label><br />
              <SelectField
                style={{ width: '100%' }}
                floatingLabelText="Choose state"
                disabled={this.props.loadingCities || !this.props.citiesData.length}
                value={parseInt(this.state.cityIdx)}
                onChange={this.handleCityChange}
              >
                {
                  !this.props.loadingCities && this.props.citiesData.length
                  ? (
                    this.props.citiesData.map((city, i) => (
                      <MenuItem
                        value={i + 1}
                        key={city.id}
                        primaryText={city.name}
                      />
                    ))
                  )
                  : ''
                }
              </SelectField>
            </div>
            <div className="form-group">
              <Checkbox
                style={{ marginTop: '10px' }}
                // disabled={this.props.isDisabled}
                checked={this.state.isLocalityAvailable}
                onCheck={this.handleChangeIsLocalityAvailable}
                name="isLocalityAvailable"
                label="is_available"
              />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default FilterModal
