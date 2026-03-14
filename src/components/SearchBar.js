import React, { useState } from 'react';

// Receive onGeolocate as a prop
const SearchBar = ({ onSearch, onGeolocate, history }) => {
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
    if (!e.target.value.trim()) {
      setIsSearching(false);
    }
  };

  // NEW: Handler for the geolocate button
  const handleGeolocateClick = async () => {
    setIsSearching(true);
    try {
      await onGeolocate();
    } catch (error) {
      console.error('Geolocation error:', error);
    } finally {
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
        
        {/* NEW: "Use My Location" button */}
        <button
          className="geolocate-button"
          onClick={handleGeolocateClick}
          disabled={isSearching}
          aria-label="Use my current location"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="3"></circle>
            <line x1="12" y1="1" x2="12" y2="5"></line>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="1" y1="12" x2="5" y2="12"></line>
            <line x1="19" y1="12" x2="23" y2="12"></line>
          </svg>
          Use My Location
        </button>
      </div>
      {history && history.length > 0 && (
        <div className="search-history" style={{ marginTop: '10px', textAlign: 'center' }}>
          {history.map(city => (
            <button 
              key={city}
              onClick={() => onSearch(city)}
              style={{
                background: 'rgba(255,255,255,0.7)', 
                border: '1px solid #ddd', 
                borderRadius: '15px', 
                padding: '5px 10px', 
                margin: '2px', 
                cursor: 'pointer'
              }}
            >
              {city}
            </button>
          ))}
        </div>
      )}
      
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