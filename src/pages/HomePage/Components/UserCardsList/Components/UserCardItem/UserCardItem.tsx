import React from 'react';
import './UserCardItem.css';
// import logo from '../../../../../../assets/images/logo192.png';
import { UsersInterface } from 'interfaces/users.interface';

function UserCardItem({
  userInfos,
  setCheckedInfo,
}: {
  userInfos: UsersInterface;
  setCheckedInfo: Function;
}) {
  const handleClick = () => {
    setCheckedInfo(userInfos.id);
  };

  return (
    <div className="user-card-item box-shadow">
      <input
        type="checkbox"
        className="user-card-item-checkbox"
        onClick={handleClick}
      />
      <img
        src={userInfos.avatar_url}
        className="user-card-item-img"
        alt="logo"
      />
      <p>{userInfos.id}</p>
      <p>{userInfos.login}</p>
      <input
        type="button"
        className="user-card-item-input-button font-small"
        value="View profile"
      />
    </div>
  );
}

export default UserCardItem;
