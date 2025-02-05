#!/bin/bash

# Define the root directory for the shared package
ROOT_DIR="~/Dev/Nexidus/src/shared/core"

# Resolve the absolute path
ROOT_DIR=$(eval echo $ROOT_DIR)

# Create the necessary folder structure
mkdir -p "$ROOT_DIR/src/utils" "$ROOT_DIR/tests/utils"

# Create a basic README.md file
cat <<EOL > "$ROOT_DIR/README.md"
# @nexidus/core

This is the shared TypeScript package for Nexidus utilities. It is designed to be installed via the GitHub registry.

## Installation

Install the package using npm:

```bash
npm install @nexidus/core
```

## Folder Structure

- **src/utils/**: Contains the utility functions.
- **tests/utils/**: Contains unit tests for the utilities.

## Scripts

- **build**: Builds the package.
- **test**: Runs all tests.
- **lint**: Lints the codebase.

## License

MIT
EOL

# Initialize a new npm package
cd "$ROOT_DIR" || exit
npm init -y

# Install dependencies
npm install --save-dev typescript jest ts-jest @types/jest eslint prettier eslint-config-prettier eslint-plugin-prettier

# Configure TypeScript
cat <<EOL > "$ROOT_DIR/tsconfig.json"
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "CommonJS",
    "target": "ES6",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationDir": "./types",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "tests/**/*"]
}
EOL

# Configure Jest
cat <<EOL > "$ROOT_DIR/jest.config.js"
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true
};
EOL

# Add ESLint configuration
cat <<EOL > "$ROOT_DIR/.eslintrc.json"
{
  "env": {
    "node": true,
    "es6": true
  },
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
EOL

# Add Prettier configuration
cat <<EOL > "$ROOT_DIR/.prettierrc"
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
EOL

# Add npm scripts to package.json
npx json -I -f package.json -e '
  this.scripts = {
    "build": "tsc",
    "test": "jest",
    "lint": "eslint \"src/**/*.ts\"",
    "prepare": "npm run build"
  }
  this.main = "dist/index.js";
  this.types = "types/index.d.ts";
  this.publishConfig = {
    "registry": "https://npm.pkg.github.com"
  };
  this.name = "@nexidus/core";
  this.version = "1.0.0";
  this.description = "Shared TypeScript utilities for Nexidus.";
'

# Create a sample utility file
cat <<EOL > "$ROOT_DIR/src/utils/sampleUtil.ts"
/**
 * Sample utility function
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}
EOL

# Create a sample test file
cat <<EOL > "$ROOT_DIR/tests/utils/sampleUtil.test.ts"
import { add } from '../../src/utils/sampleUtil';

describe('add', () => {
  it('should return the sum of two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
EOL

# Final message
echo "Setup complete. Navigate to $ROOT_DIR and run 'npm install' to install dependencies."