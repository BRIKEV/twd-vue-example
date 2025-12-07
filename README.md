# twd-vue-example

A showcase Vue 3 + Vite application demonstrating end-to-end testing with [TWD (Test Web Dev)](https://brikev.github.io/twd/). This project includes a complete todo list application with comprehensive test coverage using TWD.

## About TWD

[Test Web Dev (TWD)](https://brikev.github.io/twd/) is a powerful testing framework for web applications. It provides seamless mocking, DOM interactions, and visual regression testing capabilities. This project showcases how easily TWD integrates with Vue 3 applications.

## Features

- **Vue 3 + TypeScript**: Modern Vue application with full type safety
- **Tailwind CSS**: Utility-first styling for responsive design
- **Todo Application**: Full-featured todo list with create, read, and delete operations
- **TWD Testing**: End-to-end tests demonstrating TWD capabilities with Vue
- **Mock API Server**: JSON Server for local API mocking

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Structure

```
src/
├── views/           # Page components (Home, About, Todos)
├── components/      # Reusable UI components
├── api/            # API client functions
├── router/         # Vue Router configuration
└── twd-tests/      # TWD end-to-end tests
    ├── helloWorld.twd.test.ts
    └── todoList.twd.test.ts
```

## Testing with TWD

This project includes TWD tests for:
- **Home Page**: Counter button functionality and page rendering
- **Todo List**: CRUD operations (Create, Read, Delete) with mock API requests

Run tests by executing TWD in your testing environment. Refer to the [TWD documentation](https://brikev.github.io/twd/) for detailed testing instructions.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm install
npm run serve:dev
```

This command runs both the development server and the mock API server in parallel. The app will be available at `http://localhost:5173` and the API at `http://localhost:3001`.

### Run Tests with TWD

```sh
npm run dev
# In another terminal
npm run test
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Other Commands

- **Type Check**: `npm run type-check` - Run TypeScript type checking
- **Build Only**: `npm run build-only` - Build without type checking
- **Preview**: `npm run preview` - Preview the production build
- **API Server**: `npm run serve` - Run the mock API server only
- **Dev Server**: `npm run dev` - Run the Vite dev server only
