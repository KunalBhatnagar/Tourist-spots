// src/components/Map.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const WorldMap = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize map on mount
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [20, 0],
        zoom: 2,
        minZoom: 2, // Prevent zooming out too much
        maxZoom: 19,
        zoomControl: true,
        dragging: false, // Disable dragging initially
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        maxBounds: [[-90, -180], [90, 180]], // World bounds
        maxBoundsViscosity: 1.0 // Prevent dragging outside bounds
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
        noWrap: false // Allow tiles to wrap around the world
      }).addTo(mapInstance.current);

      // Enable dragging only when zoomed in beyond initial level
      mapInstance.current.on('zoomend', function() {
        if (mapInstance.current.getZoom() > 2) {
          mapInstance.current.dragging.enable();
        } else {
          mapInstance.current.dragging.disable();
        }
      });
    }

    // If a location is provided, zoom in on that location and add marker
    if (location && mapInstance.current) {
      const { lat, lng } = location;
      
      // Validate coordinates
      if (typeof lat === 'number' && typeof lng === 'number' && 
          lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        
        // Remove existing marker if it exists
        if (markerRef.current) {
          mapInstance.current.removeLayer(markerRef.current);
        }

        // Add new marker
        markerRef.current = L.marker([lat, lng]).addTo(mapInstance.current);
        
        // Zoom to location (this will enable dragging since zoom > 2)
        mapInstance.current.setView([lat, lng], 12);
      } else {
        console.warn('Invalid coordinates provided:', { lat, lng });
      }
    }

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        // Remove marker if it exists
        if (markerRef.current) {
          mapInstance.current.removeLayer(markerRef.current);
          markerRef.current = null;
        }
      }
    };
  }, [location]); // Re-run effect if location changes

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="world-map"
      style={{ 
        height: '100vh', 
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
      }} 
    />
  );
};

export default WorldMap;