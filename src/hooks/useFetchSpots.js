import { useState, useCallback } from 'react';

export const useFetchSpots = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSpots = useCallback(async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&apikey=${process.env.REACT_APP_OPENTRIPMAP_API_KEY}&limit=15`
      );

      if (!response.ok) throw new Error(`Failed to fetch spots (${response.status})`);

      const data = await response.json();

      if (!data.features || !Array.isArray(data.features)) {
        throw new Error('No tourist spots found');
      }

      const spotsData = data.features
        .filter(spot => spot.properties && spot.properties.name)
        .map(spot => ({
          id: spot.properties.xid,
          name: spot.properties.name,
          description: spot.properties.kinds || 'Tourist Attraction',
          rating: spot.properties.rate || 'Not rated',
          coordinates: spot.geometry?.coordinates,
          distance: spot.properties.distance || 'N/A',
          wikipedia: spot.properties.wikipedia || null,
          kinds: spot.properties.kinds?.split(',') || []
        }))
        .slice(0, 12);

      setSpots(spotsData);
      return spotsData;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching spots:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { spots, loading, error, fetchSpots };
};
