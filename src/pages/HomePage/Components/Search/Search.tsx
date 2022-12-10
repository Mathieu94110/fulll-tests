import React, { ChangeEvent } from 'react';
import './Search.css';

function Search({ setFilter }: { setFilter: Function }) {
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const filter = e.currentTarget.value;
    setFilter(filter);
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
