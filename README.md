# Quake Tools

Electron application for Quake tools, built with React, TypeScript and Vite.

## Technologies

- **Electron** - framework for creating desktop applications
- **React** - library for creating user interface
- **TypeScript** - typed JavaScript
- **Vite** - fast build tool and dev server
- **electron-settings** - application settings management
- **Yarn** - package manager

## Project Structure

```
quake-tools.js/
├── src/
│   ├── ui/                    # React application
│   │   ├── assets/           # Static resources
│   │   ├── components/       # React components
│   │   └── styles/          # CSS styles
│   └── electron/             # Electron application
│       ├── app.ts           # Main process
│       └── preload.ts       # Preload script
├── dist/                     # Built files
├── release/                  # Production builds
└── package.json
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dmitry-osin/quake-tools.js.git
cd quake-tools.js
```

2. Install dependencies:
```bash
yarn install
```

## Development

### Quick Start:
```bash
yarn install
yarn dev
```

This will:
- Install dependencies
- Build Electron files
- Start Vite dev server on port 5173
- Launch Electron application

### Alternative Workflows:
- **UI only**: `yarn dev:vite`
- **Electron only**: `yarn start`
- **Full development**: `yarn dev`

## Build

Build the application for production:
```bash
yarn build
```

This will create:
- Built React application files in `dist/ui/`
- Built Electron files in `dist/electron/`
- Ready Windows build in `release/`

## Scripts

- `yarn dev` - start in development mode
- `yarn build` - build for production
- `yarn preview` - preview the build
- `yarn type-check` - TypeScript type checking

## Author

**Dmitry Osin** - d@osin.pro

## License

Project [LICENSE](LICENSE) 