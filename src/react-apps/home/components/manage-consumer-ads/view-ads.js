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
import { overrideTableStyle } from './../../../utils'
import { getIcon } from "@components/utils"
import { mountModal } from "@components/ModalBox2/api"
import UpdateListingOrderModal from "./UpdateListingOrderModal"
import UpdateAdTimings from "./updateAdExpiryTime"

const TableHeaderItems = [
  '',
  'ID',
  'TITLE',
  'ACTIVE FROM',
  'ACTIVE TO',
  'STATUS',
  'CITY',
  'IS CRITICAL',
  'HIGH RES',
  'APP TYPE',
  'AD TYPE',
  'LISTING ORDER',
  // ''
]

const styles = [
  { width: '38px' },
  { width: '18px' },
  { width: '100px' },
  { width: '140px', lineHeight: '1.6' },
  { width: '140px', lineHeight: '1.6' },
  { width: '38px' },
  { width: '60px' },
  { width: '60px' },
  { width: '60px' },
  { width: '60px' },
  { width: '60px' },
  { width: '60px' },
  // { width: '38px' }
]

class ViewConsumerAds extends React.Component {
  constructor() {
    super()
    this.handleEditListingOrder = this.handleEditListingOrder.bind(this)
  }
  componentDidMount() {
    console.log("props", this.props)
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    // document.querySelectorAll(".bordered--table")[1].parentElement.style.overflow = "auto"
    overrideTableStyle()
  }
  handleEditListingOrder(item) {
    mountModal(UpdateListingOrderModal({
      listing_order: item.listing_order,
      ad_id: item.ad_id,
      city_id: item.city_id,
      city_name: item.CityName,
      // activePage: this.props.activePage,
      // limit: this.props.limit,
      fetchConsumerAds: this.props.fetchConsumerAds
    }))
  }
  handleEditAdTimings(item, fieldNameToUpdate) {
    mountModal(UpdateAdTimings({
      active_from: item.active_from,
      active_to: item.active_to,
      ad_id: item.ad_id,
      city_id: item.city_id,
      city_name: item.CityName,
      fieldNameToUpdate,
      fetchConsumerAds: this.props.fetchConsumerAds
    }))
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
              TableHeaderItems.map((item, i) => <TableHeaderColumn style={styles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {
            !this.props.loadingConsumerAds
              ? (
                this.props.consumerAdsData.map(item => (
                  <TableRow key={item.id}>
                    <TableRowColumn style={styles[0]}>
                      <button
                        onClick={() => {
                          this.props.updateConsumerAdStatus({
                            status: item.status === 'Active' ? 'Inactive' : 'Active',
                            ad_id: item.ad_id,
                            city_id: item.city_id
                          }, this.props.updateConsumerAdStatusCB)
                        }}
                      >
                        {item.status === 'Active' ? 'Disable' : 'Enable'}
                      </button>
                    </TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.ad_id}</TableRowColumn>
                    <TableRowColumn style={styles[2]}>{item.ad_title}</TableRowColumn>
                    <TableRowColumn style={styles[3]}>
                      {isoToNormalDate(item.active_from)}
                      <span onClick={e => { this.handleEditAdTimings(item, "active_from") }} style={{ marginLeft: "10px", cursor: "pointer" }}>{getIcon('pencil')}</span>
                    </TableRowColumn>
                    <TableRowColumn style={styles[4]}>
                      {isoToNormalDate(item.active_to)}
                      <span onClick={e => { this.handleEditAdTimings(item, "active_to") }} style={{ marginLeft: "10px", cursor: "pointer" }}>{getIcon('pencil')}</span>
                    </TableRowColumn>
                    <TableRowColumn style={styles[5]}>{item.status}</TableRowColumn>
                    <TableRowColumn style={styles[6]}>{item.CityName}</TableRowColumn>
                    <TableRowColumn style={styles[7]}>{item.is_critical ? 'Active' : 'Inactive'}</TableRowColumn>
                    <TableRowColumn style={styles[8]}>
                      <a target="_blank" href={item.high_res_image}>
                        <img
                          alt="ad-image"
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'contain'
                          }}
                          src={item.high_res_image}
                        />
                      </a>
                    </TableRowColumn>
                    <TableRowColumn style={styles[9]}>{item.app_type}</TableRowColumn>
                    <TableRowColumn style={styles[10]}>{item.ad_type}</TableRowColumn>
                    <TableRowColumn style={styles[11]}>
                      {item.listing_order}
                      {/* {item.listing_order} */}
                      <span onClick={e => { this.handleEditListingOrder(item) }} style={{ marginLeft: "10px", cursor: "pointer" }}>{getIcon('pencil')}</span>
                    </TableRowColumn>
                    {/* <TableRowColumn style={styles[0]}>
                      <button onClick={() => {

                      }}>
                        Update
                      </button>
                    </TableRowColumn> */}
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

}

export default ViewConsumerAds