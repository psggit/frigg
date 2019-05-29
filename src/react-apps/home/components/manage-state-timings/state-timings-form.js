import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class StateTimingForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
			selectedStateIdx: props.data ? parseInt(props.data.state_id) : "",
			stateShortName: props.data ? props.data.state_short_name : "",
      startTime: props.data ? props.data.start_time.substring(11,16) : "",
      endTime: props.data ? props.data.end_time.substring(11,16) : ""
    }

    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.getData = this.getData.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  componentDidMount() {
    console.log("dtaa", this.props.data)
  }
	
	componentWillReceiveProps(newProps) {
		// if(!this.props.data && this.props.stateList !== newProps.stateList) {
    //   console.log("hello")
		// 	this.setState({
		// 		selectedStateIdx: newProps.stateList[0].id,
		// 		stateShortName: newProps.stateList[0].short_name
		// 	})
		// }
	}

  getData() {
    return this.state
  }

  handleTimeChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChange(e, k) {
    const selectedStateIdx = this.props.stateList[k].id
    this.setState({ selectedStateIdx, stateShortName: this.props.stateList[k].short_name })
  }

  render() {
    console.log("state", this.state)
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter state timing details</h4>
					<div className="form-group">
            <label className="label">State</label><br/>
            <SelectField
              //disabled={this.props.isDisabled}
              value={this.state.selectedStateIdx}
              onChange={this.handleChange}
            >
              {
                this.props.stateList.map((item, i) => (
                  <MenuItem
                    value={item.id}
                    key={parseInt(item.id)}
                    primaryText={item.state_name}
                  />
                ))
              }
            </SelectField>
          </div>
        
          <div className="form-group">
            <label className="label">Start Time</label><br />
            <input
              type='time'
              onChange={this.handleTimeChange}
              defaultValue={this.state.startTime}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="startTime"
            />
          </div>

					<div className="form-group">
            <label className="label">End Time</label><br />
            <input
              type='time'
              onChange={this.handleTimeChange}
              defaultValue={this.state.endTime}
              className="inline-input"
              style={{
                width: '100%',
                marginTop: '10px',
                border: '0',
                borderBottom: '1px solid #9b9b9b',
                fontSize: '14px',
                padding: '5px 0'
              }}
              name="endTime"
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

export default StateTimingForm
