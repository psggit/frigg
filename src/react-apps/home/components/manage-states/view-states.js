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
import { overrideTableStyle } from './../../../utils'

const TableHeaderItems = [
  '',
  'ID',
  'NAME',
  'SHORT NAME',
  'PRICE TYPE',
  'UPI',
  'GIFT WALLET',
  'HIPBAR WALLET',
  'IS PRESENTATION',
  'IS BRANDS',
  'GST NUMBER',
  'SGST NUMBER',
  'CGST NUMBER',
  'IGST NUMBER',
  'STATUS',
  'DELIVERABLE',
  ''
]

const styles = [
  { width: '38px' },
  { width: '30px' },
  { width: '38px' },
  { width: '50px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '50px' },
  { width: '38px' },
  { width: '50px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '38px' },
  { width: '55px' },
  { width: '100px' }
]

class ViewStates extends React.Component {

  constructor(props) {
    super(props)

    this.handleView = this.handleView.bind(this)
  }


  componentDidMount() {
    this.overrideTableStyle()
  }

  overrideTableStyle() {
    overrideTableStyle()
  }

  handleView(item) {
    console.log("handle view")

    const queryParams = {
      id: item.id,
      stateName: item.state_name,
      stateShortName: item.short_name,
      priceType: item.price_type,
      gst: item.gst_number,
      sgst: item.sgst_percentage,
      cgst: item.cgst_percentage,
      igst: item.igst_percentage,
      fkEnabled: item.fk_enabled,
      // selectedCityIdx:item.default_city_id,
      isUPIEnabled: item.upi_enabled,
      isGiftWalletEnabled: item.gift_wallet_enabled,
      isHipbarWalletEnabled: item.hbwallet_enabled,
      //isCatalogEnabled: item.catalog_enabled,
      // addMoney:item.add_money,
      isActive: item.is_active,
      isDeliverable: item.is_deliverable,
      isPresentationEnabled: item.is_presentation_enabled,
      isBrandDetailsEnabled: item.is_brand_details_enabled,
    }
    //console.log("histry", props.history.location)
    this.props.history.push(`/home/manage-states/${item.state_name}`, queryParams)
  }

  render() {
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
            !this.props.loadingStates
              ? (
                this.props.statesData.map(item => (
                  <TableRow key={item.id}>
                    <TableRowColumn style={styles[0]}>
                      <FlatButton
                        primary
                        label="View"
                        onClick={() => this.handleView(item)}
                      />
                    </TableRowColumn>
                    <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
                    <TableRowColumn style={styles[2]}>{item.state_name}</TableRowColumn>
                    <TableRowColumn style={styles[3]}>{item.short_name}</TableRowColumn>
                    <TableRowColumn style={styles[4]}>{item.price_type}</TableRowColumn>
                    <TableRowColumn style={styles[5]}>{item.upi_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                    <TableRowColumn style={styles[6]}>{item.gift_wallet_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                    <TableRowColumn style={styles[7]}>{item.hbwallet_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                    <TableRowColumn style={styles[8]}>{item.is_presentation_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                    <TableRowColumn style={styles[9]}>{item.is_brand_details_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
                    <TableRowColumn style={styles[10]}>{item.gst_number}</TableRowColumn>
                    <TableRowColumn style={styles[11]}>{item.sgst_percentage}</TableRowColumn>
                    <TableRowColumn style={styles[12]}>{item.cgst_percentage}</TableRowColumn>
                    <TableRowColumn style={styles[13]}>{item.igst_percentage}</TableRowColumn>
                    <TableRowColumn style={styles[14]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn>
                    <TableRowColumn style={styles[15]}>{item.is_deliverable ? 'Deliverable' : 'Undeliverable'}</TableRowColumn>
                    <TableRowColumn style={styles[16]}>
                      <NavLink to={`/home/manage-states/possession-limits/${item.short_name}`}>Possession Limits</NavLink>
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
    )
  }
}
// function ViewCities(props) {
//   console.log("props", props)
//   const handleView = (item) => {
//     console.log("handle view")

//     const queryParams = {
//       id: item.id,
//       stateName: item.state_name,
//       stateShortName: item.short_name,
//       priceType: item.price_type,
//       gst:item.gst_number,
//       sgst:item.sgst_percentage,
//       cgst:item.cgst_percentage,
//       igst:item.igst_percentage,
//       // selectedCityIdx:item.default_city_id,
//       isUPIEnabled: item.upi_enabled,
//       isGiftWalletEnabled: item.gift_wallet_enabled,
//       isHipbarWalletEnabled: item.hbwallet_enabled,
//       //isCatalogEnabled: item.catalog_enabled,
//       // addMoney:item.add_money,
//       isActive: item.is_active,
//       isDeliverable:item.is_deliverable
//     }
//     //console.log("histry", props.history.location)
//     props.history.push(`/home/manage-states/${item.state_name}`, queryParams)
//   }

//   return (
//     <Table
//       className="bordered--table"
//       selectable={false}
//       fixedHeader
//     >
//       <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
//         <TableRow>
//           {
//             TableHeaderItems.map((item, i) => <TableHeaderColumn style={styles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
//           }
//         </TableRow>
//       </TableHeader>
//       <TableBody
//         displayRowCheckbox={false}
//         showRowHover
//       >
//         {
//           !props.loadingStates
//           ? (
//             props.statesData.map(item => (
//               <TableRow key={item.id}>
//                 <TableRowColumn style={styles[0]}>
//                   <FlatButton
//                     primary
//                     label="View"
//                     onClick={() => handleView(item)}
//                   />
//                 </TableRowColumn>
//                 <TableRowColumn style={styles[1]}>{item.id}</TableRowColumn>
//                 <TableRowColumn style={styles[2]}>{item.state_name}</TableRowColumn>
//                 <TableRowColumn style={styles[3]}>{item.short_name}</TableRowColumn>
//                 <TableRowColumn style={styles[4]}>{item.price_type}</TableRowColumn>
//                 <TableRowColumn style={styles[5]}>{item.upi_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
//                 <TableRowColumn style={styles[6]}>{item.gift_wallet_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
//                 <TableRowColumn style={styles[7]}>{item.hbwallet_enabled ? 'Enabled' : 'Disabled'}</TableRowColumn>
//                 <TableRowColumn style={styles[8]}>{item.gst_number}</TableRowColumn>
//                 <TableRowColumn style={styles[9]}>{item.sgst_percentage}</TableRowColumn>
//                 <TableRowColumn style={styles[10]}>{item.cgst_percentage}</TableRowColumn>
//                 <TableRowColumn style={styles[11]}>{item.igst_percentage}</TableRowColumn>
//                 <TableRowColumn style={styles[12]}>{item.is_active ? 'Active' : 'Inactive'}</TableRowColumn>
//                 <TableRowColumn style={styles[13]}>{item.is_deliverable ? 'Deliverable' : 'Undeliverable'}</TableRowColumn>
//                 <TableRowColumn style={styles[14]}>
//                     <NavLink to={`/home/manage-states/possession-limits/${item.short_name}`}>Possession Limits</NavLink>
//                 </TableRowColumn>
//               </TableRow>
//             ))
//           )
//           : (
//             [1, 2, 3, 4, 5].map(() => (
//               <TableLoadingShell />
//             ))
//           )
//         }
//       </TableBody>
//     </Table>
//   )
// }

export default ViewStates
