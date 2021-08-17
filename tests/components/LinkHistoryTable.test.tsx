import LinkHistoryTable from '@components/LinkHistoryTable'
import { Link } from '@prisma/client'
import { render } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'

const LINKS: Link[] = [
  {
    id: '123',
    url: 'https://example.com',
    slug: 'abc123',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

describe('GIVEN LinkHistoryTable', () => {
  afterEach(jest.resetAllMocks)

  it('should render correctly with data', async () => {
    const { getByRole } = render(<LinkHistoryTable links={LINKS} />)

    expect(getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument()
    expect(getByRole('gridcell', { name: /abc123/i })).toBeInTheDocument()
    expect(getByRole('gridcell', { name: /example.com/i })).toBeInTheDocument()
  })

  it('should let you copy a short link', async () => {
    global.document.execCommand = jest.fn()
    global.window.prompt = jest.fn()

    const { getByRole } = render(<LinkHistoryTable links={LINKS} />)

    UserEvent.click(getByRole('button', { name: /copy to clipboard/i }))
    expect(global.document.execCommand).toHaveBeenCalledWith('copy')
  })
})
