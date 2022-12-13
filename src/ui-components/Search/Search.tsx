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
        aria-label="search-input"
        className="search-input"
        type="text"
        placeholder="Search input"
        name="search-input"
      />
    </div>
  );
}

export default Search;
