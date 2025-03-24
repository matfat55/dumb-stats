import '@testing-library/jest-dom';
import { chrome } from 'jest-chrome';

// Make chrome available globally
global.chrome = chrome;

// Mock browser APIs not available in jsdom
global.browser = {
  runtime: {},
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
    },
    sync: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
};

// Wire up browser.runtime methods to mirror chrome.runtime
Object.defineProperty(global.browser.runtime, 'sendMessage', {
  get: () => chrome.runtime.sendMessage.getMockImplementation() ? chrome.runtime.sendMessage : undefined
});

// Suppress console errors during tests
console.error = jest.fn();

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
