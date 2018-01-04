import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import '@sass/components/_form.scss'
import StateDetailsForm from './state-details-form'
import IfElse from '@components/declarative-if-else'
import { Card } from 'material-ui/Card'
import { getQueryObj } from '@utils/url-utils'

class ViewState extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit() {
    const data = this.stateDetailsForm.getData()
    const queryObj = getQueryObj(location.search.slice(1))
    // console.log(data);
    if (data.stateName.length && data.stateShortName.length) {
      this.props.actions.updateState({
        id: parseInt(queryObj.id),
        state_name: data.stateName,
        short_name: data.stateShortName,
      })
    }
  }

  render() {
    const queryObj = getQueryObj(location.search.slice(1))
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px 0'
      }}
      >

        <div>
          <Card
            style={{
              padding: '20px',
              paddingTop: '0',
              width: '400px',
              position: 'relative',
              display: 'inline-block',
              verticalAlign: 'top'
            }}
          >
            <StateDetailsForm
              ref={(node) => { this.stateDetailsForm = node }}
              stateName={queryObj.stateName}
              stateShortName={queryObj.stateShortName}
            />
            <RaisedButton
              primary
              label="Submit"
              onClick={this.submit}
              style={{ marginTop: '40px' }}
            />
          </Card>



        </div>

      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewState)
