import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import ContactItem from './contact-item'
import CreateNewContactDialog from './create-new-contact'
import * as Actions from './../../actions'
import { getQueryObj } from '@utils/url-utils'

class UpdateRetailerContact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldMountCreateNewContactModal: false,
      retailer_contacts: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleActivate = this.handleActivate.bind(this)
    this.handleCreateNewContact = this.handleCreateNewContact.bind(this)
    this.unmountCreateNewContactModal = this.unmountCreateNewContactModal.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.mountCreartNewContactModal = this.mountCreartNewContactModal.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ retailer_contacts: nextProps.contactNumbersOfRetailer })
  }

  componentDidMount() {
    const queryObj = getQueryObj(location.search.slice(1))
    this.props.actions.fetchContactNumbersOfRetailer({
      retailer_id: parseInt(queryObj.id)
    })
  }

  handleCreateNewContact(phoneNumber, isActive) {
    const queryObj = getQueryObj(location.search.slice(1))
    this.props.actions.addRetailerNumbers([{
      retailer_id: parseInt(queryObj.id),
      mobile_number: phoneNumber,
      is_active: isActive
    }])

    this.setState({ shouldMountCreateNewContactModal: false })
  }

  mountCreartNewContactModal() {
    this.setState({ shouldMountCreateNewContactModal: true })
  }

  unmountCreateNewContactModal() {
    this.setState({ shouldMountCreateNewContactModal: false })
  }

  handleActivate(id, isActive) {
    const updatedRetailerContacts = this.state.retailer_contacts.slice()
    updatedRetailerContacts.map(item => {
      if (item.id === id) {
        item.is_active = !isActive
      }
    })

    this.setState({ retailer_contacts: updatedRetailerContacts })
  }

  handleChange(e) {
    const { target } = e
    // if (/[0-9]/.test(target.value) || !target.value.length) {
      const updatedRetailerContacts = this.state.retailer_contacts.slice()
      updatedRetailerContacts.map((item) => {
        if (item.id === parseInt(target.id, 10)) {
          item.mobile_number = target.value.trim()
        }
        return item
      })
      this.setState({ retailer_contacts: updatedRetailerContacts })
    // }
  }

  handleUpdate() {
    const queryObj = getQueryObj(location.search.slice(1))
    const { retailer_contacts } = this.state
    for (let i=0; i<retailer_contacts.length; i++) {
      if ( retailer_contacts[i].mobile_number.length < 10 ) {
        return
      }
    }
    const body = retailer_contacts.map(item => ({
      id: item.id,
      mobile_number: item.mobile_number,
      is_active: item.is_active
    }))

    this.props.actions.updateRetailerNumbers(body, parseInt(queryObj.id))
  }

  render() {
    return (
      <div>
        <RaisedButton
          style={{ marginTop: '20px' }}
          label="Add new contact"
          primary
          onClick={this.mountCreartNewContactModal}
        />
        {
          this.state.retailer_contacts.length
          ? (
            <div>
              <h4>Update contact for { this.props.match.params.retailerSlug }</h4>
              <Card
                style={{
                  padding: '20px',
                  width: '321px'
                }}
              >
                {
                  this.state.retailer_contacts.map(item => (
                    <ContactItem
                      key={item.id}
                      id={item.id}
                      isActive={item.is_active}
                      handleChange={this.handleChange}
                      handleActivate={this.handleActivate}
                      phoneNumber={item.mobile_number}
                    />
                  ))
                }
              </Card>
              <RaisedButton
                style={{ marginTop: '20px' }}
                label="Update"
                primary
                onClick={this.handleUpdate}
              />
            </div>
          )
          : <h4>No contacts to show.</h4>
        }
        {
          this.state.shouldMountCreateNewContactModal &&
          <CreateNewContactDialog
            handleCreateNewContact={this.handleCreateNewContact}
            unmountAddLocalityDialog={this.unmountCreateNewContactModal}
          />
        }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  contactNumbersOfRetailer: state.main.contactNumbersOfRetailer,
  loadingContactNumbersOfRetailer: state.main.loadingContactNumbersOfRetailer
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRetailerContact)
