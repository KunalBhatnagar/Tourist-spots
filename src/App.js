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
  
  const generateMapUrl = (lat, lon, zoom = 10) => {
    // OpenStreetMap tile URL with parameters for latitude, longitude, and zoom level
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;
  };
  const handleSearch = async (city) => {
    try {
      // Fetch the coordinates for the city from OpenTripMap
      const response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=YOUR_API_KEY`);
      const data = await response.json();
  
      if (!data || !data.lat || !data.lon) {
        throw new Error('Location not found');
      }
  
      const { lat, lon } = data; // Get latitude and longitude

      // Generate map URL using the latitude and longitude
      const mapUrl = generateMapUrl(lat, lon);
      
      // Fetch an image of the city from Unsplash
      const imageResponse = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=YOUR_API_KEY`);
      const imageData = await imageResponse.json();
      const cityImage = imageData.results[1]?.urls.full || ''; // Get the first image URL
  
      // Update states
      setCityImage(cityImage); // Set city image state
      setLocation({ lat, lng: lon }); // Set location state
      setMapUrl(mapUrl); // Set the map URL in your state
      
  
      // Fetch tourist spots around the coordinates
      const spotsResponse = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&apikey=YOUR_API_KEY&limit=10`);
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
    }
  };
  
  

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <div className="spot-locater">Spot Locater</div>
      {cityImage && (
        <div className="city-image-container">
          <img src={cityImage} alt="City" className="city-image" />
          <div z />
        </div>
      )}
      <WorldMap location={location} />
      <SearchBar onSearch={handleSearch} />
      {showPopup && <TouristSpotsPopup spots={spots} onClose={handleClosePopup} mapUrl={mapUrl} />}
    </div>
  );
  
};

export default App;
