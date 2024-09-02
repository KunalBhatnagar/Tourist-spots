// src/components/Map.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const WorldMap = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Initialize map on mount
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([20, 0], 2); // Initial view of the world

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapInstance.current);
    }

    // If a location is provided, zoom in on that location
    if (location) {
      const { lat, lng } = location; // Assume location has lat and lng
      mapInstance.current.setView([lat, lng], 10); // Zoom level can be adjusted
    }
  }, [location]); // Re-run effect if location changes

  return (
    <div  ref={mapRef} style={{ height: '100vh', width: '100%' }} />
  );
};

export default WorldMap;
