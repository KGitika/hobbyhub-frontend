import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vitest is configured here so that unit tests run in a browser-like
  // environment provided by jsdom. Without this, React Testing Library
  // utilities that depend on the DOM (e.g. `render`) would throw
  // `ReferenceError: document is not defined` during tests.
  test: {
    environment: 'jsdom',
    // Extend Vitest's expect with DOM-specific matchers such as
    // `toBeInTheDocument`.
    setupFiles: './src/setupTests.js',
  },
})
