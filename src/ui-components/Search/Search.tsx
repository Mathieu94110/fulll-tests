import { ChangeEvent } from 'react';
import './Search.css';

function Search({ setFilter }: { setFilter: (x: string) => void }) {
  function handleInput(e: ChangeEvent<HTMLInputElement>): void {
    const filter = e.currentTarget.value;
    setFilter(filter.trim().toLowerCase());
  }
  return (
    <div className="search">
      <input
        onInput={handleInput}
        className="search-input"
        type="text"
        placeholder="Search input"
      />
    </div>
  );
}

export default Search;
