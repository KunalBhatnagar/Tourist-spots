# Component Documentation

## Components Overview

### 🎯 Core Components

#### AttractionCard
**Location**: `src/components/AttractionCard.js`

Displays individual tourist attractions with modern styling.

**Props**:
```javascript
{
  spot: Object,              // Attraction data
  onHover: Function,        // Hover handler
  onLeave: Function,        // Leave handler
  onClick: Function,        // Click handler
  isFavorited: Boolean,     // Favorite status
  onFavorite: Function,     // Favorite toggle
  location: Object          // Current location for distance calc
}
```

**Features**:
- Heart animation on favorite
- Distance calculation
- Rating display
- Category emoji
- Hover effects with transforms

---

#### FavoritesPanel
**Location**: `src/components/FavoritesPanel.js`

Slide-out panel for managing favorite attractions.

**Props**:
```javascript
{
  favorites: Array,         // Favorited spots
  onRemove: Function,      // Remove favorite
  onSelect: Function,      // Select favorite
  isOpen: Boolean,         // Panel visibility
  onClose: Function        // Close handler
}
```

**Features**:
- Smooth slide animation
- Empty state message
- Quick removal
- Navigation to spot

---

#### FilterPanel
**Location**: `src/components/FilterPanel.js`

Advanced filtering and sorting options.

**Props**:
```javascript
{
  onFilter: Function,      // Apply filters
  isOpen: Boolean,         // Panel visibility
  onClose: Function        // Close handler
}
```

**Features**:
- Category selection (12+ types)
- Sorting options
- Reset functionality
- Visual feedback

---

#### SkeletonLoader
**Location**: `src/components/SkeletonLoader.js`

Loading placeholders with shimmer animation.

**Features**:
- Realistic layout
- Prevents CLS (Cumulative Layout Shift)
- 4 card preview
- Smooth animation

---

#### ThemeToggle
**Location**: `src/components/ThemeToggle.js`

Theme switcher button.

**Props**:
```javascript
{
  isDarkMode: Boolean,     // Current theme
  onToggle: Function       // Toggle handler
}
```

**Features**:
- Smooth icon switch
- Hover scale effect
- Instant feedback

---

#### ToastNotification
**Location**: `src/components/ToastNotification.js`

Toast notification system component.

**Props**:
```javascript
{
  toasts: Array,          // Active toasts
  removeToast: Function   // Remove handler
}
```

**Features**:
- Auto-dismiss
- Manual close
- Type variants (success, error, info)
- Icon indicators

---

## Custom Hooks

### useTheme
**Location**: `src/hooks/useTheme.js`

Manages application theme with system preference support.

```javascript
const { isDarkMode, toggleTheme } = useTheme();
```

**Returns**:
```javascript
{
  isDarkMode: Boolean,     // Current theme
  toggleTheme: Function    // Toggle handler
}
```

---

### useFavorites
**Location**: `src/hooks/useFavorites.js`

Manages favorite attractions with localStorage persistence.

```javascript
const { favorites, toggleFavorite, isFavorited } = useFavorites();
```

**Returns**:
```javascript
{
  favorites: Array,        // Saved favorites
  toggleFavorite: Function,// Add/remove favorite
  isFavorited: Function    // Check if favorited
}
```

---

### useCitySearch
**Location**: `src/hooks/useCitySearch.js`

Handles city geocoding via OpenTripMap API.

```javascript
const { searchCity, loading, error } = useCitySearch();
```

**Returns**:
```javascript
{
  searchCity: Function,    // Search implementation
  loading: Boolean,        // Loading state
  error: String           // Error message
}
```

**Usage**:
```javascript
const coords = await searchCity('Paris');
// Returns: { lat: 48.8566, lon: 2.3522, name: 'Paris' }
```

---

### useFetchSpots
**Location**: `src/hooks/useFetchSpots.js`

Fetches tourist attractions near coordinates.

