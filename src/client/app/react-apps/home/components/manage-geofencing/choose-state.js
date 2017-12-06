import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class ChooseState extends React.Component {
  constructor(props) {
    super(props)
    this.postData = null
    this.state = {
      stateIdx: props.stateIdx,
      isCreateNew: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.props.fetchStates()
  }

  handleChange(e, k) {
    const { statesData } = this.props
    const stateIdx = k + 1
    this.setState({ stateIdx })
    // this.postData = statesData[k]
    this.props.setStateData({
      stateData: statesData[k],
      stateIdx
    })
  }

  getData() {
    return this.state
  }

  render() {
    const { statesData, loadingStates } = this.props

    return (
      <div>
        <SelectField
          disabled={loadingStates}
          floatingLabelText="Choose state"
          value={this.state.stateIdx}
          onChange={this.handleChange}
        >
          {
            statesData.map((state, i) => (
              <MenuItem
                value={i + 1}
                key={state.id}
                primaryText={state.state_name}
              />
            ))
          }
        </SelectField>
      </div>
    )
  }
}

export default ChooseState
