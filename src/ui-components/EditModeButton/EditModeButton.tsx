import { useRef, ChangeEvent } from 'react';
import './EditModeButton.css';

function EditModeButton({
  switchMode,
}: {
  switchMode: (x: ChangeEvent<HTMLInputElement>) => void;
}) {
  const isToggleCheckedRef = useRef<HTMLInputElement>(null);

  function handleToggleCheck(e: ChangeEvent<HTMLInputElement>): void {
    switchMode(e);
  }

  return (
    <div className="edit-mode-button-wrapper">
      <label>
        Edit
        <div
          className="edit-mode-button-switch"
          data-testid="div-styled"
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
            data-testid="edit-mode-button"
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
