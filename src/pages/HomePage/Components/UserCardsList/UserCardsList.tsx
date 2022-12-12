import React, { useRef, ChangeEvent } from 'react';
import UserCardItem from './Components/UserCardItem/UserCardItem';
import EditModeButton from './Components/EditModeButton/EditModeButton';
import './UserCardsList.css';
import { UsersInterface } from '../../../../interfaces/users.interface';

function UserCardsList({
  usersList,
  selected,
  setCheckedInfo,
  setSelectAll,
  setEditMode,
  isEditMode,
}: {
  usersList: UsersInterface[];
  selected: UsersInterface[];
  setCheckedInfo: Function;
  setSelectAll: Function;
  setEditMode: Function;
  isEditMode: boolean;
}) {
  const isAllCheckedRef = useRef<HTMLInputElement>(null);

  const switchMode = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setEditMode('on');
    } else if (!event.target.checked) {
      setEditMode('off');
    }
  };

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
            top: selected.length && isEditMode ? '212px' : '148px',
          }}
        >
          <div className="user-cards-list-selectors">
            <EditModeButton switchMode={switchMode} />
            {isEditMode && (
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
            )}
          </div>
          <div className="user-cards-list-items">
            {usersList.map((user: UsersInterface, index: number) => (
              <UserCardItem
                key={index}
                userInfos={user}
                setCheckedInfo={setCheckedId}
                isEditMode={isEditMode}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserCardsList;
