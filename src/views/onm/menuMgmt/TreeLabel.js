import React, { Component } from 'react';

class TreeLabel extends Component {
  render() {
    const { title, onEdit, onDelete } = this.props;

    return (
      <span className="cus-label">
        <span>{title}</span>
        &nbsp;
        <span style={{ color: 'blue' }} onClick={onEdit}>
          Edit
        </span>
        &nbsp;
        <label onClick={e => e.stopPropagation()}>
          <input type="checkbox" /> checked
        </label>
        &nbsp;
        <span style={{ color: '#EB0000' }} onClick={onDelete}>
          Delete
        </span>
      </span>
    );
  }
}

export default TreeLabel;
