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

      this.state = {
        totalConsumers : 0,
        invalidEmails : 0,
        totalCredits: 0
      }
    }

    componentDidMount() {
      let invalidEmail = data.customerDetails.filter((item) => {
        if(!item.valid) {
          return item;
        }
      })
      this.setState({totalConsumers: data.customerDetails.length, totalCredits: data.customerDetails[0].amount, invalidEmails: invalidEmail.length})
    }

    renderAllCustomers() {
      return data.customerDetails.map((item,i) => {
        return (
          <tr className={`row ${item.valid ? '' : 'highlight'}`} >
            <td className="col"> <button style={{padding: '5px 10px'}}> delete </button> </td>
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
      const { totalConsumers, invalidEmails, totalCredits } = this.state
      return (
        <ModalBox>
          <ModalHeader> CUSTOMERS </ModalHeader>
          <ModalBody>
            <div id="table-wrapper">
              <div id="table-scroll">
                <table>
                  <thead>
                    <tr className="header">
                      <td className="col"></td>
                      <td className="col">ID</td>
                      <td className="col">NAME</td>
                      <td className="col">EMAIL ID</td>
                      <td className="col">TRANSACTION CODE</td>
                      <td className="col">AMOUNT</td>
                      <td className="col">BATCH NO</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.renderAllCustomers()
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="summary">
              <div className="field"> Number of Consumers: <span> {totalConsumers + data.duplicateEmailIDCount} </span></div>
              <div className="field"> Total Credits: <span> {totalCredits} </span></div>
              <div className="field"> Invalid Emails: <span> {invalidEmails + data.duplicateEmailIDCount} </span></div>
            </div>
            <div style={{display: 'flex', margin: '10px', justifyContent: 'space-evenly'}}>
              <button onClick={data.handleClickOnCancel} style={{padding: '10px 20px', fontSize: '15px', cursor:'pointer'}}> Cancel </button>
              <button onClick={data.handleClickOnConfirm} style={{padding: '10px 20px', fontSize: '15px', cursor:'pointer'}}> Confirm </button>
            </div>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}

//export default NewAddress
