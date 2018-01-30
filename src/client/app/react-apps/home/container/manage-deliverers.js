import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../actions'
import { List, ListItem } from 'material-ui/List'

const mock_DPlist = {
  data: [
    { name: '', phone: '' },
    { name: '', phone: '' },
    { name: '', phone: '' }
  ]
}

const mock_DPdetails = [
  {
    name: '',
    phone: '',
    fences: [],
    retailers: []
  }
]

class ManageDeliverers extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', maxWidth: 900, margin: 'auto' }}>
        
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
)(ManageDeliverers)
