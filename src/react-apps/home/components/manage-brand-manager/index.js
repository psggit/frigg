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
import {overrideTableStyle} from './../../../utils'
import Moment from "moment"

const TableHeaderItems = [
  '',
  'ID',
  'NAME',
	'EMAIL',
	'MOBILE',
	'COMPANY',
	'STATUS',
	'KYC STATUS',
	'CREATED AT',
	'UPDATED AT'
]

const styles = [
  { width: '38' },
  { width: '38px' },
  { width: '120px' },
  { width: '120px' },
	{ width: '100px' },
	{ width: '100px' },
	{ width: '100px' },
	{ width: '100px' },
	{ width: '100px' },
	{ width: '100px' }
]

class ViewBrandManagerList extends React.Component {

  constructor() {
    super()

    this.editBrandManagerDetails = this.editBrandManagerDetails.bind(this)
	}
	
	componentDidMount() {
		this.overrideTableStyle()
	}

	overrideTableStyle() {
    // document.querySelectorAll(".bordered--table")[1].parentElement.style.overflow = "auto"
    overrideTableStyle()
  }

  editBrandManagerDetails(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/manage-brand-manager/edit/${item.id}`, item)
  }

  render() {
    const {
			loadingBrandManagers,
			brandManagers
    } = this.props
    return (
      <div>
        <Table
          wrapperStyle={{ height: 'auto' }}
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
              !loadingBrandManagers
                ? (
                  brandManagers.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editBrandManagerDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.name}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.email}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.mobile_number}</TableRowColumn>
												<TableRowColumn style={styles[5]}>{item.company_name}</TableRowColumn>
												<TableRowColumn style={styles[6]}>{item.activity_status ? 'Active' : 'Inactive'}</TableRowColumn>
												<TableRowColumn style={styles[7]}>{item.kyc_status}</TableRowColumn>
												<TableRowColumn style={styles[8]}>{Moment(item.created_at).format("DD-MM-YYYY h:mm:s")}</TableRowColumn>
												<TableRowColumn style={styles[9]}>{Moment(item.updated_at).format("DD-MM-YYYY h:mm:s")}</TableRowColumn>
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

export default ViewBrandManagerList
