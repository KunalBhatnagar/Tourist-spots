# 🛠️ Developer Guide

## Getting Started with Development

### Prerequisites
- Node.js 14.0+
- npm or yarn
- Git
- Code editor (VS Code recommended)
- Browser DevTools

### Development Setup

```bash
# Clone repository
git clone https://github.com/your-repo/spot-locater.git
cd spot-locater

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your API keys to .env
# REACT_APP_UNSPLASH_CLIENT_ID=...
# REACT_APP_OPENTRIPMAP_API_KEY=...

# Start development server
npm start
```

---

## Project Architecture

### Folder Structure
```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── styles/            # CSS stylesheets
├── App.js             # Main component
└── index.js           # Entry point
```

### Data Flow

```
User Input
    ↓
SearchBar / Geolocation
    ↓
Custom Hooks (useCitySearch, useFetchSpots)
    ↓
API Calls (OpenTripMap, Unsplash)
    ↓
State Management (useState, useEffect)
    ↓
Components Render
    ↓
UI Display
```

---

## Creating New Components

### Component Template

```javascript
import React from 'react';
import PropTypes from 'prop-types';

const MyComponent = ({ prop1, prop2, onCallback }) => {
  return (
    <div className="my-component">
      {/* Component content */}
    </div>
  );
};

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onCallback: PropTypes.func
};

export default MyComponent;
```

### Component Best Practices

1. **Single Responsibility**: One component = one purpose
2. **Props Passing**: Use destructuring for clear props
3. **Event Handlers**: Prefix with `handle` (e.g., `handleClick`)
4. **State: Use hooks (useState, useCallback, useMemo)
5. **Clean Up**: Always cleanup in useEffect
6. **Accessibility**: Include ARIA labels and semantic HTML
7. **Comments**: Add JSDoc comments for complex logic

---

## Creating Custom Hooks

### Hook Template

```javascript
import { useState, useCallback, useEffect } from 'react';

export const useMyHook = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const updateState = useCallback((newValue) => {
    setState(newValue);
  }, []);

  useEffect(() => {
    // Cleanup if needed
    return () => {
      // Cleanup code
    };
  }, []);

  return { state, updateState };
};
```

### Hook Best Practices

1. **Naming**: Start with `use` prefix
2. **Single Purpose**: One responsibility per hook
3. **Reusability**: Designed for multiple components
4. **Documentation**: Clear parameter and return docs
5. **Error Handling**: Proper error management
6. **Memoization**: Use useCallback for expensive functions
7. **Dependencies**: Correct useEffect dependencies

---

## Styling Guidelines

### CSS Organization

```css
/* 1. Root Variables */
:root {
  /* Colors, fonts, shadows */
}

/* 2. Animations */
@keyframes fadeIn { }
@keyframes slideUp { }

/* 3. Base Elements */
body { }
button { }

/* 4. Component Classes */
.component-name { }
.component-state { }

/* 5. Responsive Design */
@media (max-width: 768px) { }
```

### Naming Conventions

- **BEM Format**: `.block-name__element--modifier`
- **Component Classes**: `.component-name`
- **State Classes**: `.is-state` or `.has-state`
- **Utility Classes**: `.u-margin-top`

### Dark Mode Implementation

```css
/* Light mode (default) */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

/* Dark mode */
[data-theme="dark"] {
  --bg-color: #1f2937;
  --text-color: #ffffff;
}

/* Usage */
.component {
  background: var(--bg-color);
  color: var(--text-color);
}
```

---

## API Integration

### Using OpenTripMap API

```javascript
// Search for city
const searchCity = async (cityName) => {
  const response = await fetch(
    `https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${key}`
  );
  const data = await response.json();
  return { lat: data.lat, lon: data.lon };
};

// Fetch attractions
const fetchSpots = async (lat, lon) => {
  const response = await fetch(
    `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&apikey=${key}`
  );
  return response.json();
};
```

### Using Unsplash API

```javascript
const fetchImage = async (query) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${key}`
  );
  const data = await response.json();
  return data.results[0].urls.full;
};
```

### Error Handling Pattern

```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Error fetching data:', error);
  addToast(error.message, 'error');
  throw error;
}
```

---

## State Management

### Using Hooks for State

```javascript
// Simple state
const [value, setValue] = useState(initialValue);

