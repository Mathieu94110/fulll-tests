import React from 'react';
import './ItemGroupsAction.css';

function ItemGroupsAction() {
  return (
    <div className="item-groups-action">
      <div>
        <input type="checkbox" className="item-groups-action-checkbox" />
        <span className="font-medium">3 elements selected</span>
      </div>
      <div>
        <span>
          {' '}
          <i className="fa-regular fa-copy"></i>
        </span>
        <span className="ml-10">
          {' '}
          <i className="fa-regular fa-trash-can"></i>
        </span>
      </div>
    </div>
  );
}

export default ItemGroupsAction;
