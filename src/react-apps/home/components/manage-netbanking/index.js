import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'
import {overrideTableStyle} from './../../../utils'

const TableHeaderItems = [
  '',
  'BANK CODE',
  'BANK NAME',
  'IMAGE',
  'LISTING ORDER'
]

class ViewBankList extends React.Component {

  constructor() {
    super()

    this.editBankDetail = this.editBankDetail.bind(this)
  }
  
  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  editBankDetail(e, item) {
    e.stopPropagation()
    this.props.history.push(`/home/manage-banking/edit/${item.bank_name}`, item)
  }

  render() {
    return (
      <Table
        wrapperStyle={{ height: 'auto' }}
        className="bordered--table"
        selectable={false}
        fixedHeader
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {
              TableHeaderItems.map((item, i) => <TableHeaderColumn key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {
            !this.props.loadingNetBanking
            ? (
              this.props.netBankingData.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableRowColumn>
                      <button
                        onClick={(e) => this.editBankDetail(e, item) }
                      >
                        Edit
                      </button>
                    </TableRowColumn>
                    <TableRowColumn>{item.bank_name}</TableRowColumn>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn>
                      <a target="_blank" href={item.image_url}>
                        <img
                          alt="ad-image"
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain'
                          }}
                          src={item.image_url}
                        />
                      </a>
                    </TableRowColumn>
                    <TableRowColumn>{item.listing_order}</TableRowColumn>
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
    )
   
  }
  
}

export default ViewBankList