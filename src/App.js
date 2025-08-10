// src/App.js
import React, { useState } from "react";
import "./App.css"; // Import the CSS file
import WorldMap from "./components/Map";
import SearchBar from "./components/SearchBar";
import TouristSpotsPopup from "./components/TouristSpotsPopup";

const App = () => {
  const [spots, setSpots] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState(null);
  const [cityImage, setCityImage] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const generateMapUrl = (lat, lon, zoom = 10) => {
    // OpenStreetMap tile URL with parameters for latitude, longitude, and zoom level
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;
  };

  const handleSearch = async (city) => {
    if (!city.trim()) return;
    
    setIsLoading(true);
    setError('');
    setSpots([]); // Clear previous spots
    setShowPopup(false); // Close popup if open
    setCityImage(''); // Clear previous image
    
    try {
      // Fetch the coordinates for the city from OpenTripMap
      const response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(city)}&apikey=5ae2e3f221c38a28845f05b688fe380cc74d18dfc8b7286ddfe46dbb`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch location data (${response.status})`);
      }
      
      const data = await response.json();
  
      if (!data || !data.lat || !data.lon) {
        throw new Error('Location not found. Please try a different city name.');
      }
  
      const { lat, lon } = data; // Get latitude and longitude

      // Generate map URL using the latitude and longitude
      const generatedMapUrl = generateMapUrl(lat, lon);
      setMapUrl(generatedMapUrl); // Set the map URL in state
      setLocation({ lat, lng: lon }); // Set location state with consistent naming
      
      // Fetch an image of the city from Unsplash (run in parallel with tourist spots)
      const imagePromise = fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=dd3_nxMcHeTI7r8UVI0dFmx5-xCIFetSo63s2iiV93A`)
        .then(response => {
          if (!response.ok) {
            console.warn('Failed to fetch city image');
            return null;
          }
          return response.json();
        })
        .then(imageData => {
          const cityImageUrl = imageData?.results?.[0]?.urls?.full || '';
          setCityImage(cityImageUrl);
        })
        .catch(error => {
          console.warn('Error fetching city image:', error);
          setCityImage(''); // Set empty on error
        });
      
      // Fetch tourist spots around the coordinates
      const spotsResponse = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&apikey=5ae2e3f221c38a28845f05b688fe380cc74d18dfc8b7286ddfe46dbb&limit=10`);
      
      if (!spotsResponse.ok) {
        throw new Error(`Failed to fetch tourist spots (${spotsResponse.status})`);
      }
      
      const spotsData = await spotsResponse.json();
  
      // Process the spots data with better error handling
      if (!spotsData.features || !Array.isArray(spotsData.features)) {
        throw new Error('No tourist spots found in this area');
      }

      const topSpots = spotsData.features
        .filter(spot => spot.properties && spot.properties.name) // Only spots with names
        .map((spot) => ({
          name: spot.properties.name,
          description: spot.properties.kinds || 'No description available',
          rating: spot.properties.rate || 'N/A',
          coordinates: spot.geometry?.coordinates // Add coordinates if needed
        }))
        .slice(0, 10); // Ensure we don't exceed 10 spots

      if (topSpots.length === 0) {
        throw new Error('No named tourist spots found in this area');
      }
  
      setSpots(topSpots); // Update the spots state
      
      // Wait for image fetch to complete before showing popup
      await imagePromise;
      
      setShowPopup(true); // Show the popup with tourist spots
    } catch (error) {
      console.error('Error fetching tourist spots:', error);
      setError(error.message || 'An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="app-container">
      <div className="spot-locater">Spot Locater</div>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <div className="error-message" style={{ 
          color: 'red', 
          textAlign: 'center', 
          padding: '10px',
          backgroundColor: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '4px',
          margin: '10px'
        }}>
          {error}
        </div>
      )}
      
      {isLoading && (
        <div className="loading-message" style={{ 
          textAlign: 'center', 
          padding: '20px',
          fontSize: '16px'
        }}>
          Loading...
        </div>
      )}
      
      {cityImage && (
        <div className="city-image-container">
          <img 
            src={cityImage} 
            alt="City view" 
            className="city-image"
            onError={(e) => {
              e.target.style.display = 'none';
              setCityImage(''); // Clear image if it fails to load
            }}
          />
        </div>
      )}
      
      <WorldMap location={location} />
      
      {showPopup && (
        <TouristSpotsPopup 
          spots={spots} 
          onClose={handleClosePopup} 
          mapUrl={mapUrl}
          cityImage={cityImage}
          location={location}
        />
      )}
    </div>
  );
};

export default App;