import React from "react"
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import TableLoadingShell from '../table-loading-shell'
import '@sass/components/_table.scss'
import Moment from "moment"
import {overrideTableStyle} from '../../../utils'

const TableHeaderItems = [
  '',
  'COMPANY_ID',
  'COMPANY_NAME',
  'CITY NAME',
  'STATE NAME',
  'ADDRESS',
  'PINCODE'
]

const styles = [
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' }
]

class ViewCompany extends React.Component {

  constructor() {
    super()

    this.handleRowClick = this.handleRowClick.bind(this)
  }

  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  handleRowClick(e, item) {
    this.props.history.push(`/home/manage-company/edit/${item.id}`, item)
  }

  render() {
    const {
      loadingCompanyList,
      companyList
    } = this.props
    return (
      <div>
        <Table
          wrapperStyle={{ height: 'auto' }}
          className="bordered--table clickable"
          selectable={false}
          fixedHeader
          //onCellClick={this.handleCellClick}
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
              !loadingCompanyList
                ? (
                  companyList.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.handleRowClick(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.city_name}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.state_name}</TableRowColumn>
                        <TableRowColumn style={styles[5]}>{item.address}</TableRowColumn>
                        <TableRowColumn style={styles[6]}>{item.pin_code}</TableRowColumn>
                      </TableRow> 
                    )
                  })
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

export default ViewCompany
