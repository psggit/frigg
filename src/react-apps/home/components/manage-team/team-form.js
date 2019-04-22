import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'

class TeamForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      teamName: props.data ? props.data.name : "",
    
      teamNameErr: {
        value: "",
        status: false
      },
    }

    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    //this.handleDate = this.handleDate.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName] : {
        value: "",
        status: false
      }
    })
    this.setState({ [e.target.name]: e.target.value })
  }

  // handleStatusChange(e, k) {
  //   const selectedStatusIdx = k + 1
  //   this.setState({ selectedStatusIdx })
  // }

  // handleBrandManagerChange(e, k) {
  //   console.log("brand manaer", k, this.props.brandManagerList[k])
  //   const selectedBrandManagerIdx = k
  //   this.setState({ selectedBrandManagerIdx: this.props.brandManagerList[k].value })
  // }

  // handleDate(e) {
  //   const errName = `${e.target.name}Err`
  //   this.setState({
  //     [errName] : {
  //       value: "",
  //       status: false
  //     }
  //   })
  //   const d = new Date(e.target.value)
  //   this.setState({ [e.target.name]: d.toISOString() })
  // }

  isFormValid() {
    if (this.state.teamName.length === 0) {
      this.setState({
        teamNameErr: {
          value: "Team name is required",
          status: true
        }
      })
      return false
    } 

    return true
  }

  handleSave() {
    if(this.isFormValid()) {
      this.props.handleSave()
    }
  }

  render() {
    const {teamNameErr} = this.state
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Team Details</h4>
          <div className="form-group">
            <label className="label">Team Name</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="teamName"
              value={this.state.teamName}
              style={{ width: '100%' }}
              disabled={this.props.isDisabled}
            />
            {
              teamNameErr.status &&
              <p className="error-message">* {teamNameErr.value}</p>
            }
          </div>
        
          <div className="form-group">
            <RaisedButton
              label="Save"
              primary
              disabled={this.props.disableSave}
              onClick={this.handleSave}
            />
          </div>
        </Card>
      </Fragment>
    )
  }
}

export default TeamForm
