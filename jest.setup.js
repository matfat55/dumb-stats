import '@testing-library/jest-dom';
import 'jest-chrome';

// Mock browser APIs not available in jsdom
global.browser = {
  runtime: {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
  },
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

// Suppress console errors during tests
console.error = jest.fn();

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
