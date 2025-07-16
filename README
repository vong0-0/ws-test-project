# Test Monorepo Project

This is **a monorepo project** that manages multiple modules under a single repository using **npm workspaces**.

## Monorepo Configuration

This project uses npm workspaces, defined in package.json:

```json
"workspaces": [
  "modules/**",
  "node_www/**"
]
```

This allows you to:

- Develop multiple modules together.
- Run scripts for each module individually with workspace flags.
- Share dependencies efficiently across modules.

## Available Scripts

Run scripts with:

```base
npm run <script-name>
```

### Module E

- `dev:module-e`: Run development server for Module E
- `build:module-e`: Build Module E for production
- `preview:module-e`: Preview Module E production build

### Module D

- `dev:module-d`: Run development server for Module D
- `build:module-d`: Build Module D for production
- `preview:module-d`: Preview Module D production build

### Module C

**Frontend:**

- `dev:frontend:module-c`: Run development server for Module C frontend
- `build:frontend:module-c`: Build Module C frontend for production
- `preview:module-c`: Preview Module C production build

**Backend:**

- `dev:backend:module-c`: Run development server for Module C backend
- `start:backend:module-c`: Start Module C backend server (usually for production)

### Module F

- `dev:module-f:` Run development server for Module F
- `build:module-f`: Build Module F for production
- `preview:module-f`: Preview Module F production build
