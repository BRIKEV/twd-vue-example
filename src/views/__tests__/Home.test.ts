import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('should render', () => {
    render(HomeView)
    expect(screen.getByText('Welcome to TWD')).toBeInTheDocument()
  })
});
