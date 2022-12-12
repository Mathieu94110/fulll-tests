import React, { useRef, ChangeEvent } from 'react';
import UserCardItem from './Components/UserCardItem/UserCardItem';
import './UserCardsList.css';
import { UsersInterface } from '../../../../interfaces/users.interface';

function UserCardsList({
  usersList,
  selected,
  setCheckedInfo,
  setSelectAll,
}: {
  usersList: UsersInterface[];
  selected: UsersInterface[];
  setCheckedInfo: Function;
  setSelectAll: Function;
}) {
  const isAllCheckedRef = useRef<HTMLInputElement>(null);

  const handleCheckedAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectAll('select');
    } else {
      setSelectAll('unselect');
    }
  };

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
          <div className="user-cards-list-selector">
            <label>
              {isAllCheckedRef.current && isAllCheckedRef.current['checked']
                ? 'Unselect all:'
                : 'Select all:'}
              <input
                ref={isAllCheckedRef}
                type="checkbox"
                className="user-cards-list-checkbox"
                onChange={handleCheckedAll}
              />
            </label>
          </div>
          <div className="user-cards-list-items">
            {usersList.map((user: UsersInterface, index: number) => (
              <UserCardItem
                key={index}
                userInfos={user}
                setCheckedInfo={setCheckedId}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserCardsList;
