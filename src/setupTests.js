import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add jest-dom's custom assertions to Vitest's `expect`.
expect.extend(matchers);
