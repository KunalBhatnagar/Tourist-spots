// src/components/CityPopup.js

import React from 'react';

const CityPopup = ({ cityImage, spots, onClose, mapUrl }) => {
  return (
    <div className="popup-background" style={{ backgroundImage: `url(${cityImage})` }}>
      <div className="popups-container">
        {/* Map Popup */}
        <div className="single-popup">
          <h2>Map</h2>
          <img src={mapUrl} alt="Map" style={{ width: '100%', borderRadius: '8px' }} />
        </div>

        {/* Tourist Spots Popup */}
        <div className="single-popup">
          <h2>Top 10 Tourist Spots</h2>
          {spots.map((spot, index) => (
            <div key={index}>
              <p><strong>{spot.name}</strong></p>
              <p>{spot.description}</p>
              <p>Rating: {spot.rating}</p>
            </div>
          ))}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CityPopup;
