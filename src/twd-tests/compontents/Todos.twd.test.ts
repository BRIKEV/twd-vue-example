import { afterEach, beforeEach, describe, it } from 'twd-js/runner'
import { twd, expect, userEvent } from 'twd-js'
import { render, screen, cleanup } from '@testing-library/vue'
import TodosView from '../../views/TodosView.vue'
import { componentHost, restorePage } from '../support/componentHost'

describe('TodosView component', () => {
  beforeEach(() => {
    twd.clearRequestMockRules()
  })

  afterEach(() => {
    cleanup()
    restorePage()
  })

  it('posts the form values when a todo is created', async () => {
    // Mock the API, not the module. The component, its state and axios all run
    // for real; only the network boundary is replaced.
    await twd.mockRequest('getTodoList', {
      method: 'GET',
      url: '/api/todos',
      response: [],
      status: 200,
    })
    await twd.mockRequest('createTodo', {
      method: 'POST',
      url: '/api/todos',
      response: { id: '1', title: 'Write the Vue post', description: 'In a real browser', date: '2026-09-01' },
      status: 201,
    })

    render(TodosView, { container: componentHost() })
    await twd.waitForRequest('getTodoList')

    await userEvent.type(await screen.findByLabelText('Title'), 'Write the Vue post')
    await userEvent.type(screen.getByLabelText('Description'), 'In a real browser')
    await userEvent.type(screen.getByLabelText('Date'), '2026-09-01')

    await userEvent.click(screen.getByRole('button', { name: 'Create Todo' }))

    const rule = await twd.waitForRequest('createTodo')
    expect(rule.request).to.deep.equal({
      title: 'Write the Vue post',
      description: 'In a real browser',
      date: '2026-09-01',
    })
  })
})
