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
    this.handleInputChange = this.handleInputChange.bind(this)
    this.switchStateForms = this.switchStateForms.bind(this)
  }

  componentDidMount() {
    this.props.fetchStates()
  }

  handleChange(e, k) {
    const { statesData } = this.props
    const stateIdx = k + 1
    this.setState({ stateIdx })
    this.postData = statesData[k]
    this.props.setStateData({
      stateData: statesData[k],
      stateIdx
    })
  }

  handleInputChange(e, value) {
    this.props.setStateData(value)
  }

  switchStateForms(value) {
    this.props.setStateData(null)
    this.setState({ isCreateNew: value, stateIdx: null })
  }

  render() {
    const { isCreateNew } = this.state
    const { statesData, loadingStates } = this.props

    return (
      <div>
        {
          isCreateNew
          ? (
            <div>
              <TextField
                defaultValue=""
                floatingLabelText="Enter state name"
                onChange={this.handleInputChange}
              />
              <div>
                <p style={{ color: '#9b9b9b', margin: '20px 0' }}>or</p>
                <RaisedButton
                  label="Choose state"
                  onClick={() => { this.switchStateForms(false) }}
                  style={{ marginRight: 12, marginTop: '10px' }}
                />
              </div>
            </div>
          )
          : (
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
              <p style={{ color: '#9b9b9b', margin: '20px 0' }}>or</p>
              <div>
                <RaisedButton
                  disabled={loadingStates}
                  label="Create new state"
                  onClick={() => { this.switchStateForms(true) }}
                  style={{ marginRight: 12, marginTop: '10px' }}
                />
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

export default ChooseState
