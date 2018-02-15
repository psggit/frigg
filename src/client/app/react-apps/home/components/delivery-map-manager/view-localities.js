import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './../../actions'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'

const TableHeaderItems = [
  'ID',
  'NAME',
  ''
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

class ViewLocalities extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedLocality: null
    }
    this.handleChangeLocality = this.handleChangeLocality.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchLocalities({
      city_id: null,
      is_available: false,
      offset: 0,
      limit: 10,
      no_filter: true
    })
  }

  handleChangeLocality(e) {
    this.setState({ selectedLocality: parseInt(e.target.value) })
    this.props.setLocalityId(e.target.value)
  }

  render() {
    const {
      loadingGeolocalities,
      geoLocalitiesData
    } = this.props

    return (
      <div>
        <Table
          className="bordered--table"
          selectable={false}
          fixedHeader
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {
                TableHeaderItems.map((item, i) => <TableHeaderColumn style={styles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
              }
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover
          >
            {
              !loadingGeolocalities
              ? (
                geoLocalitiesData.fences.map(item => (
                  <TableRow key={item.id}>
                    <TableRowColumn style={styles[0]}>{item.id}</TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.name}</TableRowColumn>
                    <TableRowColumn style={styles[2]}>
                      <RadioButtonGroup
                        valueSelected={this.state.selectedLocality}
                        name="localityId"
                        onChange={this.handleChangeLocality}
                      >
                        <RadioButton value={item.id} />
                      </RadioButtonGroup>
                    </TableRowColumn>
                  </TableRow>
                ))
              )
              : (
                [1, 2, 3, 4, 5].map(() => (
                  <TableLoadingShell />
                ))
              )
            }
          </TableBody>
        </Table>
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
)(ViewLocalities)
