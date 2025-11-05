import { JSDOM } from 'jsdom';

// Setup DOM environment for testing React components
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
});

// Use Object.defineProperty to set read-only globals
Object.defineProperty(global, 'window', {
  value: dom.window,
  writable: true,
  configurable: true
});

Object.defineProperty(global, 'document', {
  value: dom.window.document,
  writable: true,
  configurable: true
});

Object.defineProperty(global, 'navigator', {
  value: dom.window.navigator,
  writable: true,
  configurable: true
});

// Mock Next.js router
export const mockRouter = {
  push: () => {},
  replace: () => {},
  reload: () => {},
  back: () => {},
  forward: () => {},
  prefetch: () => Promise.resolve(),
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
};
