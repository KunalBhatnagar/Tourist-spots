import React, { useState, useEffect } from "react";
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
   const [searchHistory, setSearchHistory] = useState(
    () => JSON.parse(localStorage.getItem('searchHistory')) || []
  );
  
  const generateMapUrl = (lat, lon, zoom = 10) => {
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;
  };

  const fetchSpotsAndImageByCoords = async (lat, lon, cityForImage = null) => {
    try {
      const generatedMapUrl = generateMapUrl(lat, lon);
      setMapUrl(generatedMapUrl);
      setLocation({ lat, lng: lon });

      const imageQuery = cityForImage ? cityForImage : 'travel';
      const imagePromise = fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(imageQuery)}&client_id=dd3_nxMcHeTI7r8UVI0dFmx5-xCIFetSo63s2iiV93A`)
        .then(response => response.ok ? response.json() : null)
        .then(imageData => {
          const cityImageUrl = imageData?.results?.[0]?.urls?.full || '';
          setCityImage(cityImageUrl);
        })
        .catch(error => {
          console.warn('Error fetching city image:', error);
          setCityImage('');
        });

      const spotsResponse = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&apikey=5ae2e3f221c38a28845f05b688fe380cc74d18dfc8b7286ddfe46dbb&limit=10`);
      
      if (!spotsResponse.ok) {
        throw new Error(`Failed to fetch tourist spots (${spotsResponse.status})`);
      }
      
      const spotsData = await spotsResponse.json();

      if (!spotsData.features || !Array.isArray(spotsData.features)) {
        throw new Error('No tourist spots found in this area');
      }

      const topSpots = spotsData.features
        .filter(spot => spot.properties && spot.properties.name)
        .map((spot) => ({
          name: spot.properties.name,
          description: spot.properties.kinds || 'No description available',
          rating: spot.properties.rate || 'N/A',
          coordinates: spot.geometry?.coordinates
        }))
        .slice(0, 10);

      if (topSpots.length === 0) {
        throw new Error('No named tourist spots found in this area');
      }

      setSpots(topSpots);
      
      await imagePromise;
      
      setShowPopup(true);
    } catch (err) {
      console.error('Error fetching spots data:', err);
      setError(err.message || 'An error occurred while fetching data. Please try again.');
    }
  };

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);


  const handleSearch = async (city) => {
    if (!city.trim()) return;
    
    setIsLoading(true);
    setError('');
    setSpots([]);
    setShowPopup(false);
    setCityImage('');
    
    try {
      const response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(city)}&apikey=5ae2e3f221c38a28845f05b688fe380cc74d18dfc8b7286ddfe46dbb`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch location data (${response.status})`);
      }
      
      const data = await response.json();

      if (!data || !data.lat || !data.lon) {
        throw new Error('Location not found. Please try a different city name.');
      }

      const { lat, lon } = data;

      setSearchHistory(prevHistory => {
      const updatedHistory = [city, ...prevHistory.filter(c => c.toLowerCase() !== city.toLowerCase())];
      return updatedHistory.slice(0, 5); // Keep the last 5 searches
    });
      
      await fetchSpotsAndImageByCoords(lat, lon, city);

    } catch (error) {
      console.error('Error during search:', error);
      setError(error.message || 'An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSpots([]);
    setShowPopup(false);
    setCityImage('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchSpotsAndImageByCoords(latitude, longitude);
        setIsLoading(false);
      },
      () => {
        setError('Unable to retrieve your location. Please enable location services and try again.');
        setIsLoading(false);
      }
    );
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="app-container">
      <div className="spot-locater">Spot Locater</div>
      
      <SearchBar onSearch={handleSearch} onGeolocate={handleGeolocate} history={searchHistory} />
      
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
      
      {/* CORRECTION 1: Removed the '!showPopup' condition. 
          The city image will now stay visible behind the popup. */}
      {cityImage && (
        <div className="city-image-container">
          <img 
            src={cityImage} 
            alt="City view" 
            className="city-image"
            onError={(e) => {
              e.target.style.display = 'none';
              setCityImage('');
            }}
          />
        </div>
      )}
      
      {/* CORRECTION 2: Wrapped the WorldMap in a div that hides it when the popup is active. */}
      <div style={{ display: showPopup ? 'none' : 'block' }}>
        <WorldMap location={location} />
      </div>
      
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
