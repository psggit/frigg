import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import * as Actions from './../actions'

export default function ConfirmCredits(data) {
  return class ConfirmCredits extends React.Component {

    constructor(props) {
      super(props)
      console.log("data", data)
    }

    renderAllCustomers() {
      return data.customerDetails.map((item,i) => {
        return (
          <tr>
            <button> delete </button>
            <td style={{textAlign: 'center'}}> {i+1} </td>
            {/* <td style={{textAlign: 'center'}}> {item.id} </td> */}
            <td style={{textAlign: 'center'}}> {item.name} </td>
            <td style={{textAlign: 'center'}}> {item.email} </td>
            <td style={{textAlign: 'center'}}> {item.transactionCode} </td>
            <td style={{textAlign: 'center'}}> {item.amount} </td>
            <td style={{textAlign: 'center'}}> {item.batchNo} </td>
          </tr>
        )
      })
    }

    render() {
      const style = { 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingBottom: '10px',
          marginBottom: '10px', 
          borderBottom: '1px solid #f6f6f6'
      }
      return (
        <ModalBox>
          <ModalHeader> CUSTOMERS </ModalHeader>
          <ModalBody>
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> ID </td>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> NAME </td>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> EMAIL ID </td>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> TRANSACTION CODE </td>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> AMOUNT </td>
                  <td style={{textAlign: 'center', fontWeight: '600'}}> BATCH NO </td>
                </tr>
                {
                  this.renderAllCustomers()
                }
              </tbody>
            </table>
          </ModalBody>
          {/* <ModalFooter>
            <div style={style}>
              <div style={{fontWeight: '600'}}>
                Cart total: {data.cartTotal}
              </div>
              <div style={{fontWeight: '600'}}>
                Delivery fee: {data.deliveryFee}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '600' }}>
              <div>
                Total: {data.total}
              </div>
              <button onClick={() => data.handleClick()}> PLACE ORDER </button>
            </div>
          </ModalFooter> */}
        </ModalBox>
      )
    }
  }
}

//export default NewAddress
