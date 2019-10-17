import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import * as Actions from './../actions'
import './../../../sass/confirm-credits.scss'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

//export default function ConfirmCredits(data) {
  class ConfirmCredits extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        totalConsumers : 0,
        invalidUsers : 0,
        totalCredits: 0,
        disableConfirm: false,
        open: true
      }

      this.handleClick = this.handleClick.bind(this)
      this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
      let invalidUser = this.props.data.filter((item) => {
        if(!item.valid) {
          return item;
        }
      })
      this.setState({ totalConsumers: this.props.data.length, totalCredits: this.props.data[0].amount, invalidUserss: invalidUser.length})
    }

    // handleClickOpen() {
    //   this.setState({ open: true });
    // }
  
    handleClose() {
      this.setState({ open: false });
      setTimeout(() => {
        this.props.unMountModal()
      }, 500)
    }

    handleClick() {
      this.setState({ disableConfirm: true, open: false }, () => {
        this.props.handleClickOnConfirm()
      })
      //console.log("hi")
      //this.props.handleClickOnConfirm()
      // setTimeout(() => {
      //   this.props.unMountModal()
      // }, 500)
    }

    componentDidUpdate(prevProps) {
      if(prevProps.data !== this.props.data) {
        let invalidUser = this.props.data.filter((item) => {
          if (!item.valid) {
            return item;
          }
        })
        if (this.props.data.length === 0 || this.props.data.length === invalidUser.length) {
          this.setState({totalCredits: 0})
        } else {
          this.setState({totalCredits: 0})
        }
        this.setState({ totalConsumers: this.props.data.length, invalidUsers: invalidUser.length })
      }
     }

    renderAllCustomers() {
      return this.props.data.map((item,i) => {
        return (
          <tr key={i} className={`row ${item.valid ? '' : 'highlight'}`} >
            <td className="col"> 
              {/* <FlatButton primary style={{ fontSize: '13px' }} label="Delete" onClick={() => this.props.deleteCredit(item.email)}/> */}
              <button style={{ fontSize: '11px', height: '20px', padding: '1px 7px 2px', cursor: 'pointer' }} onClick={() => this.props.deleteCredit(item.id)}> delete </button>
            </td>
            <td className="col"> {item.id} </td>
            <td className="col"> {item.name} </td>
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
      const actions = [
        <FlatButton
          label="Cancel"
          onClick={this.props.unMountModal}
        />,
  
        <RaisedButton
          primary
          label="Confirm"
          disabled={this.state.disableConfirm}
          onClick={this.handleClick}
        />
      ]
      const { totalConsumers, invalidUsers, totalCredits } = this.state
      return (
        // <ModalBox>
        //   <ModalHeader> CUSTOMERS </ModalHeader>
        //   <ModalBody>
        //     <div id="table-wrapper">
        //       <div id="table-scroll">
        //         <table>
        //           <thead>
        //             <tr className="header">
        //               <td className="col"></td>
        //               <td className="col">ID</td>
        //               <td className="col">NAME</td>
        //               <td className="col">EMAIL ID</td>
        //               <td className="col">TRANSACTION CODE</td>
        //               <td className="col">AMOUNT</td>
        //               <td className="col">BATCH NO</td>
        //             </tr>
        //           </thead>
        //           <tbody>
        //             {
        //               this.renderAllCustomers()
        //             }
        //           </tbody>
        //         </table>
        //       </div>
        //     </div>
        //   </ModalBody>
        //   <ModalFooter>
        //     <div className="summary">
        //       <div className="field"> Number of Consumers: <span> {totalConsumers + data.duplicateEmailIDCount} </span></div>
        //       <div className="field"> Total Credits: <span> {totalCredits} </span></div>
        //       <div className="field"> Invalid Emails: <span> {invalidEmails + data.duplicateEmailIDCount} </span></div>
        //     </div>
        //     <div style={{display: 'flex', margin: '10px', justifyContent: 'space-evenly'}}>
        //       <button onClick={data.handleClickOnCancel} style={{padding: '10px 20px', fontSize: '15px', cursor:'pointer'}}> Cancel </button>
        //       <button onClick={data.handleClickOnConfirm} style={{padding: '10px 20px', fontSize: '15px', cursor:'pointer'}}> Confirm </button>
        //     </div>
        //   </ModalFooter>
        // </ModalBox>
        <Dialog
          autoScrollBodyContent
          title="Customers"
          contentStyle={{ width: '100%', maxWidth: '700px' }}
          modal={false}
          open={this.state.open}
          actions={actions}
          //onRequestClose={this.handleClose}
        >
          <div id="table-wrapper">
            <div id="table-scroll">
              <table>
                <thead>
                  <tr className="header">
                    <td className="col"></td>
                    <td className="col">ID</td>
                    <td className="col">NAME</td>
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
          <div className="summary">
            <div className="field"> Number of Consumers: <span> {totalConsumers + this.props.duplicateUserIdCount} </span></div>
            <div className="field"> Total Credits: <span> {totalCredits} </span></div>
            <div className="field"> Invalid Users: <span> {invalidUsers + this.props.duplicateUserIdCount} </span></div>
          </div>
        </Dialog>
      )
    }
  }
//}

export default ConfirmCredits
