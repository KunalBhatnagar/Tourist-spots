import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import AttractionCard from './AttractionCard';

const TouristSpotsPopup = ({ spots, onClose, cityImage, mapUrl, location, onFavorite, isFavorited }) => {
  const popupMapRef = useRef(null);
  const popupMapInstance = useRef(null);
  // NEW: Ref to store marker instances
  const markersRef = useRef({});

  const getCoordinates = () => {
    if (location && typeof location.lat === 'number' && typeof location.lng === 'number') {
      return location;
    }
    if (spots && spots.length > 0 && spots[0].coordinates) {
      const [lng, lat] = spots[0].coordinates;
      return { lat, lng };
    }
    if (mapUrl) {
      const match = mapUrl.match(/mlat=([^&]+)&mlon=([^&]+)/);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
      }
    }
    return null;
  };

  useEffect(() => {
    const coordinates = getCoordinates();
    
    if (coordinates && popupMapRef.current && !popupMapInstance.current) {
      const { lat, lng } = coordinates;
      
      popupMapInstance.current = L.map(popupMapRef.current, {
        center: [lat, lng],
        zoom: 13,
        zoomControl: true,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(popupMapInstance.current);

      L.marker([lat, lng])
        .addTo(popupMapInstance.current)
        .bindPopup('Selected Location')
        .openPopup();

      // NEW: Clear old markers before adding new ones
      markersRef.current = {}; 

      spots.forEach((spot) => {
        if (spot.coordinates && Array.isArray(spot.coordinates)) {
          const [spotLng, spotLat] = spot.coordinates;
          if (typeof spotLat === 'number' && typeof spotLng === 'number') {
            const marker = L.marker([spotLat, spotLng])
              .addTo(popupMapInstance.current)
              .bindPopup(`<strong>${spot.name}</strong><br/>${spot.description}`);
            
            // NEW: Store the marker instance using the spot's name as a key
            markersRef.current[spot.name] = marker;
          }
        }
      });
    }

    return () => {
      if (popupMapInstance.current) {
        popupMapInstance.current.remove();
        popupMapInstance.current = null;
      }
    };
  }, [spots, mapUrl, location]);

  useEffect(() => {
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // NEW: Handlers for list-map interaction
  const handleAttractionHover = (spotName) => {
    const marker = markersRef.current[spotName];
    if (marker) {
      // Open the popup on hover to highlight the marker
      marker.openPopup();
    }
  };

  const handleAttractionLeave = (spotName) => {
    const marker = markersRef.current[spotName];
    if (marker) {
      // Close the popup when the mouse leaves
      marker.closePopup();
    }
  };

  const handleAttractionClick = (spot) => {
    const marker = markersRef.current[spot.name];
    if (marker && popupMapInstance.current) {
      // Smoothly fly to the marker's location and zoom in
      popupMapInstance.current.flyTo(marker.getLatLng(), 15);
      marker.openPopup();
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
                      Hover or click list items
                    </span>
                  </div>
                </div>
              ) : (
                <div className="map-placeholder-modern">
                  {/* ... placeholder content ... */}
                </div>
              )}
            </div>

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
                      <AttractionCard
                        key={spot.id || index}
                        spot={spot}
                        onHover={() => handleAttractionHover(spot.name)}
                        onLeave={() => handleAttractionLeave(spot.name)}
                        onClick={() => handleAttractionClick(spot)}
                        isFavorited={isFavorited ? isFavorited(spot.id) : false}
                        onFavorite={() => onFavorite && onFavorite(spot)}
                        location={location}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-attractions-modern">
                    {/* ... placeholder content ... */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="popup-footer">
          {/* ... footer content ... */}
        </div>
      </div>
    </div>
  );
};

export default TouristSpotsPopup;