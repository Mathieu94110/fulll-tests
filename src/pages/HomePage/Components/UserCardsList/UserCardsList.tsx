import { useRef, ChangeEvent } from 'react';
import UserCardItem from '../../../../ui-components/UserCardItem/UserCardItem';
import EditModeButton from '../../../../ui-components/EditModeButton/EditModeButton';
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
  setCheckedInfo: (x: number) => void;
  setSelectAll: (x: string) => void;
  setEditMode: (x: string) => void;
  isEditMode: boolean;
}) {
  const isAllCheckedRef = useRef<HTMLInputElement>(null);

  function switchMode(e: ChangeEvent<HTMLInputElement>): void {
    e.target.checked ? setEditMode('on') : setEditMode('off');
  }

  function handleCheckedAll(e: ChangeEvent<HTMLInputElement>): void {
    e.target.checked ? setSelectAll('select') : setSelectAll('unselect');
  }

  function setCheckedId(value: number): void {
    setCheckedInfo(value);
  }

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
