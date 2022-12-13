import EditModeButton from './EditModeButton';
import { render, fireEvent, screen } from '@testing-library/react';

const EDIT_MODE_INPUT_ID = 'edit-mode-button';
const DIV_ID = 'div-styled';

it('changes toggle background when is checked/unchecked and checked value', () => {
  const { rerender } = render(<EditModeButton switchMode={() => true} />);
  const checkbox = screen.getByTestId(EDIT_MODE_INPUT_ID) as HTMLInputElement;
  const div = screen.getByTestId(DIV_ID);
  expect(checkbox.checked).toEqual(false);
  expect(div.style['background']).toEqual('red');
  fireEvent.click(checkbox);
  rerender(<EditModeButton switchMode={() => false} />);
  expect(checkbox.checked).toEqual(true);
  expect(div.style['background']).toEqual('green');
  fireEvent.click(checkbox);
});
