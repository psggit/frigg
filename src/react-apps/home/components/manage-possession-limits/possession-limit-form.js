import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class PossessionLimitForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      selectedTypeIdx: props.data ? props.data.type_id : 1,
      bottleCount: props.data ? props.data.bottle_count : "",
      volume: props.data ? props.data.volume : "",
      DAPossessionVolumeLimit: props.data ? props.data.da_possession_volume_limit: ""
    }

    this.brandType = [
        {text: "IMFL", value: 1},
        {text: "FMFL", value: 2},
        {text: "BEER", value: 3},
        {text: "WINE", value: 4}
    ]

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
    const selectedTypeIdx = k + 1
    this.setState({ selectedTypeIdx })
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Possession Limit Details</h4>
          <div className="form-group">
            <label className="label">State Short Name</label><br/>
            <TextField
              disabled={true}
              name="state"
              defaultValue={this.props.stateShortName}
              style={{ width: '100%' }}
            />
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
            <label className="label">Brand Type</label><br/>
            <SelectField
              disabled={this.props.disableBrandTypeEdit}
              value={this.state.selectedTypeIdx}
              onChange={this.handleChange}
            >
              {
                this.brandType.map((item, i) => (
                  <MenuItem
                    value={i + 1}
                    key={item.value}
                    primaryText={item.text}
                  />
                ))
              }
            </SelectField>
          </div>
          <div className="form-group">
            <label className="label">DA Possession Volume Limit</label><br />
            <TextField
              onChange={this.handleTextFields}
              name="DAPossessionVolumeLimit"
              value={this.state.DAPossessionVolumeLimit}
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

export default PossessionLimitForm
