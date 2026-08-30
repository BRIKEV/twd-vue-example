const HOST_ID = 'twd-component-host'
const APP_ROOT_ID = 'app'

let appRoot: HTMLElement | null = null
let placeholder: Comment | null = null

/**
 * The element component tests render into: an empty div at the top of an
 * otherwise empty page.
 *
 * Two things happen here.
 *
 * 1. The app root is detached from the document. Without this the app's own
 *    DOM is still on the page, so `screen` (which queries `document.body`)
 *    matches the app's elements as well as the rendered ones. Detaching the
 *    node is not the same as wiping it: Vue keeps its DOM references, so the
 *    app is unharmed and comes back live on `restorePage()`.
 *
 * 2. The host is prepended rather than appended. Testing Library appends its
 *    container to `document.body`, which would put the component after the
 *    app root. In normal flow at the top of the page it also inherits the
 *    margin TWD sets on <html> for the sidebar.
 *
 * Teleported content still renders into `document.body`, outside this host —
 * which is why the page has to be empty and `screen` has to keep working,
 * instead of scoping queries to the container.
 *
 * The host is looked up by id instead of cached, because Testing Library's
 * `cleanup()` removes the container whenever its parent is `document.body`.
 */
export function componentHost(): HTMLElement {
  detachApp()

  let host = document.getElementById(HOST_ID)

  if (!host) {
    host = document.createElement('div')
    host.id = HOST_ID
  }

  if (!host.isConnected) {
    document.body.prepend(host)
  }

  host.innerHTML = ''
  return host
}

/** Removes the host and puts the app back where it was. Call it in `afterEach`. */
export function restorePage(): void {
  document.getElementById(HOST_ID)?.remove()
  attachApp()
}

function detachApp(): void {
  if (placeholder) return

  const root = document.getElementById(APP_ROOT_ID)
  if (!root) return

  appRoot = root
  placeholder = document.createComment(' app detached by twd component test ')
  root.replaceWith(placeholder)
}

function attachApp(): void {
  if (!placeholder || !appRoot) return

  placeholder.replaceWith(appRoot)
  placeholder = null
  appRoot = null
}