```javascript
const { spots, loading, error, fetchSpots } = useFetchSpots();
```

**Returns**:
```javascript
{
  spots: Array,            // Fetched attractions
  loading: Boolean,        // Loading state
  error: String,          // Error message
  fetchSpots: Function    // Fetch implementation
}
```

---

## Utility Functions

### Constants
**Location**: `src/utils/constants.js`

**Available**:
```javascript
SPOT_CATEGORIES          // 12+ categories with icons
getCategoryIcon(desc)    // Get emoji from description
calculateDistance(c1, c2) // Haversine distance calc
getImageUrl(query)       // Get Unsplash image
debounce(func, delay)    // Debounce utility
```

---

## CSS Classes

### Layout Classes
- `.app-container` - Main container
- `.search-bar` - Search bar wrapper
- `.action-buttons` - Floating action buttons
- `.skeleton-container` - Skeleton grid

### Panel Classes
- `.favorites-panel` - Favorites sidebar
- `.filter-panel` - Filter sidebar
- `.toast-container` - Toast wrapper

### Component Classes
- `.attraction-card-enhanced` - Attraction card
- `.theme-toggle` - Theme button
- `.error-message` - Error display

### State Classes
- `.open` - Panel open state
- `.selected` - Selected item
- `.favorited` - Favorited indicator
- `.dark` - Dark mode indicator

---

## Styling System

### CSS Variables
```css
--primary-color: #667eea
--primary-dark: #764ba2
--secondary-color: #00d4ff
--success-color: #10b981
--error-color: #ef4444
--bg-light: #ffffff
--text-light: #1f2937
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Animations
- `fadeIn` - Fade opacity
- `slideUp` - Slide from bottom
- `slideInRight` - Slide from right
- `slideDown` - Slide from top
- `pulse` - Pulsing opacity
- `shimmer` - Shimmer effect
- `spin` - Spinning rotation
- `heartBeat` - Heart animation

---

## Integration Examples

### Using Toast Notifications
```javascript
import { useToast } from './components/ToastNotification';

function MyComponent() {
  const { addToast } = useToast();

  const handleAction = () => {
    addToast('Success!', 'success');
    addToast('Error occurred!', 'error');
    addToast('Info message', 'info');
  };
}
```

### Using Favorites
```javascript
import { useFavorites } from './hooks/useFavorites';

function MyComponent() {
  const { toggleFavorite, isFavorited } = useFavorites();

  return (
    <button onClick={() => toggleFavorite(spot)}>
      {isFavorited(spot.id) ? '❤️' : '🤍'}
    </button>
  );
}
```

### Using Filters
```javascript
const handleApplyFilter = (filterOptions) => {
  let filtered = [...spots];

  if (filterOptions.categories.length > 0) {
    filtered = filtered.filter(spot =>
      filterOptions.categories.some(cat =>
        spot.description.toLowerCase().includes(cat)
      )
    );
  }

  setFilteredSpots(filtered);
};
```

---

## Best Practices

### Performance
- Use custom hooks for business logic separation
- Memoize expensive calculations
- Debounce search inputs
- Lazy load components

### Accessibility
- Always include `aria-label` on buttons
- Use semantic HTML
- Ensure keyboard navigation
- Provide error messages

### Styling
- Use CSS custom properties for consistency
- Implement proper spacing with 8px base unit
- Test in dark mode
- Ensure mobile responsiveness

### Error Handling
- Always wrap API calls in try-catch
- Provide user-friendly error messages
- Show loading states during operations
- Validate inputs before processing

---

## Debugging Tips

### Theme Not Applied?
Check `document.documentElement.getAttribute('data-theme')`

### Toast Not Showing?
Verify `useToast` hook is being used in parent component

### Favorites Not Persisting?
Check browser localStorage quota and privacy settings

### Animations Stuttering?
Check CSS animation properties and browser performance

---

**For more information, see FEATURES.md**
