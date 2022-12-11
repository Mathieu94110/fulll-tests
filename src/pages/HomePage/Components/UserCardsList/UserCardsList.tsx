import React from 'react';
import UserCardItem from './Components/UserCardItem/UserCardItem';
import './UserCardsList.css';
import { UsersInterface } from '../../../../interfaces/users.interface';

function UserCardsList({
  usersList,
  selected,
  setCheckedInfo,
}: {
  usersList: UsersInterface[];
  selected: UsersInterface[];
  setCheckedInfo: Function;
}) {
  const setCheckedId = (value: number) => {
    setCheckedInfo(value);
  };

  return (
    <>
      {!!usersList.length && (
        <div
          className="user-cards-list"
          style={{
            top: selected.length ? '212px' : '148px',
          }}
        >
          {usersList.map((user: UsersInterface, index: number) => (
            <UserCardItem
              key={index}
              userInfos={user}
              setCheckedInfo={setCheckedId}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default UserCardsList;
