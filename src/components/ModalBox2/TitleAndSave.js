import React from "react"
import { ModalBox, ModalHeader, ModalBody, ModalFooter } from "./index"
import RaisedButton from 'material-ui/RaisedButton'
import { unmountModal } from "./api"
import "./TitleAndSave.scss"

export default function TitleAndSave({ title, children, handleSave }) {
  return (
    <div id="title-and-save">
      <ModalBox>
        <ModalHeader><h3>{title}</h3></ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <button onClick={unmountModal}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </ModalFooter>
      </ModalBox>
    </div>
  )
}