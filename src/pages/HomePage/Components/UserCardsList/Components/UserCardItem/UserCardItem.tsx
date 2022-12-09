import React from 'react';
import './UserCardItem.css';
import logo from '../../../../../../assets/images/logo192.png';
function UserCardItem() {
  return (
    <div className="user-card-item box-shadow">
      <input type="checkbox" className="user-card-item-checkbox" />
      <img src={logo} className="user-card-item-img" alt="logo" />
      <p>ID</p>
      <p>Login</p>
      <input
        type="button"
        className="user-card-item-input-button font-small"
        value="View profile"
      />
    </div>
  );
}

export default UserCardItem;
