const ACTIVITY_TIMEOUT = 60000; // 60 seconds inactivity timeout
let lastActivity = Date.now();
let isActive = true;
let previousPosition = 0;

const updateActivity = () => {
  const now = Date.now();
  lastActivity = now;

  if (!isActive) {
    isActive = true;
    chrome.runtime.sendMessage({ type: 'activityStateChanged', isActive });
  }
};

const checkInactivity = () => {
  if (isActive && Date.now() - lastActivity > ACTIVITY_TIMEOUT) {
    isActive = false;
    chrome.runtime.sendMessage({ type: 'activityStateChanged', isActive });
  }
};

const main = () => {
  // Track scrolling
  window.addEventListener('scroll', () => {
    updateActivity();

    const position = window.pageYOffset;
    const scrolled = Math.abs(position - previousPosition) * 0.0002645833;
    previousPosition = position;

    chrome.storage.local.get(['totalLength'], val => {
      const newTotalLength = scrolled + (val.totalLength || 0);
      chrome.storage.local.set({ totalLength: newTotalLength });
    });
  });

  // Track clicks
  window.addEventListener('click', () => {
    updateActivity();

    chrome.storage.local.get(['clickCount'], val => {
      const newClickCount = (val.clickCount || 0) + 1;
      chrome.storage.local.set({ clickCount: newClickCount });
    });
  });

  // Track keystrokes
  window.addEventListener('keyup', () => {
    updateActivity();

    chrome.storage.local.get(['keyPressCount'], val => {
      const newPressCount = (val.keyPressCount || 0) + 1;
      chrome.storage.local.set({ keyPressCount: newPressCount });
    });
  });

  // Track mouse movement (debounced)
  let moveTimeout;
  window.addEventListener('mousemove', () => {
    if (moveTimeout) return;
    moveTimeout = setTimeout(() => {
      updateActivity();
      moveTimeout = null;
    }, 1000);
  });

  // Track visibility changes
  document.addEventListener('visibilitychange', () => {
    isActive = !document.hidden;
    chrome.runtime.sendMessage({ type: 'activityStateChanged', isActive });
    if (!document.hidden) {
      updateActivity();
    }
  });

  // Check for inactivity periodically
  setInterval(checkInactivity, 5000);
};

// Handle cleanup
const destructionEvent = 'destructmyextension_' + chrome.runtime.id;
const destructor = () => {
  document.removeEventListener(destructionEvent, destructor);
};
document.dispatchEvent(new CustomEvent(destructionEvent));
document.addEventListener(destructionEvent, destructor);

main();
