# eslint-plugin-class-scope

[![npm version](https://badge.fury.io/js/eslint-plugin-class-scope.svg)](https://www.npmjs.com/package/eslint-plugin-class-scope)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Restrict usage of `class` / `className` to specific directories.

Enforce architectural boundaries by controlling where styling can be applied in your React/JSX codebase.

## Installation

```bash
npm install --save-dev eslint-plugin-class-scope
```

## Usage

Add `class-scope` to your ESLint plugins and configure the rule:

```js
// .eslintrc.js
module.exports = {
  plugins: ["class-scope"],
  rules: {
    "class-scope/only-allow-in": [
      "error",
      { allow: ["components/**", "ui/**"] }
    ]
  }
};
```

Or use the recommended configuration:

```js
// .eslintrc.js
module.exports = {
  plugins: ["class-scope"],
  extends: ["plugin:class-scope/recommended"]
};
```

## Rule: `only-allow-in`

This rule enforces that JSX elements cannot use `class` or `className` attributes outside of specific directories.

### Options

- `allow` (array of strings): Glob patterns of directories where `class`/`className` is allowed

### Examples

#### Allowed

```tsx
// components/Button.tsx
<div className="btn btn-primary" />
```

```tsx
// ui/Card.tsx
<div className="px-4 py-2 rounded-md bg-blue-600 text-white" />
```

#### Error

```tsx
// pages/Home.tsx
<div className="text-gray-500" />
// ❌ Error: Usage of `class` or `className` is not allowed outside allowed directories: components/**, ui/**
```

## Why?

This plugin helps teams enforce **styling layer boundaries**. For example:

- Only allow visual styling in `components/` or `ui/` directories
- Prohibit styling in `pages/`, `features/`, or business logic layers
- Maintain clear separation between presentation and business logic

## Use Cases

### 1. Component Library Pattern
```js
// Only allow className in your design system components
{
  "class-scope/only-allow-in": [
    "error",
    { allow: ["src/components/**", "src/ui/**"] }
  ]
}
```

### 2. Tailwind CSS Control
```js
// Prevent Tailwind classes from spreading across your entire codebase
{
  "class-scope/only-allow-in": [
    "error",
    { allow: ["src/design-system/**"] }
  ]
}
```

### 3. Feature-Based Architecture
```js
// Each feature can only style within its own UI layer
{
  "class-scope/only-allow-in": [
    "error",
    { allow: ["src/features/*/ui/**"] }
  ]
}
```

## Configuration

### Recommended Config

The plugin provides a recommended configuration that enforces `className` usage in `components/**` and `ui/**`:

```js
module.exports = {
  extends: ["plugin:class-scope/recommended"]
};
```

### Custom Config

Customize the allowed directories based on your project structure:

```js
module.exports = {
  plugins: ["class-scope"],
  rules: {
    "class-scope/only-allow-in": [
      "error",
      {
        allow: [
          "src/components/**",
          "src/ui/**",
          "src/design-system/**"
        ]
      }
    ]
  }
};
```

## Contributing

Issues and pull requests are welcome at [GitHub](https://github.com/myzkey/eslint-plugin-class-scope).

## License

MIT
