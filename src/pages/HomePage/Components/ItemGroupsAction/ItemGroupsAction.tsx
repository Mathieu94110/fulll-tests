import React from 'react';
import './ItemGroupsAction.css';
import { UsersInterface } from 'interfaces/users.interface';
import { deepCopy } from '../../../../utils/DeepCopy';

function ItemGroupsAction({
  selected,
  deleteSelectedUsers,
  copySelectedUsers,
}: {
  selected: UsersInterface[];
  deleteSelectedUsers: Function;
  copySelectedUsers: Function;
}) {
  function handleDelete() {
    const usersToRemoved = selected.map((user) => user.id);
    deleteSelectedUsers(usersToRemoved);
  }
  async function handleCopy() {
    const usersToCopy = selected;
    const CopiedUsers = await deepCopy(usersToCopy);
    copySelectedUsers(CopiedUsers);
  }

  return (
    <div className="item-groups-action">
      <div>
        <input type="checkbox" className="item-groups-action-checkbox" />
        <span className="font-medium">
          {selected.length + ' elements selected'}{' '}
        </span>
      </div>
      <div>
        <span>
          {' '}
          <i className="fa-regular fa-copy" onClick={handleCopy}></i>
        </span>
        <span className="ml-10">
          {' '}
          <i className="fa-regular fa-trash-can" onClick={handleDelete}></i>
        </span>
      </div>
    </div>
  );
}

export default ItemGroupsAction;
