import React, { Fragment } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import StateDetailsForm from './state-details-form'
import IfElse from '@components/declarative-if-else'

class CreateState extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit() {
    const data = this.stateDetailsForm.getData()

    // this.props.actions.updateState({
    //   id: data.id,
    //   is_available: data.isCityActive,
    //   deliverable_city: data.deliverable_city,
    //   state_short_name: data.state_short_name,
    //   gps: data.gps,
    //   name: data.cityName,
    //   geoboundary: data.geoboundary
    // }, this.disableEditMode)
  }

  render() {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px 0'
      }}
      >

        <div style={{ paddingTop: '40px' }}>

          <StateDetailsForm
            ref={(node) => { this.stateDetailsForm = node }}
          />

          <RaisedButton
            primary
            label="Submit"
            onClick={this.submit}
            style={{ marginTop: '40px' }}
          />

        </div>

      </div>
    )
  }
}

export default CreateState
