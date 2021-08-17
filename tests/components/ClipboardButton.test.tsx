import { render } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import ClipboardButton from '@components/ClipboardButton'

describe('CliboardButton', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should copy a link on click and match snapshot', () => {
    global.document.execCommand = jest.fn()
    global.window.prompt = jest.fn()

    const { getByRole, container } = render(<ClipboardButton link='https://example.com' />)

    UserEvent.click(getByRole('button', { name: /copy to clipboard/i }))

    expect(global.document.execCommand).toHaveBeenCalledWith('copy')
    expect(container).toMatchInlineSnapshot(`
<div>
  <button
    aria-label="Copy to clipboard"
    class="chakra-button css-198bfjk"
    type="button"
  >
    <svg
      aria-hidden="true"
      class="chakra-icon css-onkibi"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
        fill="currentColor"
      />
    </svg>
  </button>
</div>
`)
  })
})
