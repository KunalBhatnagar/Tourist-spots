import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteSpots');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    }
  }, []);

  const toggleFavorite = (spot) => {
    setFavorites(prev => {
      const isFavorited = prev.some(fav => fav.id === spot.id);
      let updated;

      if (isFavorited) {
        updated = prev.filter(fav => fav.id !== spot.id);
      } else {
        updated = [...prev, spot];
      }

      localStorage.setItem('favoriteSpots', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorited = (spotId) => favorites.some(fav => fav.id === spotId);

  return { favorites, toggleFavorite, isFavorited };
};
