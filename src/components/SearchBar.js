// src/components/SearchBar.js
import React, { useState } from 'react';


const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false); // Manage searching state

  const handleSearch = () => {
    if (inputValue.trim()) {
      setIsSearching(true); // Set searching state to true
      onSearch(inputValue);
    }
  };

  return (
    <div className={`search-bar ${isSearching ? 'move-up' : ''}`}> {/* Add move-up class */}
      <input
        className="search-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a place..."
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
