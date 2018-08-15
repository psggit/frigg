import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import * as Actions from './../actions'
import './../../../sass/confirm-credits.scss'

export default function ConfirmCredits(data) {
  return class ConfirmCredits extends React.Component {

    constructor(props) {
      super(props)
    }

    renderAllCustomers() {
      return data.customerDetails.map((item,i) => {
        return (
          <tr className={`row ${item.valid ? '' : 'highlight'}`} >
            <td className="col"> <button> delete </button> </td>
            <td className="col"> {i+1} </td>
            <td className="col"> {item.name} </td>
            <td className="col"> {item.email} </td>
            <td className="col"> {item.transactionCode} </td>
            <td className="col"> {item.amount} </td>
            <td className="col"> {item.batchNo} </td>
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
                <tr className="header">
                  <td className="col"></td>
                  <td className="col"> ID </td>
                  <td className="col"> NAME </td>
                  <td className="col"> EMAIL ID </td>
                  <td className="col"> TRANSACTION CODE </td>
                  <td className="col"> AMOUNT </td>
                  <td className="col"> BATCH NO </td>
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
