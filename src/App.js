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
    
    try {
      // Fetch the coordinates for the city from OpenTripMap
      const response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(city)}&apikey=5ae2e3f221c38a28845f05b688fe380cc74d18dfc8b7286ddfe46dbb`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
  
      if (!data || !data.lat || !data.lon) {
        throw new Error('Location not found');
      }
  
      const { lat, lon } = data; // Get latitude and longitude

      // Generate map URL using the latitude and longitude
      const generatedMapUrl = generateMapUrl(lat, lon);
      
      // Fetch an image of the city from Unsplash
      const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&client_id=dd3_nxMcHeTI7r8UVI0dFmx5-xCIFetSo63s2iiV93A`);
      
      if (!imageResponse.ok) {
        throw new Error(`Image fetch error! status: ${imageResponse.status}`);
      }
      
      const imageData = await imageResponse.json();
      const cityImage = imageData.results[0]?.urls.full || ''; // Get the first image URL
  
      // Update states
      setCityImage(cityImage); // Set city image state
      setLocation({ lat, lng: lon }); // Set location state with consistent naming
      setMapUrl(generatedMapUrl); // Set the map URL in your state
      
  
      // Fetch tourist spots around the coordinates
      const spotsResponse = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&apikey=5ae2e3f221c38a28845f05b688fe380cc74d18dfc8b7286ddfe46dbb&limit=10`);
      
      if (!spotsResponse.ok) {
        throw new Error(`Tourist spots fetch error! status: ${spotsResponse.status}`);
      }
      
      const spotsData = await spotsResponse.json();
  
      // Process the spots data
      const topSpots = spotsData.features.map((spot) => ({
        name: spot.properties.name,
        description: spot.properties.kinds,
        rating: spot.properties.rate || 'N/A', // If available
      }));
  
      setSpots(topSpots); // Update the spots state
      setShowPopup(true); // Show the popup with tourist spots
    } catch (error) {
      console.error('Error fetching tourist spots:', error);
      setError(error.message || 'An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="spot-locater">Spot Locater</div>
      {error && (
        <div className="error-message" style={{ color: 'red', textAlign: 'center', padding: '10px' }}>
          {error}
        </div>
      )}
      {cityImage && (
        <div className="city-image-container">
          <img src={cityImage} alt="City" className="city-image" />
        </div>
      )}
      <WorldMap location={location} />
      <SearchBar onSearch={handleSearch} />
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Loading...
        </div>
      )}
      {showPopup && <TouristSpotsPopup spots={spots} onClose={handleClosePopup} mapUrl={mapUrl} />}
    </div>
  );
  
};

export default App;
