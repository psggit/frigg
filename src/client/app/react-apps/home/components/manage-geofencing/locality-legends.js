import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors'
import getIcon from './icon-utils'
import '@sass/components/_list-item.scss'

// const rightIconMenu = (
//   <IconMenu iconButtonElement={getIcon('gear')}>
//     <MenuItem>Reply</MenuItem>
//     <MenuItem>Forward</MenuItem>
//     <MenuItem>Delete</MenuItem>
//   </IconMenu>
// )

function getLeftIconMarkup(color) {
  return (
    <span
      style={{
        background: color,
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        display: 'inline-block'
      }}
    />
  )
}

// function LocalityLegends(data) {
class LocalityLegends extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleRedraw = this.handleRedraw.bind(this)
  }

  handleClick(e, fenceIdx) {
    e.stopPropagation()
    this.setState({
      open: true,
      fenceIdx,
      anchorEl: e.currentTarget
    })
  }

  handleRequestClose() {
    this.setState({ open: false })
  }

  handleRedraw() {
    this.setState({ open: false })
    this.props.editGeoboundary(this.state.fenceIdx)
  }

  render() {
    return (
      <div style={{
        width: '200px',
        height: '600px',
        overflow: 'auto',
        position: 'absolute',
        left: '0',
        top: '40px'
      }}
      >
        <h4 style={{
          position: 'sticky',
          top: '-1px',
          background: '#fff',
          padding: '10px 10px 10px 15px',
          zIndex: '1',
          boxShadow: '0 2px 2px 0 #f6f6f6',
          margin: '0'
        }}
        >
        Localities
        </h4>
        <List>
          {
            this.props.legends.map((item, i) => {
              return (
                <ListItem
                  className="list-item"
                  style={{ fontSize: '14px', paddingRight: '20px' }}
                  key={item.id}
                  onMouseOver={() => { this.props.highlightFence(i) }}
                  onMouseOut={() => { this.props.unHighlightFence(i) }}
                  onClick={() => { this.props.focusFence(i) }}
                  primaryText={item.name}
                  leftIcon={getLeftIconMarkup(this.props.colors[i % this.props.colors.length])}
                >
                  <button
                    className="btn--icon"
                    onClick={(e) => { this.handleClick(e, i) }}
                    style={{
                      cursor: 'pointer',
                      pointerEvents: 'all',
                      position: 'absolute',
                      right: '0'
                    }}
                  >
                    { getIcon('gear') }
                  </button>
                </ListItem>
              )
            })
          }
        </List>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Redraw" onClick={this.handleRedraw} />
            <MenuItem primaryText="Edit" />
            <MenuItem primaryText="View" />
          </Menu>
        </Popover>
      </div>
    )
  }
  }
// }

export default LocalityLegends
