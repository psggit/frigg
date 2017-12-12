import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { NavLink } from 'react-router-dom'
import Checkbox from 'material-ui/Checkbox'
import { getQueryObj } from '@utils/url-utils'
import '@sass/components/_form.scss'

class ViewCity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCityActive: null,
      cityName: null,
      isEdit: false
    }
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleCheckboxes = this.handleCheckboxes.bind(this)
    this.enableEditMode = this.enableEditMode.bind(this)
    this.disableEditMode = this.disableEditMode.bind(this)
    this.update = this.update.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.geoBoundaryData).length) {
      this.setState({
        isCityActive: nextProps.geoBoundaryData.is_available,
        cityName: nextProps.geoBoundaryData.name
      })
    }
  }

  componentDidMount() {
    const { actions, match } = this.props
    const queryObj = getQueryObj(location.search.slice(1))
    this.setState({ queryObj })
    actions.viewGeoboundary({
      id: parseInt(queryObj.id)
    })
  }

  update() {
    const { geoBoundaryData } = this.props
    const { isCityActive, cityName, queryObj } = this.state
    this.props.actions.updateCity({
      id: parseInt(queryObj.id),
      is_available: isCityActive,
      deliverable_city: geoBoundaryData.deliverable_city,
      state_short_name: geoBoundaryData.state_short_name,
      gps: geoBoundaryData.gps,
      name: cityName,
      geoboundary: geoBoundaryData.geoboundary
    }, this.disableEditMode)
  }

  enableEditMode() {
    this.setState({ isEdit: true })
  }

  disableEditMode() {
    this.setState({ isEdit: false })
  }

  handleCheckboxes(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { loadingGeoboundary, geoBoundaryData } = this.props
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px 0'
      }}
      >
        {
          !loadingGeoboundary
          ? (
            <div style={{ position: 'absolute', right: '0' }}>
              {
                !this.state.isEdit
                ? (
                  <RaisedButton
                    primary
                    label="Edit City"
                    onClick={this.enableEditMode}
                    style={{ marginRight: '20px' }}
                  />
                )
                : (
                  <RaisedButton
                    primary
                    label="Cancel"
                    onClick={this.disableEditMode}
                    style={{ marginRight: '20px' }}
                  />
                )
              }
              {
                geoBoundaryData.geoboundary.length || geoBoundaryData.geoboundary
                ? (
                  <NavLink
                    target="_blank"
                    exact
                    to={`${location.pathname}/boundary?id=${this.state.queryObj.id}`}
                    href={`${location.pathname}/boundary?id=${this.state.queryObj.id}`}
                  >
                    <RaisedButton
                      primary
                      label="View city boundary"
                      style={{ marginRight: '20px' }}
                    />
                  </NavLink>
                )
                : (
                  <NavLink
                    target="_blank"
                    exact
                    to={`${location.pathname}/create-boundary?id=${this.state.queryObj.id}`}
                    href={`${location.pathname}/create-boundary?id=${this.state.queryObj.id}`}
                  >
                    <RaisedButton
                      primary
                      label="Create new"
                    />
                  </NavLink>
                )
              }
              {
                geoBoundaryData.geoboundary.length || geoBoundaryData.geoboundary
                ? (
                  <NavLink
                    target="_blank"
                    exact
                    to={`${location.pathname}/localities?id=${this.state.queryObj.id}`}
                    href={`${location.pathname}/localities?id=${this.state.queryObj.id}`}
                  >
                    <RaisedButton
                      primary
                      label="View localities"
                    />
                  </NavLink>
                )
                : ''
              }
            </div>
          )
          : ''
        }

        {
          !loadingGeoboundary
          ? (
            <div style={{ paddingTop: '40px' }}>

              <div className="form-group">
                <p className="label">Name</p>
                <TextField
                  disabled={!this.state.isEdit}
                  onChange={this.handleTextFields}
                  name="cityName"
                  value={this.state.cityName}
                />
              </div>

              <div className="form-group">
                <p className="label">Active</p>
                <Checkbox
                  disabled={!this.state.isEdit}
                  checked={this.state.isCityActive}
                  onCheck={this.handleCheckboxes}
                  name="isCityActive"
                  label="is_active"
                />
              </div>

              {
                this.state.isEdit
                ? (
                  <RaisedButton
                    primary
                    label="Update changes"
                    onClick={this.update}
                    style={{ marginTop: '40px' }}
                  />
                )
                : ''
              }
            </div>
          )
          : 'loading..'
        }
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
)(ViewCity)
