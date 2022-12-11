import { UsersInterface } from 'interfaces/users.interface';
import React from 'react';
import './ItemGroupsAction.css';

function ItemGroupsAction({
  selected,
  deleteSelectedUsers,
}: {
  selected: UsersInterface[];
  deleteSelectedUsers: Function;
}) {
  function handleDelete() {
    const usersToRemoved = selected.map((user) => user.id);
    deleteSelectedUsers(usersToRemoved);
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
          <i className="fa-regular fa-copy"></i>
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
