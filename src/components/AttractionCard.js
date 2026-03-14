import React from 'react';
import { getCategoryIcon, calculateDistance } from '../utils/constants';

const AttractionCard = ({
  spot,
  onHover,
  onLeave,
  onClick,
  isFavorited,
  onFavorite,
  location
}) => {
  const distance = location && spot.coordinates
    ? calculateDistance(spot.coordinates, [location.lng, location.lat])
    : null;

  const renderRating = (rating) => {
    if (rating === 'N/A' || rating === 'Not rated') return 'Not rated';
    const num = parseFloat(rating);
    if (isNaN(num)) return rating;
    return `${num.toFixed(1)}⭐`;
  };

  return (
    <div
      className="attraction-card-enhanced"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="attraction-card-header">
        <div className="card-icon">
          {getCategoryIcon(spot.description)}
        </div>
        <button
          className={`card-favorite-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorited ? '❤️' : '🤍'}
        </button>
      </div>

      <h3 className="card-title">{spot.name}</h3>

      <p className="card-category">
        {spot.description.split(',')[0]}
      </p>

      <div className="card-stats">
        <div className="stat">
          <span className="stat-label">Rating:</span>
          <span className="stat-value">{renderRating(spot.rating)}</span>
        </div>
        {distance && (
          <div className="stat">
            <span className="stat-label">Distance:</span>
            <span className="stat-value">{distance}</span>
          </div>
        )}
      </div>

      {spot.kinds.length > 0 && (
        <div className="card-tags">
          {spot.kinds.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <button className="card-more-btn">
        View Details →
      </button>
    </div>
  );
};

export default AttractionCard;
