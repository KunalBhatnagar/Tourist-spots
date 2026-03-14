# 🚀 Quick Start Guide

## Installation (5 minutes)

### 1. Clone & Setup
```bash
git clone https://github.com/your-username/spot-locater.git
cd spot-locater
npm install
```

### 2. Get API Keys
- **Unsplash**: https://unsplash.com/oauth/applications (Free account)
- **OpenTripMap**: https://opentripmap.com/ (Free tier available)

### 3. Configure Environment
Create `.env` file:
```env
REACT_APP_UNSPLASH_CLIENT_ID=your_key_here
REACT_APP_OPENTRIPMAP_API_KEY=your_key_here
```

### 4. Start Development Server
```bash
npm start
```

Open http://localhost:3000 🎉

---

## 🎮 Using the App

### Search for a City
1. Type city name in search bar
2. Press Enter or click Search button
3. See attractions appear in the popup

### Use Your Location
1. Click "📍 Use My Location" button
2. Allow location permission
3. Discover nearby attractions

### Manage Favorites
1. Hover over any attraction card
2. Click the ❤️ icon
3. Access favorites from ❤️ button (bottom-right)

### Filter Attractions
1. Click 🔍 button (bottom-right)
2. Select categories you want
3. Choose sort order
4. Click "Apply Filters"

### Switch Theme
1. Click 🌙 or ☀️ button (top-left)
2. Theme automatically saves

---

## 📁 Project Structure

```
spot-locater/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── AttractionCard.js
│   │   ├── FilterPanel.js
│   │   ├── FavoritesPanel.js
│   │   ├── Map.js
│   │   ├── SearchBar.js
│   │   ├── SkeletonLoader.js
│   │   ├── ThemeToggle.js
│   │   ├── ToastNotification.js
│   │   └── TouristSpotsPopup.js
│   ├── hooks/             # Custom React hooks
│   │   ├── useCitySearch.js
│   │   ├── useFavorites.js
│   │   ├── useFetchSpots.js
│   │   └── useTheme.js
│   ├── utils/             # Utility functions
│   │   └── constants.js
│   ├── styles/            # Stylesheets
│   │   └── modern.css
│   ├── App.js             # Main component
│   ├── App.css            # App styles
│   └── index.js           # Entry point
├── .env                   # Environment variables
├── package.json           # Dependencies
└── README.md              # Documentation
```

---

## 🎨 Customization

### Change Colors
Edit `src/styles/modern.css`:
```css
:root {
  --primary-color: #667eea;      /* Change this */
  --primary-dark: #764ba2;       /* And this */
  --secondary-color: #00d4ff;    /* And this */
}
```

### Add New Categories
Edit `src/utils/constants.js`:
```javascript
export const SPOT_CATEGORIES = {
  yourCategory: { icon: '🎯', color: '#FF0000' },
  // ... add more
};
```

### Modify Loading Animation
Edit `src/components/SkeletonLoader.js`:
```javascript
// Adjust skeleton count, layout, or styles here
```

---

## 🛠 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (not reversible!)
npm eject
```

---

## 🎯 Common Tasks

### Add a New Feature
1. Create hook in `src/hooks/` if needed
2. Create component in `src/components/`
3. Add styles to `src/styles/modern.css`
4. Import and use in `App.js`

### Debug Dark Mode
```javascript
// Check current theme
console.log(document.documentElement.getAttribute('data-theme'));
```

### Check Favorites
```javascript
// View saved favorites
console.log(JSON.parse(localStorage.getItem('favoriteSpots')));
```

### Monitor API Usage
```javascript
// Add logging to API calls in hooks
console.log('Fetching spots:', lat, lon);
```

---

## 🚨 Troubleshooting

### "API key not found"
- Check `.env` file exists in root directory
- Verify variable names match exactly
- Restart dev server after `.env` changes

### "Geolocation not working"
- Enable https or use localhost
- Check browser privacy settings
- Try in incognito mode

### "Dark mode not saving"
- Check browser allows localStorage
- Clear cache and reload
- Verify localStorage quota

### "Attractions not showing"
- Check internet connection
- Verify API quotas aren't exceeded
- Inspect network tab in DevTools

---

## 📚 Documentation

- **README.md** - Full documentation
- **FEATURES.md** - Detailed feature list
- **COMPONENTS.md** - Component API reference
- **QUICK_START.md** - This file!

---

## 🤔 Need Help?

1. Check existing issues on GitHub
2. Review documentation files
3. Check browser console for errors
4. Inspect network requests in DevTools

---

## 🎓 Learning Resources

- **React Hooks**: https://react.dev/reference/react
- **Leaflet**: https://leafletjs.com/
- **CSS Grid**: https://css-tricks.com/snippets/css/complete-guide-grid/
- **OpenTripMap API**: https://opentripmap.com/

---

**Happy coding! 🚀**

Need to request a feature? [Create an issue!](https://github.com/your-repo/issues/new)
