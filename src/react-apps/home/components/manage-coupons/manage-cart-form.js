/* eslint-disable no-dupe-class-members */
/* eslint-disable react/jsx-key */
import React from "react"
import CartForm from "./cart-coupon-form"
import CartConstraintForm from "./cart-constraint-form"

class ManageCartForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cartConstraintFormData: {},
      cartCouponFormData: {}
    }

    this.getData = this.getData.bind(this)
  }

  getData () {
    return {
      cartFormRef: this.cartFormRef,
      cartConstraintFormRef: this.cartConstraintFormRef
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSave}>
        <CartForm 
          ref={(node) => { this.cartFormRef = node }}
        />
        {
          this.props.totalCartConstraints.map((item, i) => {
            return (
              <CartConstraintForm
                key={i}
                ref={(node) => { this.cartConstraintFormRef = node }}
              />
            )
          })
        }
      </form>
    )
  }
}

export default ManageCartForm