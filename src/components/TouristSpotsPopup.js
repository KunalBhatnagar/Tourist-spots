// src/components/TouristSpotsPopup.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const TouristSpotsPopup = ({ spots, onClose, cityImage, mapUrl, location }) => {
  const popupMapRef = useRef(null);
  const popupMapInstance = useRef(null);

  // Extract coordinates from spots or mapUrl
  const getCoordinates = () => {
    // First try to use the location prop (most reliable)
    if (location && typeof location.lat === 'number' && typeof location.lng === 'number') {
      return location;
    }
    
    // Fallback: extract from spots coordinates
    if (spots && spots.length > 0 && spots[0].coordinates) {
      const [lng, lat] = spots[0].coordinates;
      return { lat, lng };
    }
    
    // Last fallback: extract from mapUrl if available
    if (mapUrl) {
      const match = mapUrl.match(/mlat=([^&]+)&mlon=([^&]+)/);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
      }
    }
    
    return null;
  };
  // Initialize popup map
  // Handle escape key press to close popup
  useEffect(() => {
    const coordinates = getCoordinates();
    
    if (coordinates && popupMapRef.current && !popupMapInstance.current) {
      const { lat, lng } = coordinates;
      
      // Create map instance for popup
      popupMapInstance.current = L.map(popupMapRef.current, {
        center: [lat, lng],
        zoom: 13,
        zoomControl: true,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(popupMapInstance.current);

      // Add marker for main location
      L.marker([lat, lng])
        .addTo(popupMapInstance.current)
        .bindPopup('Selected Location')
        .openPopup();

      // Add markers for tourist spots if they have coordinates
      spots.forEach((spot, index) => {
        if (spot.coordinates && Array.isArray(spot.coordinates)) {
          const [spotLng, spotLat] = spot.coordinates;
          if (typeof spotLat === 'number' && typeof spotLng === 'number') {
            L.marker([spotLat, spotLng])
              .addTo(popupMapInstance.current)
              .bindPopup(`<strong>${spot.name}</strong><br/>${spot.description}`);
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (popupMapInstance.current) {
        popupMapInstance.current.remove();
        popupMapInstance.current = null;
      }
    };
  }, [spots, mapUrl, location]);
  React.useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  // Handle backdrop click to close popup
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleBackdropClick}>
      <div className="popup-modal">
        <div className="popup-header">
          <div className="popup-title">
            <h1>Explore Location</h1>
            <p>Discover amazing places and attractions</p>
          </div>
          <button 
            className="popup-close-btn" 
            onClick={onClose} 
            aria-label="Close popup"
            title="Close (Esc)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="popup-body">
          <div className="popup-grid">
            {/* Map Section */}
            <div className="map-section">
              <div className="section-header">
                <div className="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h2>Interactive Map</h2>
              </div>
              
              {(location || (spots && spots.length > 0) || mapUrl) ? (
                <div className="map-container-modern">
                  <div
                    ref={popupMapRef}
                    className="popup-map-modern"
                  />
                  <div className="map-controls">
                    <span className="map-hint">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"></path>
                      </svg>
                      Click markers for details
                    </span>
                  </div>
                </div>
              ) : (
                <div className="map-placeholder-modern">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <p>Map not available</p>
                  <span>No coordinates found for this location</span>
                </div>
              )}
            </div>

            {/* Attractions Section */}
            <div className="attractions-section">
              <div className="section-header">
                <div className="section-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h2>Top Attractions</h2>
                {spots && spots.length > 0 && (
                  <span className="attraction-count">{spots.length} places</span>
                )}
              </div>
              
              <div className="attractions-content">
                {spots && spots.length > 0 ? (
                  <div className="attractions-grid">
                    {spots.slice(0, 8).map((spot, index) => (
                      <div key={index} className="attraction-card">
                        <div className="attraction-header">
                          <div className="attraction-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                          </div>
                          <h3 className="attraction-name">{spot.name || 'Unnamed Location'}</h3>
                          {spot.rating !== 'N/A' && (
                            <div className="attraction-rating">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              <span>{spot.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="attraction-description">
                          {spot.description && spot.description !== 'No description available' 
                            ? (spot.description.length > 80 
                                ? spot.description.substring(0, 80) + '...'
                                : spot.description)
                            : 'Explore this amazing location'}
                        </p>
                        <div className="attraction-tags">
                          {spot.description && spot.description.split(',').slice(0, 3).map((tag, tagIndex) => (
                            <span key={tagIndex} className="attraction-tag">
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-attractions-modern">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <h3>No attractions found</h3>
                    <p>We couldn't find any tourist attractions for this location. Try searching for a different area.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="popup-footer">
          <div className="popup-stats">
            <div className="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{spots && spots.length > 0 ? spots.length : 0} attractions</span>
            </div>
            <div className="stat-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
              <span>Updated now</span>
            </div>
          </div>
          <button className="popup-close-action" onClick={onClose}>
            <span>Close</span>
            <kbd>ESC</kbd>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouristSpotsPopup;