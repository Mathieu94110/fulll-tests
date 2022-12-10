import React, { useEffect } from 'react';
import UserCardItem from './Components/UserCardItem/UserCardItem';
import './UserCardsList.css';
import { UsersInterface } from '../../../../interfaces/users.interface';

function UserCardsList({ usersList }: { usersList: UsersInterface[] }) {
  useEffect(() => {
    console.log(usersList);
  });
  return (
    <div className="user-cards-list">
      {usersList &&
        usersList.map((user: UsersInterface, index: number) => (
          <UserCardItem key={index} userInfos={user} />
        ))}
    </div>
  );
}

export default UserCardsList;
