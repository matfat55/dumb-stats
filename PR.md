# Replace Estimated Page Time with Accurate Time Tracking

## Problem
The current implementation uses a fixed multiplier (54 seconds per page) to estimate browsing time, which is inaccurate and doesn't reflect actual user engagement.

## Solution
Implement accurate time tracking based on actual user activity and page focus events. This includes:
- Tracking real viewing time instead of estimates
- Monitoring user activity to ensure accuracy
- Properly handling tab switching and browser focus

## Implementation Details

### 1. Background Script Changes (`src/background/index.js`)
- Added page navigation tracking using webNavigation API
- Implemented active tab state management
- Added time aggregation for accurate duration calculation
- Stored viewing time in chrome.storage.local

```javascript
// Key additions
const activePages = new Map();
const ACTIVITY_TIMEOUT = 60000; // 60 seconds inactivity timeout

// Track page navigation and time
chrome.webNavigation.onCompleted.addListener(({ tabId, url }) => {
  activePages.set(tabId, {
    url,
    startTime: Date.now(),
    lastActive: Date.now(),
    totalActive: 0
  });
});
```

### 2. Content Script Enhancements (`src/content/index.js`)
- Added comprehensive user activity monitoring
- Implemented page visibility tracking
- Added activity timeout handling
- Improved event handling for accurate metrics

```javascript
// Activity monitoring
const updateActivity = () => {
  lastActivity = Date.now();
  if (!isActive) {
    isActive = true;
    chrome.runtime.sendMessage({ type: 'activityStateChanged', isActive });
  }
};

// Event listeners for user activity
window.addEventListener('mousemove', updateActivity);
window.addEventListener('keyup', updateActivity);
window.addEventListener('scroll', updateActivity);
```

### 3. Popup UI Updates (`src/pages/popup/App.js`)
- Modified pages viewed section to show actual time
- Added new time formatting utility
- Updated storage handling for new metrics
- Improved display formatting

```javascript
const formatViewTime = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours % 24 > 0) parts.push(`${hours % 24}h`);
  if (minutes % 60 > 0) parts.push(`${minutes % 60}m`);
  if (seconds % 60 > 0) parts.push(`${seconds % 60}s`);
  
  return parts.length > 0 ? parts.join(' ') : '0s';
};
```

### 4. Manifest Updates (`src/manifest.json`)
- Added webNavigation permission for tracking page loads

```json
{
  "permissions": ["tabs", "scripting", "storage", "webNavigation"]
}
```

## Testing Considerations
1. Verify accurate time tracking:
   - New tab navigation
   - Tab switching
   - Browser focus/blur
   - Multiple windows
   - Incognito mode

2. Check activity timeout:
   - Inactivity detection
   - Activity resumption
   - Time accumulation

3. Test UI updates:
   - Time format display
   - Page count accuracy
   - Reset functionality

## Performance Impact
- Minimal CPU usage through debounced activity checks
- Efficient storage usage with aggregated metrics
- Low memory footprint using Map for active pages

## Future Improvements
1. Add detailed browsing history with time per site
2. Implement data export functionality
3. Add customizable activity timeout
4. Include more detailed activity metrics