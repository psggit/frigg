import React from 'react'
import ViewBrandsInCollection from './view-brands-in-collection'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import { Card } from 'material-ui/Card'
import AddBrandDialog from './add-brand-dialog'

class ViewCollection extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountCollectionDialog: false
    }
    this.mountCollectionDialog = this.mountCollectionDialog.bind(this)
    this.unmountCollectionDialog = this.unmountCollectionDialog.bind(this)
  }

  mountCollectionDialog() {
    this.setState({ shouldMountCollectionDialog: true, open: true })
  }

  unmountCollectionDialog() {
    this.setState({ shouldMountCollectionDialog: false })
  }

  render() {
    return (
      <div>
        <Card
          style={{
            padding: '20px',
            paddingTop: '0',
            display: 'inline-block'
          }}
        >
          <div className="form-group">
            <label className="label">Name</label><br />
            <input style={{ marginTop: '10px' }} />
          </div>

          <div className="form-group">
            <label className="label">Display name</label><br />
            <input style={{ marginTop: '10px' }} />
          </div>

          <div className="form-group">
            <Checkbox
              disabled={false}
              checked={true}
              onCheck={this.handleCheckboxes}
              name="is_active"
              label="is_active"
            />
          </div>
        </Card>
        <br />
        <RaisedButton style={{ marginTop: '40px' }} label="Save" primary />
        <RaisedButton
          style={{ marginTop: '40px', marginLeft: '20px' }}
          onClick={this.mountCollectionDialog}
          label="Add item"
          primary
        />
        <ViewBrandsInCollection />
        {
          this.state.shouldMountCollectionDialog &&
          <AddBrandDialog
            unmountCollectionDialog={this.unmountCollectionDialog}
          />
        }
      </div>
    )
  }
}

export default ViewCollection
