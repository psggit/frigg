import React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import MapDeliveryAgentToWarehouseForm from "./deliveryagent-warehouse-form"

class MapDeliveryAgentToWarehouse extends React.Component {

  constructor () {
    super()

    this.state = {
      totalCardCount: [1]
    }
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd () {
    //console.log("Array Length", this.state.totalDeliveryAgentWarehouseCount)
    this.setState({
      totalCardCount: [...this.state.totalCardCount,this.state.totalCardCount.length+1],
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
              this.state.totalCardCount.map((item) => {
                // eslint-disable-next-line react/jsx-key
                return <MapDeliveryAgentToWarehouseForm />
              })
            }
          </div>
      </div>
    )
  }
}

export default MapDeliveryAgentToWarehouse