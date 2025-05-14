# Rules Directory

This directory contains all the business rules and logic for the application. Each rule is designed to be modular, testable, and reusable.

## Structure

- `index.ts`: Entry point for the rules module
- `types/`: TypeScript interfaces and types for rules
- `validators/`: Validation rules and functions
- `business/`: Business logic rules
- `utils/`: Utility functions for rule processing

## Adding New Rules

1. Create a new file in the appropriate subdirectory
2. Export the rule as a function or class
3. Add TypeScript types in the `types` directory if needed
4. Write tests for the rule

## Testing

Each rule should have its own test file in the corresponding test directory.
