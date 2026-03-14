import React, { useState, useEffect } from "react";
import "./App.css";
import "./styles/modern.css";
import WorldMap from "./components/Map";
import SearchBar from "./components/SearchBar";
import TouristSpotsPopup from "./components/TouristSpotsPopup";
import ToastNotification, { useToast } from "./components/ToastNotification";
import FavoritesPanel from "./components/FavoritesPanel";
import FilterPanel from "./components/FilterPanel";
import ThemeToggle from "./components/ThemeToggle";
import SkeletonLoader from "./components/SkeletonLoader";
import { useTheme } from "./hooks/useTheme";
import { useFavorites } from "./hooks/useFavorites";
import { useCitySearch } from "./hooks/useCitySearch";
import { useFetchSpots } from "./hooks/useFetchSpots";

const App = () => {
  // Hooks
  const { isDarkMode, toggleTheme } = useTheme();
  const { favorites, toggleFavorite, isFavorited } = useFavorites();
  const { toasts, addToast, removeToast } = useToast();
  const { searchCity, loading: searchLoading, error: searchError } = useCitySearch();
  const { spots, loading: spotsLoading, error: spotsError, fetchSpots } = useFetchSpots();

  // State
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState(null);
  const [cityImage, setCityImage] = useState('');
  const [mapUrl, setMapUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [searchHistory, setSearchHistory] = useState(
    () => JSON.parse(localStorage.getItem('searchHistory')) || []
  );
  
  const generateMapUrl = (lat, lon, zoom = 10) => {
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;
  };

  const fetchImageByCity = async (city) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&per_page=1&client_id=${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`
      );
      if (!response.ok) return null;
      const data = await response.json();
      return data.results?.[0]?.urls?.full || null;
    } catch (err) {
      console.warn('Error fetching city image:', err);
      return null;
    }
  };

  const handleCitySearch = async (city) => {
    if (!city.trim()) return;

    setIsLoading(true);
    try {
      const coords = await searchCity(city);
      const mapUrl = generateMapUrl(coords.lat, coords.lon);
      setMapUrl(mapUrl);
      setLocation({ lat: coords.lat, lng: coords.lon });

      const imageUrl = await fetchImageByCity(city);
      setCityImage(imageUrl);

      const spots = await fetchSpots(coords.lat, coords.lon);
      setFilteredSpots(spots);
      setShowPopup(true);

      setSearchHistory(prevHistory => {
        const updated = [city, ...prevHistory.filter(c => c.toLowerCase() !== city.toLowerCase())];
        return updated.slice(0, 5);
      });

      addToast(`Found ${spots.length} attractions in ${city}!`, 'success');
    } catch (err) {
      addToast(err.message || 'Failed to search city', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeolocate = async () => {
    if (!navigator.geolocation) {
      addToast('Geolocation not supported', 'error');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        const mapUrl = generateMapUrl(latitude, longitude);
        setMapUrl(mapUrl);
        setCityImage('');

        try {
          const spots = await fetchSpots(latitude, longitude);
          setFilteredSpots(spots);
          setShowPopup(true);
          addToast('Location detected!', 'success');
        } catch (err) {
          addToast('Failed to load spots', 'error');
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        addToast('Enable location services to use this feature', 'error');
        setIsLoading(false);
      }
    );
  };

  const handleApplyFilter = (filterOptions) => {
    let filtered = [...spots];

    if (filterOptions.categories.length > 0) {
      filtered = filtered.filter(spot =>
        filterOptions.categories.some(cat =>
          spot.description.toLowerCase().includes(cat)
        )
      );
    }

    if (filterOptions.sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterOptions.sortBy === 'distance') {
      filtered.sort((a, b) => a.distance - b.distance);
    } else {
      filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    }

    setFilteredSpots(filtered);
    addToast('Filters applied', 'info');
  };

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  return (
    <div className="app-container">
      {/* Toast Notifications */}
      <ToastNotification toasts={toasts} removeToast={removeToast} />

      {/* Theme Toggle */}
      <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />

      {/* Action Buttons */}
      <div className="action-buttons">
        <button
          className="action-btn"
          onClick={() => setShowFilter(!showFilter)}
          title="Filter spots"
        >
          🔍
        </button>
        <button
          className="action-btn"
          onClick={() => setShowFavorites(!showFavorites)}
          title={`Favorites (${favorites.length})`}
        >
          ❤️
        </button>
      </div>

      {/* Header */}
      <div className="spot-locater">Spot Locater</div>

      {/* Search Bar */}
      <SearchBar 
        onSearch={handleCitySearch} 
        onGeolocate={handleGeolocate} 
        history={searchHistory} 
      />

      {/* Loading State */}
      {(isLoading || spotsLoading) && (
        <div className="loading-state">
          <SkeletonLoader />
        </div>
      )}

      {/* Error Messages */}
      {(searchError || spotsError) && (
        <div className="error-message">
          <span>⚠️</span>
          <p>{searchError || spotsError}</p>
        </div>
      )}

      {/* City Image Background */}
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

      {/* Map */}
      <div style={{ display: showPopup ? 'none' : 'block' }}>
        <WorldMap location={location} />
      </div>

      {/* Popups and Panels */}
      {showPopup && (
        <TouristSpotsPopup 
          spots={filteredSpots.length > 0 ? filteredSpots : spots}
          onClose={() => setShowPopup(false)}
          mapUrl={mapUrl}
          cityImage={cityImage}
          location={location}
          onFavorite={toggleFavorite}
          isFavorited={isFavorited}
        />
      )}

      <FavoritesPanel
        favorites={favorites}
        onRemove={(id) => {
          const spot = favorites.find(s => s.id === id);
          if (spot) toggleFavorite(spot);
        }}
        onSelect={(spot) => {
          if (spot.coordinates) {
            const [lng, lat] = spot.coordinates;
            setLocation({ lat, lng });
            setMapUrl(generateMapUrl(lat, lng));
            setCityImage('');
            setShowPopup(true);
            setShowFavorites(false);
          }
        }}
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
      />

      <FilterPanel
        onFilter={handleApplyFilter}
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
      />
    </div>
  );
};

export default App;
