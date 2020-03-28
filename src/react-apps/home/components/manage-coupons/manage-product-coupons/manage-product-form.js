/* eslint-disable no-dupe-class-members */
/* eslint-disable react/jsx-key */
import React from "react"
import ProductForm from "../cart-coupon-form"
import ProductConstraintForm from "./product-constraint-form"

class ManageProductForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      productConstraintFormData: {},
      productCouponFormData: {},
      productConstraints: props.totalProductConstraints ? props.totalProductConstraints : []
    }

    this.getData = this.getData.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (this.props.totalProductConstraints !== prevProps.totalProductConstraints) {
      this.setState({
        productConstraints: this.props.totalProductConstraints
      })
    }
  }

  getData () {
    return {
      productFormRef: this.productFormRef,
      productConstraintFormRef: this.productConstraintFormRef
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSave}>
        <ProductForm
          ref={(node) => { this.productFormRef = node }}
        />
        {
          this.state.productConstraints.map((item, i) => {
            return (
              <ProductConstraintForm
                key={i}
                data={item}
                ref={(node) => { this.productConstraintFormRef = node }}
              />
            )
          })
        }
      </form>
    )
  }
}

export default ManageProductForm