export const SPOT_CATEGORIES = {
  museum: { icon: '🏛️', color: '#8B7355' },
  park: { icon: '🌳', color: '#228B22' },
  restaurant: { icon: '🍽️', color: '#FF6347' },
  beach: { icon: '🏖️', color: '#4169E1' },
  temple: { icon: '⛩️', color: '#FF69B4' },
  castle: { icon: '🏰', color: '#DAA520' },
  mountain: { icon: '⛰️', color: '#A9A9A9' },
  waterfall: { icon: '💧', color: '#00BFFF' },
  historic: { icon: '🏛️', color: '#CD853F' },
  nature: { icon: '🌿', color: '#90EE90' },
  entertainment: { icon: '🎭', color: '#FF1493' },
  shopping: { icon: '🛍️', color: '#FFB6C1' }
};

export const getCategoryIcon = (description) => {
  if (!description) return '📍';
  const desc = description.toLowerCase();

  for (const [key, value] of Object.entries(SPOT_CATEGORIES)) {
    if (desc.includes(key)) return value.icon;
  }

  if (desc.includes('historic') || desc.includes('heritage')) return '🏛️';
  if (desc.includes('art') || desc.includes('gallery')) return '🎨';
  if (desc.includes('food') || desc.includes('cafe')) return '☕';
  if (desc.includes('sport') || desc.includes('stadium')) return '🏟️';
  if (desc.includes('zoo')) return '🦁';
  if (desc.includes('garden')) return '🌸';
  if (desc.includes('market')) return '🏪';
  if (desc.includes('tower')) return '🗼';

  return '📍';
};

export const calculateDistance = (coords1, coords2) => {
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;

  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(1)}km`;
};

export const getImageUrl = (query) => {
  const queries = [query, 'travel', 'destination', 'landscape', 'tourism'];
  const selected = queries[Math.floor(Math.random() * queries.length)];
  return `https://images.unsplash.com/random?query=${encodeURIComponent(selected)}&w=1200&h=800&fm=jpg`;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
