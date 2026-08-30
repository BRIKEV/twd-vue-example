import { afterEach, beforeEach, describe, it } from 'twd-js/runner'
import { twd } from 'twd-js'
import { render, cleanup } from '@testing-library/vue'
import HomeView from '../../views/HomeView.vue'
import { componentHost, removeComponentHost } from '../support/componentHost'

describe('Components', () => {
  beforeEach(() => {
    cleanup()
    componentHost()
  })

  afterEach(() => {
    cleanup()
    removeComponentHost()
  })

  it('should render', async () => {
    // Queries come from render(), not `screen`: `screen` searches document.body,
    // which still holds the running app, so it can match the app's own HomeView.
    const { findByText } = render(HomeView, { container: componentHost() })

    const title = await findByText('Welcome to TWD')
    twd.should(title, 'be.visible')
  })
})
