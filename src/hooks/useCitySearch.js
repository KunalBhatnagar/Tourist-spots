import { useState, useCallback } from 'react';

export const useCitySearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchCity = useCallback(async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(cityName)}&apikey=${process.env.REACT_APP_OPENTRIPMAP_API_KEY}`
      );

      if (!response.ok) throw new Error('City not found');

      const data = await response.json();

      if (!data || !data.lat || !data.lon) {
        throw new Error('Location not found. Please try a different city.');
      }

      return { lat: data.lat, lon: data.lon, name: data.name };
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { searchCity, loading, error };
};
