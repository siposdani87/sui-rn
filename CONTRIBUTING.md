# Contributing

Thank you for your interest in contributing!

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install --legacy-peer-deps`
3. Start watch mode: `npm run watch`

## Example App

```bash
cd example
npm install --legacy-peer-deps
npx expo start -c
```

## Code Quality

Before submitting a PR, ensure:

- `npm run type-check` passes
- `npm run lint` passes
- `npm run format:check` passes
- `npm run build` succeeds

## Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Format: `type(scope): description`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Pull Requests

1. Fork the repository
2. Create a feature branch from `develop`
3. Make your changes
4. Submit a PR to `master`
