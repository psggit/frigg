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
    this.handleClick = this.handleClick.bind(this)
  }

  handleAdd () {
    this.setState({
      totalCardCount: [...this.state.totalCardCount,this.state.totalCardCount.length+1],
    })
  }

  handleClick() {
    this.props.history.push(`/home/deliveryagent-warehouse-mapping`)
  }

  render () {
    return (
      <div>
          <RaisedButton
            label="Add"
            onClick={this.handleAdd}
            style={{marginRight: "20px"}}
            primary
          />
          <RaisedButton
            label="Deliver Agent Mapped to Warehouse"
            onClick={this.handleClick}
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