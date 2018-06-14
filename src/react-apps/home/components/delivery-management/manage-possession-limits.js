import React from 'react'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

class ManagePossessionLimits extends React.Component {
  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%'
      }}
      >
        <Card style={{
          padding: '20px',
          width: '400px',
          marginBottom: '20px',
          marginRight: '20px'
        }}
        >
          <h4 style={{ margin: 0 }}>Possession ordering</h4>
          <div className="form-group">
            <label>Select state</label>
            <SelectField
              style={{ width: '100%' }}
              floatingLabelText="Choose state"
              // value={parseInt(this.state.stateIdx)}
              onChange={this.handleStateChange}
              iconStyle={{ fill: '#9b9b9b' }}
            >
              {
                false
                ? (
                  [].map((state, i) => (
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
        </Card>

        <Card style={{
          padding: '20px',
          width: '400px',
          marginBottom: '20px',
          marginRight: '20px'
        }}
        >
          <h4 style={{ margin: 0 }}>Listing order details</h4>
          <div className="form-group form-inline">
            <label>IMFL (ML)</label>
            <TextField />
          </div>

          <div className="form-group form-inline">
            <label>FMFL (ML)</label>
            <TextField />
          </div>

          <div className="form-group form-inline">
            <label>BEER (ML)</label>
            <TextField />
          </div>

          <div className="form-group form-inline">
            <label>WINE (ML)</label>
            <TextField />
          </div>
        </Card>
        <RaisedButton
          // disabled={this.state.isDisabled}
          primary
          label="Save"
          onClick={this.submit}
          style={{ marginTop: '40px' }}
        />
      </div>
    )
  }
}

export default ManagePossessionLimits
