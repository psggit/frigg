
import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import '@sass/components/_table.scss'
import TableLoadingShell from './../table-loading-shell'

const TableHeaderItemsWithButton = [
  '',
  'ID',
  'BRAND_NAME',
  'BRAND_SHORT_NAME',
  'ORDINAL_POSITION',
  ''
]

const TableHeaderItems = [
  'ID',
  'BRAND_NAME',
  'BRAND_SHORT_NAME',
  'ORDINAL_POSITION'
]

const styles = [
  { width: '60px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' }
]

const headerStyles = [
  { width: '38px' },
  { width: '60px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' },
  { width: '120px' }
]

//function ViewBrandsInCollection(data) {
class ViewBrandsInCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brandMap: {},
    }

    this.enableInputBox = this.enableInputBox.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount() {
    this.updateState(this.props)
  }

  updateState(props) {
    let brandMap = {}
    let brandList = props.brandList.map((item) => {
      let brand = Object.assign({}, item)
      brand.modified = false
      brandMap[item.brand_id] = brand
      return brand
    })
    this.setState({brandMap: brandMap})
  }

  componentWillReceiveProps(newProps) {
    if(newProps.isUpdatingListingOrder) {
      let updatedList = Object.assign({}, this.state.brandMap)
      updatedList[item.brand_id].modified = false
      this.setState({brandMap: brandMap})
    } else {
      this.updateState(newProps)
    }
  }

  enableInputBox(brandId) {

    let updatedList = Object.assign({}, this.state.brandMap)

    if(!updatedList[brandId].modified) {
      updatedList[brandId].modified = true
      this.setState({brandMap: updatedList})
    } else {
      this.props.updateListingOrder({
        brand_id: brandId,
        listing_order: updatedList[brandId].orderListNo
      })
      // setTimeout(() => {
      //   updatedList[brandId].modified = false
      //   this.setState({brandMap: updatedList})
      // }, 1000)
    }    
  }

  handleChange(e, brandId) {

    let updatedList = Object.assign({}, this.state.brandMap)
    updatedList[brandId].orderListNo = parseInt(e.target.value)
    this.setState({brandMap: updatedList})
  }

  render() {
    const notificationStyle = {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.08)',
      display: 'flex',
      justifyContent: 'center',
      padding: '20px'
    }
    const editInputStyle = {
      border: 0,
      borderWidth: 0,
      width: '70px'
    }
   
    return (
      <Table
        className="bordered--table"
        selectable={false}
        fixedHeader
      >
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {
              this.props.showDelete ?
                TableHeaderItemsWithButton.map((item, i) => <TableHeaderColumn style={headerStyles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>) :
                TableHeaderItems.map((item, i) => <TableHeaderColumn style={styles[i]} key={`table-head-col-${i}`}>{item}</TableHeaderColumn>)
            }
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {
            this.props.loadingBrandsInCollection &&
            [1, 2, 3, 4, 5].map(() => {
              return <TableLoadingShell/>
            })
          }
          {
            this.props.showDelete && this.state.brandMap && Object.keys(this.state.brandMap).length > 0
            &&
            this.props.brandList.map((item, i) => {
              return <TableRow key={i}>
                        <TableRowColumn style={headerStyles[0]}>
                          <button onClick={() => this.props.removeBrand({ brand_id: item.brand_id, short_name: item.short_name })} style={{ fontSize: '13px', textTransform: 'none' }}> Delete </button>
                        </TableRowColumn>
                        <TableRowColumn style={headerStyles[1]}>{item.brand_id}</TableRowColumn>
                        <TableRowColumn style={headerStyles[2]}>{item.brand}</TableRowColumn>
                        <TableRowColumn style={headerStyles[3]}>{item.short_name}</TableRowColumn>
                        <TableRowColumn style={headerStyles[4]}>
                          <input type="number" value={this.state.brandMap[item.brand_id].orderListNo} onChange={(e) => this.handleChange(e, item.brand_id)} style={!this.state.brandMap[item.brand_id].modified ? editInputStyle : { width: '70px'}} disabled={!this.state.brandMap[item.brand_id].modified} />
                        </TableRowColumn>
                        <TableRowColumn style={headerStyles[5]}>
                          <button onClick={() => this.enableInputBox(item.brand_id)} style={{ fontSize: '13px', textTransform: 'none' }}> {!this.state.brandMap[item.brand_id].modified ? 'Edit' : 'Save'} </button>
                        </TableRowColumn>
                      </TableRow>
            })
          }
          {
            !this.props.showDelete && this.state.brandMap && Object.keys(this.state.brandMap).length > 0
            &&
            this.props.brandList.map((item, i) => {
              return <TableRow key={i}>
                      <TableRowColumn style={styles[0]}>{item.brand_id}</TableRowColumn>
                      <TableRowColumn style={styles[1]}>{item.brand}</TableRowColumn>
                      <TableRowColumn style={styles[2]}>{item.short_name}</TableRowColumn>
                      <TableRowColumn style={styles[3]}>{item.orderListNo}</TableRowColumn>
                    </TableRow>
            })
          }
          {
            !this.props.loadingBrandsInCollection && this.props.brandList.length === 0
            &&
            <div style={notificationStyle}> No brands found in the collection </div>
          }
        </TableBody>
      </Table>
    )
  }
}

export default ViewBrandsInCollection
