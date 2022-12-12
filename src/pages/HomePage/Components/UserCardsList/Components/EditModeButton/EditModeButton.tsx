import React, { useRef, ChangeEvent } from 'react';

import './EditModeButton.css';

function EditModeButton({ switchMode }: { switchMode: Function }) {
  const isToggleCheckedRef = useRef<HTMLInputElement>(null);
  const handleToggleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    switchMode(event);
  };
  return (
    <div className="edit-mode-button-wrapper">
      <label>
        Edit
        <div
          className="edit-mode-button-switch"
          style={{
            background:
              isToggleCheckedRef.current &&
              isToggleCheckedRef.current['checked']
                ? 'green'
                : 'red',
          }}
        >
          <input
            type="checkbox"
            ref={isToggleCheckedRef}
            onChange={handleToggleCheck}
          />{' '}
          <div></div>
        </div>
      </label>
    </div>
  );
}

export default EditModeButton;
