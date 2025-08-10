// src/components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (inputValue.trim()) {
      setIsSearching(true);
      try {
        await onSearch(inputValue.trim());
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Reset searching state if input is cleared
    if (!e.target.value.trim()) {
      setIsSearching(false);
    }
  };

  return (
    <div className={`search-bar ${isSearching ? 'move-up' : ''}`}>
      <div className="search-input-container">
        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a city name..."
          disabled={isSearching}
          aria-label="Search for a city"
        />
        <button 
          className="search-button" 
          onClick={handleSearch}
          disabled={isSearching || !inputValue.trim()}
          aria-label="Search"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {isSearching && (
        <div className="search-loading">
          <div className="spinner"></div>
          <span>Searching for tourist spots...</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;