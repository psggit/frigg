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

const TableHeaderItems = [
  '',
  'PROMO CODE',
  'CITY LIST',
  'ORDER TYPE',
  'PROMO STATUS'
]

const styles = [
  { width: '38px' },
  { width: '38px' },
  { width: '120px' },
  { width: '38px' },
  { width: '100px' }
]

class ManageCityPromos extends React.Component {

  constructor() {
    super()

    this.editPromoDetails = this.editPromoDetails.bind(this)
  }

  editPromoDetails(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/city-specific-promos/edit/${item.promo_code}`, item)
  }

  render() {
    const {
      loadingCitySpecificPromos,
      citySpecificPromos
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
              !loadingCitySpecificPromos
                ? (
                    citySpecificPromos.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableRowColumn style={styles[0]}>
                          <button
                            onClick={e => this.editPromoDetails(e, item)}
                          >
                            Edit
                          </button>
                        </TableRowColumn>
                        <TableRowColumn style={styles[1]}>{item.promo_code}</TableRowColumn>
                        <TableRowColumn style={styles[2]}>{item.city_list}</TableRowColumn>
                        <TableRowColumn style={styles[3]}>{item.order_type}</TableRowColumn>
                        <TableRowColumn style={styles[4]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn>
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

export default ManageCityPromos
