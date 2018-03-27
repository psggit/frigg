import React from 'react'
import { Card } from 'material-ui/Card'
import getIcon from './../icon-utils'

class CheckResultCard extends React.Component {
  constructor() {
    super()
    this.colorMap = {
      'system fail': '#ff3b34',
      'success': '#2fa72f',
      'warning': '#FF9800'
    }
    this.state = {
      toggled: false
    }
    this.toggleResultCard = this.toggleResultCard.bind(this)
  }

  toggleResultCard() {
    this.setState({ toggled: !this.state.toggled })
  }

  render() {
    const { status, checkName, data } = this.props
    let dataList = data.split('\n')

    dataList = dataList.filter(item => item.length)
    console.log(dataList);
    return (
      <Card
        onClick={this.toggleResultCard}
        style={{
          padding: '20px 40px',
          cursor: 'pointer'
        }}
      >
        <div style={{ position: 'relative' }}>
          <p>
            <b>{ checkName }</b>
            <span style={{
              color: '#fff',
              background: this.colorMap[status],
              padding: '5px 20px',
              marginLeft: '20px',
              borderRadius: '29px',
              fontSize: '12px',
              textTransform: 'uppercase'
            }}
            >
              { status }
            </span>
          </p>
          {
            dataList.length
            ? (
              <span
                style={{
                  float: 'right',
                  position: 'absolute',
                  top: '50%',
                  right: '0px',
                  transform: 'translateY(-50%)'
                }}
              >
                { getIcon('down-arrow')}
              </span>
            )
            : ''
          }
        </div>
        {
          this.state.toggled && dataList.length &&
          <div style={{ padding: '10px 0' }}>
            <ul>
              {
                dataList.map((item, i) => {
                  return <li key={i}>{ item }</li>
                })
              }
            </ul>
          </div>
        }
      </Card>
    )
  }
}

export default CheckResultCard
