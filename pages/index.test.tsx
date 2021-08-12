import { render } from '@testing-library/react'
import Home from './index'

describe('Home Page', () => {
  it('should render correctly', () => {
    const { getByRole } = render(<Home />)
    expect(getByRole('heading', { name: /welcome to next.js/i })).toBeInTheDocument()
  })
})
