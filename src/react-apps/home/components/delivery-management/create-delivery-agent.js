import React from 'react'
import { Card } from 'material-ui/Card'
import DeliveryAgentDetailsForm from './delivery-agent-details-form'
import RaisedButton from 'material-ui/RaisedButton'

class CreateDeliveryAgent extends React.Component {
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
          <DeliveryAgentDetailsForm
          />
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

export default CreateDeliveryAgent
