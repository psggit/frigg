import React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import MapDeliveryAgentToWarehouseForm from "./deliveryagent-warehouse-form"

class MapDeliveryAgentToWarehouse extends React.Component {

  constructor () {
    super()

    this.state = {
      Array: [1],
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd () {
    console.log("Array Length",this.state.Array)
    this.setState({
      Array: [ ...this.state.Array,{id:this.state.Array.length}]
    })
  }

  render () {
    return (
      <div>
          <RaisedButton
            label="Add"
            onClick={this.handleAdd}
            primary
          />
          <div style={{marginTop:"30px",display:"flex",flexWrap:"wrap"}}>
          {
            this.state.Array.map((item) => {
              // eslint-disable-next-line react/jsx-key
              return <MapDeliveryAgentToWarehouseForm
                id={item.id}
              />
            })
          }
          </div>
      </div>
    )
  }
}

export default MapDeliveryAgentToWarehouse