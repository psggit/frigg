import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class CityPossessionLimitForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedCityIdx: props.data ? props.data.city_id : "",
      bottleCount: props.data ? props.data.bottle_count : "",
      volume: props.data ? props.data.volume : ""
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChange(e, k) {
    const selectedCityIdx = k + 1
    this.setState({ selectedCityIdx })
  }

  render() {
    return (
      <Fragment>
        <Card style={{
            padding: '20px',
            width: '300px',
            position: 'relative',
            display: 'block',
            verticalAlign: 'top',
            marginRight: '20px'
          }}
        >
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter City Possession Limit Details</h4>
          <div className="form-group">
            <label className="label">City</label><br/>
            <SelectField
              //disabled={this.props.isDisabled}
              value={this.state.selectedCityIdx}
              onChange={this.handleChange}
            >
              {
                this.props.cityList.map((item, i) => (
                  <MenuItem
                    value={item.id}
                    key={parseInt(item.id)}
                    primaryText={item.name}
                  />
                ))
              }
            </SelectField>
          </div>

          <div className="form-group">
            <label className="label">Volume (ml)</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="volume"
              value={this.state.volume}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <label className="label">Bottle Count</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="bottleCount"
              value={this.state.bottleCount}
              style={{ width: '100%' }}
            />
          </div>

          <div className="form-group">
            <RaisedButton
              label="Save"
              primary
              disabled={this.props.disableSave}
              onClick={this.props.handleSave}
            />
          </div>
        </Card>
      </Fragment>
    )
  }
}

export default CityPossessionLimitForm
