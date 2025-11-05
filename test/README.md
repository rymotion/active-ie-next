# Testing Documentation

This project uses **Mocha** and **Chai** for unit testing React components and utility functions.

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

```
test/
├── setup.ts              # Global test setup (DOM, mocks)
├── components/           # Component tests
│   ├── language-switcher.test.tsx
│   └── marquee.test.tsx
├── lib/                  # Utility function tests
│   └── googleSheets.test.ts
└── i18n/                 # i18n configuration tests
    └── config.test.ts
```

## Writing Tests

### Component Tests

```typescript
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import MyComponent from '../../src/components/MyComponent';

describe('MyComponent', () => {
  it('should render without crashing', () => {
    const { container } = render(<MyComponent />);
    expect(container).to.exist;
  });

  it('should display correct text', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello World')).to.exist;
  });
});
```

### Utility Function Tests

```typescript
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { myUtilityFunction } from '../../src/lib/myUtility';

describe('myUtilityFunction', () => {
  it('should return expected value', () => {
    const result = myUtilityFunction('input');
    expect(result).to.equal('expected output');
  });

  it('should handle edge cases', () => {
    const result = myUtilityFunction(null);
    expect(result).to.be.null;
  });
});
```

## Test Coverage

Current test coverage includes:
- ✅ Language Switcher Component
- ✅ Marquee Widget Component
- ✅ Google Sheets API Functions
- ✅ i18n Configuration

## Adding New Tests

1. Create a new test file in the appropriate directory
2. Follow the naming convention: `*.test.ts` or `*.test.tsx`
3. Import necessary testing utilities from Mocha and Chai
4. Write descriptive test cases using `describe` and `it` blocks
5. Use Chai assertions (`expect`) to verify behavior

## Best Practices

- **Descriptive names**: Use clear, descriptive test names
- **One assertion per test**: Keep tests focused and simple
- **Arrange-Act-Assert**: Structure tests with setup, execution, and verification
- **Mock external dependencies**: Use mocks for API calls, routers, etc.
- **Test edge cases**: Include tests for error conditions and boundary values

## Troubleshooting

### Tests not running
- Ensure all dependencies are installed: `npm install`
- Check that `.mocharc.json` exists in the project root

### Import errors
- Verify TypeScript paths are configured correctly
- Check that `tsx` is installed for TypeScript support

### DOM-related errors
- Ensure `test/setup.ts` is properly configuring JSDOM
- Check that components are wrapped in necessary providers
