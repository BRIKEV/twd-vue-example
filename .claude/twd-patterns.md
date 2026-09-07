# TWD Project Patterns

## Project Configuration

- **Framework**: Vue 3 (Composition API, `<script setup>`)
- **Vite base path**: `/`
- **Dev server port**: `5173`
- **Entry point**: `src/main.ts` (contains no TWD code — the `twd()` and `twdRemote()` Vite plugins handle it)
- **Public folder**: `public/`
- **Test file pattern**: `/**/*.twd.test.ts` (set in `vite.config.ts`)

### Relay Commands

```bash
# Run all tests
npx twd-relay run
```

## Standard Imports

```typescript
import { twd, userEvent, screenDom, expect } from "twd-js";
import { describe, it, beforeEach, afterEach } from "twd-js/runner";
```

For component tests, add:

```typescript
import { render, screen, cleanup } from "@testing-library/vue";
import { componentHost, restorePage } from "../support/componentHost";
```

## Visit Paths

Base path is `/`, so no prefix is needed:

```typescript
await twd.visit("/");
await twd.visit("/todos");
```

Declared routes: `/`, `/about`, `/todos`.

## Standard beforeEach / afterEach

```typescript
beforeEach(() => {
  twd.clearRequestMockRules();
  twd.clearComponentMocks();
});

afterEach(() => {
  twd.clearRequestMockRules();
});
```

No client store reset and no server-state cache reset are needed. This project has
no Pinia/Zustand store and no TanStack Query/SWR/Apollo cache: views hold state in
local `ref`s and fetch with axios on mount, so every `twd.visit()` refetches.

## API Service Types

Service/API types are located in: `src/api/`

`src/api/todos.ts` is an axios instance with `baseURL: 'http://localhost:3001/api'`
(json-server, started by `npm run serve:dev`).

Mock rules match on the **path only**, not the full origin:

```typescript
await twd.mockRequest("getTodoList", {
  method: "GET",
  url: "/api/todos",   // not http://localhost:3001/api/todos
  response: todoListMock,
  status: 200,
});
```

## Component Tests

Flow tests and component tests live side by side. Component tests render one
component with `@testing-library/vue` instead of driving the app:

```typescript
import { afterEach, describe, it } from "twd-js/runner";
import { twd } from "twd-js";
import { render, screen, cleanup } from "@testing-library/vue";
import HomeView from "../../views/HomeView.vue";
import { componentHost, restorePage } from "../support/componentHost";

describe("HomeView component", () => {
  afterEach(() => {
    cleanup();
    restorePage();
  });

  it("renders the title", async () => {
    render(HomeView, { container: componentHost() });

    const title = await screen.findByText("Welcome to TWD");
    twd.should(title, "be.visible");
  });
});
```

Rules for component tests in this repo:

- **Render into `componentHost()`** (`src/twd-tests/support/componentHost.ts`). It
  detaches `#app` and prepends a blank div, so the component lands at the top of an
  empty page. Without it the app's own DOM is still on the page and `screen` matches
  its elements too. Never substitute `app.innerHTML = ''`: that pulls the DOM out
  from under Vue while its vnodes still point at those nodes, and the app does not
  come back.
- **`cleanup()` and `restorePage()` go in `afterEach`**, not `beforeEach`. The runner
  executes after-hooks in a `finally`, so they run on failing tests too, and the flow
  tests need the app back.
- **Query with `screen`, not `screenDom`.** `render()` mounts outside the app root
  that `screenDom` scopes to, and while a component test runs that root is not even
  in the document. `screenDomGlobal` also works if queries are specific.
- **Mock the network, not the module.** `twd.mockRequest` still applies; the
  component, its `ref` state, `v-model` bindings and axios all run for real. See
  `src/twd-tests/compontents/Todos.twd.test.ts`.
- Component tests are `.ts` in this project (Vue SFCs, not JSX), so the existing
  `testFilePattern` already matches them.

Reference: https://twd.dev/component-testing

## Portals and Dialogs

Use `screenDomGlobal` instead of `screenDom` for elements rendered through
`<Teleport>` (modals, dropdowns, tooltips), which land on `document.body`:

```typescript
import { screenDomGlobal } from "twd-js";
const modal = screenDomGlobal.getByRole("dialog");
```

## Existing Tests

| File | Kind |
|---|---|
| `src/twd-tests/helloWorld.twd.test.ts` | flow |
| `src/twd-tests/todoList.twd.test.ts` | flow (mocked API, full CRUD) |
| `src/twd-tests/compontents/Home.twd.test.ts` | component |
| `src/twd-tests/compontents/Todos.twd.test.ts` | component (mocked API) |
