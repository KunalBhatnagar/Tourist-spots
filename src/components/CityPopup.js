// src/components/CityPopup.js
import React from 'react';

const CityPopup = ({ cityImage, spots, onClose, mapUrl }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-background" style={{ backgroundImage: `url(${cityImage})` }}>
        <div className="popup-content">
          <button className="close-button" onClick={onClose} aria-label="Close popup">
            ×
          </button>
          
          <div className="popups-container">
            {/* Map Popup */}
            <div className="single-popup">
              <h2>Map View</h2>
              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  title="Location Map"
                  className="map-frame"
                  style={{ 
                    width: '100%', 
                    height: '300px', 
                    borderRadius: '8px',
                    border: 'none'
                  }}
                />
              ) : (
                <p>Map not available</p>
              )}
            </div>

            {/* Tourist Spots Popup */}
            <div className="single-popup">
              <h2>Top Tourist Spots</h2>
              {spots && spots.length > 0 ? (
                <div className="spots-list">
                  {spots.map((spot, index) => (
                    <div key={index} className="spot-item">
                      <p><strong>{spot.name}</strong></p>
                      <p className="spot-description">{spot.description}</p>
                      <p className="spot-rating">Rating: {spot.rating}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No tourist spots available</p>
              )}
              
              <button className="close-action-button" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPopup;