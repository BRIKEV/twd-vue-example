import { afterEach, describe, it } from 'twd-js/runner'
import { twd, userEvent } from 'twd-js'
import { render, screen, cleanup } from '@testing-library/vue'
import HomeView from '../../views/HomeView.vue'
import { componentHost, restorePage } from '../support/componentHost'

describe('HomeView component', () => {
  afterEach(() => {
    cleanup()
    restorePage()
  })

  it('renders the title', async () => {
    render(HomeView, { container: componentHost() })

    const title = await screen.findByText('Welcome to TWD')
    twd.should(title, 'be.visible')
  })

  it('increments the counter on click', async () => {
    render(HomeView, { container: componentHost() })

    const button = await screen.findByTestId('counter-button')
    twd.should(button, 'contain.text', 'Count is 0')

    await userEvent.click(button)
    twd.should(button, 'contain.text', 'Count is 1')
  })
})
