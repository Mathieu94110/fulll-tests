import React from 'react';
import UserCardItem from './Components/UserCardItem/UserCardItem';
import './UserCardsList.css';
import { UsersInterface } from '../../../../interfaces/users.interface';

function UserCardsList({
  usersList,
  setCheckedInfo,
}: {
  usersList: UsersInterface[];
  setCheckedInfo: Function;
}) {
  const setCheckedId = (value: number) => {
    setCheckedInfo(value);
  };

  return (
    <div className="user-cards-list">
      {usersList &&
        usersList.map((user: UsersInterface, index: number) => (
          <UserCardItem
            key={index}
            userInfos={user}
            setCheckedInfo={setCheckedId}
          />
        ))}
    </div>
  );
}

export default UserCardsList;
