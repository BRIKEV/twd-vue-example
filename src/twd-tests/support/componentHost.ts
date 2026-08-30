const HOST_ID = 'twd-component-host'

/**
 * The element component tests render into: an empty div at the top of the page.
 *
 * Testing Library appends its container to `document.body`, which puts the
 * component *after* `#app` — a full viewport down, past the whole app layout.
 * Prepending keeps it in normal flow, so it inherits the margin TWD sets on
 * <html> for the sidebar, and it is the first thing on screen.
 *
 * The host is looked up by id instead of cached in a module variable, because
 * `cleanup()` removes the render container whenever its parent is `document.body`.
 */
export function componentHost(): HTMLElement {
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

/** Removes the host so the app sits back at the top of the page. */
export function removeComponentHost(): void {
  document.getElementById(HOST_ID)?.remove()
}
