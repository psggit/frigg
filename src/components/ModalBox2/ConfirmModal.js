import React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import { ModalBox, ModalHeader, ModalBody, ModalFooter } from "./index"
import { unmountModal } from "./api"
import "./ConfirmModal.scss"

export default function ConfirmModal(props) {
  return class ConfirmModal extends React.Component {
    render() {
      const { title, message, handleConfirm } = props
      return (
        <div id="confirm-modal">
          <ModalBox>
            <ModalHeader><h3>{title}</h3></ModalHeader>
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
              <RaisedButton
                onClick={unmountModal}
                label="Cancel"
              />
              <RaisedButton
                onClick={handleConfirm}
                label="Confirm"
              />
            </ModalFooter>
          </ModalBox>
        </div>
      )
    }
  }
}