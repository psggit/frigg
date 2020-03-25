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
      cartCouponFormData: {},
      cartConstraints: props.totalCartConstraints ? props.totalCartConstraints : []
    }

    this.getData = this.getData.bind(this)
  }

  componentDidUpdate (prevProps) {
    console.log("manage cart console", this.props, "prev props", prevProps)
    if(this.props.totalCartConstraints !== prevProps.totalCartConstraints) {
      this.setState({
        cartConstraints: this.props.totalCartConstraints
      })
    }
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
          this.state.cartConstraints.map((item, i) => {
            return (
              <CartConstraintForm
                key={i}
                data={item}
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