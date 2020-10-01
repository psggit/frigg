import React from "react"
import RaisedButton from 'material-ui/RaisedButton'
import MapDeliveryServiceProviderToCityForm from "./deliveryserviceprovider-city-form"

class MapDeliveryServiceProviderToCity extends React.Component {

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
    this.props.history.push(`/home/delivery-service-provider-city-mapping`)
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
            label="Back to Listing"
            onClick={this.handleClick}
            primary
          />
          <div style={{marginTop:"30px",display:"flex",flexWrap:"wrap"}}>
            {
              this.state.totalCardCount.map((item) => {
                // eslint-disable-next-line react/jsx-key
                return <MapDeliveryServiceProviderToCityForm />
              })
            }
          </div>
      </div>
    )
  }
}

export default MapDeliveryServiceProviderToCity