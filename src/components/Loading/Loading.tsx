import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading">
      <i className={`fa-solid fa-spinner loading-spinner`}></i>
    </div>
  );
}

export default Loading;
