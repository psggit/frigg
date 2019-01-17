import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'
import { NavLink } from 'react-router-dom'
import TableLoadingShell from './../table-loading-shell'
import '@sass/components/_table.scss'
import { isoToNormalDate } from '@utils/date-utils'

const TableHeaderItems = [
  '',
  // 'ID',
  'TITLE',
  'ACTIVE FROM',
  'ACTIVE TO',
  'STATUS',
  'CITY',
  'URL',
  'LISTING ORDER',
]

const styles = [
  { width: '38px' },
  // { width: '38px' },
  { width: '80px' },
  { width: '64px', lineHeight: '1.6' },
  { width: '64px', lineHeight: '1.6' },
  { width: '38px' },
  { width: '60px' },
  { width: '60px' },
  { width: '38px' }
]

function ViewConsumerAds(data) {
  //console.log("data",data)
  return (
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
          !data.loadingConsumerAds
          ? (
            data.consumerAdsData.map(item => (
              <TableRow key={item.id}>
                <TableRowColumn style={styles[0]}>
                  <button
                    onClick={() => {
                      data.updateConsumerAdStatus({
                        status: item.status === 'Active' ? 'Inactive' : 'Active',
                        ad_id: item.ad_id,
                        city_id: item.city_id
                      }, data.updateConsumerAdStatusCB)
                    }}
                  >
                    { item.status === 'Active' ? 'Disable' : 'Enable' }
                  </button>
                </TableRowColumn>
                {/* <TableRowColumn style={styles[1]}>{item.ad_id}</TableRowColumn> */}
                <TableRowColumn style={styles[1]}>{item.ad_title}</TableRowColumn>
                <TableRowColumn style={styles[2]}>{isoToNormalDate(item.active_from)}</TableRowColumn>
                <TableRowColumn style={styles[3]}>{isoToNormalDate(item.active_to)}</TableRowColumn>
                <TableRowColumn style={styles[4]}>{item.status}</TableRowColumn>
                <TableRowColumn style={styles[5]}>{item.CityName}</TableRowColumn>
                <TableRowColumn style={styles[6]}>
                  <a target="_blank" href={item.url}>
                    <img
                      alt="ad-image"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain'
                      }}
                      src={item.url}
                    />
                  </a>
                </TableRowColumn>
                <TableRowColumn style={styles[7]}>{item.listing_order}</TableRowColumn>
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
  )
}

export default ViewConsumerAds
