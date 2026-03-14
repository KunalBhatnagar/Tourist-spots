import React from 'react';
import { getCategoryIcon } from '../utils/constants';

const FavoritesPanel = ({ favorites, onRemove, onSelect, isOpen, onClose }) => {
  return (
    <div className={`favorites-panel ${isOpen ? 'open' : ''}`}>
      <div className="favorites-header">
        <h2>❤️ My Favorites</h2>
        <button
          className="favorites-close"
          onClick={onClose}
          aria-label="Close favorites"
        >
          ✕
        </button>
      </div>

      <div className="favorites-content">
        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <p>No favorite spots yet</p>
            <small>Click the heart icon on attractions to save them</small>
          </div>
        ) : (
          <div className="favorites-list">
            {favorites.map(spot => (
              <div
                key={spot.id}
                className="favorite-item"
                onClick={() => onSelect(spot)}
              >
                <div className="favorite-icon">
                  {getCategoryIcon(spot.description)}
                </div>
                <div className="favorite-info">
                  <h4>{spot.name}</h4>
                  <p>{spot.description}</p>
                </div>
                <button
                  className="favorite-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(spot.id);
                  }}
                  aria-label="Remove from favorites"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPanel;
