import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'

const ContactItem = ({
  id,
  handleChange,
  handleActivate,
  phoneNumber,
  isActive
}) => (
  <div className="form-group">
    <input
      disabled={!isActive}
      style={{
        padding: '11px 10px',
        borderRadius: '2px',
        border: '1px solid #dfdfdf',
        marginRight: '20px',
        fontSize: '14px',
        width: '100px',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
      maxLength={10}
      id={id}
      onChange={handleChange}
      value={phoneNumber}
      type="text"
    />
    <Checkbox
      style={{ display: 'inline-block', width: 'auto', verticalAlign: 'middle' }}
      label="is_active"
      onCheck={() => { handleActivate(id, isActive) }}
      checked={isActive}
    />
  </div>
)

export default ContactItem
