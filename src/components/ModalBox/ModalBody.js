import React from 'react'

class ModalBody extends React.Component {
  render () {
    return (
      <div className='modal-body' style={{ maxHeight: this.props.maxHeight || '100%' }}>
        { this.props.children }
      </div>
    )
  }
}

export default ModalBody
