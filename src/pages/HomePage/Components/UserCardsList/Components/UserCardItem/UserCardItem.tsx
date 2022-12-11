import React from 'react';
import './UserCardItem.css';
import { UsersInterface } from 'interfaces/users.interface';

function UserCardItem({
  userInfos,
  setCheckedInfo,
}: {
  userInfos: UsersInterface;
  setCheckedInfo: Function;
}) {
  const toggle = () => {
    setCheckedInfo(userInfos.id);
  };
  const openInNewTab = (url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="user-card-item box-shadow">
      <input
        type="checkbox"
        className="user-card-item-checkbox"
        onChange={toggle}
        checked={userInfos.selected}
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
        onClick={() => openInNewTab(userInfos.html_url)}
      />
    </div>
  );
}

export default UserCardItem;
