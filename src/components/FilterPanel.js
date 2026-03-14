import React, { useState } from 'react';
import { SPOT_CATEGORIES } from '../utils/constants';

const FilterPanel = ({ onFilter, isOpen, onClose }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('rating');

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApplyFilter = () => {
    onFilter({ categories: selectedCategories, sortBy });
    onClose();
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSortBy('rating');
    onFilter({ categories: [], sortBy: 'rating' });
  };

  return (
    <div className={`filter-panel ${isOpen ? 'open' : ''}`}>
      <div className="filter-header">
        <h2>🔍 Filter Spots</h2>
        <button
          className="filter-close"
          onClick={onClose}
          aria-label="Close filter"
        >
          ✕
        </button>
      </div>

      <div className="filter-content">
        <div className="filter-section">
          <h3>Categories</h3>
          <div className="categories-grid">
            {Object.entries(SPOT_CATEGORIES).map(([key, value]) => (
              <button
                key={key}
                className={`category-btn ${selectedCategories.includes(key) ? 'selected' : ''}`}
                onClick={() => toggleCategory(key)}
              >
                <span className="category-icon">{value.icon}</span>
                <span className="category-name">{key}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="rating">⭐ Rating (High to Low)</option>
            <option value="name">📝 Name (A-Z)</option>
            <option value="distance">📍 Distance (Near to Far)</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="filter-btn reset" onClick={handleReset}>
            Reset
          </button>
          <button className="filter-btn apply" onClick={handleApplyFilter}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
