import React, { useEffect } from "react"
import { render, unmountComponentAtNode } from "react-dom"

export function mountModal(Component) {
  document.body.style = "overflow:hidden"
  render(<Component />, document.getElementById("confirm-modal"))
}

export function unmountModal() {
  document.body.style = "overflow:auto"
  unmountComponentAtNode(document.getElementById("confirm-modal"))
}