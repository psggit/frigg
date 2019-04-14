import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
//import FormControlLabel from 'material-ui/FormControlLabel'
import { Card } from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import Checkbox from 'material-ui/Checkbox'
import MenuItem from 'material-ui/MenuItem'
import Moment from 'moment'
import { validateNumType, checkCtrlA, checkCtrlV, checkCtrlC } from './../../../utils'

class SkuPromoForm extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      //selectedCampaignIdx: "",
      selectedCampaignId: props.data ? props.data.campaign_id : "",
      promoName: props.data ? props.data.promoName : "",
      amount: props.data ? props.data.amount : 0,
      description: props.data ? props.data.promo_description : "",
      isPackOn: props.data ? props.data.is_on_pack : false,
      amountErr: {
        value: "",
        status: false
      },
      descriptionErr: {
        value: "",
        status: false
      },
      promoNameErr: {
        value: "",
        status: false
      }
    }
    
    this.handleTextFields = this.handleTextFields.bind(this)
    this.getData = this.getData.bind(this)
    this.handleStatusChange = this.handleStatusChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleChangeInAmount = this.handleChangeInAmount.bind(this)
  }


  componentWillReceiveProps(newProps) {
    if(newProps.campaignList !== this.props.campaignList) {
      if(this.state.selectedCampaignId.toString().length === 0) {
        this.setState({selectedCampaignId: newProps.campaignList[0].value})
      }
    }
  }
  
  getData() {
    return this.state
  }

  // handleChangeInAmount(e) {
  //   if((validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) || checkCtrlC(e)) {
  //     this.setState({ 
  //       amount: (e.target.value),
  //     })
     
  //   } else {
  //     // this.setState({ 
  //     //   amount: 0,
  //     // })
  //     e.preventDefault()
  //   }
  // }

  handleChangeInAmount(e) {
    const re = /^[0-9\b]*$/;
    if ((e.target.value === '' || re.test(e.target.value)) && !this.state.isPackOn) {
       this.setState({amount: e.target.value})
    }
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

  handleStatusChange(e, k) {
    //const selectedCampaignIdx = k
    this.setState({ selectedCampaignId: this.props.campaignList[k].value })
  }

  handleCheckboxChange(e) {
    if(e.target.checked) {
      this.amount = this.state.amount
      this.setState({isPackOn: e.target.checked, amount: 0})
      return
    } 
    this.setState({isPackOn: e.target.checked, amount: this.amount})
  }

  isFormValid() {
    if(this.state.amount.toString().length === 0) {
      this.setState({
        amountErr: {
          value: "Amount is required",
          status: true
        }
      })
      return false
    } else if(this.state.promoName.toString().length === 0) {
      this.setState({
        promoNameErr: {
          value: "Promo name is required",
          status: true
        }
      })
      return false
    } else if(this.state.description.toString().length === 0) {
      this.setState({
        descriptionErr: {
          value: "Description is required",
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
    const {amountErr, promoNameErr, descriptionErr} = this.state
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
          <h4 style={{ margin: '0', marginBottom: '40px' }}>Enter Sku Promo Details</h4>

          <div className="form-group">
            <label className="label">Campaign ID</label><br />
            <SelectField
              value={this.state.selectedCampaignId}
              onChange={this.handleStatusChange}
              disabled={this.props.isDisabled}
            >
              {
                this.props.campaignList.map((item, i) => (
                  <MenuItem
                    value={item.value}
                    key={item.value}
                    primaryText={item.text}
                  />
                ))
              }
            </SelectField>
          </div>

          <div className="form-group">
            <label className="label">Amount</label><br/>
            {/* <TextField
              //onChange={this.handleTextFields}
              onKeyUp={(e) => this.handleChangeInAmount(e)}
              onKeyDown={(e) => this.handleChangeInAmount(e)}
              name="amount"
              //value={this.state.amount}
              style={{ width: '100%' }}
            /> */}
            <TextField 
              value={this.state.amount}
              onChange={this.handleChangeInAmount}
            />
            {
              amountErr.status &&
              <p className="error-message">* {amountErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Promo Name</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="promoName"
              value={this.state.promoName}
              style={{ width: '100%' }}
            />
            {
              promoNameErr.status &&
              <p className="error-message">* {promoNameErr.value}</p>
            }
          </div>

          <div className="form-group">
            <label className="label">Promo Description</label><br/>
            <TextField
              onChange={this.handleTextFields}
              name="description"
              value={this.state.description}
              style={{ width: '100%' }}
            />
            {
              descriptionErr.status &&
              <p className="error-message">* {descriptionErr.value}</p>
            }
          </div>
              
          <div className="form-group">
            <Checkbox
              checked={this.state.isPackOn}
              onCheck={(e) => this.handleCheckboxChange(e)}
              value="isPackOn"
              name="isPackOn"
              label="is_pack_on"
            />
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

export default SkuPromoForm
