import React from "react"
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class UserAdForm extends React.Component {
  constructor(props) {
    super(props)
    // this.Ads = [
    //   { text: "123", value: 1 },
    //   { text: "456", value: 2 }
    // ]

    this.AdStatus = [
      { text: 'Active', value: 1 },
      { text: 'Inactive', value: 2 },
    ]
    
    this.state = {
      //selectedAdIdx: props.data ?  props.data.ad_id : ,
      //selectedAdId: ,
      selectedStatusIdx: props.data ? props.data.is_active ? 1 : 2 : 1,
      //selectedAdStatus: props.data ? this.AdStatus.find((item) => item.value === ).text : "",
      appType: props.data ? props.data.app_type : "",
      userList: props.data ? props.data.user_list : "",
      adIdsList: [],
      adIdsMap: []
    }   
    
    this.handleIdChange = this.handleIdChange.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.getData = this.getData.bind(this)
    this.handleTextFields = this.handleTextFields.bind(this)
  }

  componentWillReceiveProps(newProps) {
    let adIdsList = [], adIdsMap = {}
    if (this.props.userSpecificAdIds !== newProps.userSpecificAdIds) {
      for(const i in  newProps.userSpecificAdIds) {
        let adDetail = {}
        adDetail.text =  newProps.userSpecificAdIds[i].id
        adDetail.value = parseInt(i) + 1
        adIdsList[i] = adDetail
        adIdsMap[ newProps.userSpecificAdIds[i].id] = adDetail
      }
      this.setState({ adIdsList, adIdsMap })
      if (!this.props.data) {
        this.setState({selectedAdIdx: adIdsList[0].value, selectedAdId: adIdsList[0].text})
      } else {
        this.setState({selectedAdIdx: adIdsMap[this.props.data.ad_id].value, selectedAdId: this.props.data.ad_id})
      }
    }
  }

  handleIdChange(e, k) {
    const selectedAdIdx = k + 1
    console.log(selectedAdIdx, this.state.adIdsList.find((item) => item.value === selectedAdIdx))
    const selectedAdId = this.state.adIdsList.find((item) => item.value === selectedAdIdx).text 
    this.setState({ selectedAdIdx,  selectedAdId })
    console.log("id change", selectedAdIdx, selectedAdId)
  }

  handleStatusChange(e, k) {
    const selectedStatusIdx = k + 1
    const selectedAdStatus = this.AdStatus.find((item) => item.value === selectedStatusIdx).text
    this.setState({ selectedStatusIdx, selectedAdStatus })
    console.log("status change", selectedStatusIdx, selectedAdStatus)
  }

  getData() {
    return this.state
  }

  handleTextFields(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    console.log("props", this.props)
    return (
      <React.Fragment>
        <div style={{ width: '100%' }}>
          <Card style={{
              padding: '20px',
              width: '300px',
              position: 'relative',
              display: 'block',
              verticalAlign: 'top',
              marginRight: '20px'
            }}
          >
            <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter ad details</h4>
            <div className="form-group">
              <label className="label">Ad Id</label><br/>
              <SelectField
                disabled={this.props.isDisabled}
                value={this.state.selectedAdIdx}
                onChange={this.handleIdChange}
              >
                {
                  this.state.adIdsList.map((ad, i) => (
                    <MenuItem
                      value={i + 1}
                      key={ad.value}
                      primaryText={ad.text}
                    />
                  ))
                }
              </SelectField>
            </div>
            <div className="form-group">
              <label className="label">User List</label><br/>
              <TextField
                onChange={this.handleTextFields}
                name="userList"
                value={this.state.userList}
                style={{ width: '100%' }}
              />
            </div>
            <div className="form-group">
              <label className="label">App type</label><br/>
              <TextField
                onChange={this.handleTextFields}
                name="appType"
                value={this.state.appType}
                style={{ width: '100%' }}
              />
            </div>
            <div className="form-group">
              <label className="label">Status</label><br/>
              <SelectField
                //disabled={this.props.isDisabled}
                value={this.state.selectedStatusIdx}
                onChange={this.handleStatusChange}
              >
                {
                  this.AdStatus.map((item, i) => (
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
              <RaisedButton
                label="Save"
                primary
                disabled={this.props.disableSave}
                onClick={this.props.handleSave}
              />
            </div>
          </Card>
        </div>
      </React.Fragment>
    )
  }
}

export default UserAdForm