// Complex state
const [state, dispatch] = useReducer(reducer, initialState);

// Context for global state
const { value, setValue } = useContext(MyContext);
```

### Pattern: Search and Filter

```javascript
const [searchTerm, setSearchTerm] = useState('');
const [filteredResults, setFilteredResults] = useState([]);

useEffect(() => {
  const results = allItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredResults(results);
}, [searchTerm]);
```

---

## Performance Optimization

### Memoization

```javascript
// Memoize component
export const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// Memoize callback
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);

// Memoize value
const expensiveValue = useMemo(() => {
  return complexCalculation();
}, [dependencies]);
```

### Code Splitting

```javascript
import React, { Suspense, lazy } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## Testing (Ready to Implement)

### Component Testing Example

```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### Hook Testing Example

```javascript
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from './useMyHook';

test('updates state', () => {
  const { result } = renderHook(() => useMyHook('initial'));
  
  act(() => {
    result.current.setState('updated');
  });
  
  expect(result.current.state).toBe('updated');
});
```

---

## Debugging

### React DevTools
1. Install React DevTools extension
2. Inspect components in Components tab
3. Check props and state
4. Access component in console

### Browser DevTools

```javascript
// Check localStorage
console.log(localStorage.getItem('key'));

// Check current theme
console.log(document.documentElement.getAttribute('data-theme'));

// Check API responses
fetch(url).then(r => r.json()).then(console.log);
```

### Console Logging Best Practices

```javascript
// Group related logs
console.group('Fetch Operation');
console.log('URL:', url);
console.log('Response:', data);
console.groupEnd();

// Use different log levels
console.log('Info:', message);
console.warn('Warning:', message);
console.error('Error:', message);

// Table format
console.table(arrayOfObjects);
```

---

## Git Workflow

### Branch Naming
- `feature/feature-name` - New features
- `fix/bug-name` - Bug fixes
- `docs/update` - Documentation
- `refactor/update` - Code refactoring

### Commit Messages
```
[TYPE] Brief description

Detailed explanation if needed

Related to issue #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update

## Testing
How have you tested this?

## Checklist
- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
```

---

## Common Tasks

### Add New Feature

1. Create feature branch
2. Create component/hook in appropriate folder
3. Add styles to modern.css
4. Import in App.js
5. Add toast notification if needed
6. Test thoroughly
7. Create pull request with documentation

### Fix a Bug

1. Create fix branch
2. Identify root cause
3. Implement fix with error handling
4. Add console logs for debugging
5. Verify fix with multiple scenarios
6. Create pull request with description

### Improve Performance

1. Profile with React DevTools
2. Identify bottlenecks
3. Implement optimization (memoization, lazy loading)
4. Measure improvement
5. Document changes

### Update Documentation

1. Edit relevant .md file
2. Keep formatting consistent
3. Add examples where applicable
4. Update table of contents if needed
5. Verify links work

---

## Resources

### Official Documentation
- [React Docs](https://react.dev)
- [Leaflet Docs](https://leafletjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Learning
- [React Patterns](https://reactpatterns.com/)
- [CSS Tricks](https://css-tricks.com/)
- [Dev.to](https://dev.to/)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [GitHub Desktop](https://desktop.github.com/)

---

## Troubleshooting

### Common Issues

**Q: Module not found error**
A: Run `npm install` and check import paths

**Q: Styles not applying**
A: Check CSS class names and selector specificity

**Q: API not working**
A: Verify .env variables and API quotas

**Q: State not updating**
A: Check if setState is called and dependencies are correct

---

## Code Review Checklist

- [ ] Code follows project style
- [ ] No console errors or warnings
- [ ] Components are reusable
- [ ] Props are properly typed
- [ ] Error handling implemented
- [ ] Accessibility considered
- [ ] Mobile responsive
- [ ] Dark mode compatible
- [ ] Performance optimized
- [ ] Documentation updated

---

## Contributing Guidelines

1. Fork the repository
2. Create feature branch
3. Make changes with good commits
4. Push to your fork
5. Create pull request
6. Address review feedback
7. Merge when approved!

---

**Happy coding! 🚀**

Questions? Open an issue or discussion!
