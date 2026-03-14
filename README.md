##  **Spot Locater** 🌍
A modern, feature-rich tourist discovery web application built with React. Explore global destinations, discover top attractions, save favorites, and plan your perfect trip!

## 🌟 Features

### Core Features
- **Interactive World Map**: Leaflet-powered map with smooth animations and zoom controls
- **City Search**: Search any city worldwide and instantly see the top attractions
- **Tourist Spot Discovery**: Display 12+ tourist attractions with detailed information
- **Reverse Geolocation**: Use your current location to discover nearby attractions
- **Search History**: Automatically saves your last 5 searches

### Premium Features (✨ NEW)
- **🌙 Dark Mode**: Beautiful dark theme with system preference detection
- **❤️ Favorites System**: Save your favorite spots and view them anytime
- **🔍 Advanced Filters**: Filter attractions by category and sort by rating, name, or distance
- **📱 Toast Notifications**: Real-time feedback for all user actions
- **⚡ Skeleton Loading**: Smooth loading animations while fetching data
- **🎨 Modern UI/UX**: Glassmorphism design patterns and smooth transitions
- **📊 Attraction Categories**: 12+ emoji-based categories (Museum, Park, Restaurant, Beach, etc.)
- **📍 Distance Calculator**: Real-time distance calculation from selected location
- **♿ Accessibility**: Full keyboard navigation and ARIA labels for screen readers
- **📲 Responsive Design**: Fully optimized for desktop, tablet, and mobile devices

## 🛠 Technologies Used

### Frontend
- **React 18.3.1**: Latest React with hooks and context
- **Leaflet 1.9.4**: Interactive mapping library
- **React Leaflet 4.2.1**: React wrapper for Leaflet
- **CSS3**: Custom styling with variables and dark mode support

### APIs
- **OpenTripMap API**: Tourist spots and location data
- **Unsplash API**: High-quality images of cities and attractions
- **OpenStreetMap**: Map tiles and location services
- **Geolocation API**: Browser geolocation services

## 📦 New Utilities & Components

### Custom Hooks
- `useTheme()` - Dark mode management with localStorage
- `useFavorites()` - Manage saved attractions
- `useCitySearch()` - City geocoding and search
- `useFetchSpots()` - Tourist spots fetching with error handling
- `useToast()` - Toast notification system

### New Components
- `ThemeToggle` - Dark/Light mode switcher
- `ToastNotification` - Real-time notifications
- `FavoritesPanel` - Slide-out favorites sidebar
- `FilterPanel` - Advanced filtering and sorting
- `SkeletonLoader` - Loading skeleton screens
- `AttractionCard` - Enhanced attraction display card

### Utilities
- `constants.js` - Categories, icons, and helper functions
- Distance calculation
- Emoji-based category mapping

## 🎨 Design Highlights

### Modern Design System
- **Color Palette**: Purple gradient primary (#667eea → #764ba2), Cyan secondary (#00d4ff)
- **Spacing**: 8px base unit with consistent gaps
- **Animations**: Smooth transitions with cubic-bezier easing
- **Shadows**: Multi-layer shadows for depth
- **Border Radius**: 12-16px for soft, modern appearance
- **Typography**: System font stack for optimal readability

### Dark Mode
- Automatic system preference detection
- Persistent localStorage preference
- CSS custom properties for seamless switching
- All components fully themed

## 📦 Installation

### Prerequisites
- Node.js 14.0 or higher
- npm or yarn package manager

### Setup
Clone the repository:
```bash
git clone https://github.com/your-username/spot-locater.git
cd spot-locater
```

Install dependencies:
```bash
npm install
```

Set up environment variables:

Create a `.env` file in the root directory:
```bash
REACT_APP_UNSPLASH_CLIENT_ID=your_unsplash_api_key
REACT_APP_OPENTRIPMAP_API_KEY=your_opentripmap_api_key
```

Get your API keys from:
- **Unsplash**: https://unsplash.com/oauth/applications
- **OpenTripMap**: https://opentripmap.com/

Start the development server:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Usage Guide

### Basic Search
1. Enter a city name in the search bar
2. Press Enter or click the Search button
3. Explore the interactive map and attraction list

### Using Geolocation
1. Click the "📍 Use My Location" button
2. Allow location permission when prompted
3. Discover attractions near you

### Managing Favorites
1. Hover over an attraction card and click the ❤️ icon
2. Access all favorites from the ❤️ button in the bottom-right
3. Click any favorite to view it on the map

### Filtering & Sorting
1. Click the 🔍 button in the bottom-right
2. Select attraction categories you're interested in
3. Choose sorting preference (Rating, Name, or Distance)
4. Click "Apply Filters"

### Dark Mode
1. Click the 🌙/☀️ button in the top-left corner
2. Theme preference is automatically saved

## 🎯 Advanced Features

### Smart Distance Calculation
- Real-time distance calculation in kilometers or meters
- Haversine formula for accuracy
- Displayed on each attraction card

### Category Detection
- Automatic emoji assignment based on attraction type
- 12+ categories with color coding
- Supports custom category matching

### Smart Image Loading
- City-specific images from Unsplash
- Fallback to generic travel/destination images
- Optimized for web performance

## 📱 Keyboard Shortcuts
- **Esc** - Close popups and panels
- **Enter** - Search current input
- **Tab** - Navigate through filters and attractions

## 🐛 Troubleshooting

### API Keys Not Working?
- Verify keys are correctly set in `.env` file
- Restart development server after .env changes
- Check API quotas on respective platforms

### Location Permission Denied?
- Check browser privacy settings
- Try in an incognito/private window
- Ensure HTTPS is used in production

### Dark Mode Not Persisting?
- Check localStorage is enabled
- Clear browser cache and reload
- Verify browser localStorage quota

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss proposed changes.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
- OpenTripMap for comprehensive tourist data
- Unsplash for beautiful imagery
- Leaflet.js for interactive maps
- React community for amazing tools and libraries

## 📞 Support
For issues, questions, or feedback, please create an issue on the GitHub repository.

---

**Happy Exploring! 🌐✈️**


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# Tourist-spots
