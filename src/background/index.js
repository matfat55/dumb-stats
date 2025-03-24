// Track active tabs and their viewing time
const activePages = new Map();

const updatePageStats = (tabId, isActive) => {
  const now = Date.now();
  const pageData = activePages.get(tabId);

  if (!pageData) return;

  if (!isActive && pageData.lastActive) {
    pageData.totalActive += now - pageData.lastActive;
    pageData.lastActive = null;
  } else if (isActive && !pageData.lastActive) {
    pageData.lastActive = now;
  }

  activePages.set(tabId, pageData);

  // Update storage with new times
  chrome.storage.local.get(['totalViewTime'], data => {
    const totalViewTime =
      (data.totalViewTime || 0) + (pageData.totalActive || 0);
    chrome.storage.local.set({ totalViewTime });
  });
};

// Handle tab activation changes
chrome.tabs.onActivated.addListener(({ tabId }) => {
  // Deactivate all other tabs
  activePages.forEach((data, id) => {
    if (id !== tabId) {
      updatePageStats(id, false);
    }
  });

  // Activate current tab
  if (activePages.has(tabId)) {
    updatePageStats(tabId, true);
  }
});

// Track new page loads
chrome.webNavigation.onCompleted.addListener(({ tabId, url }) => {
  if (url.includes('chrome://') || url.includes('chrome-extension://')) return;

  activePages.set(tabId, {
    url,
    startTime: Date.now(),
    lastActive: Date.now(),
    totalActive: 0,
  });

  chrome.storage.local.get(['pagesCount'], val => {
    const newPagesCount = (val.pagesCount || 0) + 1;
    chrome.storage.local.set({ pagesCount: newPagesCount });
  });
});

// Handle tab close/removal
chrome.tabs.onRemoved.addListener(tabId => {
  if (activePages.has(tabId)) {
    updatePageStats(tabId, false);
    activePages.delete(tabId);
  }
});

// Listen for activity updates from content script
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'activityStateChanged' && sender.tab) {
    updatePageStats(sender.tab.id, message.isActive);
  }
});

// Initialize storage on install
chrome.runtime.onInstalled.addListener(async () => {
  chrome.storage.local.set({
    totalLength: 0,
    clickCount: 0,
    keyPressCount: 0,
    pagesCount: 0,
    totalViewTime: 0,
  });

  // Executes ContentScript on all tabs (including already open ones)
  for (const contentScript of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({ url: contentScript.matches })) {
      if (tab.url.includes('webstore')) continue;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: contentScript.js,
      });
    }
  }
});
