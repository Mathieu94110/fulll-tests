import React, { useState, useEffect, useRef } from 'react';
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
  const [allSelectMode, setAllSelectMode] = useState('unselect');
  const isFirstRender = useRef(true);

  const switchAllSelectMode = () => {
    allSelectMode === 'unselect'
      ? setAllSelectMode('select')
      : setAllSelectMode('unselect');
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // in order to avoit first useless setSelectAll call
    }
    setSelectAll(allSelectMode);
  }, [allSelectMode]);

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
            {allSelectMode === 'unselect' ? 'Select all:' : 'Unselect all:'}
            <input
              type="checkbox"
              className="user-cards-list-checkbox"
              onChange={switchAllSelectMode}
            />
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
