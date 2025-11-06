# eslint-plugin-class-scope

Restrict usage of `class` / `className` to specific directories.

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

## License

MIT
