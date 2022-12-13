import { render, fireEvent, screen } from '@testing-library/react';
import Search from './Search';

const setup = () => {
  const mockOnChangeHandler = jest.fn();
  render(<Search setFilter={() => mockOnChangeHandler} />);
  const searchInput = screen.getByLabelText('search-input') as HTMLInputElement;
  return {
    searchInput,
  };
};

test('It should display the correct searched value', () => {
  const { searchInput } = setup();
  fireEvent.change(searchInput, { target: { value: 'brad' } });
  expect(searchInput.value).toBe('brad');
  fireEvent.change(searchInput, { target: { value: '' } });
  expect(searchInput.value).toBe('');
});

test('It should display correct placeholder text', () => {
  const { searchInput } = setup();
  expect(searchInput).toHaveAttribute('placeholder', 'Search input');
});
