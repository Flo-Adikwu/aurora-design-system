import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from 'jest-axe';

expect.extend(matchers);

declare global {
  namespace Vi {
    interface Assertion {
      toHaveNoViolations(): void;
    }
    interface AsymmetricMatchersContaining {
      toHaveNoViolations(): void;
    }
  }
}
